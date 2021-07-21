import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { DuplicateCustObj } from 'app/shared/model/DuplicateCust.Model';
import { GenericObj } from 'app/shared/model/Generic/GenericObj.Model';
import { KeyValueObj } from 'app/shared/model/KeyValue/KeyValueObj.Model';
import { CustDuplicateObj } from 'app/shared/model/NewCust/CustDuplicateObj.Model';
import { DupCheckOutputSaveObj } from 'app/shared/model/NewCust/DupCheckOutputSaveObj.Model';
import { NegCustDuplicateObj } from 'app/shared/model/NewCust/NegCustDuplicateObj.Model';
import { ReqCoyObj } from 'app/shared/model/NewCust/ReqCoyObj.Model';
import { ReqDupObj } from 'app/shared/model/NewCust/ReqDupObj.Model';
import { ReqNegDupObj } from 'app/shared/model/NewCust/ReqNegDupObj.Model';
import { ReqPersonalObj } from 'app/shared/model/NewCust/ReqPersonalObj.Model';
import { ReqRefMasterByTypeCodeAndMappingCodeObj } from 'app/shared/model/RefMaster/ReqRefMasterByTypeCodeAndMappingCodeObj.Model';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-new-cust-header',
  templateUrl: './new-cust-header.component.html',
})
export class NewCustHeaderComponent implements OnInit {
  //#region Readonly
  readonly CustDataModeMain: string = CommonConstant.CustMainDataModeCust;
  readonly CustDataModeFamily: string = CommonConstant.CustMainDataModeFamily;
  readonly CustDataModeShareholder: string = CommonConstant.CustMainDataModeMgmntShrholder;

  readonly CustTypePersonal: string = CommonConstant.CustomerPersonal;
  readonly CustTypeCoy: string = CommonConstant.CustomerCompany;
  readonly CustTypePublic: string = CommonConstant.CustomerPublic;

  readonly CustPageTypeHeader = CommonConstant.CustPageTypeHeader;
  readonly CustPageTypeDupCheck = CommonConstant.CustPageTypeDupCheck;
  readonly CustPageTypePaging = CommonConstant.CustPageTypePaging;
  readonly MasterCustType = CommonConstant.RefMasterTypeCodeCustType;
  readonly MasterShareholderCustType = CommonConstant.RefMasterTypeCodeShareholderCustType;
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
    private http: HttpClient, private router: Router, private route: ActivatedRoute, private toastr: NGXToastrService) {
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
    this.SetCustTypeUsed();
    await this.GetListActiveRefMaster(this.refMasterCustTypeUsed);
  }

  refMasterCustTypeUsed: string = "";
  SetCustTypeUsed() {
    this.refMasterCustTypeUsed = this.CustDataMode == this.CustDataModeShareholder ? this.MasterShareholderCustType : this.MasterCustType;
  }

  DictRefMaster: { [id: string]: Array<KeyValueObj> } = {};
  async GetListActiveRefMaster(RefMasterTypeCode: string) {
    let tempReq: ReqRefMasterByTypeCodeAndMappingCodeObj = { RefMasterTypeCode: RefMasterTypeCode, MappingCode: null };
    await this.http.post(URLConstant.GetRefMasterListKeyValueActiveByCode, tempReq).toPromise().then(
      (response) => {
        this.DictRefMaster[RefMasterTypeCode] = response[CommonConstant.ReturnObj];
      });
  }

  ChangeType() {
    console.log(this.CustType);
  }

  Cancel() {
    if (this.CustDataMode != this.CustDataModeMain) {
      this.outputCancel.emit();
      return;
    }
    switch (this.From) {
      case "EditMainData":
        AdInsHelper.RedirectUrl(this.router, [NavigationConstant.CUST_EDIT_MAIN_DATA_PAGING], {});
        break;
      case "CustFamily":
        AdInsHelper.RedirectUrl(this.router, [NavigationConstant.CUST_FAMILY_PAGING], {});
        break;
      case "CustShareholder":
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
      this.http.post(this.SetUrlEditPersonal(), ev).subscribe(
        (response) => {
          this.toastr.successMessage(response["Message"]);
          this.Cancel()
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
      this.http.post(this.SetUrlAddCoy(), ev).subscribe(
        (response) => {
          this.toastr.successMessage(response["Message"]);
          this.Cancel()
        }
      );
      return;
    }
    this.DupCheckCoyObj = ev;
    this.GetDuplicateCust();
  }

  ResultDuplicate: Array<CustDuplicateObj> = new Array();
  ResultDuplicateNegative: Array<NegCustDuplicateObj> = new Array();
  DuplicateStatus: string = "";
  GetDuplicateCust() {
    let DuplicateCustObj = this.SetDuplicateCustObj();
    this.http.post(URLConstant.GetCustomerAndNegativeCustDuplicateCheck, DuplicateCustObj).subscribe(
      (response) => {
        this.DuplicateStatus = response["Status"];
        if (this.DuplicateStatus != null && this.DuplicateStatus != undefined) {
          // console.log(response);
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
    this.http.post(urlAdd, this.DupCheckCoyObj).subscribe(
      (response: GenericObj) => {
        if (this.CustDataMode == this.CustDataModeMain) {
          AdInsHelper.RedirectUrl(this.router, [NavigationConstant.CUST_COY_PAGE], { IdCust: response.Id });
          return;
        }
        this.outputCancel.emit("");
      }
    );
  }

  SavePersonalData() {
    let urlAdd: string = this.SetUrlAddPersonal();
    this.http.post(urlAdd, this.DupCheckPersonalObj).subscribe(
      (response: GenericObj) => {
        if (this.CustDataMode == this.CustDataModeMain) {
          AdInsHelper.RedirectUrl(this.router, [NavigationConstant.CUST_PERSONAL_PAGE], { IdCust: response.Id });
          return;
        }
        this.outputCancel.emit("");
      }
    );
  }

  SetUrlAddCoy(): string {
    let urlAdd: string = "";
    switch (this.CustDataMode) {
      case this.CustDataModeMain:
        urlAdd = URLConstant.AddCustCompanyMainData;
        break;
      case this.CustDataModeShareholder:
        urlAdd = URLConstant.SaveCustCompanyShareholderMainData;
        break;
    }
    return urlAdd;
  }
  SetUrlEditCoy(): string {
    let urlAdd: string = "";
    switch (this.CustDataMode) {
      case this.CustDataModeMain:
        urlAdd = URLConstant.EditCustCompanyMainData;
        break;
      case this.CustDataModeShareholder:
        urlAdd = URLConstant.SaveCustCompanyShareholderMainData;
        break;
    }
    return urlAdd;
  }

  SetUrlAddPersonal(): string {
    let urlAdd: string = "";
    switch (this.CustDataMode) {
      case this.CustDataModeMain:
        urlAdd = URLConstant.AddCustPersonalMainData;
        break;
      case this.CustDataModeFamily:
        urlAdd = URLConstant.SaveCustPersonalFamilyMainData;
        break;
      case this.CustDataModeShareholder:
        urlAdd = URLConstant.SaveCustPersonalShareholderMainData;
        break;
    }
    return urlAdd;
  }

  SetUrlEditPersonal(): string {
    let urlAdd: string = "";
    switch (this.CustDataMode) {
      case this.CustDataModeMain:
        urlAdd = URLConstant.EditCustPersonalMainData;
        break;
      case this.CustDataModeFamily:
        urlAdd = URLConstant.SaveCustPersonalFamilyMainData;
        break;
      case this.CustDataModeShareholder:
        urlAdd = URLConstant.SaveCustPersonalShareholderMainData;
        break;
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

    if (this.CustDataMode == this.CustDataModeFamily) {
      reqEditDupCheck.CustPersonalFamilyObj = this.DupCheckPersonalObj.CustPersonalFamilyObj;
    }
    if (this.CustDataMode == this.CustDataModeShareholder) {
      reqEditDupCheck.CustCompanyMgmntShrholderObj = this.DupCheckPersonalObj.CustCompanyMgmntShrholderObj;
    }
    reqEditDupCheck.CustPersonalJobObj = this.DupCheckPersonalObj.CustPersonalJobObj;
    reqEditDupCheck.CustAttrContentObjs = this.DupCheckPersonalObj.CustAttrContentObjs;
    this.http.post(URLConstant.NewEditDuplicateCust, reqEditDupCheck).subscribe(
      (response: GenericObj) => {
        if (this.CustDataMode == this.CustDataModeMain) {
          AdInsHelper.RedirectUrl(this.router, [NavigationConstant.CUST_PERSONAL_PAGE], { "IdCust": response.Id });
          return;
        }
        this.outputCancel.emit("");
      }
    );
  }

  EditCustCoy(item: CustDuplicateObj) {
    let reqEditDupCheck: ReqDupObj = new ReqDupObj();
    reqEditDupCheck.CustNo = item.CustNo;
    reqEditDupCheck.CustDataMode = this.CustDataMode;

    if (this.CustDataMode == this.CustDataModeShareholder) {
      reqEditDupCheck.CustCompanyMgmntShrholderObj = this.DupCheckCoyObj.CustCompanyMgmntShrholderObj;
    }
    this.http.post(URLConstant.NewEditDuplicateCust, reqEditDupCheck).subscribe(
      (response: GenericObj) => {
        if (this.CustDataMode == this.CustDataModeMain) {
          AdInsHelper.RedirectUrl(this.router, [NavigationConstant.CUST_PERSONAL_PAGE], { "IdCust": response.Id });
          return;
        }
        this.outputCancel.emit("");
      }
    );
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

    if (this.CustDataMode == this.CustDataModeFamily) {
      NegativeCustObj.CustPersonalFamilyObj = this.DupCheckPersonalObj.CustPersonalFamilyObj;
    }
    if (this.CustDataMode == this.CustDataModeShareholder) {
      NegativeCustObj.CustCompanyMgmntShrholderObj = this.DupCheckPersonalObj.CustCompanyMgmntShrholderObj;
    }
    NegativeCustObj.CustPersonalJobObj = this.DupCheckPersonalObj.CustPersonalJobObj;
    NegativeCustObj.CustAttrContentObjs = this.DupCheckPersonalObj.CustAttrContentObjs;
    this.http.post<GenericObj>(URLConstant.EditDuplicateNegativeCust, NegativeCustObj).subscribe(
      (response) => {
        if (this.CustDataMode == this.CustDataModeMain) {
          AdInsHelper.RedirectUrl(this.router, [NavigationConstant.CUST_PERSONAL_PAGE], { "IdCust": response.Id });
          return;
        }
        this.outputCancel.emit("");
      }
    );
  }

  EditNegativeCustCoy(item: NegCustDuplicateObj) {
    let NegativeCustObj: ReqNegDupObj = new ReqNegDupObj();
    NegativeCustObj.NegativeCustId = item.NegativeCustId;
    NegativeCustObj.CustDataMode = this.CustDataMode;
    NegativeCustObj.MrCompanyTypeCode = this.DupCheckCoyObj.CustCompanyObj.MrCompanyTypeCode;

    if (this.CustDataMode == this.CustDataModeShareholder) {
      NegativeCustObj.CustCompanyMgmntShrholderObj = this.DupCheckCoyObj.CustCompanyMgmntShrholderObj;
    }
    this.http.post<GenericObj>(URLConstant.EditDuplicateNegativeCust, NegativeCustObj).subscribe(
      (response) => {
        if (this.CustDataMode == this.CustDataModeMain) {
          AdInsHelper.RedirectUrl(this.router, [NavigationConstant.CUST_PERSONAL_PAGE], { "IdCust": response.Id });
          return;
        }
        this.outputCancel.emit("");
      }
    );
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
