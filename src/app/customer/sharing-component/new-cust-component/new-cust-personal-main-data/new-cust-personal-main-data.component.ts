import { UclookupgenericComponent } from '@adins/uclookupgeneric';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { RegexService } from 'app/customer/regex.service';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CurrentUserContext } from 'app/shared/model/CurrentUserContext.model';
import { CustAddrObj } from 'app/shared/model/CustAddrObj.Model';
import { CustObj } from 'app/shared/model/CustObj.Model';
import { CustPersonalJobDataObj } from 'app/shared/model/CustPersonalJobDataObj.Model';
import { CustPersonalObj } from 'app/shared/model/CustPersonalObj.Model';
import { ReqPefindoSmartSearchObj } from 'app/shared/model/Digitalization/ReqPefindoSmartSearchObj.model';
import { GenericObj } from 'app/shared/model/Generic/GenericObj.Model';
import { InputAddressObj } from 'app/shared/model/InputAddressObj.Model';
import { InputFieldObj } from 'app/shared/model/InputFieldObj.Model';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { KeyValueObj } from 'app/shared/model/KeyValue/KeyValueObj.Model';
import { UcDropdownListConstant, UcDropdownListObj } from 'app/shared/model/library/UcDropdownListObj.model';
import { CustomPatternObj } from 'app/shared/model/LibraryObj/CustomPatternObj.model';
import { ReqGenerateTrxNoObj } from 'app/shared/model/MasterSequence/ReqGenerateTrxNoObj.model';
import { ResGenerateTrxNoObj } from 'app/shared/model/MasterSequence/ResGenerateTrxNoObj.model';
import { CustAttrContentObj } from 'app/shared/model/NewCust/CustAttrContentObj.Model';
import { CustCompanyMgmntShrholderObj } from 'app/shared/model/NewCust/CustCompanyMgmntShrholderObj.Model';
import { CustPersonalFamilyObj } from 'app/shared/model/NewCust/CustPersonalFamilyObj.Model';
import { ReqPersonalObj } from 'app/shared/model/NewCust/ReqPersonalObj.Model';
import { CustFormExistingObj } from 'app/shared/model/NewCust/Shareholder/ShareholderFormExistingObj.Model';
import { ReqRefMasterByTypeCodeAndMappingCodeObj } from 'app/shared/model/RefMaster/ReqRefMasterByTypeCodeAndMappingCodeObj.Model';
import { UcAddressObj } from 'app/shared/model/UcAddressObj.Model';
import { VendorAddrObj } from 'app/shared/model/VendorAddrObj.Model';
import { VendorObj } from 'app/shared/model/VendorObj.Model';
import { CookieService } from 'ngx-cookie';
import { CustAttrFormComponent } from '../component/cust-attr-form/cust-attr-form.component';
import { FamilyFormComponent } from '../component/family-form/family-form.component';
import { PefindoReqComponent } from '../component/pefindo/request/pefindo-req.component';
import { ShareholderFormComponent } from '../component/shareholder-form/shareholder-form.component';
import { TrustingSocialReqHeaderComponent } from '../component/trusting-social/request/trusting-social-req-header.component';
import { TrustingSocialViewHeaderComponent } from '../component/trusting-social/view/trusting-social-view-header.component';
import { NewCustSetData } from '../NewCustSetData.Service';

@Component({
  selector: 'app-new-cust-personal-main-data',
  templateUrl: './new-cust-personal-main-data.component.html',
})
export class NewCustPersonalMainDataComponent implements OnInit {

  @ViewChild('ShareholderForm') shareholderForm: ShareholderFormComponent;
  @ViewChild('FamilyForm') familyForm: FamilyFormComponent;
  @ViewChild('CustAttrForm') custAttrForm: CustAttrFormComponent;
  private ucLookupExistingCust: UclookupgenericComponent;
  @ViewChild('LookupExistingCust') set content(content: UclookupgenericComponent) {
    if (content) { // initially setter gets called with undefined
      this.ucLookupExistingCust = content;
    }
  }
  @Input() listCustNoToExclude: Array<string> = new Array();
  @Input() CustId: number = 0; // if 0 mode Add else mode Edit.
  @Input() CustCompanyMgmntShrholderId: number = 0;
  @Input() CustPersonalFamilyId: number = 0;
  @Input() ParentCustId: number = 0;
  @Input() tempTotalSharePrct: number = 0;
  @Input() isMarried: boolean = false;
  @Input() CustDataMode: string = CommonConstant.CustMainDataModeCust; // Cust Mode
  @Output() outputAfterSave: EventEmitter<ReqPersonalObj> = new EventEmitter();
  @Output() outputCancel: EventEmitter<string> = new EventEmitter();


  custObj: CustObj = new CustObj();
  CustomerForm: FormGroup = this.fb.group({});
  inputAddressObj: InputAddressObj = new InputAddressObj();
  inputLookupObj: InputLookupObj = new InputLookupObj();
  IsUseDigitalization: string = "0";
  officeCode: string;
  thirdPartyTrxNo: string = null;

  constructor(private regexService: RegexService, private toastr: NGXToastrService,
    private http: HttpClient, private fb: FormBuilder,
    private cookieService: CookieService, private modalService: NgbModal) {
  }

  //#region Readonly
  readonly RefMasterTypeCodeIdType: string = CommonConstant.RefMasterTypeCodeIdType;
  readonly RefMasterTypeCodeGender: string = CommonConstant.RefMasterTypeCodeGender;
  readonly RefMasterTypeCodeMaritalStat: string = CommonConstant.RefMasterTypeCodeMaritalStat;
  readonly RefMasterTypeCodeCustModel: string = CommonConstant.RefMasterTypeCodeCustModel;

  readonly CustTypePersonal: string = CommonConstant.CustomerPersonal;
  readonly AttrGroupCustPersonalOther: string = CommonConstant.AttrGroupCustPersonalOther;
  readonly listAttrCodes: Array<string> = [CommonConstant.AttrCodeDeptAml, CommonConstant.AttrCodeAuthAml];

  readonly CustDataModeMain: string = CommonConstant.CustMainDataModeCust;
  readonly CustDataModeFamily: string = CommonConstant.CustMainDataModeFamily;
  readonly CustDataModeShareholder: string = CommonConstant.CustMainDataModeMgmntShrholder;
  //#endregion

  DictUcDDLObj: { [id: string]: UcDropdownListObj } = {};
  async ngOnInit() {
    this.InitData();
    this.InitCustMainDataMode();
    this.BindLookupSupplier();
    this.BindLookupExistingCust();
    this.GetCustRelationship();
    this.ClearCustForm();
    this.getInitPattern();
    this.DictUcDDLObj[this.RefMasterTypeCodeIdType] = NewCustSetData.initDdlRefMaster(this.RefMasterTypeCodeIdType, null, true);
    this.onOptionsSelected();
    this.DictUcDDLObj[this.RefMasterTypeCodeGender] = NewCustSetData.initDdlRefMaster(this.RefMasterTypeCodeGender);
    this.DictUcDDLObj[this.RefMasterTypeCodeMaritalStat] = NewCustSetData.initDdlRefMaster(this.RefMasterTypeCodeMaritalStat);
    this.DictUcDDLObj[this.RefMasterTypeCodeCustModel] = NewCustSetData.initDdlRefMaster(this.RefMasterTypeCodeCustModel, CommonConstant.CustTypePersonal, true);
    await this.GetExistingData();
    this.GetCustAddrToCopy();
    this.existingCustomerLookUpObj.isReady = true;
    this.getIsUseDigitalization();
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
    this.officeCode = context[CommonConstant.OFFICE_CODE];

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

  //#region UcLookup
  BindLookupSupplier() {
    this.inputLookupObj = new InputLookupObj();
    this.inputLookupObj.isReady = false;
    this.inputLookupObj.urlJson = "./assets/lookup/lookupSupplierPersonal.json";
    this.inputLookupObj.pagingJson = "./assets/lookup/lookupSupplierPersonal.json";
    this.inputLookupObj.genericJson = "./assets/lookup/lookupSupplierPersonal.json";
    this.inputLookupObj.isReady = true;
    this.inputLookupObj.isRequired = false;
  }

  existingCustomerLookUpObj: InputLookupObj = new InputLookupObj();
  BindLookupExistingCust() {
    if (this.CustDataMode == this.CustDataModeMain) return;
    this.existingCustomerLookUpObj = NewCustSetData.BindLookupExistingCust(this.ParentCustId, this.listCustNoToExclude, CommonConstant.CustomerPersonal);
    if (this.CustId != 0) this.existingCustomerLookUpObj.isDisable = true;
  }
  //#endregion

  //#region UcDDL
  MrCustRelationshipCodeObj: Array<KeyValueObj> = new Array<KeyValueObj>();
  readonly RefMasterTypeCodeCustPersonalRelationship: string = CommonConstant.RefMasterTypeCodeCustPersonalRelationship;
  async GetCustRelationship() {
    this.DictUcDDLObj[this.RefMasterTypeCodeCustPersonalRelationship] = new UcDropdownListObj();
    this.DictUcDDLObj[this.RefMasterTypeCodeCustPersonalRelationship].isSelectOutput = true;
    let tempReq: ReqRefMasterByTypeCodeAndMappingCodeObj = new ReqRefMasterByTypeCodeAndMappingCodeObj();
    tempReq.RefMasterTypeCode = this.RefMasterTypeCodeCustPersonalRelationship;
    this.http.post(URLConstant.GetListActiveRefMasterWithMappingCodeAll, tempReq).subscribe(
      async (response) => {
        this.MrCustRelationshipCodeObj = response[CommonConstant.ReturnObj];
        if (!this.isMarried) await this.removeSpouse();
        this.DictUcDDLObj[this.RefMasterTypeCodeCustPersonalRelationship].isReady = true;
      }
    );
  }

  getIsUseDigitalization(){
    this.http.post(URLConstant.GetGeneralSettingValueByCode, {Code: CommonConstant.GSCodeIsUseDigitalization}).subscribe(
      (response) => {
        this.IsUseDigitalization = response["GsValue"];
      }
    );
  }


  removeSpouse() {
    let idxSpouse = this.MrCustRelationshipCodeObj.findIndex(x => x.Key == CommonConstant.MasteCodeRelationshipSpouse);
    this.MrCustRelationshipCodeObj.splice(idxSpouse, 1)
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
      IsSupplier: [false],
      SupplCode: [''],
      SupplName: [''],
      SupplId: [''],
      MrCustRelationship: [''],
      MrCustModelCode: [''],
      MobilePhnNo1: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
      Email1: ['', [Validators.required, Validators.pattern(CommonConstant.regexEmail)]]
    });

    if (this.CustDataMode != this.CustDataModeMain) {
      this.CustomerForm.get("CustName").disable();
    }
    if (this.CustDataMode == this.CustDataModeFamily) {
      this.CustomerForm.get("MrCustRelationship").setValidators(Validators.required);
      this.CustomerForm.get("MrCustRelationship").updateValueAndValidity();
    }
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
  IsLockCopyAddrBtn: boolean = false;
  async GetExistingData() {
    if (this.CustId == 0) return;
    await this.GetCustData();
    this.GetCustAddr();
    await this.GetCustPersonalData();
    this.GetMrRelationship();

    if (this.CustDataMode != CommonConstant.CustMainDataModeCust) {
      this.IsLockEdit();
    }
    this.IsLockCopyAddrBtn = true;
  }

  async GetCustData(custId: number = this.CustId) {
    let datePipe = new DatePipe("en-US");
    await this.http.post(URLConstant.GetCustByCustId, { Id: custId }).toPromise().then(
      (response: CustObj) => {
        this.custObj = response;
        this.thirdPartyTrxNo = this.custObj.ThirdPartyTrxNo;
        this.CustomerForm.patchValue({
          CustName: this.custObj.CustName,
          MrCustTypeCode: this.custObj.MrCustTypeCode,
          MrIdTypeCode: this.custObj.MrIdTypeCode,
          IdNo: this.custObj.IdNo,
          IdExpiredDt: datePipe.transform(this.custObj.IdExpiredDt, 'yyyy-MM-dd'),
          TaxIdNo: this.custObj.TaxIdNo,
          MrCustModelCode: response.MrCustModelCode ? response.MrCustModelCode : "",
        });
        if (this.CustDataMode != this.CustDataModeMain) {
          if (this.CustDataMode == this.CustDataModeFamily) this.familyForm.PatchCriteriaLookupProfession();
          if (this.CustDataMode == this.CustDataModeShareholder) this.shareholderForm.PatchCriteriaLookupProfession();
        }
        this.existingCustomerLookUpObj.nameSelect = response.CustName;
        this.existingCustomerLookUpObj.jsonSelect = { CustName: response.CustName };
        this.existingCustomerLookUpObj.isReady = true;
        this.onOptionsSelected();
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
        let inputFieldObj = new InputFieldObj();
        inputFieldObj.inputLookupObj = new InputLookupObj();
        inputFieldObj.inputLookupObj.nameSelect = response.Zipcode;
        inputFieldObj.inputLookupObj.jsonSelect = { Zipcode: response.Zipcode };
        let tempUcAddObj: UcAddressObj = new UcAddressObj();
        tempUcAddObj.AreaCode1 = response.AreaCode1;
        tempUcAddObj.AreaCode2 = response.AreaCode2;
        tempUcAddObj.AreaCode3 = response.AreaCode3;
        tempUcAddObj.AreaCode4 = response.AreaCode4;
        tempUcAddObj.Addr = response.Addr;
        tempUcAddObj.City = response.City;
        tempUcAddObj.MrHouseOwnershipCode = response.MrBuildingOwnershipCode;
        this.inputAddressObj.default = tempUcAddObj;
        this.inputAddressObj.inputField = inputFieldObj;

        if (this.CustDataMode == CommonConstant.CustMainDataModeCust) {
          this.inputAddressObj.inputField.inputLookupObj.isReadonly = false;
        }
      }
    );
  }

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

  tempCustPersonalObj: CustPersonalObj = new CustPersonalObj();
  async GetCustPersonalData(custId: number = this.CustId) {
    let datePipe = new DatePipe("en-US");
    await this.http.post<CustPersonalObj>(URLConstant.GetCustPersonalbyCustId, { Id: custId }).toPromise().then(
      (response) => {
        this.tempCustPersonalObj = response;
        this.CustomerForm.patchValue({
          MrGenderCode: response.MrGenderCode,
          BirthPlace: response.BirthPlace,
          BirthDt: datePipe.transform(response.BirthDt, 'yyyy-MM-dd'),
          MotherMaidenName: response.MotherMaidenName,
          IsRestInPeace: response.IsRestInPeace,
          MrMaritalStatCode: response.MrMaritalStatCode,
          MobilePhnNo1: response.MobilePhnNo1,
          Email1: response.Email1
        });
        if (this.CustDataMode == this.CustDataModeFamily) this.familyForm.PatchExistingPersonalData(response);
      }
    );
  }

  tempCustPersonalFamilyObj: CustPersonalFamilyObj = new CustPersonalFamilyObj();
  GetMrRelationship(custPersonalFamilyId: number = this.CustPersonalFamilyId) {
    if (this.CustDataMode != this.CustDataModeFamily) return;
    this.http.post(URLConstant.GetCustPersonalFamilyByCustPersonalFamilyId, { Id: custPersonalFamilyId }).subscribe(
      (response: CustPersonalFamilyObj) => {
        this.tempCustPersonalFamilyObj = response;
        this.CustomerForm.patchValue({
          MrCustRelationship: response.MrCustRelationship,
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

        // ini kondisi apaan?
        if (response.MrIdTypeCode) {
          this.onOptionsSelected()
        }
      });

    this.http.post(URLConstant.GetVendorAddrByVendorCodeAndMrAddrTypeCode, { VendorCode: e.VendorCode, MrAddrTypeCode: CommonConstant.AddrTypeLegal }).subscribe(
      (response: VendorAddrObj) => {
        let inputFieldObj = new InputFieldObj();
        inputFieldObj.inputLookupObj = new InputLookupObj();
        inputFieldObj.inputLookupObj.isReadonly = false;
        inputFieldObj.inputLookupObj.nameSelect = response.Zipcode;
        inputFieldObj.inputLookupObj.jsonSelect = { Zipcode: response.Zipcode };
        let tempUcAddObj: UcAddressObj = new UcAddressObj();
        tempUcAddObj.AreaCode1 = response.AreaCode1;
        tempUcAddObj.AreaCode2 = response.AreaCode2;
        tempUcAddObj.AreaCode3 = response.AreaCode3;
        tempUcAddObj.AreaCode4 = response.AreaCode4;
        tempUcAddObj.Addr = response.Addr;
        tempUcAddObj.City = response.City;
        this.inputAddressObj.default = tempUcAddObj;
        this.inputAddressObj.inputField = inputFieldObj;
      }
    );
  }

  ExistingFormObj: CustFormExistingObj = new CustFormExistingObj();
  GetExistingFormObj(ev: CustFormExistingObj) {
    this.ExistingFormObj = ev;
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

  async getLookUpCustomer(ev: { CustId: number, CustCompanyMgmntShrholderId: number }) {
    await this.GetCustData(ev.CustId);
    this.GetCustAddr(ev.CustId);
    await this.GetCustPersonalData(ev.CustId);
    if (this.CustDataMode == this.CustDataModeShareholder) {
      if (ev.CustCompanyMgmntShrholderId) this.shareholderForm.GetExistingShareholder(ev.CustCompanyMgmntShrholderId);
      this.shareholderForm.GetExistingJobData(ev.CustId);
    }
    if (this.CustDataMode == this.CustDataModeFamily) {
      this.familyForm.GetExistingJobData(ev.CustId);
    }
    this.custAttrForm.GetQuestion(ev.CustId);

    this.IsLockEdit();
  }

  IsLockEdit() {
    this.existingCustomerLookUpObj.isReadonly = true;
    this.inputAddressObj.isReadonly = true;
    this.inputAddressObj.inputField.inputLookupObj.isReadonly = true;
    this.inputAddressObj.inputField.inputLookupObj.isDisable = true;

    this.CustomerForm.get("CustName").disable();
    this.CustomerForm.get("MrGenderCode").disable();
    this.CustomerForm.get("MrIdTypeCode").disable();
    this.CustomerForm.get("BirthPlace").disable();
    this.CustomerForm.get("BirthDt").disable();
    this.CustomerForm.get("IdNo").disable();
    this.CustomerForm.get("TaxIdNo").disable();
    this.CustomerForm.get("IdExpiredDt").disable();
    this.CustomerForm.get("MrMaritalStatCode").disable();
    this.CustomerForm.get("MotherMaidenName").disable();
    this.CustomerForm.get("MobilePhnNo1").disable();
    this.CustomerForm.get("Email1").disable();
    this.IsLockCopyAddrBtn = true;
  }

  RelationshipChange(ev: string) {
    let tempMaritalStat = this.CustomerForm.get("MrMaritalStatCode");
    let isMarried: boolean = false;
    if (ev == CommonConstant.MasteCodeRelationshipSpouse) {
      isMarried = true;
      tempMaritalStat.patchValue(CommonConstant.MR_MARITAL_STAT_CODE_MARRIED);
      if (this.CustId == 0) tempMaritalStat.disable();
    } else {
      if (this.CustId == 0) {
        tempMaritalStat.enable();
      } else {
        tempMaritalStat.patchValue(this.tempCustPersonalObj.MrMaritalStatCode);
      }
    }
    this.existingCustomerLookUpObj.addCritInput = NewCustSetData.ResetCriteriaExisting(this.ParentCustId, this.listCustNoToExclude, CommonConstant.CustomerPersonal, isMarried);
    this.ucLookupExistingCust.setAddCritInput();
  }

  outputChangeReceived(ev: { Key: string, Code: string }) {
    switch (ev.Key) {
      case CommonConstant.CUST_CHANGE_PROFESSION:
        this.ChangeProfession(ev.Code);
        break;
    }
  }

  changeCustModel() {
    if (this.CustDataMode == this.CustDataModeShareholder) {
      this.shareholderForm.ResetLookupProfession();
    }
    if (this.CustDataMode == this.CustDataModeFamily) {
      this.familyForm.ResetLookupProfession();
    }
    this.ChangeProfession("");
  }

  //profession
  ChangeProfession(code: string) {
    if (this.CustDataMode == this.CustDataModeMain) return;
    this.custAttrForm.SetSearchListInputType(CommonConstant.AttrCodeDeptAml, code);
    this.custAttrForm.ResetValueFromAttrCode(CommonConstant.AttrCodeDeptAml);
  }

  //#endregion

  //#region Save
  Cancel() {
    this.outputCancel.emit();
  }

  SaveForm() {
    let tempForm = this.CustomerForm.getRawValue();
    let reqSubmitObj: ReqPersonalObj = new ReqPersonalObj();
    reqSubmitObj.CustObj = this.custObj;
    reqSubmitObj.CustObj.CustName = tempForm["CustName"];
    reqSubmitObj.CustObj.MrIdTypeCode = tempForm["MrIdTypeCode"];
    reqSubmitObj.CustObj.IdNo = tempForm["IdNo"];
    reqSubmitObj.CustObj.IdExpiredDt = tempForm["IdExpiredDt"];
    reqSubmitObj.CustObj.TaxIdNo = tempForm["TaxIdNo"];
    reqSubmitObj.CustObj.MrCustTypeCode = CommonConstant.CustomerPersonal;
    reqSubmitObj.CustObj.MrCustModelCode = tempForm["MrCustModelCode"];
    reqSubmitObj.CustObj.ThirdPartyTrxNo = this.thirdPartyTrxNo;

    reqSubmitObj.CustPersonalObj = this.tempCustPersonalObj;
    reqSubmitObj.CustPersonalObj.CustFullName = tempForm["CustName"];
    reqSubmitObj.CustPersonalObj.MrGenderCode = tempForm["MrGenderCode"];
    reqSubmitObj.CustPersonalObj.BirthPlace = tempForm["BirthPlace"];
    reqSubmitObj.CustPersonalObj.BirthDt = tempForm["BirthDt"];
    reqSubmitObj.CustPersonalObj.MotherMaidenName = tempForm["MotherMaidenName"];
    reqSubmitObj.CustPersonalObj.MrMaritalStatCode = tempForm["MrMaritalStatCode"];
    reqSubmitObj.CustPersonalObj.Email1 = tempForm["Email1"];
    reqSubmitObj.CustPersonalObj.MobilePhnNo1 = tempForm["MobilePhnNo1"];
    if (this.CustDataMode == this.CustDataModeFamily) {
      reqSubmitObj.CustPersonalObj.MrNationalityCode = tempForm["MrNationalityCode"];
      reqSubmitObj.CustPersonalObj.WnaCountryCode = tempForm["WnaCountryCode"];
      reqSubmitObj.CustPersonalFamilyObj = this.SetCustPersonalFamilyData();
    }

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

    if (this.CustDataMode != this.CustDataModeMain) {
      reqSubmitObj.CustObj.CustName = tempForm["ExistingCustName"].value;
      reqSubmitObj.CustPersonalObj.CustFullName = tempForm["ExistingCustName"].value;
      reqSubmitObj.CustPersonalJobObj = this.SetCustPersonalJobData();
      reqSubmitObj.CustAttrContentObjs = this.SetCustAttrContent();
    }
    if (this.CustDataMode == this.CustDataModeShareholder) {
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

  SetCustMgmntShareholder(): CustCompanyMgmntShrholderObj {
    let tempForm = this.CustomerForm.getRawValue();
    let tempReqObj: CustCompanyMgmntShrholderObj = this.ExistingFormObj.CustCompanyMgmntShrholder;
    tempReqObj.CustId = this.ParentCustId;
    tempReqObj.ShareholderId = this.CustId;

    tempReqObj.SharePrcnt = tempForm["SharePrcnt"];
    tempReqObj.MrPositionSlikCode = tempForm["MrPositionSlikCode"];
    tempReqObj.IsActive = tempForm["IsActive"];
    tempReqObj.IsOwner = tempForm["IsOwner"];
    tempReqObj.IsSigner = tempForm["IsSigner"];
    tempReqObj.EstablishmentDt = tempForm["EstablishmentDt"];

    return tempReqObj
  }

  SetCustPersonalJobData(): CustPersonalJobDataObj {
    let tempForm = this.CustomerForm.getRawValue();
    let tempReqObj: CustPersonalJobDataObj = this.ExistingFormObj.CustPersonalJob;
    tempReqObj.CustId = this.CustId;

    tempReqObj.RefProfessionId = tempForm["RefProfessionId"] != 0 ? tempForm["RefProfessionId"] : null;
    tempReqObj.MrJobPositionCode = tempForm["MrJobPositionCode"];
    if (this.CustDataMode == this.CustDataModeFamily) {
      tempReqObj.EmploymentEstablishmentDt = tempForm["EmploymentEstablishmentDt"];
      if (!tempReqObj.RefProfessionId && !tempReqObj.MrJobPositionCode && !tempReqObj.EmploymentEstablishmentDt) tempReqObj = null;
    } else {
      if (!tempReqObj.RefProfessionId && !tempReqObj.MrJobPositionCode) tempReqObj = null;
    }
    return tempReqObj
  }

  identifierCustAttr: string = "CustAttrForm";
  SetCustAttrContent(): Array<CustAttrContentObj> {
    let tempAttr: Array<CustAttrContentObj> = new Array();
    let tempFormArray = this.CustomerForm.get(this.identifierCustAttr) as FormArray;
    for (let index = 0; index < tempFormArray.length; index++) {
      const element = tempFormArray.get(index.toString()).value;
      let tempAttrToPush: CustAttrContentObj = new CustAttrContentObj();
      tempAttrToPush.RefAttrId = element["RefAttrId"];
      tempAttrToPush.CustId = element["CustId"];
      tempAttrToPush.AttrValue = element["AttrValue"];
      tempAttr.push(tempAttrToPush);
    }
    return tempAttr;
  }

  SetCustPersonalFamilyData(): CustPersonalFamilyObj {
    let tempFamilyData: CustPersonalFamilyObj = this.tempCustPersonalFamilyObj;

    tempFamilyData.CustId = this.ParentCustId;
    tempFamilyData.FamilyId = this.CustId;
    tempFamilyData.MrCustRelationship = this.CustomerForm.get("MrCustRelationship").value;

    return tempFamilyData;
  }
  //#endregion

  async ReqPefindo(){
    this.markFormGroupTouched(this.CustomerForm);
    if(!this.CustomerForm.valid){
      return;
    }

    await this.checkThirdPartyTrxNo();

    let tempForm = this.CustomerForm.getRawValue();

    let reqPefindoSmartSearchObj = new ReqPefindoSmartSearchObj();
    reqPefindoSmartSearchObj.CustName = tempForm["CustName"];
    reqPefindoSmartSearchObj.CustType = CommonConstant.MR_CUST_TYPE_CODE_PERSONAL;
    reqPefindoSmartSearchObj.BirthDt = tempForm["BirthDt"];
    reqPefindoSmartSearchObj.IdNo = tempForm["IdNo"];
    reqPefindoSmartSearchObj.IdType = tempForm["MrIdTypeCode"];

    const modalRef = this.modalService.open(PefindoReqComponent);
    modalRef.componentInstance.ReqPefindoSmartSearchObj = reqPefindoSmartSearchObj;
    modalRef.componentInstance.ThirdPartyTrxNo = this.thirdPartyTrxNo;

  }

  ViewPefindo(){
    
  }

  async ReqTrustingSocial(){
    this.markFormGroupTouched(this.CustomerForm);
    if(!this.CustomerForm.valid){
      return;
    }
    
    await this.checkThirdPartyTrxNo();

    let tempForm = this.CustomerForm.getRawValue();
    let custObj: CustObj = new CustObj();
    let custPersonalObj = new CustPersonalObj();
    custObj.CustName = tempForm["CustName"];
    custObj.CustNo = this.custObj.CustNo;
    custObj.TaxIdNo = tempForm["TaxIdNo"];
    custObj.ThirdPartyTrxNo = this.thirdPartyTrxNo;
    custObj.MrCustTypeCode = CommonConstant.MR_CUST_TYPE_CODE_PERSONAL;
    custObj.MrIdTypeCode = tempForm["MrIdTypeCode"];

    if(tempForm["MrIdTypeCode"] == CommonConstant.MrIdTypeCodeEKTP){
      custObj.MrIdTypeCode = tempForm["MrIdTypeCode"];
      custObj.IdNo = tempForm["IdNo"];
    }else{
      custObj.MrIdTypeCode = CommonConstant.TrustingSocialDummyIdType;
      custObj.IdNo = CommonConstant.TrustingSocialDummyIdNo;
    }

    custPersonalObj.MobilePhnNo1 = tempForm["MobilePhnNo1"];

    const modalRef = this.modalService.open(TrustingSocialReqHeaderComponent);
    modalRef.componentInstance.CustObj = custObj;
    modalRef.componentInstance.CustPersonalObj = custPersonalObj;
  }


  ViewTrustingSocial(){    
    const modalRef = this.modalService.open(TrustingSocialViewHeaderComponent);
    modalRef.componentInstance.ThirdPartyTrxNo = this.thirdPartyTrxNo;
  }

  async checkThirdPartyTrxNo(){
    if(this.thirdPartyTrxNo == null || this.thirdPartyTrxNo == ""){
      var reqGenerateTrxNoObj = new ReqGenerateTrxNoObj();
      reqGenerateTrxNoObj.MasterSeqCode = CommonConstant.MasterSequenceCodeCustomerThirdParty;
      reqGenerateTrxNoObj.OfficeCode = this.officeCode;

      await this.http.post(URLConstant.GenerateTransactionNoFromRedis, reqGenerateTrxNoObj).toPromise().then(
        (response: ResGenerateTrxNoObj) => {
          this.thirdPartyTrxNo = response.TrxNo;
        }
      );
    }
  }

   markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
