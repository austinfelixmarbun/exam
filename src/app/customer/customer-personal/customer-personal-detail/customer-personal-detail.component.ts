import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { CustPersonalObj } from 'app/shared/model/CustPersonalObj.Model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CustObj } from 'app/shared/model/CustObj.Model';
import { environment } from 'environments/environment';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.Model';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-customer-personal-detail',
  templateUrl: './customer-personal-detail.component.html',
  styleUrls: [],
  providers: [NGXToastrService],

})
export class CustomerPersonalDetailComponent implements OnInit {
  @Output() outputTab: EventEmitter<any> = new EventEmitter();

  IdCust: number;
  flag: boolean;

  criteriaObj: CriteriaObj;
  lookUpObj: InputLookupObj;
  criteriaList: Array<CriteriaObj>;
  
  custObj: CustObj;
  custPersonalObj: CustPersonalObj;
  
  Country: any;
  tempCustObj: any;
  tempCountry: any;
  tempReligion: any;
  LocalCountry: any;
  tempEducation: any;
  tempSalutation: any;
  tempCountryCode: any;
  tempNationality: any;
  tempCustPersonalObj: CustPersonalObj;
  tempMrMaritalStatCode: any;

  Page: String;
  getListCountryUrl: string;
  GetCustByCustIdUrl: string;
  EditCustPersonalUrl: string;
  GetCustPersonalbyCustIdUrl: string;
  GetGeneralSettingByCodeUrl: string;
  getListActiveRefMasterUrl: string;

  CustomerDetailForm = this.fb.group({
    CustFullName: ['', [Validators.maxLength(100)]],
    NickName: ['', [Validators.maxLength(100)]],
    MrSalutationCode: [''],
    MrMaritalStatCode: [''],
    CustPrefixName: [''],
    CustSuffixName: [''],
    NoOfDependents: ['', [Validators.pattern("^[0-9]+$")]],
    MrNationalityCode: [''],
    NoOfResidence: ['', Validators.pattern("^[0-9]+$")],
    FamilyCardNo: ['', Validators.pattern("^[0-9]+$")],
    MrEducationCode: ['',],
    MrReligionCode: ['',],
    IsRestInPeace: [false],
    MobilePhnNo1: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
    MobilePhnNo2: ['', Validators.pattern("^[0-9]+$")],
    Email1: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
    Email2: ['', Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]
  }); 

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder) {

    this.getListActiveRefMasterUrl = URLConstant.GetListActiveRefMaster;
    this.getListCountryUrl = URLConstant.GetListRefCountry;
    this.GetCustByCustIdUrl = URLConstant.GetCustByCustId;
    this.EditCustPersonalUrl = URLConstant.EditCustPersonal;
    this.route.queryParams.subscribe(params => {
      this.GetCustPersonalbyCustIdUrl = URLConstant.GetCustPersonalbyCustId;
      this.GetGeneralSettingByCodeUrl = URLConstant.GetGeneralSettingByCode;
      if (params["IdCust"] != null) {
        this.IdCust = params["IdCust"];
      }
      if (params["Page"] != null) {
        this.Page = params["Page"];
      }
    });

  }

  ngOnInit() {
    var generalSettingObjDefLocalNationality = {
      GsCode: CommonConstant.GSCodeDefLocalNationality
    }
    this.http.post(this.GetGeneralSettingByCodeUrl, {Code: CommonConstant.GSCodeDefLocalNationality}).subscribe(
      (response) => {
        this.Country = response;
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
        this.criteriaObj.value = this.Country.GsValue;
        this.criteriaList.push(this.criteriaObj);
        this.lookUpObj.addCritInput = this.criteriaList;


        var countryCode = {
          CountryCode: this.Country.GsValue
        };
        this.http.post(URLConstant.GetRefCountryByCountryCode, {Code: this.Country.GsValue}).subscribe(
          (response) => {
            this.LocalCountry = response;
          });

      });

    this.custObj = new CustObj()
    this.custObj.CustId = this.IdCust;

    this.http.post(this.GetCustByCustIdUrl, {Id : this.IdCust}).subscribe(
      (response) => {
        this.tempCustObj = response;
      });
    this.custPersonalObj = new CustPersonalObj();
    this.custPersonalObj.CustId = this.IdCust;
    this.http.post<CustPersonalObj>(this.GetCustPersonalbyCustIdUrl, {Id : this.IdCust}).subscribe(
      (response) => {
        this.tempCustPersonalObj = response;
        var refMasterObjMrNationalityCode = {
          RefMasterTypeCode: CommonConstant.RefMasterTypeCodeNationality
        }
        this.http.post(URLConstant.GetListActiveRefMasterByRefMasterTypeCode, refMasterObjMrNationalityCode).subscribe(
          (response) => {
            this.tempNationality = response["RefMasterObjs"];

            if (this.tempCustPersonalObj.MrNationalityCode != null) {
              this.CustomerDetailForm.patchValue({
                MrNationalityCode: this.tempCustPersonalObj.MrNationalityCode
              });
              if (this.tempCustPersonalObj.MrNationalityCode == CommonConstant.NationalityCodeLocal) {
                this.flag = true;
                this.lookUpObj.isRequired = false;
              } else {
                var countryCode = {
                  CountryCode: this.tempCustPersonalObj.WnaCountryCode
                };
                this.http.post(URLConstant.GetRefCountryByCountryCode, {Code: this.tempCustPersonalObj.WnaCountryCode}).subscribe(
                  (response) => {
                    this.tempCountry = response;
                    this.lookUpObj.nameSelect = this.tempCountry.CountryName;
                    this.lookUpObj.jsonSelect = this.tempCountry;
                  });
                this.lookUpObj.isRequired = true;
              }
            } else {
              this.CustomerDetailForm.patchValue({
                MrNationalityCode: CommonConstant.NationalityCodeLocal
              });
              this.flag = true;
              this.lookUpObj.isRequired = false;
            }
          }
        );

        var refMasterObjMrSalutationCode = {
          RefMasterTypeCode: CommonConstant.RefMasterTypeCodeSalutation
        }
        this.http.post(this.getListActiveRefMasterUrl, refMasterObjMrSalutationCode).subscribe(
          (response) => {
            this.tempSalutation = response[CommonConstant.ReturnObj];

            if (this.tempCustPersonalObj.MrSalutationCode != null) {
              this.CustomerDetailForm.patchValue({
                MrSalutationCode: this.tempCustPersonalObj.MrSalutationCode
              });
            } else {
              this.CustomerDetailForm.patchValue({
                MrSalutationCode: response[CommonConstant.ReturnObj][0]['Key']
              });
            }
          }
        );
        var refMasterObjMrEducationCode = {
          RefMasterTypeCode: CommonConstant.RefMasterTypeCodeEducation
        }
        this.http.post(this.getListActiveRefMasterUrl, refMasterObjMrEducationCode).subscribe(
          (response) => {
            this.tempEducation = response[CommonConstant.ReturnObj];
            if (this.tempCustPersonalObj.MrEducationCode != null) {
              this.CustomerDetailForm.patchValue({
                MrEducationCode: this.tempCustPersonalObj.MrEducationCode
              });
            } else {
              this.CustomerDetailForm.patchValue({
                MrEducationCode: response[CommonConstant.ReturnObj][0]['Key']
              });
            }
          }
        );
        var refMasterObjMrReligionCode = {
          RefMasterTypeCode: CommonConstant.RefMasterTypeCodeReligion
        }
        this.http.post(this.getListActiveRefMasterUrl, refMasterObjMrReligionCode).subscribe(
          (response) => {
            this.tempReligion = response[CommonConstant.ReturnObj];
            if (this.tempCustPersonalObj.MrReligionCode != null) {
              this.CustomerDetailForm.patchValue({
                MrReligionCode: this.tempCustPersonalObj.MrReligionCode
              });
            } else {
              this.CustomerDetailForm.patchValue({
                MrReligionCode: response[CommonConstant.ReturnObj][0]['Key']
              });
            }
          }
        );
        // var refMasterObjMrMaritalStatCode = {
        //   RefMasterTypeCode: CommonConstant.RefMasterTypeCodeMaritalStat
        // }
        // this.http.post(this.getListActiveRefMasterUrl, refMasterObjMrMaritalStatCode).subscribe(
        //   (response) => {
        //     this.tempMrMaritalStatCode = response[CommonConstant.ReturnObj];
        //     if (this.tempCustPersonalObj.MrMaritalStatCode != null) {
        //       this.CustomerDetailForm.patchValue({
        //         MrMaritalStatCode: this.tempCustPersonalObj.MrMaritalStatCode
        //       });
        //     } else {
        //       this.CustomerDetailForm.patchValue({
        //         MrMaritalStatCode: response[CommonConstant.ReturnObj][0]['Key']
        //       });
        //     }
        //   }
        // );


        this.CustomerDetailForm.patchValue({
          NickName: this.tempCustPersonalObj.NickName,
          MrNationalityCode: this.tempCustPersonalObj.MrNationalityCode,
          CustSuffixName: this.tempCustPersonalObj.CustSuffixName,
          CustPrefixName: this.tempCustPersonalObj.CustPrefixName,
          NoOfDependents: this.tempCustPersonalObj.NoOfDependents,
          NoOfResidence: this.tempCustPersonalObj.NoOfResidence,
          FamilyCardNo: this.tempCustPersonalObj.FamilyCardNo,
          IsRestInPeace: this.tempCustPersonalObj.IsRestInPeace,
          MobilePhnNo1: this.tempCustPersonalObj.MobilePhnNo1,
          MobilePhnNo2: this.tempCustPersonalObj.MobilePhnNo2,
          Email1: this.tempCustPersonalObj.Email1,
          Email2: this.tempCustPersonalObj.Email2
        });
      });
  }
 async SaveValue() {

    await this.http.post<CustPersonalObj>(this.GetCustPersonalbyCustIdUrl, {Id : this.custPersonalObj.CustId}).toPromise().then(
      (response) => {
        this.tempCustPersonalObj = response;
        this.custPersonalObj = new CustPersonalObj();
        this.custPersonalObj = this.tempCustPersonalObj;
      });

    this.custPersonalObj.CustFullName = this.tempCustObj.CustName;
    this.custPersonalObj.NickName = this.CustomerDetailForm.controls["NickName"].value;
    this.custPersonalObj.MrSalutationCode = this.CustomerDetailForm.controls["MrSalutationCode"].value;
    this.custPersonalObj.MrMaritalStatCode = this.tempCustPersonalObj.MrMaritalStatCode;
    this.custPersonalObj.CustPrefixName = this.CustomerDetailForm.controls["CustPrefixName"].value;
    this.custPersonalObj.CustSuffixName = this.CustomerDetailForm.controls["CustSuffixName"].value;
    this.custPersonalObj.NoOfDependents = this.CustomerDetailForm.controls["NoOfDependents"].value;
    this.custPersonalObj.MotherMaidenName = this.tempCustPersonalObj.MotherMaidenName;
    this.custPersonalObj.MrGenderCode = this.tempCustPersonalObj.MrGenderCode;
    this.custPersonalObj.MrNationalityCode = this.CustomerDetailForm.controls["MrNationalityCode"].value;
    this.custPersonalObj.NoOfResidence = this.CustomerDetailForm.controls["NoOfResidence"].value;

    if (this.custPersonalObj.MrNationalityCode == CommonConstant.NationalityCodeLocal) {
      this.custPersonalObj.WnaCountryCode = CommonConstant.WnaCountryCodeIdn;
    }
    if (this.tempCustPersonalObj.WnaCountryCode != null && this.tempCountryCode == null) {
      this.custPersonalObj.WnaCountryCode = this.tempCustPersonalObj.WnaCountryCode;
    } else {
      this.custPersonalObj.WnaCountryCode = this.tempCountryCode;
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
        // this.wizard.goToNextStep();
        this.outputTab.emit({ CustPersonalId: this.tempCustPersonalObj.CustPersonalId, stepMode: "next" });
      }
    );
  }
  onOptionsSelected(event) {
    if (event.target.value == CommonConstant.NationalityCodeLocal) {
      this.flag = true;
      this.lookUpObj.isRequired = false;
    } else {
      this.flag = false;
      var foreign = this.tempNationality.find(x => x["MasterCode"] == event.target.value);
      var setCountry = foreign.DefaultValue.split(';');
      this.lookUpObj.nameSelect = setCountry[1] ? setCountry[1] : setCountry[0];
      this.lookUpObj.jsonSelect =  { CountryName: setCountry[1] ? setCountry[1] : setCountry[0]};
      this.tempCountryCode = setCountry[0];
      this.lookUpObj.isRequired = true;
    }
  }
  getLookUp(event) {
    this.tempCountryCode = event.CountryCode;
  }
  back() {
    if (this.Page != null) {
      AdInsHelper.RedirectUrl(this.router,[NavigationConstant.CUST_EDIT_MAIN_DATA_PAGING],{});
    } else {
      AdInsHelper.RedirectUrl(this.router,[NavigationConstant.CUST_PAGING],{});
    }
  }
}
