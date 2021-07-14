import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { RegexService } from 'app/customer/regex.service';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CustAddrObj } from 'app/shared/model/CustAddrObj.Model';
import { CustCompanyObj } from 'app/shared/model/CustCompanyObj.Model';
import { CustObj } from 'app/shared/model/CustObj.Model';
import { GenericObj } from 'app/shared/model/Generic/GenericObj.Model';
import { InputAddressObj } from 'app/shared/model/InputAddressObj.Model';
import { InputFieldObj } from 'app/shared/model/InputFieldObj.Model';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { UcDropdownListConstant, UcDropdownListObj } from 'app/shared/model/library/UcDropdownListObj.model';
import { ReqCoyObj } from 'app/shared/model/NewCust/ReqCoyObj.Model';
import { ReqRefMasterByTypeCodeAndMappingCodeObj } from 'app/shared/model/RefMaster/ReqRefMasterByTypeCodeAndMappingCodeObj.Model';
import { UcAddressObj } from 'app/shared/model/UcAddressObj.Model';
import { VendorAddrObj } from 'app/shared/model/VendorAddrObj.Model';
import { VendorObj } from 'app/shared/model/VendorObj.Model';
import { CookieService } from 'ngx-cookie';
import { NewCustSetData } from '../NewCustSetData.Service';

@Component({
  selector: 'app-new-cust-company-main-data',
  templateUrl: './new-cust-company-main-data.component.html',
})
export class NewCustCompanyMainDataComponent implements OnInit {

  @Input() listCustIdToExclude: Array<string> = new Array();
  @Input() CustId: number = 0; // if 0 mode Add else mode Edit.
  @Input() CustDataMode: string = CommonConstant.CustMainDataModeCust; // Cust Mode
  @Output() outputAfterSave: EventEmitter<ReqCoyObj> = new EventEmitter();
  @Output() outputCancel: EventEmitter<string> = new EventEmitter();
  
  CustomerForm: FormGroup = this.fb.group({});
  inputAddressObj: InputAddressObj = new InputAddressObj();
  inputFieldObj: InputFieldObj = new InputFieldObj();
  inputLookupObj: InputLookupObj = new InputLookupObj();

  custObj: CustObj = new CustObj();

  constructor(private regexService: RegexService, private router: Router, private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder, private toastr: NGXToastrService, private cookieService: CookieService, private modalService: NgbModal) { }

  //#region Readonly
  readonly RefMasterTypeCodeCompanyType: string = CommonConstant.RefMasterTypeCodeCompanyType;
  readonly RefMasterTypeCodeCustModel: string = CommonConstant.RefMasterTypeCodeCustModel;

  readonly CustDataModeMain: string = CommonConstant.CustMainDataModeCust;
  readonly CustDataModeFamily: string = CommonConstant.CustMainDataModeFamily;
  readonly CustDataModeShareholder: string = CommonConstant.CustMainDataModeMgmntShrholder;
  //#endregion

  async ngOnInit() {
    this.ClearCustForm();
    this.InitCustMainDataMode();
    this.BindSetLegalAddr();
    this.BindLookupSupplier();
    this.initDdlRefMaster(this.RefMasterTypeCodeCompanyType);
    this.initDdlRefMaster(this.RefMasterTypeCodeCustModel, CommonConstant.CustTypeCompany, URLConstant.GetListActiveRefMasterWithMappingCodeAll);
    await this.GetExistingData();
  }
  //#region Set Data
  //#region UcAddress
  BindSetLegalAddr() {
    this.inputFieldObj = new InputFieldObj();
    this.inputFieldObj.inputLookupObj = new InputLookupObj();
    this.inputAddressObj = new InputAddressObj();
    this.inputAddressObj.showSubsection = false;
    this.inputAddressObj.title = "Customer Address";
    this.inputAddressObj.default = new UcAddressObj();
    this.inputAddressObj.inputField = this.inputFieldObj;
    this.inputAddressObj.showAllPhn = false;
  }
  //#endregion

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
      case this.CustDataModeFamily:
        this.CustNameLabel = "Family";
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
    this.existingCustomerLookUpObj = NewCustSetData.BindLookupExistingCust(this.CustId, this.listCustIdToExclude, CommonConstant.CustomerCompany);
  }
  
  DictUcDDLObj: { [id: string]: UcDropdownListObj } = {};
  initDdlRefMaster(refMasterTypeCode: string, mappingCode: string = null, apiUrl: string = URLConstant.GetListActiveRefMaster, isSelectOutput: boolean = false) {
    let tempDdlObj: UcDropdownListObj = new UcDropdownListObj();
    let refMasterObj: ReqRefMasterByTypeCodeAndMappingCodeObj = {
      RefMasterTypeCode: refMasterTypeCode,
      MappingCode: mappingCode
    };
    tempDdlObj.apiUrl = apiUrl;
    tempDdlObj.requestObj = refMasterObj;
    tempDdlObj.customObjName = CommonConstant.ReturnObj;
    tempDdlObj.ddlType = UcDropdownListConstant.DDL_TYPE_ONE;
    tempDdlObj.isSelectOutput = isSelectOutput;
    tempDdlObj.isReady = true;
    this.DictUcDDLObj[refMasterTypeCode] = tempDdlObj;
  }

  ClearCustForm() {
    this.CustomerForm = this.fb.group({
      CustModel: ['', [Validators.required]],
      CustName: ['', [Validators.required]],
      MrCompanyTypeCode: ['', [Validators.required]],
      TaxIdNo: ['', [Validators.required, Validators.pattern("^[0-9]+$"), Validators.minLength(15), Validators.maxLength(15)]],
      IsAffiliateWithMf: [false],

      IsSupplier: [false],
      SupplCode: [''],
      SupplName: [''],
      SupplId: ['']
    });
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
  //#endregion

  //#region Get
  
  //#region GetExisting / mode edit
  async GetExistingData() {
    if (this.CustId == 0) return;
    await this.GetCustData();
    this.GetCustAddr();
    this.GetCustCompanyData();
  }

  async GetCustData() {
    let datePipe = new DatePipe("en-US");
    await this.http.post(URLConstant.GetCustByCustId, { Id: this.CustId }).toPromise().then(
      (response: CustObj) => {
        this.custObj = response;
        this.CustomerForm.patchValue({
          CustName: this.custObj.CustName,
          MrCustTypeCode: this.custObj.MrCustTypeCode,
          TaxIdNo: this.custObj.TaxIdNo,
          IsAffiliateWithMf: this.custObj.IsAffiliateWithMf,
          MrCustModelCode: this.custObj.MrCustModelCode,
        });
        this.existingCustomerLookUpObj.nameSelect = response.CustName;
        this.existingCustomerLookUpObj.isReady = true;
      }
    );
  }

  tempCustAddr: CustAddrObj = new CustAddrObj();
  async GetCustAddr() {
    let reqObj: GenericObj = new GenericObj();
    reqObj.Id = this.CustId;
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
        this.inputAddressObj.default = tempUcAddObj;
        this.inputAddressObj.inputField = this.inputFieldObj;
      }
    );
  }

  tempCustCompanyObj: CustCompanyObj = new CustCompanyObj();
  GetCustCompanyData(){    
    this.http.post(URLConstant.GetCustCompanyByCustId, { Id: this.CustId }).subscribe(
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

  SaveForm(){
    let tempForm = this.CustomerForm.getRawValue();
    let reqSubmitObj: ReqCoyObj = new ReqCoyObj();

    reqSubmitObj.CustObj = this.custObj;
    reqSubmitObj.CustObj.CustName = tempForm["CustName"];
    reqSubmitObj.CustObj.TaxIdNo = tempForm["TaxIdNo"];
    reqSubmitObj.CustObj.IdNo = tempForm["TaxIdNo"];
    reqSubmitObj.CustObj.MrCustModelCode = tempForm["CustModel"];
    reqSubmitObj.CustObj.MrCustTypeCode = CommonConstant.CustTypeCompany;
    reqSubmitObj.CustObj.IsAffiliateWithMf = tempForm["IsAffiliateWithMf"];

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
    reqSubmitObj.CustAddr.Zipcode = tempForm["UcAddressZipcode"]["value"];
    reqSubmitObj.CustAddr.SubZipcode = tempForm["UcAddressZipcode"]["value"];
    reqSubmitObj.CustAddr.MrCustAddrTypeCode = CommonConstant.AddrTypeLegal;

    reqSubmitObj = this.SetCustomerDataMode(reqSubmitObj);
    this.outputAfterSave.emit(reqSubmitObj);
  }
  private SetCustomerDataMode(reqSubmitObj: ReqCoyObj) {
    switch (this.CustDataMode) {
      case this.CustDataModeMain:
        reqSubmitObj.CustObj.IsCustomer = true;
        break;
      case this.CustDataModeFamily:
        reqSubmitObj.CustObj.IsFamily = true;
        break;
      case this.CustDataModeShareholder:
        reqSubmitObj.CustObj.IsShareholder = true;
        break;
    }
    return reqSubmitObj;
  }
}
