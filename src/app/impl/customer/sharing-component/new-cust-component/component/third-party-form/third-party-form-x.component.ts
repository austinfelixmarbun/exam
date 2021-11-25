import { UclookupgenericComponent } from '@adins/uclookupgeneric';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CurrentUserContext } from 'app/shared/model/current-user-context.model';
import { CustObj } from 'app/shared/model/cust-obj.model';
import { CustPersonalObj } from 'app/shared/model/cust-personal-obj.model';
import { ReqPefindoSmartSearchObj } from 'app/shared/model/digitalization/req-pefindo-smart-search-obj.model';
import { KeyValueObj } from 'app/shared/model/key-value/key-value-obj.model';
import { ReqGenerateTrxNoObj } from 'app/shared/model/master-sequence/req-generate-trx-no-obj.model';
import { ResGenerateTrxNoObj } from 'app/shared/model/master-sequence/res-generate-trx-no-obj.model';
import { ReqRefMasterByTypeCodeAndMappingCodeObj } from 'app/shared/model/ref-master/req-ref-master-by-type-code-and-mapping-code-obj.model';
import { CookieService } from 'ngx-cookie';
import { String } from 'typescript-string-operations';
import { CustDocFileFormObj } from 'app/shared/model/cust-doc-file/cust-doc-file-form-obj.model';
import { CustDocFileObj } from 'app/shared/model/cust-doc-file/cust-doc-file-obj.model';
import { ResSysConfigResultObj } from 'app/shared/model/response/res-sys-config-result-obj,model';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { ThirdPartyUploadService } from 'app/customer/sharing-component/new-cust-component/component/third-party-form/services/ThirdPartyUpload.Service';
import { PefindoReqComponent } from 'app/customer/sharing-component/new-cust-component/component/third-party-form/pefindo/request/pefindo-req.component';
import { CommonConstantX } from 'app/impl/shared/constant/CommonConstantX';
import { GeneralSettingObj } from 'app/shared/model/general-setting-obj.model';
import { TrustingSocialReqHeaderComponent } from 'app/customer/sharing-component/new-cust-component/component/third-party-form/trusting-social/request/trusting-social-req-header.component';
import { TrustingSocialViewHeaderComponent } from 'app/customer/sharing-component/new-cust-component/component/third-party-form/trusting-social/view/trusting-social-view-header.component';
import { AdInsHelperX } from 'app/impl/shared/AdInsHelperX';

@Component({
  selector: 'app-third-party-form-x',
  templateUrl: './third-party-form-x.component.html',
  styleUrls: ['./third-party-form-x.component.css'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class ThirdPartyFormXComponent implements OnInit {

  constructor(private toastr: NGXToastrService,
    private http: HttpClient, private fb: FormBuilder,
    private cookieService: CookieService, private modalService: NgbModal,
    private thirdPartyUploadService: ThirdPartyUploadService) {
  }

  @Input() parentForm: FormGroup;
  @Input() thirdPartyTrxNo: string = null;
  @Input() custObj: CustObj = new CustObj();
  @Input() MrCustTypeCode: string = CommonConstant.MR_CUST_TYPE_CODE_PERSONAL;
  @Input() CustDataMode: string = CommonConstant.CustMainDataModeCust;
  @Output() OutputThirdPartyTrxNo: EventEmitter<string> = new EventEmitter<string>();
  @Output() OutputUploadFile: EventEmitter<Array<CustDocFileFormObj>> = new EventEmitter<Array<CustDocFileFormObj>>();


  officeCode: string;
  IsUseDigitalization: string = "0";
  IsUseTs: Boolean = false;
  IsUsePefindo: Boolean = false;
  ListDocumentKeyValueObj: Array<KeyValueObj> = new Array<KeyValueObj>();

  CustDocFileFormObjs: Array<CustDocFileFormObj> = new Array<CustDocFileFormObj>();
  CustDocFileObjs: Array<CustDocFileObj> = new Array<CustDocFileObj>();
  sysConfigResultObj: ResSysConfigResultObj = new ResSysConfigResultObj();

  readonly CustDataModeMain: string = CommonConstant.CustMainDataModeCust;
  readonly FileExtAllowed: Array<string> = [CommonConstant.FileExtensionPdf, CommonConstant.FileExtensionJpg, CommonConstant.FileExtensionJpeg, CommonConstant.FileExtensionGif, CommonConstant.FileExtensionPng]
  readonly ExtStr: string = String.Join(", ", this.FileExtAllowed);


  async ngOnInit(): Promise<void> {
    let context: CurrentUserContext = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
    this.officeCode = context[CommonConstant.OFFICE_CODE];
    await this.getIsUseDigitalization();
    if (this.IsUseDigitalization == CommonConstant.TRUE_CONDITION) {
      await this.getDigitalizationSvcType();
      if (this.custObj.CustId > 0) {
        await this.getCustDocFiles();
      }
      await this.getListDocumentToBeUpload();
    }
  }

  async getIsUseDigitalization() {
    await this.http.post(URLConstant.GetGeneralSettingValueByCode, { Code: CommonConstant.GSCodeIsUseDigitalization }).toPromise().then(
      (response) => {
        this.IsUseDigitalization = response["GsValue"];
      }
    );
  }

  async getDigitalizationSvcType() {
    await this.http.post<ResSysConfigResultObj>(URLConstant.GetSysConfigPncplResultByCode, { Code: CommonConstant.ConfigCodeDigitalizationSvcType }).toPromise().then(
      (response) => {
        this.sysConfigResultObj = response;
      });

    if (this.sysConfigResultObj.ConfigValue != null) {
      var listSvcType = this.sysConfigResultObj.ConfigValue.split("|");

      var svcTypeTs = listSvcType.find(x => x == CommonConstant.DigitalizationSvcTypeTrustingSocial);

      if (svcTypeTs != null) {
        this.IsUseTs = true;
      }

      var svcTypePefindo = listSvcType.find(x => x == CommonConstant.DigitalizationSvcTypePefindo);

      if (svcTypePefindo != null) {
        this.IsUsePefindo = true;
      }
    }
  }

  async getListDocumentToBeUpload() {
    let tempReq: ReqRefMasterByTypeCodeAndMappingCodeObj = new ReqRefMasterByTypeCodeAndMappingCodeObj();
    tempReq.RefMasterTypeCode = CommonConstant.RefMasterTypeCodeCustDocType;
    tempReq.MappingCode = this.MrCustTypeCode;
    await this.http.post(URLConstant.GetListActiveRefMasterWithMappingCodeAll, tempReq).toPromise().then(
      async (response) => {
        this.ListDocumentKeyValueObj = response[CommonConstant.ReturnObj];
        for (let i = 0; i < this.ListDocumentKeyValueObj.length; i++) {
          var custDocFileFormObj = new CustDocFileFormObj();

          custDocFileFormObj.MrCustDocTypeCode = this.ListDocumentKeyValueObj[i].Key;
          custDocFileFormObj.DocTypeName = this.ListDocumentKeyValueObj[i].Value;
          var existingCustDocFile = this.CustDocFileObjs.find(x => x.MrCustDocTypeCode == this.ListDocumentKeyValueObj[i].Key);
          if (this.custObj.CustId == 0 || existingCustDocFile == undefined) {
            custDocFileFormObj.IsRequired = true;
          } else {
            custDocFileFormObj.IsRequired = false;
          }
          custDocFileFormObj.File = null;

          this.CustDocFileFormObjs.push(custDocFileFormObj);
        }
        this.OutputUploadFile.emit(this.CustDocFileFormObjs);
      }
    );
  }

  async getCustDocFiles() {
    var reqByIdObj = { Id: this.custObj.CustId };
    await this.http.post(URLConstant.GetListCustDocFileByCustId, reqByIdObj).toPromise().then(
      async (response) => {
        this.CustDocFileObjs = response[CommonConstant.ReturnObj];
      }
    );
  }

  async ReqPefindo() {
    this.markFormGroupTouched(this.parentForm);
    if (!this.thirdPartyUploadService.ValidateFileUpload(this.CustDocFileFormObjs)) {
      return;
    }

    if (!this.parentForm.valid) {
      return;
    }

    await this.checkThirdPartyTrxNo();


    let tempForm = this.parentForm.getRawValue();

    let reqPefindoSmartSearchObj = new ReqPefindoSmartSearchObj();
    if (this.CustDataMode == this.CustDataModeMain) {
      reqPefindoSmartSearchObj.CustName = tempForm["CustName"];
    } else {
      reqPefindoSmartSearchObj.CustName = tempForm["ExistingCustName"]["value"];
    }
    reqPefindoSmartSearchObj.CustType = this.MrCustTypeCode;
    reqPefindoSmartSearchObj.BirthDt = tempForm["BirthDt"];

    if (this.MrCustTypeCode == CommonConstant.MR_CUST_TYPE_CODE_PERSONAL) {
      reqPefindoSmartSearchObj.IdType = tempForm["MrIdTypeCode"];
      reqPefindoSmartSearchObj.IdNo = tempForm["IdNo"];
    } else {
      reqPefindoSmartSearchObj.IdType = CommonConstant.MrIdTypeCodeNPWP;
      reqPefindoSmartSearchObj.IdNo = tempForm["TaxIdNo"];
    }

    const modalRef = this.modalService.open(PefindoReqComponent);
    modalRef.componentInstance.ReqPefindoSmartSearchObj = reqPefindoSmartSearchObj;
    modalRef.componentInstance.ThirdPartyTrxNo = this.thirdPartyTrxNo;

  }

  async ViewPefindo() {
    let PefindoBasicRole = "";
    let TrxNo = this.thirdPartyTrxNo;

    await this.http.post(URLConstant.GetGeneralSettingValueByCode, { Code: CommonConstantX.GSCodePefindoBasicRole }).toPromise().then(
      (response: GeneralSettingObj) => {
        PefindoBasicRole = response.GsValue;
      }
    )
    let Roles = PefindoBasicRole.split(',');
    let user = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
    if (Roles.includes(user.RoleCode)) {
      AdInsHelper.OpenPefindoView(TrxNo, this.MrCustTypeCode);
    } else {
      AdInsHelperX.OpenPefindoViewX(TrxNo, this.MrCustTypeCode, true);
    }
  }

  async ReqTrustingSocial() {
    this.markFormGroupTouched(this.parentForm);

    if (!this.parentForm.valid) {
      return;
    }

    let tempForm = this.parentForm.getRawValue();
    let custObj: CustObj = new CustObj();
    let custPersonalObj = new CustPersonalObj();

    // cek nomor telepon valid atau gak 
    if (this.MrCustTypeCode == CommonConstant.MR_CUST_TYPE_CODE_PERSONAL) {
      let MobilePhnNo = tempForm["MobilePhnNo1"];
      if (MobilePhnNo.substring(0, 2) != '62') {
        this.toastr.warningMessage(ExceptionConstant.MOBILE_PHN_NO_INVALID);
        return;
      }
    }

    if (!this.thirdPartyUploadService.ValidateFileUpload(this.CustDocFileFormObjs)) {
      return;
    }

    await this.checkThirdPartyTrxNo();

    if (this.CustDataMode == this.CustDataModeMain) {
      custObj.CustName = tempForm["CustName"];
    } else {
      custObj.CustName = tempForm["ExistingCustName"]["value"];
    }
    custObj.CustNo = this.custObj.CustNo;
    custObj.TaxIdNo = tempForm["TaxIdNo"];
    custObj.ThirdPartyTrxNo = this.thirdPartyTrxNo;
    custObj.MrCustTypeCode = this.MrCustTypeCode;

    if (tempForm["MrIdTypeCode"] == CommonConstant.MrIdTypeCodeEKTP) {
      custObj.MrIdTypeCode = tempForm["MrIdTypeCode"];
      custObj.IdNo = tempForm["IdNo"];
    } else {
      custObj.MrIdTypeCode = CommonConstant.TrustingSocialDummyIdType;
      custObj.IdNo = CommonConstant.TrustingSocialDummyIdNo;
    }

    if (this.MrCustTypeCode == CommonConstant.MR_CUST_TYPE_CODE_PERSONAL) {
      custPersonalObj.MobilePhnNo1 = tempForm["MobilePhnNo1"];
    }

    const modalRef = this.modalService.open(TrustingSocialReqHeaderComponent);
    modalRef.componentInstance.CustObj = custObj;
    modalRef.componentInstance.CustPersonalObj = custPersonalObj;
  }


  ViewTrustingSocial() {
    const modalRef = this.modalService.open(TrustingSocialViewHeaderComponent);
    modalRef.componentInstance.ThirdPartyTrxNo = this.thirdPartyTrxNo;
  }

  async checkThirdPartyTrxNo() {
    if (this.thirdPartyTrxNo == null || this.thirdPartyTrxNo == "") {
      var reqGenerateTrxNoObj = new ReqGenerateTrxNoObj();
      reqGenerateTrxNoObj.MasterSeqCode = CommonConstant.MasterSequenceCodeCustomerThirdParty;
      reqGenerateTrxNoObj.OfficeCode = this.officeCode;

      await this.http.post(URLConstant.GenerateTransactionNoFromRedis, reqGenerateTrxNoObj).toPromise().then(
        (response: ResGenerateTrxNoObj) => {
          this.thirdPartyTrxNo = response.TrxNo;
          this.OutputThirdPartyTrxNo.emit(this.thirdPartyTrxNo);
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

  HandleFileInput(files: FileList, i) {
    this.CustDocFileFormObjs[i].File = files.item(0);
    this.OutputUploadFile.emit(this.CustDocFileFormObjs);
  }

  ConvertSize(fileSize: number) {
    return fileSize < 1024000
      ? (fileSize / 1024).toFixed(2) + ' KB'
      : (fileSize / 1024000).toFixed(2) + ' MB';
  }
}
