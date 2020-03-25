import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { WizardComponent } from 'angular-archwizard';
import { CustPersonalObj } from 'app/shared/model/CustPersonalObj.Model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CustObj } from 'app/shared/model/CustObj.Model';
import { environment } from 'environments/environment';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';

@Component({
  selector: 'app-customer-personal-detail',
  templateUrl: './customer-personal-detail.component.html',
  styleUrls: ['./customer-personal-detail.component.scss'],
  providers: [NGXToastrService],

})
export class CustomerPersonalDetailComponent implements OnInit {

  CustomerDetailForm = this.fb.group({
    CustFullName: ['', [Validators.maxLength(100)]],
    NickName: ['', [Validators.maxLength(100)]],
    MrSalutationCode: [''],
    MrMaritalStatCode: [''],
    CustPrefixName: [''],
    IsAffiliateWithMf: [true],
    CustSuffixName: [''],
    NoOfDependents: ['', [Validators.pattern("^[0-9]+$")]],
    MrNationalityCode: [''],
    NoOfResidence: ['', Validators.pattern("^[0-9]+$")],
    FamilyCardNo: ['', Validators.pattern("^[0-9]+$")],
    MrEducationCode: ['',],
    MrReligionCode: ['',],
    IsRestInPeace: [false],  
    MobilePhnNo1: ['', Validators.required],
    MobilePhnNo2: ['',],
    Email1: ['',],
    Email2: ['',],
  });
  CountryIndonesia = "Indonesia";
  custPersonalObj: any;
  custObj: any;
  tempCountry: any;
  tempNationality: any;
  tempSalutation: any;
  tempEducation: any;
  tempReligion: any;
  IdCust: any;
  tempCustPersonalObj: any;
  tempMrMaritalStatCode: any;
  tempWnaCountryCode: any;
  getListCountryUrl: any;
  tempCustObj: any;
  tempCountryCode: any;
  GetUrl: any;
  GetCustByCustIdUrl: any;
  GetCustPersonalbyCustIdUrl: any;
  EditCustPersonalUrl: any;
  lookUpObj: any;
  criteriaList: any;
  criteriaObj: any;
  flag: any;
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder, private wizard: WizardComponent) {

    this.GetUrl = AdInsConstant.GetListActiveRefMaster;
    this.getListCountryUrl = AdInsConstant.GetListRefCountry;
    this.GetCustByCustIdUrl = AdInsConstant.GetCustByCustId;
    this.EditCustPersonalUrl = AdInsConstant.EditCustPersonal;
    this.route.queryParams.subscribe(params => {
      this.GetCustPersonalbyCustIdUrl = AdInsConstant.GetCustPersonalbyCustId;
      if (params["IdCust"] != null) {
        this.IdCust = params["IdCust"];
      }
    });

  }

  ngOnInit() {
    this.lookUpObj = new InputLookupObj();
    this.lookUpObj.urlJson = "./assets/lookup/lookupCustomerCountry.json";
    this.lookUpObj.urlQryPaging = "/Generic/GetPagingObjectBySQL";
    this.lookUpObj.urlEnviPaging = environment.FoundationR3Url;
    this.lookUpObj.pagingJson = "./assets/lookup/lookupCustomerCountry.json";
    this.lookUpObj.genericJson = "./assets/lookup/lookupCustomerCountry.json";

    this.criteriaList = new Array();
    this.criteriaObj = new CriteriaObj();
    this.criteriaObj.restriction = AdInsConstant.RestrictionNeq;
    this.criteriaObj.propName = 'COUNTRY_CODE';
    this.criteriaObj.value = "IDN";
    this.criteriaList.push(this.criteriaObj);
    this.lookUpObj.addCritInput = this.criteriaList;

    this.custObj = new CustObj()
    this.custObj.CustId = this.IdCust;

    this.http.post(this.GetCustByCustIdUrl, this.custObj).subscribe(
      (response) => {
        this.tempCustObj = response;
      });
    this.custPersonalObj = new CustPersonalObj();
    this.custPersonalObj.CustId = this.IdCust;
    this.http.post(this.GetCustPersonalbyCustIdUrl, this.custPersonalObj).subscribe(
      (response) => {
        this.tempCustPersonalObj = response;
        var refMasterObj = {
          RefMasterTypeCode: "NATIONALITY"
        }
        this.http.post(this.GetUrl, refMasterObj).subscribe(
          (response) => {
            this.tempNationality = response["ReturnObject"];

            if (this.tempCustPersonalObj.MrNationalityCode != null) {
              this.CustomerDetailForm.patchValue({
                MrNationalityCode: this.tempCustPersonalObj.MrNationalityCode
              });
              if (this.tempCustPersonalObj.MrNationalityCode == "WNI") {
                this.flag = true;
                this.lookUpObj.isRequired = false;
              } else {
                var countryCode = {
                  CountryCode: this.tempCustPersonalObj.WnaCountryCode
                };
                this.http.post(AdInsConstant.GetRefCountryByCountryCode, countryCode).subscribe(
                  (response) => {
                    this.tempCountry = response;
                    this.lookUpObj.nameSelect = this.tempCountry.CountryName;
                  });
                this.lookUpObj.isRequired = true;
              }
            } else {
              this.CustomerDetailForm.patchValue({
                MrNationalityCode: "WNI"
              });
              this.flag = true;
              this.lookUpObj.isRequired = false;
            }
          }
        );

        var refMasterObj1 = {
          RefMasterTypeCode: "SALUTATION"
        }
        this.http.post(this.GetUrl, refMasterObj1).subscribe(
          (response) => {
            this.tempSalutation = response["ReturnObject"];

            if (this.tempCustPersonalObj.MrSalutationCode != null) {
              this.CustomerDetailForm.patchValue({
                MrSalutationCode: this.tempCustPersonalObj.MrSalutationCode
              });
            } else {
              this.CustomerDetailForm.patchValue({
                MrSalutationCode: response['ReturnObject'][0]['Key']
              });
            }
          }
        );
        var refMasterObj2 = {
          RefMasterTypeCode: "EDUCATION"
        }
        this.http.post(this.GetUrl, refMasterObj2).subscribe(
          (response) => {
            this.tempEducation = response["ReturnObject"];
            if (this.tempCustPersonalObj.MrEducationCode != null) {
              this.CustomerDetailForm.patchValue({
                MrEducationCode: this.tempCustPersonalObj.MrEducationCode
              });
            } else {
              this.CustomerDetailForm.patchValue({
                MrEducationCode: response['ReturnObject'][0]['Key']
              });
            }
          }
        );
        var refMasterObj3 = {
          RefMasterTypeCode: "RELIGION"
        }
        this.http.post(this.GetUrl, refMasterObj3).subscribe(
          (response) => {
            this.tempReligion = response["ReturnObject"];
            if (this.tempCustPersonalObj.MrReligionCode != null) {
              this.CustomerDetailForm.patchValue({
                MrReligionCode: this.tempCustPersonalObj.MrReligionCode
              });
            } else {
              this.CustomerDetailForm.patchValue({
                MrReligionCode: response['ReturnObject'][0]['Key']
              });
            }
          }
        );
        var refMasterObj4 = {
          RefMasterTypeCode: "MARITAL_STAT"
        }
        this.http.post(this.GetUrl, refMasterObj4).subscribe(
          (response) => {
            this.tempMrMaritalStatCode = response["ReturnObject"];
            if (this.tempCustPersonalObj.MrMaritalStatCode != null) {
              this.CustomerDetailForm.patchValue({
                MrMaritalStatCode: this.tempCustPersonalObj.MrMaritalStatCode
              });
            } else {
              this.CustomerDetailForm.patchValue({
                MrMaritalStatCode: response['ReturnObject'][0]['Key']
              });
            }
          }
        );

        var refMasterObj5;
        this.http.post(this.getListCountryUrl, refMasterObj5).subscribe(
          (response) => {
            this.tempWnaCountryCode = response["ReturnObject"];
          }
        );
        this.CustomerDetailForm.patchValue({
          NickName: this.tempCustPersonalObj.NickName,
          MrNationalityCode: this.tempCustPersonalObj.MrNationalityCode,
          CustSuffixName: this.tempCustPersonalObj.CustSuffixName,
          IsAffiliateWithMf: this.tempCustPersonalObj.IsAffiliateWithMf,
          CustPrefixName: this.tempCustPersonalObj.CustPrefixName,
          NoOfDependents: this.tempCustPersonalObj.NoOfDependents,
          NoOfResidence: this.tempCustPersonalObj.NoOfResidence,
          FamilyCardNo: this.tempCustPersonalObj.FamilyCardNo,
          IsRestInPeace: this.tempCustPersonalObj.IsRestInPeace, 
          MobilePhnNo1: this.tempCustPersonalObj.MobilePhnNo1,
          MobilePhnNo2: this.tempCustPersonalObj.MobilePhnNo2,
          Email1: this.tempCustPersonalObj.Email1,
          Email2: this.tempCustPersonalObj.Email1
        });
      });
  }
  SaveValue() {
    this.custPersonalObj = new CustPersonalObj();
    this.custPersonalObj = this.tempCustPersonalObj;
    this.custPersonalObj.CustFullName = this.tempCustObj.CustName;
    this.custPersonalObj.NickName = this.CustomerDetailForm.controls["NickName"].value;
    this.custPersonalObj.MrSalutationCode = this.CustomerDetailForm.controls["MrSalutationCode"].value;
    this.custPersonalObj.MrMaritalStatCode = this.CustomerDetailForm.controls["MrMaritalStatCode"].value;
    this.custPersonalObj.CustPrefixName = this.CustomerDetailForm.controls["CustPrefixName"].value;
    this.custPersonalObj.IsAffiliateWithMf = this.CustomerDetailForm.controls["IsAffiliateWithMf"].value;
    this.custPersonalObj.CustSuffixName = this.CustomerDetailForm.controls["CustSuffixName"].value;
    this.custPersonalObj.NoOfDependents = this.CustomerDetailForm.controls["NoOfDependents"].value;
    this.custPersonalObj.MotherMaidenName = this.tempCustPersonalObj.MotherMaidenName;
    this.custPersonalObj.MrGenderCode = this.tempCustPersonalObj.MrGenderCode;
    this.custPersonalObj.MrNationalityCode = this.CustomerDetailForm.controls["MrNationalityCode"].value;
    this.custPersonalObj.NoOfResidence = this.CustomerDetailForm.controls["NoOfResidence"].value;
    this.custPersonalObj.WnaCountryCode = this.tempCountryCode;
    if (this.custPersonalObj.MrNationalityCode == "WNI") {
      this.custPersonalObj.WnaCountryCode = "IDN";
    }
    this.custPersonalObj.FamilyCardNo = this.CustomerDetailForm.controls["FamilyCardNo"].value;
    this.custPersonalObj.MrEducationCode = this.CustomerDetailForm.controls["MrEducationCode"].value;
    this.custPersonalObj.MrReligionCode = this.CustomerDetailForm.controls["MrReligionCode"].value;
    this.custPersonalObj.IsRestInPeace = this.CustomerDetailForm.controls["IsRestInPeace"].value;  
    this.custPersonalObj.MobilePhnNo1 = this.CustomerDetailForm.controls["MobilePhnNo1"].value;
    this.custPersonalObj.MobilePhnNo2 = this.CustomerDetailForm.controls["MobilePhnNo2"].value;
    this.custPersonalObj.Email1 = this.CustomerDetailForm.controls["Email1"].value;
    this.custPersonalObj.Email2 = this.CustomerDetailForm.controls["Email2"].value;
    this.http.post(this.EditCustPersonalUrl, this.custPersonalObj).subscribe(
      response => {
        this.toastr.successMessage(response["Message"]);
        this.wizard.goToNextStep();
      },
      error => {
        console.log(error);
      }
    );
  }
  onOptionsSelected(event) {
    if (event.target.value == "WNI") {
      this.flag = true;
      this.lookUpObj.isRequired = false;
    } else {
      this.flag = false;
      this.lookUpObj.isRequired = true;
    }
  }
  getLookUp(event) {
    this.tempCountryCode = event.CountryCode;
  }
}
