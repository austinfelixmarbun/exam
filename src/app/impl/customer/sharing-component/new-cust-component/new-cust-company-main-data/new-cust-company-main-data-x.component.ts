import {HttpClient} from '@angular/common/http';
import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NGXToastrService} from 'app/components/extra/toastr/toastr.service';
import {AdInsHelper} from 'app/shared/AdInsHelper';
import {CommonConstant} from 'app/shared/constant/CommonConstant';
import {ExceptionConstant} from 'app/shared/constant/ExceptionConstant';
import {URLConstant} from 'app/shared/constant/URLConstant';
import {CookieService} from 'ngx-cookie';
import {ShareholderFormComponent} from 'app/customer/sharing-component/new-cust-component/component/shareholder-form/shareholder-form.component';
import {NewCustSetData} from 'app/customer/sharing-component/new-cust-component/NewCustSetData.Service';
import {ThirdPartyUploadService} from 'app/customer/sharing-component/new-cust-component/component/third-party-form/services/ThirdPartyUpload.Service';
import {ActivatedRoute} from '@angular/router';
import {ReqCoyObj} from 'app/shared/model/new-cust/req-coy-obj.model';
import {InputAddressObj} from 'app/shared/model/input-address-obj.model';
import {InputLookupObj} from 'app/shared/model/input-lookup-obj.model';
import {CustDocFileFormObj} from 'app/shared/model/cust-doc-file/cust-doc-file-form-obj.model';
import {InputFieldObj} from 'app/shared/model/input-field-obj.model';
import {CustObj} from 'app/shared/model/cust-obj.model';
import {UcAddressObj} from 'app/shared/model/uc-address-obj.model';
import {VendorAddrObj} from 'app/shared/model/vendor-addr-obj.model';
import {CustFormExistingObj} from 'app/shared/model/new-cust/shareholder/shareholder-form-existing-obj.model';
import {CustAddrObj} from 'app/shared/model/cust-addr-obj.model';
import {GenericObj} from 'app/shared/model/Generic/generic-obj.model';
import {UcDropdownListObj} from 'app/shared/model/library/uc-dropdown-list-obj.model';
import {CurrentUserContext} from 'app/shared/model/current-user-context.model';
import {CustCompanyObj} from 'app/shared/model/cust-company-obj.model';
import {CustCompanyMgmntShrholderObj} from 'app/shared/model/new-cust/cust-company-mgmnt-shrholder-obj.model';
import {VendorObj} from 'app/shared/model/vendor-obj.model';

@Component({
  selector: 'app-new-cust-company-main-data-x',
  templateUrl: './new-cust-company-main-data-x.component.html',
})
export class NewCustCompanyMainDataXComponent implements OnInit {

  @ViewChild('ShareholderForm') shareholderForm: ShareholderFormComponent;
  @Input() listCustNoToExclude: Array<string> = new Array();
  @Input() CustId: number = 0; // if 0 mode Add else mode Edit.
  @Input() CustCompanyMgmntShrholderId: number = 0;
  @Input() ParentCustId: number = 0;
  @Input() tempTotalSharePrct: number = 0;
  @Input() CustDataMode: string = CommonConstant.CustMainDataModeCust; // Cust Mode
  @Output() outputAfterSave: EventEmitter<ReqCoyObj> = new EventEmitter();
  @Output() outputCancel: EventEmitter<string> = new EventEmitter();

  CustomerForm: FormGroup = this.fb.group({});
  inputAddressObj: InputAddressObj = new InputAddressObj();
  inputFieldObj: InputFieldObj = new InputFieldObj();
  inputLookupObj: InputLookupObj = new InputLookupObj();
  thirdPartyTrxNo: string = null;
  CustDocFileFormObjs: Array<CustDocFileFormObj> = new Array<CustDocFileFormObj>();
  pageFrom: string = CommonConstant.CustFromEditMainData;

  custObj: CustObj = new CustObj();

  constructor(private http: HttpClient, private fb: FormBuilder, private toastr: NGXToastrService,
    private cookieService: CookieService, private thirdPartyUploadService: ThirdPartyUploadService,
    private route: ActivatedRoute) {
      this.route.queryParams.subscribe(params => {
        if (params["From"] != null) {
          this.pageFrom = params["From"];
        }
      });
    }

  //#region Readonly
  readonly RefMasterTypeCodeCompanyType: string = CommonConstant.RefMasterTypeCodeCompanyType;
  readonly RefMasterTypeCodeCustModel: string = CommonConstant.RefMasterTypeCodeCustModel;

  readonly CustTypeCoy: string = CommonConstant.CustomerCompany;

  readonly CustDataModeMain: string = CommonConstant.CustMainDataModeCust;
  readonly CustDataModeShareholder: string = CommonConstant.CustMainDataModeMgmntShrholder;

  readonly CustFromEditMainData: string = CommonConstant.CustFromEditMainData;
  //#endregion

  DictUcDDLObj: { [id: string]: UcDropdownListObj } = {};
  async ngOnInit() {
    let context: CurrentUserContext = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
    this.ClearCustForm();
    this.BindLookupExistingCust();
    this.InitCustMainDataMode();
    this.inputAddressObj = NewCustSetData.BindSetLegalAddr();
    this.BindLookupSupplier();
    this.DictUcDDLObj[this.RefMasterTypeCodeCompanyType] = NewCustSetData.initDdlRefMaster(this.RefMasterTypeCodeCompanyType);
    this.DictUcDDLObj[this.RefMasterTypeCodeCustModel] = NewCustSetData.initDdlRefMaster(this.RefMasterTypeCodeCustModel, CommonConstant.CustTypeCompany, false, URLConstant.GetListActiveRefMasterWithMappingCodeAll);
    await this.GetExistingData();
    this.GetCustAddrToCopy();
    this.existingCustomerLookUpObj.isReady = true;
  }
  //#region Set Data
  //#region UcLookup
  BindLookupSupplier() {
    this.inputLookupObj = new InputLookupObj();
    this.inputLookupObj.isReady = false;
    this.inputLookupObj.urlJson = "./assets/lookup/lookupSupplierCoy.json";
    this.inputLookupObj.pagingJson = "./assets/lookup/lookupSupplierCoy.json";
    this.inputLookupObj.genericJson = "./assets/lookup/lookupSupplierCoy.json";
    this.inputLookupObj.isReady = true;
    this.inputLookupObj.isRequired = false;
  }
  //#endregion

  CustNameLabel: string = "Customer";
  InitCustMainDataMode() {
    switch (this.CustDataMode) {
      case this.CustDataModeMain:
        this.CustNameLabel = "Customer";
        break;
      case this.CustDataModeShareholder:
        this.CustNameLabel = "Share Legal";
        break;
      default:
    }
  }

  existingCustomerLookUpObj: InputLookupObj = new InputLookupObj();
  BindLookupExistingCust() {
    if (this.CustDataMode == this.CustDataModeMain) return;
    this.existingCustomerLookUpObj = NewCustSetData.BindLookupExistingCust(this.ParentCustId, this.listCustNoToExclude, CommonConstant.CustomerCompany);
    if (this.CustId != 0) this.existingCustomerLookUpObj.isDisable = true;
  }

  ClearCustForm() {
    this.CustomerForm = this.fb.group({
      MrCustModelCode: ['', [Validators.required]],
      CustName: ['', [Validators.required]],
      MrCompanyTypeCode: ['', [Validators.required]],
      TaxIdNo: ['', [Validators.required, Validators.pattern("^[0-9]+$"), Validators.minLength(15), Validators.maxLength(15)]],

      IsSupplier: [false],
      SupplCode: [''],
      SupplName: [''],
      SupplId: ['']
    });
    if (this.CustDataMode != this.CustDataModeMain) {
      this.CustomerForm.get("CustName").disable();
    }
  }
  //#endregion

  //#region Change

  SetSupplier(e: VendorObj) {
    this.CustomerForm.patchValue({
      SupplCode: e.VendorCode,
      SupplName: e.VendorName,
      SupplId: e.VendorId
    });

    this.http.post(URLConstant.GetVendorByVendorCode, { Code: e.VendorCode }).subscribe(
      (response: VendorObj) => {
        this.CustomerForm.patchValue({
          CustName: e.VendorName,
          MrIdTypeCode: response.MrIdTypeCode,
          IdNo: response.IdNo,
          TaxIdNo: response.TaxIdNo,
        });
      });

    this.http.post(URLConstant.GetVendorAddrByVendorCodeAndMrAddrTypeCode, { VendorCode: e.VendorCode, MrAddrTypeCode: CommonConstant.AddrTypeLegal }).subscribe(
      (response: VendorAddrObj) => {
        this.inputFieldObj.inputLookupObj.nameSelect = response.Zipcode;
        this.inputFieldObj.inputLookupObj.jsonSelect = { Zipcode: response.Zipcode };
        let tempUcAddObj: UcAddressObj = new UcAddressObj();
        tempUcAddObj.AreaCode1 = response.AreaCode1;
        tempUcAddObj.AreaCode2 = response.AreaCode2;
        tempUcAddObj.AreaCode3 = response.AreaCode3;
        tempUcAddObj.AreaCode4 = response.AreaCode4;
        tempUcAddObj.Addr = response.Addr;
        tempUcAddObj.City = response.City;
        this.inputAddressObj.default = tempUcAddObj;
        this.inputAddressObj.inputField = this.inputFieldObj;
      }
    );
  }

  ExistingShareholderObj: CustFormExistingObj = new CustFormExistingObj();
  GetExistingShareholder(ev: CustFormExistingObj) {
    this.ExistingShareholderObj = ev;
  }

  async getLookUpCustomer(ev: { CustId: number, CustCompanyMgmntShrholderId: number }) {
    await this.GetCustData(ev.CustId);
    this.GetCustAddr(ev.CustId);
    await this.GetCustCompanyData(ev.CustId);
    if (ev.CustCompanyMgmntShrholderId) this.shareholderForm.GetExistingShareholder(ev.CustCompanyMgmntShrholderId);

    this.IsLockEdit();
  }

  IsLockEdit() {
    this.existingCustomerLookUpObj.isReadonly = true;
    this.inputAddressObj.isReadonly = true;
    this.inputAddressObj.inputField.inputLookupObj.isReadonly = true;
    this.inputAddressObj.inputField.inputLookupObj.isDisable = true;

    this.CustomerForm.get("CustName").disable();
    this.CustomerForm.get("MrCustModelCode").disable();
    this.CustomerForm.get("MrCompanyTypeCode").disable();
    this.CustomerForm.get("TaxIdNo").disable();
    this.IsLockCopyAddrBtn = true;
  }

  CopyLegalAddr() {
    let inputFieldObj = new InputFieldObj();
    inputFieldObj.inputLookupObj = new InputLookupObj();
    inputFieldObj.inputLookupObj.isReadonly = false;
    inputFieldObj.inputLookupObj.nameSelect = this.tempCustAddrToCopy.Zipcode;
    inputFieldObj.inputLookupObj.jsonSelect = { Zipcode: this.tempCustAddrToCopy.Zipcode };
    let tempUcAddObj: UcAddressObj = new UcAddressObj();
    tempUcAddObj.AreaCode1 = this.tempCustAddrToCopy.AreaCode1;
    tempUcAddObj.AreaCode2 = this.tempCustAddrToCopy.AreaCode2;
    tempUcAddObj.AreaCode3 = this.tempCustAddrToCopy.AreaCode3;
    tempUcAddObj.AreaCode4 = this.tempCustAddrToCopy.AreaCode4;
    tempUcAddObj.Addr = this.tempCustAddrToCopy.Addr;
    tempUcAddObj.City = this.tempCustAddrToCopy.City;
    tempUcAddObj.MrHouseOwnershipCode = this.tempCustAddrToCopy.MrBuildingOwnershipCode;
    this.inputAddressObj.default = tempUcAddObj;
    this.inputAddressObj.inputField = inputFieldObj;
  }
  //#endregion

  //#region Get

  tempCustAddrToCopy: CustAddrObj = new CustAddrObj();
  async GetCustAddrToCopy() {
    if (this.CustDataMode == this.CustDataModeMain) return;
    let reqObj: GenericObj = new GenericObj();
    reqObj.Id = this.ParentCustId;
    reqObj.Code = CommonConstant.CustAddrTypeLegal;
    await this.http.post(URLConstant.GetCustAddrByMrCustAddrType, reqObj).subscribe(
      (response: CustAddrObj) => {
        this.tempCustAddrToCopy = response;
      }
    );
  }

  //#region GetExisting / mode edit
  IsLockCopyAddrBtn: boolean = false;
  IsCustLoaded: boolean = false;
  async GetExistingData() {
    if (this.CustId == 0){
      this.custObj.IsCustomer = true;
      this.IsCustLoaded = true;
      return;
    }
    await this.GetCustData();
    this.GetCustAddr();
    this.GetCustCompanyData();

    if (this.CustDataMode != CommonConstant.CustMainDataModeCust) {
      this.IsLockEdit();
    }
    this.IsLockCopyAddrBtn = true;
  }

  async GetCustData(custId: number = this.CustId) {
    await this.http.post(URLConstant.GetCustByCustId, { Id: custId }).toPromise().then(
      (response: CustObj) => {
        this.custObj = response;
        this.thirdPartyTrxNo = this.custObj.ThirdPartyTrxNo;
        this.IsCustLoaded = true;
        this.CustomerForm.patchValue({
          CustName: this.custObj.CustName,
          MrCustTypeCode: this.custObj.MrCustTypeCode,
          TaxIdNo: this.custObj.TaxIdNo,
          MrCustModelCode: this.custObj.MrCustModelCode,
        });
        this.existingCustomerLookUpObj.nameSelect = response.CustName;
        this.existingCustomerLookUpObj.jsonSelect = { CustName: response.CustName };
        this.existingCustomerLookUpObj.isReady = true;
        if(this.existingCustomerLookUpObj.isReady && this.CustDataMode != this.CustDataModeMain){
          this.CustomerForm.get("CustName").disable();
          this.CustomerForm.get("TaxIdNo").disable();
        }
      }
    );
  }

  tempCustAddr: CustAddrObj = new CustAddrObj();
  async GetCustAddr(custId: number = this.CustId) {
    let reqObj: GenericObj = new GenericObj();
    reqObj.Id = custId;
    reqObj.Code = CommonConstant.CustAddrTypeLegal;
    await this.http.post(URLConstant.GetCustAddrByMrCustAddrType, reqObj).subscribe(
      (response: CustAddrObj) => {
        this.tempCustAddr = response;
        this.inputFieldObj.inputLookupObj.nameSelect = response.Zipcode;
        this.inputFieldObj.inputLookupObj.jsonSelect = { Zipcode: response.Zipcode };
        let tempUcAddObj: UcAddressObj = new UcAddressObj();
        tempUcAddObj.AreaCode1 = response.AreaCode1;
        tempUcAddObj.AreaCode2 = response.AreaCode2;
        tempUcAddObj.AreaCode3 = response.AreaCode3;
        tempUcAddObj.AreaCode4 = response.AreaCode4;
        tempUcAddObj.Addr = response.Addr;
        tempUcAddObj.City = response.City;
        tempUcAddObj.MrHouseOwnershipCode = response.MrBuildingOwnershipCode;
        this.inputAddressObj.default = tempUcAddObj;
        this.inputAddressObj.inputField = this.inputFieldObj;

        if (this.CustDataMode == CommonConstant.CustMainDataModeCust) {
          this.inputAddressObj.inputField.inputLookupObj.isReadonly = false;
        }
      }
    );
  }

  tempCustCompanyObj: CustCompanyObj = new CustCompanyObj();
  GetCustCompanyData(custId: number = this.CustId) {
    this.http.post(URLConstant.GetCustCompanyByCustId, { Id: custId }).subscribe(
      (response: CustCompanyObj) => {
        this.tempCustCompanyObj = response;
        this.CustomerForm.patchValue({
          MrCompanyTypeCode: response.MrCompanyTypeCode
        });
      }
    );
  }

  //#endregion
  //#endregion
  Cancel() {
    this.outputCancel.emit();
  }

  async SaveForm() {
    if(this.thirdPartyTrxNo != null && !this.thirdPartyUploadService.ValidateFileUpload(this.CustDocFileFormObjs)){
      return;
    }

    let tempForm = this.CustomerForm.getRawValue();
    let reqSubmitObj: ReqCoyObj = new ReqCoyObj();

    reqSubmitObj.CustObj = this.custObj;
    reqSubmitObj.CustObj.CustName = tempForm["CustName"];
    reqSubmitObj.CustObj.TaxIdNo = tempForm["TaxIdNo"];
    reqSubmitObj.CustObj.IdNo = tempForm["TaxIdNo"];
    reqSubmitObj.CustObj.MrCustModelCode = tempForm["MrCustModelCode"];
    reqSubmitObj.CustObj.MrCustTypeCode = CommonConstant.CustTypeCompany;
    reqSubmitObj.CustObj.ThirdPartyTrxNo = this.thirdPartyTrxNo;

    reqSubmitObj.CustCompanyObj = this.tempCustCompanyObj;
    reqSubmitObj.CustCompanyObj.MrCompanyTypeCode = tempForm["MrCompanyTypeCode"];

    reqSubmitObj.CustAddr = this.tempCustAddr;
    reqSubmitObj.CustAddr.CustId = this.CustId;
    reqSubmitObj.CustAddr.Addr = tempForm["UcAddress"]["Addr"];
    reqSubmitObj.CustAddr.AreaCode1 = tempForm["UcAddress"]["AreaCode1"];
    reqSubmitObj.CustAddr.AreaCode2 = tempForm["UcAddress"]["AreaCode2"];
    reqSubmitObj.CustAddr.AreaCode3 = tempForm["UcAddress"]["AreaCode3"];
    reqSubmitObj.CustAddr.AreaCode4 = tempForm["UcAddress"]["AreaCode4"];
    reqSubmitObj.CustAddr.City = tempForm["UcAddress"]["City"];
    reqSubmitObj.CustAddr.MrBuildingOwnershipCode = tempForm["UcAddress"]["MrHouseOwnershipCode"];
    reqSubmitObj.CustAddr.Zipcode = tempForm["UcAddressZipcode"]["value"];
    reqSubmitObj.CustAddr.SubZipcode = tempForm["UcAddressZipcode"]["value"];
    reqSubmitObj.CustAddr.MrCustAddrTypeCode = CommonConstant.AddrTypeLegal;

    if (this.CustDataMode == this.CustDataModeShareholder) {
      reqSubmitObj.CustObj.CustName = tempForm["ExistingCustName"].value;
      reqSubmitObj.CustCompanyMgmntShrholderObj = this.SetCustMgmntShareholder();

      if (reqSubmitObj.CustCompanyMgmntShrholderObj.IsActive) {
        let tempTotalSharePrctTobeAdd = this.tempTotalSharePrct + reqSubmitObj.CustCompanyMgmntShrholderObj.SharePrcnt;
        if (tempTotalSharePrctTobeAdd > 100) {
          this.toastr.warningMessage(ExceptionConstant.TOTAL_SHARE_CAN_NOT_100);
          this.toastr.warningMessage("Total Share now is " + this.tempTotalSharePrct + "%");
          return;
        }
      }
    }

    reqSubmitObj = this.SetCustomerDataMode(reqSubmitObj);

    reqSubmitObj.CustDocFileObjs = await this.thirdPartyUploadService.ConvertToCustDocFileObj(this.CustDocFileFormObjs);
    this.outputAfterSave.emit(reqSubmitObj);
  }
  private SetCustomerDataMode(reqSubmitObj: ReqCoyObj) {
    switch (this.CustDataMode) {
      case this.CustDataModeMain:
        reqSubmitObj.CustObj.IsCustomer = true;
        break;
      case this.CustDataModeShareholder:
        reqSubmitObj.CustObj.IsShareholder = true;
        break;
    }
    return reqSubmitObj;
  }

  SetCustMgmntShareholder(): CustCompanyMgmntShrholderObj {
    let tempForm = this.CustomerForm.getRawValue();
    let tempReqObj: CustCompanyMgmntShrholderObj = this.ExistingShareholderObj.CustCompanyMgmntShrholder;
    tempReqObj.CustId = this.ParentCustId;
    tempReqObj.ShareholderId = this.CustId;

    tempReqObj.SharePrcnt = tempForm["SharePrcnt"];
    tempReqObj.MrPositionSlikCode = tempForm["MrPositionSlikCode"];
    tempReqObj.IsActive = tempForm["IsActive"];
    tempReqObj.IsOwner = tempForm["IsOwner"];

    return tempReqObj
  }

  SetThirdPartyTrxNo(e){
    this.thirdPartyTrxNo = e;
  }

  SetCustFileFormObjs(e){
    this.CustDocFileFormObjs = e;
  }
}
