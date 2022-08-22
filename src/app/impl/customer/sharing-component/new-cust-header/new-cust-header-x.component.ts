import {HttpClient} from '@angular/common/http';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NGXToastrService} from 'app/components/extra/toastr/toastr.service';
import {URLConstantX} from 'app/impl/shared/constant/URLConstantX';
import {AdInsHelper} from 'app/shared/AdInsHelper';
import {CommonConstant} from 'app/shared/constant/CommonConstant';
import {URLConstant} from 'app/shared/constant/URLConstant';
import {NavigationConstant} from 'app/shared/NavigationConstant';
import {environment} from 'environments/environment';
import {KeyValueObj} from 'app/shared/model/key-value/key-value-obj.model';
import {ReqRefMasterByTypeCodeAndMappingCodeObj} from 'app/shared/model/ref-master/req-ref-master-by-type-code-and-mapping-code-obj.model';
import {ReqCoyObj} from 'app/shared/model/new-cust/req-coy-obj.model';
import {ReqPersonalObj} from 'app/shared/model/new-cust/req-personal-obj.model';
import {CustDuplicateObj} from 'app/shared/model/new-cust/cust-duplicate-obj.model';
import {NegCustDuplicateObj} from 'app/shared/model/new-cust/neg-cust-duplicate-obj.model';
import {DuplicateCustObj} from 'app/shared/model/duplicate-cust.model';
import {ReqDupObj} from 'app/shared/model/new-cust/req-dup-obj.model';
import {GenericObj} from 'app/shared/model/Generic/generic-obj.model';
import {ReqNegDupObj} from 'app/shared/model/new-cust/req-neg-dup-obj.model';
import {DupCheckOutputSaveObj} from 'app/shared/model/new-cust/dup-check-output-save-obj.model';
import { CustDocFileObj } from 'app/shared/model/cust-doc-file/cust-doc-file-obj.model';
import { CookieService } from 'ngx-cookie';
import { NgxSpinnerService } from 'ngx-spinner';
import { ReqAddEditCustCompanyXObj } from 'app/shared/model/new-cust/req-add-edit-cust-company-x-obj.model';

@Component({
  selector: 'app-new-cust-header-x',
  templateUrl: './new-cust-header-x.component.html'
})
export class NewCustHeaderXComponent implements OnInit {
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
  @Input() isFamily: boolean = false;
  @Input() isShareholder: boolean =false;

  AddEditCustCompanyXObj: ReqAddEditCustCompanyXObj = new ReqAddEditCustCompanyXObj();

  constructor(
    private cookieService: CookieService, private spinner: NgxSpinnerService,
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

        //START Issue Non Jira X, Udin: perbaikan jika  halaman dibuka dari menu "CUSTOMER FAMILY" atau "CUSTOMER SHAREHOLDER"
        if(this.From == CommonConstant.CustFromCustShareholder)
        {
          this.isShareholder = true;
          //this.CustDataMode = CommonConstant.CustMainDataModeMgmntShrholder;
        }
        else if(this.From == CommonConstant.CustFromCustFamily) {
          this.isFamily = true;
          //this.CustDataMode = CommonConstant.CustMainDataModeFamily;
        }
        //END Issue Non Jira X, Udin
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
    await this.http.post(URLConstant.GetRefMasterListKeyValueActiveByCode, tempReq).toPromise().then(
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
  async ClickSavePersonal(ev: ReqPersonalObj) {
    if (ev.CustObj.CustId != 0) {
      var reqPayload = this.separateFileUpload(ev);
      var resSave;
      await this.http.post(this.SetUrlEditPersonal(), reqPayload.forApi).toPromise().then(
        (response) => {
          resSave = response;
        }
      );
      this.uploadDocFileMultipart(reqPayload.forUpload, resSave["Message"], ev.CustObj.CustId)
      return;
    }
    this.DupCheckPersonalObj = ev;
    this.GetDuplicateCust();
  }

  DupCheckCoyObj: ReqCoyObj = new ReqCoyObj();
  async ClickSaveCoy(ev: ReqCoyObj) {
    if (ev.CustObj.CustId != 0) {
      var reqPayload = this.separateFileUpload(ev);
      var result: any;
      var resSave;
      await this.http.post(this.SetUrlEditCoy(), reqPayload.forApi).toPromise().then(
        (response) => {
          resSave = response;
        }
      );

      this.AddEditCustCompanyXObj.CustId = reqPayload.forApi.CustObj.CustId;
      this.AddEditCustCompanyXObj.IsForeigner = reqPayload.forApi.IsForeigner;

      await this.http.post(URLConstantX.AddEditDataIsForeignerCustCompanyX, this.AddEditCustCompanyXObj).toPromise().then(
        (response) => {
          result = response;
        }
      );
      this.uploadDocFileMultipart(reqPayload.forUpload, resSave["Message"], ev.CustObj.CustId)
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
    this.http.post(URLConstant.GetCustomerAndNegativeCustDuplicateCheck, DuplicateCustObj).subscribe(
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

  async SaveCoyData() {
    let urlAdd: string = this.SetUrlAddCoy();
    var reqPayload = this.separateFileUpload(this.DupCheckCoyObj);
    var resSave: GenericObj;
    var result: any;
    await this.http.post(urlAdd, reqPayload.forApi).toPromise().then(
      (response: GenericObj) => {
        resSave = response;
      }
    );

    this.AddEditCustCompanyXObj.CustId = resSave.Id;
    this.AddEditCustCompanyXObj.IsForeigner = reqPayload.forApi.IsForeigner;

    await this.http.post(URLConstantX.AddEditDataIsForeignerCustCompanyX, this.AddEditCustCompanyXObj).toPromise().then(
      (response) => {
        result = response;
      }
    );
    this.uploadDocFileMultipart(reqPayload.forUpload, resSave["Message"], resSave.Id)
  }

  async SavePersonalData() {
    let urlAdd: string = this.SetUrlAddPersonal();
    var reqPayload = this.separateFileUpload(this.DupCheckPersonalObj);
    var resSave: GenericObj;
    await this.http.post(urlAdd, reqPayload.forApi).toPromise().then(
      (response: GenericObj) => {
        resSave = response
      }
    );
    this.uploadDocFileMultipart(reqPayload.forUpload, resSave["Message"], resSave.Id)
  }

  SetUrlAddCoy(): string {
    let urlAdd: string = "";
    if(environment.isCore){
      switch (this.CustDataMode) {
        case CommonConstant.CustMainDataModeCust:
          urlAdd = URLConstant.AddCustCompanyMainDataV2;
          break;
        case CommonConstant.CustMainDataModeMgmntShrholder:
          urlAdd = URLConstantX.SaveCustCompanyShareholderMainDataV2;
          break;
      }
    }else{
      switch (this.CustDataMode) {
        case CommonConstant.CustMainDataModeCust:
          urlAdd = URLConstant.AddCustCompanyMainData;
          break;
        case CommonConstant.CustMainDataModeMgmntShrholder:
          urlAdd = URLConstant.SaveCustCompanyShareholderMainData;
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
          urlAdd = URLConstant.EditCustCompanyMainDataV2;
          break;
        case CommonConstant.CustMainDataModeMgmntShrholder:
          urlAdd = URLConstantX.SaveCustCompanyShareholderMainDataV2;
          break;
      }
    }else{
      switch (this.CustDataMode) {
        case CommonConstant.CustMainDataModeCust:
          urlAdd = URLConstant.EditCustCompanyMainData;
          break;
        case CommonConstant.CustMainDataModeMgmntShrholder:
          urlAdd = URLConstant.SaveCustCompanyShareholderMainData;
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
          urlAdd = URLConstantX.AddCustPersonalMainDataXV2;
          break;
        case this.CustDataModeFamily:
          urlAdd = URLConstant.SaveCustPersonalFamilyMainDataV2;
          break;
        case CommonConstant.CustMainDataModeMgmntShrholder:
          urlAdd = URLConstant.SaveCustPersonalShareholderMainDataV2;
          break;
      }
    }else{
      switch (this.CustDataMode) {
        case CommonConstant.CustMainDataModeCust:
          urlAdd = URLConstantX.AddCustPersonalMainDataX;
          break;
        case this.CustDataModeFamily:
          urlAdd = URLConstant.SaveCustPersonalFamilyMainData;
          break;
        case CommonConstant.CustMainDataModeMgmntShrholder:
          urlAdd = URLConstant.SaveCustPersonalShareholderMainData;
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
          urlAdd = URLConstantX.EditCustPersonalMainDataXV2;
          break;
        case this.CustDataModeFamily:
          urlAdd = URLConstant.SaveCustPersonalFamilyMainDataV2;
          break;
        case CommonConstant.CustMainDataModeMgmntShrholder:
          urlAdd = URLConstant.SaveCustPersonalShareholderMainDataV2;
          break;
      }
    }else{
      switch (this.CustDataMode) {
        case CommonConstant.CustMainDataModeCust:
          urlAdd = URLConstantX.EditCustPersonalMainDataX;
          break;
        case this.CustDataModeFamily:
          urlAdd = URLConstant.SaveCustPersonalFamilyMainData;
          break;
        case CommonConstant.CustMainDataModeMgmntShrholder:
          urlAdd = URLConstant.SaveCustPersonalShareholderMainData;
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

  async EditCustPersonal(item: CustDuplicateObj) {
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
      var reqPayload = this.separateFileUpload(reqEditDupCheck);
      var resSave: GenericObj;
      await this.http.post(URLConstant.NewEditDuplicateCustV2, reqPayload.forApi).toPromise().then(
        (response: GenericObj) => {
          resSave = response;
        }
      );
      this.uploadDocFileMultipart(reqPayload.forUpload, resSave["Message"], resSave.Id)
    }else{
      this.http.post(URLConstant.NewEditDuplicateCust, reqEditDupCheck).subscribe(
        (response: GenericObj) => {
          this.redirectSaveEditMainData(response.Id);
        }
      );
    }
  }

  async EditCustCoy(item: CustDuplicateObj) {
    let reqEditDupCheck: ReqDupObj = new ReqDupObj();
    reqEditDupCheck.CustNo = item.CustNo;
    reqEditDupCheck.CustDataMode = this.CustDataMode;
    reqEditDupCheck.ThirdPartyTrxNo = this.DupCheckCoyObj.CustObj.ThirdPartyTrxNo;

    if (this.CustDataMode == CommonConstant.CustMainDataModeMgmntShrholder) {
      reqEditDupCheck.CustCompanyMgmntShrholderObj = this.DupCheckCoyObj.CustCompanyMgmntShrholderObj;
    }
    reqEditDupCheck.CustDocFileObjs = this.DupCheckCoyObj.CustDocFileObjs;

    if(environment.isCore){
      var reqPayload = this.separateFileUpload(reqEditDupCheck);
      var resSave: GenericObj;
      await this.http.post(URLConstant.NewEditDuplicateCustV2, reqPayload.forApi).toPromise().then(
        (response: GenericObj) => {
          resSave = response;
        }
      );
      this.uploadDocFileMultipart(reqPayload.forUpload, resSave["Message"], resSave.Id)
    }else{
      this.http.post(URLConstant.NewEditDuplicateCust, reqEditDupCheck).subscribe(
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
      this.http.post<GenericObj>(URLConstant.EditDuplicateNegativeCustV2, NegativeCustObj).subscribe(
        (response) => {
          this.redirectSaveEditMainData(response.Id);
        }
      );
    }else{
      this.http.post<GenericObj>(URLConstant.EditDuplicateNegativeCust, NegativeCustObj).subscribe(
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
      this.http.post<GenericObj>(URLConstant.EditDuplicateNegativeCustV2, NegativeCustObj).subscribe(
        (response) => {
          this.redirectSaveEditMainData(response.Id);
        }
      );
    }else{
      this.http.post<GenericObj>(URLConstant.EditDuplicateNegativeCust, NegativeCustObj).subscribe(
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

  separateFileUpload(obj:any, prop:string='CustDocFileObjs')
  {
    var reqCustDocFileListObj: {CustId: number, CustDocFileObjs: Array<CustDocFileObj>} = {CustId: 0, CustDocFileObjs:[]};
    if(obj[prop])
    {
      reqCustDocFileListObj.CustDocFileObjs = obj[prop];
      obj[prop] = []
    }
    return {forApi: obj, forUpload: reqCustDocFileListObj};
  }

  uploadDocFileMultipart(objDoc: {CustId: number, CustDocFileObjs: Array<CustDocFileObj>} , successMsg:string, custId:number)
  {
    if(!objDoc.CustDocFileObjs || !objDoc.CustDocFileObjs.length || !custId) 
    {
      this.toastr.successMessage(successMsg);
      this.redirectSaveEditMainData(custId);
      return;
    }

    if (environment.SpinnerOnHttpPost) this.spinner.show();

    objDoc.CustId = custId;
    var formData: any = new FormData();
    formData.append('reqPayload', JSON.stringify(objDoc));
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = evnt => {
      if (xhr.readyState !== 4) return;

      if (environment.SpinnerOnHttpPost) this.spinner.hide();
      if (xhr.status !== 200 && xhr.status !== 201) {
        this.toastr.errorMessage('Upload Failed !');
        return;
      }
      else {
        var response = JSON.parse(xhr.response);
        if (response.HeaderObj.StatusCode != '200') {
          this.toastr.errorMessage('Upload Failed ! '+  + response.HeaderObj.Message);
          return
        }
      }

      if (xhr.status === 200) {
        this.toastr.successMessage(successMsg);
        this.redirectSaveEditMainData(custId);
        return;
      }
    };

    xhr.onerror = evnt => {
      this.toastr.errorMessage('Upload Failed !');
      return;
    };
    xhr.open('POST', URLConstant.SaveCustDocFile21, true);
    let value = this.cookieService.get('XSRF-TOKEN');
    let token = this.DecryptString(value, environment.ChipperKeyCookie);
    xhr.setRequestHeader('AdInsKey', `${token}`);
    xhr.send(formData);
  }

  private DecryptString(chipperText: string, chipperKey: string) {
    if (
      chipperKey == undefined || chipperKey.trim() == '' ||
      chipperText == undefined || chipperText.trim() == ''
    ) return chipperText;
    var chipperKeyArr = CryptoJS.enc.Utf8.parse(chipperKey);
    var iv = CryptoJS.lib.WordArray.create([0x00, 0x00, 0x00, 0x00]);
    var decrypted = CryptoJS.AES.decrypt(chipperText, chipperKeyArr, { iv: iv });
    var plainText = decrypted.toString(CryptoJS.enc.Utf8);
    return plainText;
  }
}
