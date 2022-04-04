import { UclookupgenericComponent } from '@adins/uclookupgeneric';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { RegexService } from 'app/customer/regex.service';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CookieService } from 'ngx-cookie';
import { CustAttrFormComponent } from 'app/customer/sharing-component/new-cust-component/component/cust-attr-form/cust-attr-form.component';
import { FamilyFormXComponent } from '../component/family-form/family-form-x.component';
import { ShareholderFormXComponent } from '../component/shareholder-form/shareholder-form-x.component';
import { NewCustSetData } from 'app/customer/sharing-component/new-cust-component/NewCustSetData.Service';
import { ThirdPartyUploadService } from 'app/customer/sharing-component/new-cust-component/component/third-party-form/services/ThirdPartyUpload.Service';
import { ActivatedRoute } from '@angular/router';
import { CustObj } from 'app/shared/model/cust-obj.model';
import { InputLookupObj } from 'app/shared/model/input-lookup-obj.model';
import { InputAddressObj } from 'app/shared/model/input-address-obj.model';
import { CustDocFileFormObj } from 'app/shared/model/cust-doc-file/cust-doc-file-form-obj.model';
import { KeyValueObj } from 'app/shared/model/key-value/key-value-obj.model';
import { ReqRefMasterByTypeCodeAndMappingCodeObj } from 'app/shared/model/ref-master/req-ref-master-by-type-code-and-mapping-code-obj.model';
import { UcDropdownListObj } from 'app/shared/model/library/uc-dropdown-list-obj.model';
import { CustomPatternObj } from 'app/shared/model/library-obj/custom-pattern-obj.model';
import { GenericObj } from 'app/shared/model/Generic/generic-obj.model';
import { CustAddrObj } from 'app/shared/model/cust-addr-obj.model';
import { InputFieldObj } from 'app/shared/model/input-field-obj.model';
import { CustPersonalObj } from 'app/shared/model/cust-personal-obj.model';
import { CustPersonalFamilyObj } from 'app/shared/model/new-cust/cust-personal-family-obj.model';
import { CurrentUserContext } from 'app/shared/model/current-user-context.model';
import { UcAddressObj } from 'app/shared/model/uc-address-obj.model';
import { VendorAddrObj } from 'app/shared/model/vendor-addr-obj.model';
import { VendorObj } from 'app/shared/model/vendor-obj.model';
import { CustFormExistingObj } from 'app/shared/model/new-cust/shareholder/shareholder-form-existing-obj.model';
import { CustCompanyMgmntShrholderObj, ResCustCompanyMgmntShrholderObj } from 'app/shared/model/new-cust/cust-company-mgmnt-shrholder-obj.model';
import { ReqPersonalObj } from 'app/shared/model/new-cust/req-personal-obj.model';
import { CustPersonalJobDataObj } from 'app/shared/model/cust-personal-job-data-obj.model';
import { CustAttrContentObj } from 'app/shared/model/new-cust/cust-attr-content-obj.model';
import { String } from 'typescript-string-operations';
import { ThirdPartyFormComponent } from 'app/customer/sharing-component/new-cust-component/component/third-party-form/third-party-form.component';

@Component({
  selector: 'app-new-cust-personal-main-data-x',
  templateUrl: './new-cust-personal-main-data-x.component.html'
})
export class NewCustPersonalMainDataXComponent implements OnInit {

  @ViewChild('ShareholderFormX') shareholderForm: ShareholderFormXComponent;
  @ViewChild('FamilyForm') familyForm: FamilyFormXComponent;
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
  @Input() isFamily: boolean = false;
  @Input() isShareholder: boolean = false;
  @Input() CustDataMode: string = CommonConstant.CustMainDataModeCust; // Cust Mode
  @Output() outputAfterSave: EventEmitter<ReqPersonalObj> = new EventEmitter();
  @Output() outputCancel: EventEmitter<string> = new EventEmitter();


  custObj: CustObj = new CustObj();
  CustomerForm: FormGroup = this.fb.group({});
  inputAddressObj: InputAddressObj = new InputAddressObj();
  inputLookupObj: InputLookupObj = new InputLookupObj();
  checkIsAddressKnown: boolean = false;
  thirdPartyTrxNo: string = null;
  CustDocFileFormObjs: Array<CustDocFileFormObj> = new Array<CustDocFileFormObj>();
  pageFrom: string = CommonConstant.CustFromEditMainData;
  isReady: boolean = false;
  @ViewChild(ThirdPartyFormComponent) child: ThirdPartyFormComponent;

  constructor(private regexService: RegexService, private toastr: NGXToastrService,
    private http: HttpClient, private fb: FormBuilder,
    private cookieService: CookieService,
    private thirdPartyUploadService: ThirdPartyUploadService,
    private route: ActivatedRoute, private newCustService: NewCustSetData) {
    this.route.queryParams.subscribe(params => {
      if (params["From"] != null) {
        this.pageFrom = params["From"];
      }
    });
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

  readonly FileExtAllowed: Array<string> = [CommonConstant.FileExtensionPdf, CommonConstant.FileExtensionJpg, CommonConstant.FileExtensionJpeg, CommonConstant.FileExtensionGif, CommonConstant.FileExtensionPng]

  readonly CustFromEditMainData: string = CommonConstant.CustFromEditMainData;
  readonly CustFromCustShareholder: string = CommonConstant.CustFromCustShareholder;
  //#endregion

  DictUcDDLObj: { [id: string]: UcDropdownListObj } = {};
  async ngOnInit() {
    this.checkIsAddressKnown = false;
    this.ClearCustForm();
    this.InitData();
    this.InitCustMainDataMode();
    this.BindLookupSupplier();
    this.BindLookupExistingCust();
    await this.GetCustRelationship();
    this.getInitPattern();
    this.DictUcDDLObj[this.RefMasterTypeCodeIdType] = NewCustSetData.initDdlRefMaster(this.RefMasterTypeCodeIdType, null, true);
    this.onOptionsSelected();
    this.DictUcDDLObj[this.RefMasterTypeCodeGender] = NewCustSetData.initDdlRefMaster(this.RefMasterTypeCodeGender);
    this.DictUcDDLObj[this.RefMasterTypeCodeMaritalStat] = NewCustSetData.initDdlRefMaster(this.RefMasterTypeCodeMaritalStat, null, true);
    this.DictUcDDLObj[this.RefMasterTypeCodeCustModel] = NewCustSetData.initDdlRefMaster(this.RefMasterTypeCodeCustModel, CommonConstant.CustTypePersonal, true);
    await this.GetExistingData();
    await this.GetCustAddrToCopy();
    this.existingCustomerLookUpObj.isReady = true;
    this.isAddressIsNull();
    if (this.CustDataMode != this.CustDataModeFamily) {
      this.checkIsAddressKnown = true;
    }
    await this.getMinMaxAgeCustPersonalFromGenSet();
  }


  OnCheckIsAddressKnown(isChecked: boolean) {
    this.checkIsAddressKnown = isChecked;
    // this.ClearCustForm();
    this.setAddressValidator();
    console.log(this.CustomerForm);
  }

  setAddressValidator() {
    if (this.checkIsAddressKnown == true) {
    } else {
      this.CustomerForm.get('UcAddress.Addr').clearValidators();
      this.CustomerForm.get('UcAddress.AreaCode1').clearValidators();
      this.CustomerForm.get('UcAddress.AreaCode2').clearValidators();
      this.CustomerForm.get('UcAddress.AreaCode3').clearValidators();
      this.CustomerForm.get('UcAddress.AreaCode4').clearValidators();
      this.CustomerForm.get('UcAddress.City').clearValidators();
      this.CustomerForm.get('UcAddress.MrHouseOwnershipCode').clearValidators();
      this.CustomerForm.get('UcAddressZipcode.value').clearValidators();

      this.CustomerForm.get('UcAddress.Addr').updateValueAndValidity();
      this.CustomerForm.get('UcAddress.AreaCode1').updateValueAndValidity();
      this.CustomerForm.get('UcAddress.AreaCode2').updateValueAndValidity();
      this.CustomerForm.get('UcAddress.AreaCode3').updateValueAndValidity();
      this.CustomerForm.get('UcAddress.AreaCode4').updateValueAndValidity();
      this.CustomerForm.get('UcAddress.City').updateValueAndValidity();
      this.CustomerForm.get('UcAddress.MrHouseOwnershipCode').updateValueAndValidity();
      this.CustomerForm.get('UcAddressZipcode.value').updateValueAndValidity();
    }
  }

  isAddressIsNull() {
    if (
      (this.inputAddressObj.default.Addr == "" || this.inputAddressObj.default.Addr == null) &&
      (this.inputAddressObj.default.AreaCode1 == "" || this.inputAddressObj.default.AreaCode1 == null) &&
      (this.inputAddressObj.default.AreaCode2 == "" || this.inputAddressObj.default.AreaCode2 == null) &&
      (this.inputAddressObj.default.AreaCode3 == "" || this.inputAddressObj.default.AreaCode3 == null) &&
      (this.inputAddressObj.default.AreaCode4 == "" || this.inputAddressObj.default.AreaCode4 == null) &&
      (this.inputAddressObj.default.City == "" || this.inputAddressObj.default.City == null) &&
      (this.inputAddressObj.default.MrHouseOwnershipCode == null || this.inputAddressObj.default.MrHouseOwnershipCode == "")
    ) {
      this.checkIsAddressKnown = false;
    } else {
      this.checkIsAddressKnown = true;
    }
  }

  //#region Set Data
  businessDtMin: Date;
  businessDtMax: Date;
  MaxDate: Date;
  MaxDtValidate: string;
  async InitData() {
    let context: CurrentUserContext = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
    this.businessDtMin = new Date(context[CommonConstant.BUSINESS_DT]);
    this.businessDtMin.setFullYear(this.businessDtMin.getFullYear() - 17);
    this.businessDtMax = new Date(context[CommonConstant.BUSINESS_DT]);
    this.businessDtMax.setDate(this.businessDtMax.getDate() + 1);
    this.MaxDate = new Date(context.BusinessDt);
    this.MaxDate.setDate(this.MaxDate.getDate() - 1);
    var datePipe = new DatePipe("en-US");
    this.MaxDtValidate = datePipe.transform(this.MaxDate, "yyyy-MM-dd");

    this.inputAddressObj = this.BindSetLegalAddr();
    this.isReady = true;
  }

  BindSetLegalAddr(): InputAddressObj {
    let inputFieldObj = new InputFieldObj();
    inputFieldObj.inputLookupObj = new InputLookupObj();
    let inputAddressObj = new InputAddressObj();
    inputAddressObj.showSubsection = false;
    inputAddressObj.title = "Customer Address";
    inputAddressObj.inputField = inputFieldObj;
    inputAddressObj.showAllPhn = false;
    inputAddressObj.showOwnership = true;
    inputAddressObj.requiredOwnership = false;

    return inputAddressObj;
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
    await this.http.post(URLConstant.GetListActiveRefMasterWithMappingCodeAll, tempReq).toPromise().then(
      async (response) => {
        this.MrCustRelationshipCodeObj = response[CommonConstant.ReturnObj];
        if (!this.isMarried) await this.removeSpouse();
        this.DictUcDDLObj[this.RefMasterTypeCodeCustPersonalRelationship].isReady = true;
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
      CustName: ['', [Validators.required, Validators.maxLength(500)]],
      CustPrefixName: [''],
      CustSuffixName: [''],
      MrGenderCode: ['', [Validators.required]],
      MrIdTypeCode: ['', [Validators.required, Validators.maxLength(100)]],
      BirthPlace: ['', [Validators.required]],
      BirthDt: ['', [Validators.required]],
      IdNo: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
      TaxIdNo: ['', [Validators.pattern("^[0-9]+$"), Validators.minLength(15), Validators.maxLength(15)]],
      IdExpiredDt: [''],
      MrMaritalStatCode: ['', Validators.required],
      MotherMaidenName: ['', this.isFamily ? [Validators.maxLength(500), Validators.minLength(2), Validators.pattern("^[a-zA-Z `]*$")] : this.isShareholder ? [Validators.maxLength(100), Validators.minLength(2), Validators.pattern("^[a-zA-Z `]*$")] : [Validators.required, Validators.maxLength(100), Validators.minLength(2), Validators.pattern("^[a-zA-Z `]*$")]],
      IsSupplier: [false],
      SupplCode: [''],
      SupplName: [''],
      SupplId: [''],
      MrCustRelationship: [''],
      MrCustModelCode: ['', this.CustDataMode == this.CustDataModeMain ? [Validators.required] : []],
      MobilePhnNo1: ['', this.isFamily ? [Validators.required, Validators.pattern("^[0-9]+$")] : this.isShareholder ? [Validators.pattern("^[0-9]+$")] : [Validators.required, Validators.pattern("^[0-9]+$")]],
      Email1: ['', Validators.pattern(CommonConstant.regexEmail)],
      UcAddress: this.fb.group({
        Addr: [''],
        AreaCode1: [''],
        AreaCode2: [''],
        AreaCode3: [''],
        AreaCode4: [''],
        City: [''],
        MrHouseOwnershipCode: [''],
      }),
      UcAddressZipcode: this.fb.group({
        value: [''],
      })
    });

    if (this.CustDataMode != this.CustDataModeMain) {
      this.CustomerForm.get("CustName").disable();
    }

    if (this.CustDataMode == this.CustDataModeShareholder || this.pageFrom == CommonConstant.CustFromCustShareholder) {
      this.CustomerForm.get("MrMaritalStatCode").clearValidators();
      this.CustomerForm.get("MrMaritalStatCode").updateValueAndValidity();
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
  IsCustLoaded: boolean = false;
  async GetExistingData() {
    if (this.CustId == 0) {
      this.custObj.IsCustomer = true;
      this.IsCustLoaded = true;
      return;
    }
    await this.GetCustData();

    await this.GetCustAddr();
    await this.GetCustPersonalData();
    await this.GetMrRelationship();

    if (this.CustDataMode != CommonConstant.CustMainDataModeCust) {
      this.IsLockEdit();
    }
    this.IsLockCopyAddrBtn = true;
    if (this.pageFrom == "EditMainData") {
      this.CustomerForm.get("CustName").disable();
      this.CustomerForm.get("BirthDt").disable();
      this.CustomerForm.get("IdNo").disable();
      this.CustomerForm.get("TaxIdNo").disable();
      this.CustomerForm.get("MotherMaidenName").disable();
    }
  }

  async GetCustData(custId: number = this.CustId) {
    let datePipe = new DatePipe("en-US");
    await this.http.post(URLConstant.GetCustByCustId, { Id: custId }).toPromise().then(
      (response: CustObj) => {
        console.log('CustData', response);
        this.custObj = response;
        this.thirdPartyTrxNo = this.custObj.ThirdPartyTrxNo;
        this.IsCustLoaded = true;
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
        if (
          (response.AreaCode1 == "" || response.AreaCode1 == null) &&
          (response.AreaCode2 == "" || response.AreaCode2 == null) &&
          (response.AreaCode3 == "" || response.AreaCode3 == null) &&
          (response.AreaCode4 == "" || response.AreaCode1 == null) &&
          (response.Addr == "" || response.Addr == null) &&
          (response.City == "" || response.City == null) &&
          (response.MrHouseOwnershipCode == "" || response.MrHouseOwnershipCode == null)
        ) {
          this.checkIsAddressKnown = false;
        } else {
          this.checkIsAddressKnown = true;
        }
        if (this.CustDataMode == CommonConstant.CustMainDataModeCust) {
          this.inputAddressObj.inputField.inputLookupObj.isReadonly = false;
        }
        if (this.pageFrom == "CustFamily") {
          this.inputAddressObj.isRequired = false;
          this.inputAddressObj.inputField.inputLookupObj.isRequired = false;
          this.inputAddressObj.requiredOwnership = false;
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
    await this.http.post(URLConstant.GetCustAddrByMrCustAddrType, reqObj).toPromise().then(
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
        console.log('CustPersonal', response);
        this.tempCustPersonalObj = response;
        this.CustomerForm.patchValue({
          CustPrefixName: response.CustPrefixName,
          CustSuffixName: response.CustSuffixName,
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
  async GetMrRelationship(custPersonalFamilyId: number = this.CustPersonalFamilyId) {
    if (this.CustDataMode != this.CustDataModeFamily) return;
    await this.http.post(URLConstant.GetCustPersonalFamilyByCustPersonalFamilyId, { Id: custPersonalFamilyId }).toPromise().then(
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
          MobilePhnNo1: response.MobilePhnNo1,
          Email1: response.Email
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

  async getLookUpCustomer(ev: { CustId: number }) {
    await this.GetCustData(ev.CustId);
    this.GetCustAddr(ev.CustId);
    await this.GetCustPersonalData(ev.CustId);
    if (this.CustDataMode == this.CustDataModeShareholder) {
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
    // this.inputAddressObj.isReadonly = true;
    // this.inputAddressObj.inputField.inputLookupObj.isReadonly = true;
    // this.inputAddressObj.inputField.inputLookupObj.isDisable = true;

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

  async RelationshipChange(ev: string) {
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
    await this.getMinMaxAgeCustPersonalFromGenSet();
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

  changeCustMaritalStat() {
    this.child.setDocFormCustMaritalTypeChanged();
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

  async SaveForm() {
    if (this.thirdPartyTrxNo != null && !this.thirdPartyUploadService.ValidateFileUpload(this.CustDocFileFormObjs)) {
      return;
    }

    if (this.CustDataMode != this.CustDataModeFamily) {
      this.checkIsAddressKnown = true;
    }

    if (this.checkIsAddressKnown == false) {
      console.log(false)
      this.CustomerForm.patchValue({
        UcAddress: {
          Addr: "",
          AreaCode1: "",
          AreaCode2: "",
          AreaCode3: "",
          AreaCode4: "",
          City: "",
          MrHouseOwnershipCode: ""
        },
        UcAddressZipcode: {
          value: ""
        }
      });
    }

    if(!this.validateCustPersonalAge()) return;

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
    reqSubmitObj.CustPersonalObj.CustPrefixName = tempForm["CustPrefixName"];
    reqSubmitObj.CustPersonalObj.CustSuffixName = tempForm["CustSuffixName"];
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

    if (this.tempCustAddr.RowVersion === null) {
      this.tempCustAddr.RowVersion = "";
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
      if (tempForm["IsOwner"] == true && tempForm["SharePrcnt"] < 0.0001) {
        this.toastr.warningMessage("Owner Need to Input Share Prcnt");
        return;
      }
      reqSubmitObj.CustCompanyMgmntShrholderObj = await this.SetCustMgmntShareholder();

      if (reqSubmitObj.CustCompanyMgmntShrholderObj.IsActive) {
        let tempTotalSharePrctTobeAdd = this.tempTotalSharePrct + reqSubmitObj.CustCompanyMgmntShrholderObj.SharePrcnt;
        if (tempTotalSharePrctTobeAdd > 100) {
          this.toastr.warningMessage(ExceptionConstant.TOTAL_SHARE_CAN_NOT_100);
          this.toastr.warningMessage("Total Share now is " + this.tempTotalSharePrct + "%");
          return;
        }
      }

      if (reqSubmitObj.CustCompanyMgmntShrholderObj.EstablishmentDt != null) {
        if (reqSubmitObj.CustCompanyMgmntShrholderObj.EstablishmentDt.toString() > this.MaxDtValidate) {
          this.toastr.warningMessage(String.Format(ExceptionConstant.EST_DATE_MUST_BE_LESS_THAN_BIZ_DATE));
          return false;
        }
      }

    }

    reqSubmitObj = this.SetCustomerDataMode(reqSubmitObj);

    reqSubmitObj.CustDocFileObjs = await this.thirdPartyUploadService.ConvertToCustDocFileObj(this.CustDocFileFormObjs);
    this.outputAfterSave.emit(reqSubmitObj);
  }

  private SetCustomerDataMode(reqSubmitObj: ReqPersonalObj) {
    switch (this.CustDataMode) {
      case this.CustDataModeMain:
        this.SetIsTypeDataMode(reqSubmitObj);
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

  private SetIsTypeDataMode(reqSubmitObj: ReqPersonalObj) {
    if (this.pageFrom == CommonConstant.CustFromEditMainData) reqSubmitObj.CustObj.IsCustomer = true;
    if (this.pageFrom == CommonConstant.CustFromCustFamily) reqSubmitObj.CustObj.IsFamily = true;
    if (this.pageFrom == CommonConstant.CustFromCustShareholder) reqSubmitObj.CustObj.IsShareholder = true;
  }

  async SetCustMgmntShareholder(): Promise<CustCompanyMgmntShrholderObj> {
    let CustCompanyMgmntShrholder: ResCustCompanyMgmntShrholderObj = new ResCustCompanyMgmntShrholderObj();
    await this.http.post<ResCustCompanyMgmntShrholderObj>(URLConstant.GetCustCompanyMgmntShrholderByCustIdAndShrholderId, { CustId: this.ParentCustId, ShrholderId: this.CustId }).toPromise().then(
      async (response) => {
        CustCompanyMgmntShrholder = response;
      }
    )
    let tempForm = this.CustomerForm.getRawValue();
    let tempReqObj: CustCompanyMgmntShrholderObj = new CustCompanyMgmntShrholderObj();
    tempReqObj.CustId = this.ParentCustId;
    tempReqObj.ShareholderId = this.CustId;

    tempReqObj.SharePrcnt = tempForm["SharePrcnt"];
    tempReqObj.MrPositionSlikCode = tempForm["MrPositionSlikCode"];
    tempReqObj.IsActive = tempForm["IsActive"];
    tempReqObj.IsOwner = tempForm["IsOwner"];
    tempReqObj.IsSigner = tempForm["IsSigner"];
    tempReqObj.EstablishmentDt = tempForm["EstablishmentDt"];
    tempReqObj.MrJobPositionCode = tempForm["MrJobPositionCode"];
    tempReqObj.RowVersion = CustCompanyMgmntShrholder.RowVersion;

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

  SetThirdPartyTrxNo(e) {
    this.thirdPartyTrxNo = e;
  }

  SetCustFileFormObjs(e) {
    this.CustDocFileFormObjs = e;
  }

  minCustPerAge: number;
  maxCustPerAge: number;
  minCustPerAgeDt: Date;
  maxCustPerAgeDt: Date;
  async getMinMaxAgeCustPersonalFromGenSet()
  {
    var context = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
    var businessDt:Date = new Date(context[CommonConstant.BUSINESS_DT]);
    // jika family & bukan spouse maka skip
    if(
      this.CustDataMode == this.CustDataModeFamily && 
      this.CustomerForm.get('MrCustRelationship').value != CommonConstant.MasteCodeRelationshipSpouse)
    {
      this.minCustPerAge = 0;
      this.minCustPerAgeDt = new Date(businessDt);
      return;
    }

    await this.http.post(URLConstant.GetGeneralSettingValueByCode, {Code: CommonConstant.GSCodeCustAgeLimit}).toPromise().then(
      (response) => {
        var listGsAge: Array<string> = response && response["GsValue"] ? response["GsValue"].split(';') : [17];
        this.minCustPerAge = Number(listGsAge[0]);
        this.maxCustPerAge = listGsAge && listGsAge.length > 1 ? Number(listGsAge[1]) : 0;

        this.minCustPerAgeDt = new Date(businessDt);
        this.minCustPerAgeDt.setFullYear(this.minCustPerAgeDt.getFullYear() - this.minCustPerAge);

        if(this.maxCustPerAge > 0 && this.maxCustPerAge > this.minCustPerAge) {
          this.maxCustPerAgeDt = new Date(businessDt);
          this.maxCustPerAgeDt.setFullYear(this.maxCustPerAgeDt.getFullYear() - this.maxCustPerAge);
        }
      }
    );
  }

  validateCustPersonalAge()
  {
    // jika family & bukan spouse maka skip
    if(
      this.CustDataMode == this.CustDataModeFamily && 
      this.CustomerForm.get('MrCustRelationship').value != CommonConstant.MasteCodeRelationshipSpouse
    ) return true;
  
    var birthDt:Date = new Date(this.CustomerForm.get('BirthDt').value);

    if(this.maxCustPerAge > 0 && (birthDt > this.minCustPerAgeDt || birthDt < this.maxCustPerAgeDt))
    {
      this.toastr.warningMessage(String.Format(ExceptionConstant.CUST_AGE_BETWEEN, this.minCustPerAge, this.maxCustPerAge));
      return false;
    }

    if(birthDt > this.minCustPerAgeDt)
    {
      this.toastr.warningMessage(String.Format(ExceptionConstant.CUST_AGE_MIN, this.minCustPerAge));
      return false;
    }

    return true;
  }
}
