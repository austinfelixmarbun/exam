import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CurrentUserContext } from 'app/shared/model/CurrentUserContext.model';
import { CustPersonalJobDataObj } from 'app/shared/model/CustPersonalJobDataObj.Model';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { UcDropdownListConstant, UcDropdownListObj } from 'app/shared/model/library/UcDropdownListObj.model';
import { CustCompanyMgmntShrholderObj } from 'app/shared/model/NewCust/CustCompanyMgmntShrholderObj.Model';
import { CustFormExistingObj as CustFormExistingObj } from 'app/shared/model/NewCust/Shareholder/ShareholderFormExistingObj.Model';
import { ReqRefMasterByTypeCodeAndMappingCodeObj } from 'app/shared/model/RefMaster/ReqRefMasterByTypeCodeAndMappingCodeObj.Model';
import { ReqRefMasterByTypeCodeAndMasterCodeObj } from 'app/shared/model/RefMaster/ReqRefMasterByTypeCodeAndMasterCodeObj.Model';
import { RefMasterObj } from 'app/shared/model/RefMasterObj.Model';
import { RefProfessionObj } from 'app/shared/model/RefProfessionObj.Model';
import { CookieService } from 'ngx-cookie';
import { NewCustSetData } from '../../NewCustSetData.Service';

@Component({
  selector: 'app-shareholder-form',
  templateUrl: './shareholder-form.component.html',
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class ShareholderFormComponent implements OnInit {

  @Input() CustId: number = 0;
  @Input() CustCompanyMgmntShrholderId: number = 0;
  @Input() CustType: string;
  @Input() enjiForm: NgForm;
  @Input() parentForm: FormGroup;
  @Output() outputExisting: EventEmitter<CustFormExistingObj> = new EventEmitter();
  @Output() outputChange: EventEmitter<string> = new EventEmitter();

  readonly CustTypePersonal: string = CommonConstant.CustomerPersonal;
  readonly CustTypeCoy: string = CommonConstant.CustomerCompany;

  readonly RefMasterTypeCodeCustModel: string = CommonConstant.RefMasterTypeCodeCustModel;

  constructor(private http: HttpClient, private fb: FormBuilder, private cookieService: CookieService) { }

  tempExisting: CustFormExistingObj = new CustFormExistingObj();
  async ngOnInit() {
    this.InitData();
    this.initDdlRefMaster(this.RefMasterTypeCodeCustModel, null, true);
    await this.GetExistingShareholder();
    await this.GetExistingJobData();
    this.jobPositionLookupObj.isReady = true;
    this.positionSlikLookUpObj.isReady = true;
    this.professionLookUpObj.isReady = true;
    this.outputExisting.emit(this.tempExisting);
  }

  positionSlikLookUpObj: InputLookupObj = new InputLookupObj();
  businessDtMin: Date;
  InitData() {
    this.parentForm.addControl("MrPositionSlikCode", this.fb.control(''));
    this.parentForm.addControl("SharePrcnt", this.fb.control(0));
    this.parentForm.get("SharePrcnt").setValidators([Validators.min(0), Validators.max(100)]);
    this.parentForm.get("SharePrcnt").updateValueAndValidity();
    this.parentForm.addControl("IsActive", this.fb.control(false));
    this.parentForm.addControl("IsOwner", this.fb.control(false));
    if (this.CustType == this.CustTypePersonal) {
      this.parentForm.addControl("MrJobPositionCode", this.fb.control(''));
      this.parentForm.addControl("IsSigner", this.fb.control(false));
      this.parentForm.addControl("EstablishmentDt", this.fb.control(''));
      this.parentForm.addControl("RefProfessionId", this.fb.control(0));
      this.parentForm.addControl("MrJobProfessionCode", this.fb.control(''));
      this.parentForm.addControl("MrCustModelCode", this.fb.control(''));
      this.parentForm.addControl("MobilePhnNo1", this.fb.control(''));
      this.parentForm.get("MobilePhnNo1").setValidators([Validators.pattern("^[0-9]+$")]);
      this.parentForm.get("MobilePhnNo1").updateValueAndValidity();
      this.parentForm.addControl("Email1", this.fb.control(''));
      this.parentForm.get("Email1").setValidators([Validators.pattern(CommonConstant.regexEmail)]);
      this.parentForm.get("Email1").updateValueAndValidity();
    }
    this.positionSlikLookUpObj = NewCustSetData.BindLookupPositionSlik();
    this.BindLookupProfession();
    this.BindLookupJobPosition();
    let context: CurrentUserContext = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
    this.businessDtMin = new Date(context[CommonConstant.BUSINESS_DT]);
    this.businessDtMin.setDate(this.businessDtMin.getDate() - 1);
  }

  DictUcDDLObj: { [id: string]: UcDropdownListObj } = {};
  initDdlRefMaster(refMasterTypeCode: string, mappingCode: string = null, isSelectOutput: boolean = false) {
    let tempDdlObj: UcDropdownListObj = new UcDropdownListObj();
    let ReqRefMasterObj: ReqRefMasterByTypeCodeAndMappingCodeObj = {
      RefMasterTypeCode: refMasterTypeCode,
      MappingCode: mappingCode
    }
    tempDdlObj.apiUrl = URLConstant.GetListActiveRefMaster;
    tempDdlObj.requestObj = ReqRefMasterObj;
    tempDdlObj.customObjName = CommonConstant.ReturnObj;
    tempDdlObj.ddlType = UcDropdownListConstant.DDL_TYPE_ONE;
    tempDdlObj.isSelectOutput = isSelectOutput;
    tempDdlObj.isReady = true;
    this.DictUcDDLObj[refMasterTypeCode] = tempDdlObj;
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
  }

  async GetExistingShareholder(custCompanyMgmntShrholderId: number = this.CustCompanyMgmntShrholderId) {
    if (custCompanyMgmntShrholderId == 0) return;
    await this.http.post(URLConstant.GetNewCustCompanyMgmntShrholderByCustCompanyMgmntShrholderId, { Id: custCompanyMgmntShrholderId }).toPromise().then(
      async (response: CustCompanyMgmntShrholderObj) => {
        this.parentForm.patchValue({
          MrPositionSlikCode: response.MrPositionSlikCode,
          SharePrcnt: response.SharePrcnt,
          IsActive: response.IsActive,
          IsOwner: response.IsOwner,
        });
        let tempDesc: string = await this.PatchValueDesc(response.MrPositionSlikCode, CommonConstant.RefMasterTypeCodePositionSlik);
        this.positionSlikLookUpObj.nameSelect = tempDesc;
        this.positionSlikLookUpObj.jsonSelect = { Jabatan: tempDesc };
        if (this.CustType == this.CustTypePersonal) {
          let datePipe = new DatePipe("en-US");
          this.parentForm.patchValue({
            IsSigner: response.IsSigner,
            EstablishmentDt: datePipe.transform(response.EstablishmentDt, 'yyyy-MM-dd'),
          });
        }
        this.tempExisting.CustCompanyMgmntShrholder = response;
      }
    )
  }

  async GetExistingJobData(custId: number = this.CustId) {
    if (this.CustType != this.CustTypePersonal || custId == 0) return;
    await this.http.post(URLConstant.GetCustPersonalJobDataByCustId, { Id: custId }).toPromise().then(
      async (response: CustPersonalJobDataObj) => {
        if (!response.CustId) return;
        this.tempExisting.CustPersonalJob = response;
        this.parentForm.patchValue({
          MrJobPositionCode: response.MrJobPositionCode,
          RefProfessionId: response.RefProfessionId,
        });
        let tempDesc: string = await this.PatchValueDesc(response.MrJobPositionCode, CommonConstant.RefMasterTypeCodeJobPosition);
        this.jobPositionLookupObj.nameSelect = tempDesc;
        this.jobPositionLookupObj.jsonSelect = { JobDesc: tempDesc };
        if (!response.RefProfessionId) return;
        await this.http.post(URLConstant.GetRefProfessionByRefProfessionId, { Id: response.RefProfessionId }).subscribe(
          (response: RefProfessionObj) => {
            this.professionLookUpObj.nameSelect = response.ProfessionName;
            this.professionLookUpObj.jsonSelect = response;
          });
      }
    )
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

  getLookUpSlik(ev: { Code: string, Jabatan: string }) {
    let tempMrPositionSlikCode = this.parentForm.get("MrPositionSlikCode");
    tempMrPositionSlikCode.patchValue(ev.Code);
  }

  getLookUpProfession(event) {
    this.parentForm.patchValue({
      RefProfessionId: event.RefProfessionId,
    });
    this.outputChange.emit(CommonConstant.CUST_CHANGE_PROFESSION);
  }

  changeCustModel() {
    this.ResetLookupProfession();
    this.outputChange.emit(CommonConstant.CUST_CHANGE_PROFESSION);
  }
  
  getLookUpJobPosition(ev) {
    this.parentForm.patchValue({
      MrJobPositionCode: ev.JobCode,
    });
  }
  
  ResetLookupProfession(valueCode: string = null, valueDesc: string = ""){
    this.parentForm.patchValue({
      RefProfessionId: valueCode,
    });
    this.professionLookUpObj.nameSelect = valueDesc;
    this.professionLookUpObj.jsonSelect = { JobDesc: valueDesc };
  }
}
