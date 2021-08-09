import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { CustPersonalObj } from 'app/shared/model/CustPersonalObj.Model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CustObj } from 'app/shared/model/CustObj.Model';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.Model';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UcDropdownListObj } from 'app/shared/model/library/UcDropdownListObj.model';
import { NewCustSetData } from 'app/customer/sharing-component/new-cust-component/NewCustSetData.Service';
import { KeyValueObj } from 'app/shared/model/KeyValue/KeyValueObj.Model';

@Component({
  selector: 'app-customer-personal-detail',
  templateUrl: './customer-personal-detail.component.html',
  styleUrls: []

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
  LocalCountry: any;
  tempCountryCode: any;
  tempNationality: any;
  tempCustPersonalObj: CustPersonalObj = new CustPersonalObj();
  tempMrMaritalStatCode: any;

  Page: String;

  CustomerDetailForm = this.fb.group({
    CustFullName: ['', [Validators.maxLength(100)]],
    NickName: ['', [Validators.maxLength(100)]],
    MrSalutationCode: ['', [Validators.required]],
    CustPrefixName: [''],
    CustSuffixName: [''],
    NoOfDependents: ['', [Validators.pattern("^[0-9]+$")]],
    MrNationalityCode: ['', [Validators.required]],
    NoOfResidence: ['', Validators.pattern("^[0-9]+$")],
    FamilyCardNo: ['', Validators.pattern("^[0-9]+$")],
    MrEducationCode: ['', [Validators.required]],
    MrReligionCode: ['', [Validators.required]],
    IsRestInPeace: [false],
    IsVip: [false],
    VipNotes: [''],
    IsAffiliateWithMf: [false],
  });

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder) {
    this.route.queryParams.subscribe(params => {
      if (params["IdCust"] != null) {
        this.IdCust = params["IdCust"];
      }
      if (params["Page"] != null) {
        this.Page = params["Page"];
      }
    });

  }

  readonly RefMasterTypeCodeSalutation: string = CommonConstant.RefMasterTypeCodeSalutation;
  readonly RefMasterTypeCodeEducation: string = CommonConstant.RefMasterTypeCodeEducation;
  readonly RefMasterTypeCodeReligion: string = CommonConstant.RefMasterTypeCodeReligion;
  readonly RefMasterTypeCodeNationality: string = CommonConstant.RefMasterTypeCodeNationality;

  DictUcDDLObj: { [id: string]: UcDropdownListObj } = {};
  ngOnInit() {
    this.http.post(URLConstant.GetGeneralSettingValueByCode, {Code: CommonConstant.GSCodeDefLocalNationality}).subscribe(
      (response) => {
        this.Country = response;
        this.lookUpObj = new InputLookupObj();
        this.lookUpObj.urlJson = "./assets/lookup/lookupCustomerCountry.json";
        this.lookUpObj.pagingJson = "./assets/lookup/lookupCustomerCountry.json";
        this.lookUpObj.genericJson = "./assets/lookup/lookupCustomerCountry.json";
        this.criteriaList = new Array();
        this.criteriaObj = new CriteriaObj();
        this.criteriaObj.restriction = AdInsConstant.RestrictionNeq;
        this.criteriaObj.propName = 'COUNTRY_CODE';
        this.criteriaObj.value = this.Country.GsValue;
        this.criteriaList.push(this.criteriaObj);
        this.lookUpObj.addCritInput = this.criteriaList;

        this.http.post(URLConstant.GetRefCountryByCountryCode, { Code: this.Country.GsValue }).subscribe(
          (response) => {
            this.LocalCountry = response;
          });

      });

    this.custObj = new CustObj()
    this.custObj.CustId = this.IdCust;

    this.http.post(URLConstant.GetCustByCustId, { Id: this.IdCust }).subscribe(
      (response: CustObj) => {
        this.tempCustObj = response;
        this.CustomerDetailForm.patchValue({
          IsVip: response.IsVip,
          VipNotes: response.VipNotes,
          IsAffiliateWithMf: response.IsAffiliateWithMf,
        });
        this.checkState();
      });
    this.custPersonalObj = new CustPersonalObj();
    this.custPersonalObj.CustId = this.IdCust;
    this.http.post<CustPersonalObj>(URLConstant.GetCustPersonalbyCustId, { Id: this.IdCust }).subscribe(
      (response) => {
        this.tempCustPersonalObj = response;
        this.http.post(URLConstant.GetListActiveRefMasterByRefMasterTypeCode, { Code: CommonConstant.RefMasterTypeCodeNationality }).subscribe(
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
                this.http.post(URLConstant.GetRefCountryByCountryCode, { Code: this.tempCustPersonalObj.WnaCountryCode }).subscribe(
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

        this.DictUcDDLObj[this.RefMasterTypeCodeSalutation] = NewCustSetData.initDdlRefMaster(this.RefMasterTypeCodeSalutation);
        this.DictUcDDLObj[this.RefMasterTypeCodeEducation] = NewCustSetData.initDdlRefMaster(this.RefMasterTypeCodeEducation);
        this.DictUcDDLObj[this.RefMasterTypeCodeReligion] = NewCustSetData.initDdlRefMaster(this.RefMasterTypeCodeReligion);
        this.DictUcDDLObj[this.RefMasterTypeCodeNationality] = NewCustSetData.initDdlRefMaster(this.RefMasterTypeCodeNationality, null, true);

        this.CustomerDetailForm.patchValue({
          NickName: this.tempCustPersonalObj.NickName,
          MrNationalityCode: this.tempCustPersonalObj.MrNationalityCode,
          MrEducationCode: this.tempCustPersonalObj.MrEducationCode,
          MrReligionCode: this.tempCustPersonalObj.MrReligionCode,
          MrSalutationCode: this.tempCustPersonalObj.MrSalutationCode,
          CustSuffixName: this.tempCustPersonalObj.CustSuffixName,
          CustPrefixName: this.tempCustPersonalObj.CustPrefixName,
          NoOfDependents: this.tempCustPersonalObj.NoOfDependents,
          NoOfResidence: this.tempCustPersonalObj.NoOfResidence,
          FamilyCardNo: this.tempCustPersonalObj.FamilyCardNo,
          IsRestInPeace: this.tempCustPersonalObj.IsRestInPeace,
        });
      });
  }
  
  checkState() {
    if (!this.CustomerDetailForm.controls.IsVip.value) {
      this.CustomerDetailForm.patchValue({
        VipNotes: null
      });
      this.CustomerDetailForm.controls.VipNotes.disable();
      this.CustomerDetailForm.controls.VipNotes.clearAsyncValidators();

    } else {
      this.CustomerDetailForm.controls.VipNotes.enable();
      this.CustomerDetailForm.controls.VipNotes.setValidators(Validators.required);

    }
    this.CustomerDetailForm.controls.VipNotes.updateValueAndValidity();
  }

  async SaveValue() {
    this.custPersonalObj = new CustPersonalObj();
    this.custPersonalObj = this.tempCustPersonalObj;
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
    else {
      if (this.tempCustPersonalObj.WnaCountryCode != null && this.tempCountryCode == null) {
        this.custPersonalObj.WnaCountryCode = this.tempCustPersonalObj.WnaCountryCode;
      } else {
        this.custPersonalObj.WnaCountryCode = this.tempCountryCode;
      }
    }

    this.custPersonalObj.FamilyCardNo = this.CustomerDetailForm.controls["FamilyCardNo"].value;
    this.custPersonalObj.MrEducationCode = this.CustomerDetailForm.controls["MrEducationCode"].value;
    this.custPersonalObj.MrReligionCode = this.CustomerDetailForm.controls["MrReligionCode"].value;
    this.custPersonalObj.IsRestInPeace = this.CustomerDetailForm.controls["IsRestInPeace"].value;
    this.custPersonalObj.IsVip = this.CustomerDetailForm.controls["IsVip"].value;
    this.custPersonalObj.VipNotes = this.CustomerDetailForm.controls["VipNotes"].value;
    this.custPersonalObj.IsAffiliateWithMf = this.CustomerDetailForm.controls["IsAffiliateWithMf"].value;
    this.http.post(URLConstant.EditCustPersonal, this.custPersonalObj).subscribe(
      response => {
        this.toastr.successMessage(response["Message"]);
        // this.wizard.goToNextStep();
        this.outputTab.emit({ CustPersonalId: this.tempCustPersonalObj.CustPersonalId, stepMode: "next" });
      }
    );
  }
  onOptionsSelected(event: { selectedIndex: number, selectedObj: KeyValueObj, selectedValue: string }) {
    if (event.selectedValue == CommonConstant.NationalityCodeLocal) {
      this.flag = true;
      this.lookUpObj.isRequired = false;
    } else {
      this.flag = false;
      var foreign = this.tempNationality.find(x => x["MasterCode"] == event.selectedValue);
      var setCountry = foreign.DefaultValue.split(';');
      this.lookUpObj.nameSelect = setCountry[1] ? setCountry[1] : setCountry[0];
      this.lookUpObj.jsonSelect = { CountryName: setCountry[1] ? setCountry[1] : setCountry[0] };
      this.tempCountryCode = setCountry[0];
      this.lookUpObj.isRequired = true;
    }
  }
  getLookUp(event) {
    this.tempCountryCode = event.CountryCode;
  }
  back() {
    if (this.Page != null) {
      AdInsHelper.RedirectUrl(this.router, [NavigationConstant.CUST_EDIT_MAIN_DATA_PAGING], {});
    } else {
      AdInsHelper.RedirectUrl(this.router, [NavigationConstant.CUST_PAGING], {});
    }
  }
}
