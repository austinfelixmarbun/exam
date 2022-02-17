import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { DuplicateCustObj } from 'app/shared/model/duplicate-cust.model';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { KeyValueObj } from 'app/shared/model/key-value/key-value-obj.model';
import { CustDuplicateObj } from 'app/shared/model/new-cust/cust-duplicate-obj.model';
import { DupCheckOutputSaveObj } from 'app/shared/model/new-cust/dup-check-output-save-obj.model';
import { NegCustDuplicateObj } from 'app/shared/model/new-cust/neg-cust-duplicate-obj.model';
import { ReqCoyObj } from 'app/shared/model/new-cust/req-coy-obj.model';
import { ReqDupObj } from 'app/shared/model/new-cust/req-dup-obj.model';
import { ReqNegDupObj } from 'app/shared/model/new-cust/req-neg-dup-obj.model';
import { ReqPersonalObj } from 'app/shared/model/new-cust/req-personal-obj.model';
import { ReqRefMasterByTypeCodeAndMappingCodeObj } from 'app/shared/model/ref-master/req-ref-master-by-type-code-and-mapping-code-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-new-cust-header',
  templateUrl: './new-cust-header.component.html',
})
export class NewCustHeaderComponent implements OnInit {
  //#region Readonly
  readonly CustDataModeFamily: string = CommonConstant.CustMainDataModeFamily;

  readonly CustTypePersonal: string = CommonConstant.CustomerPersonal;
  readonly CustTypeCoy: string = CommonConstant.CustomerCompany;
  readonly CustTypePublic: string = CommonConstant.CustomerPublic;

  readonly CustPageTypeHeader = CommonConstant.CustPageTypeHeader;
  readonly CustPageTypeDupCheck = CommonConstant.CustPageTypeDupCheck;
  //#endregion

  @Input() CustType: string = CommonConstant.CustomerPersonal;
  PageType: string = CommonConstant.CustPageTypeHeader;
  @Input() CustDataMode: string = CommonConstant.CustMainDataModeCust;
  subjectTitle: string = "Customer";
  From: string = "";
  @Input() CustId: number = 0;
  @Input() CustCompanyMgmntShrholderId: number = 0;
  @Input() CustPersonalFamilyId: number = 0;
  @Input() ParentCustId: number = 0;
  @Input() tempTotalSharePrct: number = 0;
  @Input() isMarried: boolean = false;
  @Input() listCustNoToExclude: Array<string> = new Array();
  @Output() outputCancel: EventEmitter<string> = new EventEmitter();

  constructor(
    private http: HttpClient, private router: Router, private route: ActivatedRoute, private toastr: NGXToastrService, private UrlConstantNew: UrlConstantNew) {
    this.route.queryParams.subscribe(params => {
      if (params["CustId"] != null) {
        this.CustId = params["CustId"];
      }
      if (params["CustType"] != null) {
        this.CustType = params["CustType"];
      }
      if (params["From"] != null) {
        this.From = params["From"];
      }
    });
  }

  async ngOnInit() {
    this.SetTitleLabel();
    await this.GetListCustType();
  }

  TitleLabel: string = "";
  SetTitleLabel() {
    let custLabel: string = "";
    switch (this.CustDataMode) {
      case CommonConstant.CustMainDataModeCust:
        custLabel = "Customer";
        break;
      case this.CustDataModeFamily:
        custLabel = "Family";
        break;
      case CommonConstant.CustMainDataModeMgmntShrholder:
        custLabel = "Shareholder";
        break;
    }

    this.TitleLabel = custLabel + " Main Data Registration";
  }

  listCustType: Array<KeyValueObj> = new Array();
  async GetListCustType() {
    let tempCode = this.CustDataMode == CommonConstant.CustMainDataModeMgmntShrholder ? CommonConstant.RefMasterTypeCodeShareholderCustType : CommonConstant.RefMasterTypeCodeCustType;
    let tempReq: ReqRefMasterByTypeCodeAndMappingCodeObj = { RefMasterTypeCode: tempCode, MappingCode: null };
    await this.http.post(this.UrlConstantNew.GetRefMasterListKeyValueActiveByCode, tempReq).toPromise().then(
      (response) => {
        this.listCustType = response[CommonConstant.ReturnObj];
      });
  }

  // ga kepake
  ChangeType() {
    console.log(this.CustType);
  }

  Cancel() {
    if (this.CustDataMode != CommonConstant.CustMainDataModeCust) {
      this.outputCancel.emit();
      return;
    }
    switch (this.From) {
      case CommonConstant.CustFromEditMainData:
        AdInsHelper.RedirectUrl(this.router, [NavigationConstant.CUST_EDIT_MAIN_DATA_PAGING], {});
        break;
      case CommonConstant.CustFromCustFamily:
        AdInsHelper.RedirectUrl(this.router, [NavigationConstant.CUST_FAMILY_PAGING], {});
        break;
      case CommonConstant.CustFromCustShareholder:
        AdInsHelper.RedirectUrl(this.router, [NavigationConstant.CUST_SHRHLDR_PAGING], {});
        break;
      case "CustGuarantor":
        AdInsHelper.RedirectUrl(this.router, [NavigationConstant.CUST_GUARANTOR_PAGING], {});
        break;
      default:
        AdInsHelper.RedirectUrl(this.router, [NavigationConstant.CUST_PAGING], {});
        break;
    }
  }

  CancelDupCheck() {
    this.PageType = this.CustPageTypeHeader;
  }

  //#region Save
  DupCheckPersonalObj: ReqPersonalObj = new ReqPersonalObj();
  ClickSavePersonal(ev: ReqPersonalObj) {
    if (ev.CustObj.CustId != 0) {
      this.http.post(this.SetUrlEditPersonal(), ev, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          this.toastr.successMessage(response["Message"]);
          this.redirectSaveEditMainData(ev.CustObj.CustId);
        }
      );
      return;
    }
    this.DupCheckPersonalObj = ev;
    this.GetDuplicateCust();
  }

  DupCheckCoyObj: ReqCoyObj = new ReqCoyObj();
  ClickSaveCoy(ev: ReqCoyObj) {
    if (ev.CustObj.CustId != 0) {
      this.http.post(this.SetUrlEditCoy(), ev, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          this.toastr.successMessage(response["Message"]);
          this.redirectSaveEditMainData(ev.CustObj.CustId);
        }
      );
      return;
    }
    this.DupCheckCoyObj = ev;
    this.GetDuplicateCust();
  }

  redirectSaveEditMainData(custId: number) {
    if (this.CustDataMode == CommonConstant.CustMainDataModeCust) {
      let param = { "IdCust": custId, Page: 'Edit', From: this.From };
      if (this.CustType == CommonConstant.CustTypePersonal) AdInsHelper.RedirectUrl(this.router, [NavigationConstant.CUST_PERSONAL_PAGE], param);
      if (this.CustType == CommonConstant.CustTypeCompany) AdInsHelper.RedirectUrl(this.router, [NavigationConstant.CUST_COY_PAGE], param);
      return;
    }
    this.Cancel();
  }

  ResultDuplicate: Array<CustDuplicateObj> = new Array();
  ResultDuplicateNegative: Array<NegCustDuplicateObj> = new Array();
  DuplicateStatus: string = "";
  GetDuplicateCust() {
    let DuplicateCustObj = this.SetDuplicateCustObj();
    this.http.post(this.UrlConstantNew.GetCustomerAndNegativeCustDuplicateCheck, DuplicateCustObj).subscribe(
      (response) => {
        this.DuplicateStatus = response[CommonConstant.Status];
        if (this.DuplicateStatus != null && this.DuplicateStatus != undefined) {
          this.ResultDuplicate = response[CommonConstant.ReturnObj]["CustDuplicate"] ? response[CommonConstant.ReturnObj]["CustDuplicate"] : new Array();
          this.ResultDuplicateNegative = response[CommonConstant.ReturnObj]["NegativeCustDuplicate"] ? response[CommonConstant.ReturnObj]["NegativeCustDuplicate"] : new Array();
          this.PageType = this.CustPageTypeDupCheck;
        } else {
          this.SaveForm();
        }
      });
  }

  SetDuplicateCustObj(): DuplicateCustObj {
    let duplicateCustObj = new DuplicateCustObj();
    if (this.CustType == this.CustTypePersonal) {
      duplicateCustObj.CustName = this.DupCheckPersonalObj.CustObj.CustName;
      duplicateCustObj.MrCustTypeCode = this.CustTypePersonal;
      duplicateCustObj.IdNo = this.DupCheckPersonalObj.CustObj.IdNo;
      duplicateCustObj.TaxIdNo = this.DupCheckPersonalObj.CustObj.TaxIdNo;
      duplicateCustObj.MotherMaidenName = this.DupCheckPersonalObj.CustPersonalObj.MotherMaidenName;
      duplicateCustObj.BirthDt = this.DupCheckPersonalObj.CustPersonalObj.BirthDt;
      return duplicateCustObj;
    }

    duplicateCustObj.CustName = this.DupCheckCoyObj.CustObj.CustName;
    duplicateCustObj.MrCustTypeCode = this.CustTypeCoy;
    duplicateCustObj.TaxIdNo = this.DupCheckCoyObj.CustObj.TaxIdNo;
    return duplicateCustObj;
  }

  SaveForm() {
    if (this.CustType == this.CustTypePersonal) {
      this.SavePersonalData();
      return;
    }
    this.SaveCoyData();
  }

  SaveCoyData() {
    let urlAdd: string = this.SetUrlAddCoy();
    this.http.post(urlAdd, this.DupCheckCoyObj, AdInsConstant.SpinnerOptions).subscribe(
      (response: GenericObj) => {
        this.redirectSaveEditMainData(response.Id);
      }
    );
  }

  SavePersonalData() {
    let urlAdd: string = this.SetUrlAddPersonal();
    this.http.post(urlAdd, this.DupCheckPersonalObj, AdInsConstant.SpinnerOptions).subscribe(
      (response: GenericObj) => {
        this.redirectSaveEditMainData(response.Id);
      }
    );
  }

  SetUrlAddCoy(): string {
    let urlAdd: string = "";
    if(environment.isCore){
      switch (this.CustDataMode) {
        case CommonConstant.CustMainDataModeCust:
          urlAdd = this.UrlConstantNew.AddCustCompanyMainDataV2;
          break;
        case CommonConstant.CustMainDataModeMgmntShrholder:
          urlAdd = this.UrlConstantNew.SaveCustCompanyShareholderMainDataV2;
          break;
      }
    }else{
      switch (this.CustDataMode) {
        case CommonConstant.CustMainDataModeCust:
          urlAdd = this.UrlConstantNew.AddCustCompanyMainData;
          break;
        case CommonConstant.CustMainDataModeMgmntShrholder:
          urlAdd = this.UrlConstantNew.SaveCustCompanyShareholderMainData;
          break;
      }
    }
    return urlAdd;
  }
  SetUrlEditCoy(): string {
    let urlAdd: string = "";
    if(environment.isCore){
      switch (this.CustDataMode) {
        case CommonConstant.CustMainDataModeCust:
          urlAdd = this.UrlConstantNew.EditCustCompanyMainDataV2;
          break;
        case CommonConstant.CustMainDataModeMgmntShrholder:
          urlAdd = this.UrlConstantNew.SaveCustCompanyShareholderMainDataV2;
          break;
      }
    }else{
      switch (this.CustDataMode) {
        case CommonConstant.CustMainDataModeCust:
          urlAdd = this.UrlConstantNew.EditCustCompanyMainData;
          break;
        case CommonConstant.CustMainDataModeMgmntShrholder:
          urlAdd = this.UrlConstantNew.SaveCustCompanyShareholderMainData;
          break;
      }
    }
    return urlAdd;
  }

  SetUrlAddPersonal(): string {
    let urlAdd: string = "";
    if(environment.isCore){
      switch (this.CustDataMode) {
        case CommonConstant.CustMainDataModeCust:
          urlAdd = this.UrlConstantNew.AddCustPersonalMainDataV2;
          break;
        case this.CustDataModeFamily:
          urlAdd = this.UrlConstantNew.SaveCustPersonalFamilyMainDataV2;
          break;
        case CommonConstant.CustMainDataModeMgmntShrholder:
          urlAdd = this.UrlConstantNew.SaveCustPersonalShareholderMainDataV2;
          break;
      }
    }else{
      switch (this.CustDataMode) {
        case CommonConstant.CustMainDataModeCust:
          urlAdd = this.UrlConstantNew.AddCustPersonalMainData;
          break;
        case this.CustDataModeFamily:
          urlAdd = this.UrlConstantNew.SaveCustPersonalFamilyMainData;
          break;
        case CommonConstant.CustMainDataModeMgmntShrholder:
          urlAdd = this.UrlConstantNew.SaveCustPersonalShareholderMainData;
          break;
      }
    }
    return urlAdd;
  }

  SetUrlEditPersonal(): string {
    let urlAdd: string = "";
    if(environment.isCore){
      switch (this.CustDataMode) {
        case CommonConstant.CustMainDataModeCust:
          urlAdd = this.UrlConstantNew.EditCustPersonalMainDataV2;
          break;
        case this.CustDataModeFamily:
          urlAdd = this.UrlConstantNew.SaveCustPersonalFamilyMainDataV2;
          break;
        case CommonConstant.CustMainDataModeMgmntShrholder:
          urlAdd = this.UrlConstantNew.SaveCustPersonalShareholderMainDataV2;
          break;
      }
    }else{
      switch (this.CustDataMode) {
        case CommonConstant.CustMainDataModeCust:
          urlAdd = this.UrlConstantNew.EditCustPersonalMainData;
          break;
        case this.CustDataModeFamily:
          urlAdd = this.UrlConstantNew.SaveCustPersonalFamilyMainData;
          break;
        case CommonConstant.CustMainDataModeMgmntShrholder:
          urlAdd = this.UrlConstantNew.SaveCustPersonalShareholderMainData;
          break;
      }
    }
    
    return urlAdd;
  }
  //#endregion

  //#region Save Duplicate
  EditCust(item: CustDuplicateObj) {
    if (this.CustType == this.CustTypePersonal) {
      this.EditCustPersonal(item);
      return;
    }
    this.EditCustCoy(item);
  }

  EditCustPersonal(item: CustDuplicateObj) {
    let reqEditDupCheck: ReqDupObj = new ReqDupObj();
    reqEditDupCheck.CustNo = item.CustNo;
    reqEditDupCheck.CustDataMode = this.CustDataMode;
    reqEditDupCheck.ThirdPartyTrxNo = this.DupCheckPersonalObj.CustObj.ThirdPartyTrxNo;

    if (this.CustDataMode == this.CustDataModeFamily) {
      reqEditDupCheck.CustPersonalFamilyObj = this.DupCheckPersonalObj.CustPersonalFamilyObj;
    }
    if (this.CustDataMode == CommonConstant.CustMainDataModeMgmntShrholder) {
      reqEditDupCheck.CustCompanyMgmntShrholderObj = this.DupCheckPersonalObj.CustCompanyMgmntShrholderObj;
    }
    reqEditDupCheck.CustPersonalJobObj = this.DupCheckPersonalObj.CustPersonalJobObj;
    reqEditDupCheck.CustAttrContentObjs = this.DupCheckPersonalObj.CustAttrContentObjs;
    reqEditDupCheck.CustDocFileObjs = this.DupCheckPersonalObj.CustDocFileObjs;
    if(environment.isCore){
      this.http.post(this.UrlConstantNew.NewEditDuplicateCustV2, reqEditDupCheck, AdInsConstant.SpinnerOptions).subscribe(
        (response: GenericObj) => {
          this.redirectSaveEditMainData(response.Id);
        }
      );
    }else{
      this.http.post(this.UrlConstantNew.NewEditDuplicateCust, reqEditDupCheck, AdInsConstant.SpinnerOptions).subscribe(
        (response: GenericObj) => {
          this.redirectSaveEditMainData(response.Id);
        }
      );
    }
  }

  EditCustCoy(item: CustDuplicateObj) {
    let reqEditDupCheck: ReqDupObj = new ReqDupObj();
    reqEditDupCheck.CustNo = item.CustNo;
    reqEditDupCheck.CustDataMode = this.CustDataMode;
    reqEditDupCheck.ThirdPartyTrxNo = this.DupCheckCoyObj.CustObj.ThirdPartyTrxNo;

    if (this.CustDataMode == CommonConstant.CustMainDataModeMgmntShrholder) {
      reqEditDupCheck.CustCompanyMgmntShrholderObj = this.DupCheckCoyObj.CustCompanyMgmntShrholderObj;
    }
    reqEditDupCheck.CustDocFileObjs = this.DupCheckCoyObj.CustDocFileObjs;

    if(environment.isCore){
      this.http.post(this.UrlConstantNew.NewEditDuplicateCustV2, reqEditDupCheck, AdInsConstant.SpinnerOptions).subscribe(
        (response: GenericObj) => {
          this.redirectSaveEditMainData(response.Id);
        }
      );
    }else{
      this.http.post(this.UrlConstantNew.NewEditDuplicateCust, reqEditDupCheck, AdInsConstant.SpinnerOptions).subscribe(
        (response: GenericObj) => {
          this.redirectSaveEditMainData(response.Id);
        }
      );
    }
  }

  EditNegativeCust(item: NegCustDuplicateObj) {
    if (this.CustType == this.CustTypePersonal) {
      this.EditNegativeCustPersonal(item);
      return;
    }
    this.EditNegativeCustCoy(item);
  }

  EditNegativeCustPersonal(item: NegCustDuplicateObj) {
    let NegativeCustObj: ReqNegDupObj = new ReqNegDupObj();
    NegativeCustObj.NegativeCustId = item.NegativeCustId;
    NegativeCustObj.CustDataMode = this.CustDataMode;
    NegativeCustObj.ThirdPartyTrxNo = this.DupCheckPersonalObj.CustObj.ThirdPartyTrxNo;

    if (this.CustDataMode == this.CustDataModeFamily) {
      NegativeCustObj.CustPersonalFamilyObj = this.DupCheckPersonalObj.CustPersonalFamilyObj;
    }
    if (this.CustDataMode == CommonConstant.CustMainDataModeMgmntShrholder) {
      NegativeCustObj.CustCompanyMgmntShrholderObj = this.DupCheckPersonalObj.CustCompanyMgmntShrholderObj;
    }
    NegativeCustObj.CustPersonalJobObj = this.DupCheckPersonalObj.CustPersonalJobObj;
    NegativeCustObj.CustAttrContentObjs = this.DupCheckPersonalObj.CustAttrContentObjs;
    NegativeCustObj.CustDocFileObjs = this.DupCheckPersonalObj.CustDocFileObjs;

    if(environment.isCore){
      this.http.post<GenericObj>(this.UrlConstantNew.EditDuplicateNegativeCustV2, NegativeCustObj, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          this.redirectSaveEditMainData(response.Id);
        }
      );
    }else{
      this.http.post<GenericObj>(this.UrlConstantNew.EditDuplicateNegativeCust, NegativeCustObj, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          this.redirectSaveEditMainData(response.Id);
        }
      );
    }
  }

  EditNegativeCustCoy(item: NegCustDuplicateObj) {
    let NegativeCustObj: ReqNegDupObj = new ReqNegDupObj();
    NegativeCustObj.NegativeCustId = item.NegativeCustId;
    NegativeCustObj.CustDataMode = this.CustDataMode;
    NegativeCustObj.MrCompanyTypeCode = this.DupCheckCoyObj.CustCompanyObj.MrCompanyTypeCode;
    NegativeCustObj.ThirdPartyTrxNo = this.DupCheckCoyObj.CustObj.ThirdPartyTrxNo;
    NegativeCustObj.CustDocFileObjs = this.DupCheckCoyObj.CustDocFileObjs;

    if (this.CustDataMode == CommonConstant.CustMainDataModeMgmntShrholder) {
      NegativeCustObj.CustCompanyMgmntShrholderObj = this.DupCheckCoyObj.CustCompanyMgmntShrholderObj;
    }

    if(environment.isCore){
      this.http.post<GenericObj>(this.UrlConstantNew.EditDuplicateNegativeCustV2, NegativeCustObj).subscribe(
        (response) => {
          this.redirectSaveEditMainData(response.Id);
        }
      );
    }else{
      this.http.post<GenericObj>(this.UrlConstantNew.EditDuplicateNegativeCust, NegativeCustObj).subscribe(
        (response) => {
          this.redirectSaveEditMainData(response.Id);
        }
      );
    }
  }

  //#endregion

  SaveAfterDupcek(ev: DupCheckOutputSaveObj) {
    switch (ev.Key) {
      case DupCheckOutputSaveObj.KeyEditSave:
        this.SaveForm();
        break;
      case DupCheckOutputSaveObj.KeyEditSaveDup:
        this.EditCust(ev.DuplicateObj);
        break;
      case DupCheckOutputSaveObj.KeyEditSaveDupNeg:
        this.EditNegativeCust(ev.DuplicateNegativeObj);
        break;
    }
  }
}
