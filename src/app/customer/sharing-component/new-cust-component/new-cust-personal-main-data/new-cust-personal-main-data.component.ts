import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegexService } from 'app/customer/regex.service';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CurrentUserContext } from 'app/shared/model/CurrentUserContext.model';
import { CustAddrObj } from 'app/shared/model/CustAddrObj.Model';
import { CustObj } from 'app/shared/model/CustObj.Model';
import { CustPersonalObj } from 'app/shared/model/CustPersonalObj.Model';
import { GenericObj } from 'app/shared/model/Generic/GenericObj.Model';
import { InputAddressObj } from 'app/shared/model/InputAddressObj.Model';
import { InputFieldObj } from 'app/shared/model/InputFieldObj.Model';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { KeyValueObj } from 'app/shared/model/KeyValue/KeyValueObj.Model';
import { UcDropdownListConstant, UcDropdownListObj } from 'app/shared/model/library/UcDropdownListObj.model';
import { CustomPatternObj } from 'app/shared/model/LibraryObj/CustomPatternObj.model';
import { ReqPersonalObj } from 'app/shared/model/NewCust/ReqPersonalObj.Model';
import { ReqRefMasterByTypeCodeAndMappingCodeObj } from 'app/shared/model/RefMaster/ReqRefMasterByTypeCodeAndMappingCodeObj.Model';
import { UcAddressObj } from 'app/shared/model/UcAddressObj.Model';
import { VendorAddrObj } from 'app/shared/model/VendorAddrObj.Model';
import { VendorObj } from 'app/shared/model/VendorObj.Model';
import { environment } from 'environments/environment';
import { CookieService } from 'ngx-cookie';
import { NewCustSetData } from '../NewCustSetData.Service';

@Component({
  selector: 'app-new-cust-personal-main-data',
  templateUrl: './new-cust-personal-main-data.component.html',
})
export class NewCustPersonalMainDataComponent implements OnInit {

  @Input() listCustIdToExclude: Array<string> = new Array();
  @Input() CustId: number = 0; // if 0 mode Add else mode Edit.
  @Input() CustDataMode: string = CommonConstant.CustMainDataModeCust; // Cust Mode
  @Output() outputAfterSave: EventEmitter<ReqPersonalObj> = new EventEmitter();
  @Output() outputCancel: EventEmitter<string> = new EventEmitter();

  custObj: CustObj = new CustObj();
  CustomerForm: FormGroup = this.fb.group({});
  inputAddressObj: InputAddressObj = new InputAddressObj();
  inputFieldObj: InputFieldObj = new InputFieldObj();
  inputLookupObj: InputLookupObj = new InputLookupObj();

  constructor(private regexService: RegexService,
    private http: HttpClient, private fb: FormBuilder,
    private cookieService: CookieService) {
  }

  //#region Readonly
  readonly RefMasterTypeCodeIdType: string = CommonConstant.RefMasterTypeCodeIdType;
  readonly RefMasterTypeCodeGender: string = CommonConstant.RefMasterTypeCodeGender;
  readonly RefMasterTypeCodeMaritalStat: string = CommonConstant.RefMasterTypeCodeMaritalStat;

  readonly CustDataModeMain: string = CommonConstant.CustMainDataModeCust;
  readonly CustDataModeFamily: string = CommonConstant.CustMainDataModeFamily;
  readonly CustDataModeShareholder: string = CommonConstant.CustMainDataModeMgmntShrholder;
  //#endregion

  async ngOnInit() {
    this.InitData();
    this.InitCustMainDataMode();
    this.BindSetLegalAddr();
    this.BindLookupSupplier();
    this.BindLookupExistingCust();
    this.ClearCustForm();
    this.getInitPattern();
    this.initDdlRefMaster(this.RefMasterTypeCodeIdType, null, true);
    this.initDdlRefMaster(this.RefMasterTypeCodeGender);
    this.initDdlRefMaster(this.RefMasterTypeCodeMaritalStat);
    await this.GetExistingData();
  }

  //#region Set Data
  businessDtMin: Date;
  businessDtMax: Date;
  InitData() {
    let context: CurrentUserContext = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
    this.businessDtMin = new Date(context[CommonConstant.BUSINESS_DT]);
    this.businessDtMin.setFullYear(this.businessDtMin.getFullYear() - 17);
    this.businessDtMax = new Date(context[CommonConstant.BUSINESS_DT]);
    this.businessDtMax.setDate(this.businessDtMax.getDate() + 1);

    this.inputAddressObj = NewCustSetData.BindSetLegalAddr();
  }

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
    this.inputLookupObj.urlJson = "./assets/lookup/lookupSupplierPersonal.json";
    this.inputLookupObj.urlQryPaging = "/Generic/GetPagingObjectBySQL";
    this.inputLookupObj.urlEnviPaging = environment.FoundationR3Url;
    this.inputLookupObj.pagingJson = "./assets/lookup/lookupSupplierPersonal.json";
    this.inputLookupObj.genericJson = "./assets/lookup/lookupSupplierPersonal.json";
    this.inputLookupObj.isReady = true;
    this.inputLookupObj.isRequired = false;
  }

  existingCustomerLookUpObj: InputLookupObj = new InputLookupObj();
  BindLookupExistingCust() {
    if (this.CustDataMode == this.CustDataModeMain) return;
    this.existingCustomerLookUpObj = NewCustSetData.BindLookupExistingCust(this.CustId, this.listCustIdToExclude, CommonConstant.CustomerPersonal);
  }
  //#endregion

  //#region UcDDL
  DictUcDDLObj: { [id: string]: UcDropdownListObj } = {};
  initDdlRefMaster(refMasterTypeCode: string, mappingCode: string = null, isSelectOutput: boolean = false) {
    let tempDdlObj: UcDropdownListObj = new UcDropdownListObj();
    let refMasterObjMrIdTypeCode: ReqRefMasterByTypeCodeAndMappingCodeObj = {
      RefMasterTypeCode: refMasterTypeCode,
      MappingCode: mappingCode
    }
    tempDdlObj.apiUrl = URLConstant.GetListActiveRefMaster;
    tempDdlObj.requestObj = refMasterObjMrIdTypeCode;
    tempDdlObj.customObjName = CommonConstant.ReturnObj;
    tempDdlObj.ddlType = UcDropdownListConstant.DDL_TYPE_ONE;
    tempDdlObj.isSelectOutput = isSelectOutput;
    tempDdlObj.isReady = true;
    this.DictUcDDLObj[refMasterTypeCode] = tempDdlObj;

    if (this.RefMasterTypeCodeIdType == refMasterTypeCode) this.onChangeIdType();
  }
  //#endregion

  ClearCustForm() {
    this.CustomerForm = this.fb.group({
      CustName: ['', [Validators.required, Validators.maxLength(100)]],
      MrGenderCode: ['', [Validators.required]],
      MrIdTypeCode: ['', [Validators.required, Validators.maxLength(100)]],
      BirthPlace: ['', [Validators.required]],
      BirthDt: ['', [Validators.required]],
      IdNo: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
      TaxIdNo: ['', [Validators.pattern("^[0-9]+$"), Validators.minLength(15), Validators.maxLength(15)]],
      IdExpiredDt: [''],
      MrMaritalStatCode: ['', Validators.required],
      MotherMaidenName: ['', [Validators.required, Validators.maxLength(100)]],
      CustModel: [''],
      IsVip: [false],
      IsAffiliateWithMf: [false],
      VipNotes: ['', [Validators.required]],
      IsSupplier: [false],
      SupplCode: [''],
      SupplName: [''],
      SupplId: ['']
    });
  }
  //#endregion

  //#region Get Data
  customPattern: Array<CustomPatternObj> = new Array<CustomPatternObj>();
  getInitPattern() {
    this.customPattern = new Array<CustomPatternObj>();
    this.regexService.getListPattern().subscribe(
      (response) => {
        this.resultPattern = response[CommonConstant.ReturnObj];
        if (this.resultPattern != undefined) {
          for (let i = 0; i < this.resultPattern.length; i++) {
            let patternObj: CustomPatternObj = new CustomPatternObj();
            let pattern: string = this.resultPattern[i].Value;

            patternObj.pattern = pattern;
            patternObj.invalidMsg = this.regexService.getErrMessage(pattern);
            this.customPattern.push(patternObj);
          }
          this.setValidatorPattern();
        }
      }
    )
  }


  //#region GetExisting / mode edit
  async GetExistingData() {
    if (this.CustId == 0) return;
    await this.GetCustData();
    this.GetCustAddr();
    await this.GetCustPersonalData();
  }

  async GetCustData() {
    var datePipe = new DatePipe("en-US");
    await this.http.post(URLConstant.GetCustByCustId, { Id: this.CustId }).toPromise().then(
      (response: CustObj) => {
        this.custObj = response;
        this.CustomerForm.patchValue({
          CustName: this.custObj.CustName,
          MrCustTypeCode: this.custObj.MrCustTypeCode,
          MrIdTypeCode: this.custObj.MrIdTypeCode,
          IdNo: this.custObj.IdNo,
          IdExpiredDt: datePipe.transform(this.custObj.IdExpiredDt, 'yyyy-MM-dd'),
          TaxIdNo: this.custObj.TaxIdNo,
          IsVip: this.custObj.IsVip,
          IsAffiliateWithMf: this.custObj.IsAffiliateWithMf,
          VipNotes: this.custObj.VipNotes,
        });
        this.existingCustomerLookUpObj.nameSelect = response.CustName;
        this.existingCustomerLookUpObj.isReady = true;
        this.onChangeIdType();
        this.checkStateIsVip();
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

        //sepertinya ga perlu, karna uda d tampung di atas ke tempCusAddr
        this.custObj.CustAddr.CustAddrId = response.CustAddrId;
        this.custObj.CustAddr.RowVersion = response.RowVersion != null ? response.RowVersion : "";
      }
    );
  }

  tempCustPersonalObj: CustPersonalObj = new CustPersonalObj();
  async GetCustPersonalData() {
    var datePipe = new DatePipe("en-US");
    await this.http.post<CustPersonalObj>(URLConstant.GetCustPersonalbyCustId, { Id: this.CustId }).toPromise().then(
      (response) => {
        this.tempCustPersonalObj = response;
        this.CustomerForm.patchValue({
          MrGenderCode: response.MrGenderCode,
          BirthPlace: response.BirthPlace,
          BirthDt: datePipe.transform(response.BirthDt, 'yyyy-MM-dd'),
          MotherMaidenName: response.MotherMaidenName,
          IsRestInPeace: response.IsRestInPeace,
          MrMaritalStatCode: response.MrMaritalStatCode,
        });
      }
    );
  }
  //#endregion
  //#endregion

  //#region Change Data
  IsKTPCheck: boolean = false;
  noExpDate = [CommonConstant.MrIdTypeCodeEKTP, CommonConstant.MrIdTypeCodeNPWP, CommonConstant.MrIdTypeCodeAKTA];
  onOptionsSelected() {
    let tempMrIdTypeCode: string = this.CustomerForm.get("MrIdTypeCode").value;
    let tempIdExpiredDt = this.CustomerForm.get("IdExpiredDt");
    if (this.noExpDate.includes(tempMrIdTypeCode)) {
      tempIdExpiredDt.clearValidators();
      this.CustomerForm.patchValue({
        IdExpiredDt: ''
      })
      this.IsKTPCheck = true;
    } else {
      tempIdExpiredDt.setValidators(Validators.required);
      this.IsKTPCheck = false;
    }
    tempIdExpiredDt.updateValueAndValidity();
    this.onChangeIdType();
  }

  onChangeIdType() {
    let idType: string = this.CustomerForm.get("MrIdTypeCode").value;

    let tempIdNo = this.CustomerForm.get("IdNo");
    tempIdNo.clearValidators();
    if (idType == CommonConstant.MrIdTypeCodeEKTP) {
      tempIdNo.setValidators([Validators.required, Validators.pattern("^[0-9]+$"), Validators.minLength(16), Validators.maxLength(16)]);
    } else {
      tempIdNo.setValidators([Validators.required, Validators.pattern("^[0-9]+$")]);
    }
    tempIdNo.updateValueAndValidity();

    this.setValidatorPattern();
  }

  resultPattern: Array<KeyValueObj> = new Array();
  setValidatorPattern() {
    let idTypeValue: string = this.CustomerForm.get("MrIdTypeCode").value;
    let pattern: string = '';
    if (idTypeValue != undefined) {
      if (this.resultPattern != undefined) {
        let result = this.resultPattern.find(x => x.Key == idTypeValue)
        if (result != undefined) {
          pattern = result.Value;
        }
      }
    }
    this.setValidator(pattern);
  }

  setValidator(pattern: string) {
    let tempIdNo = this.CustomerForm.get("IdNo");
    if (pattern != undefined) {
      tempIdNo.setValidators([Validators.required, Validators.pattern(pattern)]);
      tempIdNo.updateValueAndValidity();
    }
  }

  checkStateIsVip() {
    let tempVipNotes = this.CustomerForm.get("VipNotes");
    let tempIsVip = this.CustomerForm.get("IsVip");
    if (!tempIsVip.value) {
      this.CustomerForm.patchValue({
        VipNotes: null
      });
      tempVipNotes.disable();

    } else {
      tempVipNotes.enable();
      tempVipNotes.setValidators(Validators.required);
    }
    tempVipNotes.updateValueAndValidity();
  }

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
          // klo ga ada, hapus aja
          CustModel: '',
        });

        if (response.MrIdTypeCode) {
          this.onOptionsSelected()
        }
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

  //#region Save
  SaveForm() {
    let tempForm = this.CustomerForm.getRawValue();
    var reqSubmitObj: ReqPersonalObj = new ReqPersonalObj();
    reqSubmitObj.CustObj = this.custObj;
    reqSubmitObj.CustObj.CustName = tempForm["CustName"];
    reqSubmitObj.CustObj.MrIdTypeCode = tempForm["MrIdTypeCode"];
    reqSubmitObj.CustObj.IdNo = tempForm["IdNo"];
    reqSubmitObj.CustObj.IdExpiredDt = tempForm["IdExpiredDt"];
    reqSubmitObj.CustObj.TaxIdNo = tempForm["TaxIdNo"];
    reqSubmitObj.CustObj.IsVip = tempForm["IsVip"];
    reqSubmitObj.CustObj.MrCustTypeCode = CommonConstant.CustomerPersonal;
    reqSubmitObj.CustObj.IsAffiliateWithMf = tempForm["IsAffiliateWithMf"];
    if (reqSubmitObj.CustObj.IsVip == true) {
      reqSubmitObj.CustObj.VipNotes = tempForm["VipNotes"];
    } else {
      reqSubmitObj.CustObj.VipNotes = null;
    }

    reqSubmitObj.CustPersonalObj.CustFullName = tempForm["CustName"];
    reqSubmitObj.CustPersonalObj.MrGenderCode = tempForm["MrGenderCode"];
    reqSubmitObj.CustPersonalObj.BirthPlace = tempForm["BirthPlace"];
    reqSubmitObj.CustPersonalObj.BirthDt = tempForm["BirthDt"];
    reqSubmitObj.CustPersonalObj.MotherMaidenName = tempForm["MotherMaidenName"];
    reqSubmitObj.CustPersonalObj.MrMaritalStatCode = tempForm["MrMaritalStatCode"];

    reqSubmitObj.CustObj.CustAddr = this.tempCustAddr;
    reqSubmitObj.CustObj.CustAddr.CustId = this.CustId;
    reqSubmitObj.CustObj.CustAddr.Addr = tempForm["UcAddress"]["Addr"];
    reqSubmitObj.CustObj.CustAddr.AreaCode1 = tempForm["UcAddress"]["AreaCode1"];
    reqSubmitObj.CustObj.CustAddr.AreaCode2 = tempForm["UcAddress"]["AreaCode2"];
    reqSubmitObj.CustObj.CustAddr.AreaCode3 = tempForm["UcAddress"]["AreaCode3"];
    reqSubmitObj.CustObj.CustAddr.AreaCode4 = tempForm["UcAddress"]["AreaCode4"];
    reqSubmitObj.CustObj.CustAddr.City = tempForm["UcAddress"]["City"];
    reqSubmitObj.CustObj.CustAddr.Zipcode = tempForm["UcAddressZipcode"]["value"];
    reqSubmitObj.CustObj.CustAddr.SubZipcode = tempForm["UcAddressZipcode"]["value"];
    reqSubmitObj.CustObj.CustAddr.MrCustAddrTypeCode = CommonConstant.AddrTypeLegal;

    reqSubmitObj= this.SetCustomerDataMode(reqSubmitObj);
    this.outputAfterSave.emit(reqSubmitObj);
  }

  private SetCustomerDataMode(reqSubmitObj: ReqPersonalObj) {
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
  //#endregion
}
