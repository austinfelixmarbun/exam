import { UclookupgenericComponent } from '@adins/uclookupgeneric';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { NewCustSetData } from 'app/customer/sharing-component/new-cust-component/NewCustSetData.Service';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { CurrentUserContext } from 'app/shared/model/CurrentUserContext.model';
import { CustPersonalJobDataObj } from 'app/shared/model/CustPersonalJobDataObj.Model';
import { CustPersonalObj } from 'app/shared/model/CustPersonalObj.Model';
import { GeneralSettingObj } from 'app/shared/model/GeneralSettingObj.Model';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { KeyValueObj } from 'app/shared/model/KeyValue/KeyValueObj.Model';
import { UcDropdownListObj } from 'app/shared/model/library/UcDropdownListObj.model';
import { CustFormExistingObj } from 'app/shared/model/NewCust/Shareholder/ShareholderFormExistingObj.Model';
import { RefCountry } from 'app/shared/model/RefCountry.Model';
import { ReqRefMasterByTypeCodeAndMasterCodeObj } from 'app/shared/model/RefMaster/ReqRefMasterByTypeCodeAndMasterCodeObj.Model';
import { RefMasterObj } from 'app/shared/model/RefMasterObj.Model';
import { RefProfessionObj } from 'app/shared/model/RefProfessionObj.Model';
import { CookieService } from 'ngx-cookie';


@Component({
  selector: 'app-family-form-x',
  templateUrl: './family-form-x.component.html',
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class FamilyFormXComponent implements OnInit {

  @Input() CustId: number = 0;
  @Input() enjiForm: NgForm;
  @Input() parentForm: FormGroup;
  @Output() outputExisting: EventEmitter<CustFormExistingObj> = new EventEmitter();
  @Output() outputChange: EventEmitter<{ Key: string, Code: string }> = new EventEmitter();

  readonly RefMasterTypeCodeCustModel: string = CommonConstant.RefMasterTypeCodeCustModel;
  readonly RefMasterTypeCodeNationality: string = CommonConstant.RefMasterTypeCodeNationality;
  private ucLookupProfession: UclookupgenericComponent;
  @ViewChild('LookupProfession') set content(content: UclookupgenericComponent) {
    if (content) { // initially setter gets called with undefined
      this.ucLookupProfession = content;
    }
  }
  constructor(private http: HttpClient, private fb: FormBuilder, private cookieService: CookieService) { }

  tempExisting: CustFormExistingObj = new CustFormExistingObj();
  DictUcDDLObj: { [id: string]: UcDropdownListObj } = {};
  async ngOnInit() {
    await this.InitData();
    this.DictUcDDLObj[this.RefMasterTypeCodeCustModel] = NewCustSetData.initDdlRefMaster(this.RefMasterTypeCodeCustModel, CommonConstant.CustTypePersonal, true);
    this.DictUcDDLObj[this.RefMasterTypeCodeNationality] = NewCustSetData.initDdlRefMaster(this.RefMasterTypeCodeNationality, null, true);
    await this.GetExistingJobData();
    this.jobPositionLookupObj.isReady = true;
    this.lookUpObjCountry.isReady = true;
    this.professionLookUpObj.isReady = true;
    this.outputExisting.emit(this.tempExisting);
  }

  businessDtMin: Date;
  async InitData() {
    this.parentForm.addControl("EmploymentEstablishmentDt", this.fb.control(''));
    this.parentForm.addControl("MrNationalityCode", this.fb.control(CommonConstant.NationalityCodeLocal));
    this.parentForm.addControl("WnaCountryCode", this.fb.control(''));
    this.parentForm.addControl("MrJobPositionCode", this.fb.control(''));
    this.parentForm.addControl("RefProfessionId", this.fb.control(0));
    this.parentForm.addControl("MrJobProfessionCode", this.fb.control(''));

    this.BindLookupProfession();
    this.BindLookupJobPosition();
    await this.BindLookupCountry();
    this.GetListRefCountry();

    let context: CurrentUserContext = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
    this.businessDtMin = new Date(context[CommonConstant.BUSINESS_DT]);
    this.businessDtMin.setDate(this.businessDtMin.getDate() - 1);
  }

  jobPositionLookupObj: InputLookupObj = new InputLookupObj();
  BindLookupJobPosition() {
    this.jobPositionLookupObj = new InputLookupObj();
    this.jobPositionLookupObj.isRequired = false;
    this.jobPositionLookupObj.urlJson = "./assets/uclookup/Customer/lookupJobPosition.json";
    this.jobPositionLookupObj.pagingJson = "./assets/uclookup/Customer/lookupJobPosition.json";
    this.jobPositionLookupObj.genericJson = "./assets/uclookup/Customer/lookupJobPosition.json";
  }

  professionLookUpObj: InputLookupObj = new InputLookupObj();
  BindLookupProfession() {
    this.professionLookUpObj = new InputLookupObj();
    this.professionLookUpObj.isRequired = false;
    this.professionLookUpObj.urlJson = "./assets/lookup/lookupCustomerProfession.json";
    this.professionLookUpObj.pagingJson = "./assets/lookup/lookupCustomerProfession.json";
    this.professionLookUpObj.genericJson = "./assets/lookup/lookupCustomerProfession.json";
    let listCriteriaObj: Array<CriteriaObj> = new Array();
    let criteriaCustObj = new CriteriaObj();
    criteriaCustObj.DataType = "text";
    criteriaCustObj.restriction = AdInsConstant.RestrictionEq;
    criteriaCustObj.propName = 'MR_CUST_MODEL_CODE';
    criteriaCustObj.value = "";
    listCriteriaObj.push(criteriaCustObj);
    this.professionLookUpObj.addCritInput = listCriteriaObj;
  }

  lookUpObjCountry: InputLookupObj = new InputLookupObj();
  async BindLookupCountry() {
    await this.http.post(URLConstant.GetGeneralSettingValueByCode, { Code: CommonConstant.GSCodeDefLocalNationality }).toPromise().then(
      (response: GeneralSettingObj) => {
        this.lookUpObjCountry = new InputLookupObj();
        this.lookUpObjCountry.urlJson = "./assets/lookup/lookupCustomerCountry.json";
        this.lookUpObjCountry.pagingJson = "./assets/lookup/lookupCustomerCountry.json";
        this.lookUpObjCountry.genericJson = "./assets/lookup/lookupCustomerCountry.json";
        this.lookUpObjCountry.isRequired = false;

        this.CountryCode = response.GsValue;
        let criteriaList = new Array();
        let criteriaObj = new CriteriaObj();
        criteriaObj.restriction = AdInsConstant.RestrictionNeq;
        criteriaObj.propName = 'COUNTRY_CODE';
        criteriaObj.value = response.GsValue;
        criteriaList.push(criteriaObj);
        this.lookUpObjCountry.addCritInput = criteriaList;

        this.GetRefCountry(response.GsValue, true);
      }
    );
  }

  CountryCode: string = "";
  CountryName: string = "";
  GetRefCountry(code: string, isLocal: boolean = false) {
    this.http.post(URLConstant.GetRefCountryByCountryCode, { Code: code }).subscribe(
      (response: RefCountry) => {
        if (isLocal) {
          this.CountryName = response.CountryName;
          this.IsLocal = true;
        }
        else {
          this.IsLocal = false;
          this.lookUpObjCountry.nameSelect = response.CountryName;
          this.lookUpObjCountry.jsonSelect = response;
        }
      }
    );
  }

  ListNationality: Array<RefMasterObj> = new Array();
  GetListRefCountry() {
    this.http.post(URLConstant.GetListActiveRefMasterByRefMasterTypeCode, { Code: CommonConstant.RefMasterTypeCodeNationality }).subscribe(
      (response) => {
        this.ListNationality = response["RefMasterObjs"];
      }
    );
  }

  async GetExistingJobData(custId: number = this.CustId) {
    if (custId == 0) return;
    await this.http.post(URLConstant.GetCustPersonalJobDataByCustId, { Id: custId }).toPromise().then(
      async (response: CustPersonalJobDataObj) => {
        if (!response.CustId) return;
        this.tempExisting.CustPersonalJob = response;
        let datePipe = new DatePipe("en-US");
        this.parentForm.patchValue({
          EmploymentEstablishmentDt: datePipe.transform(response.EmploymentEstablishmentDt, 'yyyy-MM-dd'),
          MrJobPositionCode: response.MrJobPositionCode,
          RefProfessionId: response.RefProfessionId,
        });
        let tempDesc: string = await this.PatchValueDesc(response.MrJobPositionCode, CommonConstant.RefMasterTypeCodeJobPosition);
        this.jobPositionLookupObj.nameSelect = tempDesc;
        this.jobPositionLookupObj.jsonSelect = { JobDesc: tempDesc };
        this.jobPositionLookupObj.isReady = true;
        if (!response.RefProfessionId) return;
        await this.http.post(URLConstant.GetRefProfessionByRefProfessionId, { Id: response.RefProfessionId }).subscribe(
          (response: RefProfessionObj) => {
            this.outputChange.emit({ Key: CommonConstant.CUST_CHANGE_PROFESSION, Code: response.ProfessionCode });
            this.professionLookUpObj.nameSelect = response.ProfessionName;
            this.professionLookUpObj.jsonSelect = response;
          });
      }
    )
  }

  PatchExistingPersonalData(tempData: CustPersonalObj) {
    this.parentForm.patchValue({
      WnaCountryCode: tempData.WnaCountryCode,
      MrNationalityCode: tempData.MrNationalityCode ? tempData.MrNationalityCode : "",
    });
    if (tempData.WnaCountryCode) this.GetRefCountry(tempData.WnaCountryCode, tempData.WnaCountryCode == CommonConstant.WnaCountryCodeIdn);
  }

  async PatchValueDesc(MasterCode: string, refMasterTypeCode: string) {
    let reqMasterObj: ReqRefMasterByTypeCodeAndMasterCodeObj = {
      MasterCode: MasterCode,
      RefMasterTypeCode: refMasterTypeCode
    };
    let tempDesc: string = "";
    await this.http.post(URLConstant.GetRefMasterByRefMasterTypeCodeAndMasterCode, reqMasterObj).toPromise().then(
      (response: RefMasterObj) => {
        tempDesc = response.Descr;
      }
    );
    return tempDesc;
  }

  getLookUpProfession(event: RefProfessionObj) {
    this.parentForm.patchValue({
      RefProfessionId: event.RefProfessionId,
    });
    this.outputChange.emit({ Key: CommonConstant.CUST_CHANGE_PROFESSION, Code: event.ProfessionCode });
  }

  getLookUpJobPosition(ev) {
    this.parentForm.patchValue({
      MrJobPositionCode: ev.JobCode,
    });
  }

  ResetLookupProfession(valueCode: string = null, valueDesc: string = "") {
    this.parentForm.patchValue({
      RefProfessionId: valueCode,
    });
    this.professionLookUpObj.nameSelect = valueDesc;
    this.professionLookUpObj.jsonSelect = { JobDesc: valueDesc };
    this.PatchCriteriaLookupProfession();
  }

  PatchCriteriaLookupProfession() {
    let tempCustModel: string = this.parentForm.get("MrCustModelCode").value;

    let listCriteriaObj: Array<CriteriaObj> = new Array();
    let criteriaCustObj = new CriteriaObj();
    criteriaCustObj.DataType = "text";
    criteriaCustObj.restriction = AdInsConstant.RestrictionEq;
    criteriaCustObj.propName = 'MR_CUST_MODEL_CODE';
    criteriaCustObj.value = tempCustModel;
    listCriteriaObj.push(criteriaCustObj);

    this.professionLookUpObj.addCritInput = listCriteriaObj;
    this.ucLookupProfession.setAddCritInput();
  }

  getLookUpCountry(ev) {
    this.parentForm.patchValue({
      WnaCountryCode: ev.CountryCode,
    });
  }

  changeCustModel() {
    this.ResetLookupProfession();
    this.outputChange.emit({ Key: CommonConstant.CUST_CHANGE_PROFESSION, Code: "" });
  }

  IsLocal: boolean = true;
  onOptionsSelected(event: { selectedIndex: number, selectedObj: KeyValueObj, selectedValue: string }) {
    if (event.selectedValue == CommonConstant.NationalityCodeLocal) {
      this.IsLocal = true;
      this.lookUpObjCountry.isRequired = false;
      this.parentForm.get("WnaCountryCode").patchValue(this.CountryCode);
    } else {
      this.IsLocal = false;
      let foreign = this.ListNationality.find(x => x.MasterCode == event.selectedValue);
      let setCountry = foreign.DefaultValue.split(';');
      let selectedValue = setCountry[1] ? setCountry[1] : setCountry[0];
      this.lookUpObjCountry.nameSelect = selectedValue;
      this.lookUpObjCountry.jsonSelect = { CountryName: selectedValue };
      this.parentForm.get("WnaCountryCode").patchValue(setCountry[0]);
      this.lookUpObjCountry.isRequired = true;
    }
  }
}
