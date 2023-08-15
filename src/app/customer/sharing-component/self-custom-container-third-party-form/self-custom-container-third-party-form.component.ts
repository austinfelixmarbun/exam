import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { CurrentUserContext } from 'app/shared/model/current-user-context.model';
import { CookieService } from 'ngx-cookie';
import { ThirdPartyUploadService } from '../new-cust-component/component/third-party-form/services/ThirdPartyUpload.Service';
import { AdInsHelperService } from 'app/shared/services/AdInsHelper.service';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { KeyValueObj } from 'app/shared/model/key-value/key-value-obj.model';
import { CustDocFileFormObj } from 'app/shared/model/cust-doc-file/cust-doc-file-form-obj.model';
import { CustDocFileObj } from 'app/shared/model/cust-doc-file/cust-doc-file-obj.model';
import { ResSysConfigResultObj } from 'app/shared/model/response/res-sys-config-result-obj,model';
import { String } from 'typescript-string-operations';
import { ReqRefMasterByTypeCodeAndMappingCodeObj } from 'app/shared/model/ref-master/req-ref-master-by-type-code-and-mapping-code-obj.model';

@Component({
  selector: 'app-self-custom-container-third-party-form',
  templateUrl: './self-custom-container-third-party-form.component.html',
  styleUrls: ['./self-custom-container-third-party-form.component.css']
})
export class SelfCustomContainerThirdPartyFormComponent implements OnInit {

  IsCustLoaded: boolean = true;
  @Input() CustId: number = 0;
  @Input() parentForm: FormGroup;
  @Input() MrCustTypeCode: string = CommonConstant.MR_CUST_TYPE_CODE_PERSONAL;
  @Input() CustDataMode: string = CommonConstant.CustMainDataModeCust;

  @Output() OutputUploadFile: EventEmitter<Array<CustDocFileFormObj>> = new EventEmitter<Array<CustDocFileFormObj>>();

  officeCode: string;
  IsUseDigitalization: string = "0";
  IsUseTs: Boolean = false;
  IsUsePefindo: Boolean = false;
  IsUseAsliRI: Boolean = false;
  IsUseCbasSlik: Boolean = false;
  ListDocumentKeyValueObj: Array<KeyValueObj> = new Array<KeyValueObj>();
  SpouseIdCode : string = "";

  width: number;
  height: number;
  url: any;

  CustDocFileFormObjs: Array<CustDocFileFormObj> = new Array<CustDocFileFormObj>();
  CustDocFileObjs: Array<CustDocFileObj> = new Array<CustDocFileObj>();
  sysConfigResultObj: ResSysConfigResultObj = new ResSysConfigResultObj();

  readonly CustDataModeMain: string = CommonConstant.CustMainDataModeCust;
  readonly FileExtAllowed: Array<string> = [CommonConstant.FileExtensionPdf, CommonConstant.FileExtensionJpg, CommonConstant.FileExtensionJpeg, CommonConstant.FileExtensionGif, CommonConstant.FileExtensionPng]
  readonly ExtStr: string = String.Join(", ", this.FileExtAllowed);

  readonly FileExtAllowedAsliRI: Array<string> = [CommonConstant.FileExtensionJpg, CommonConstant.FileExtensionJpeg, CommonConstant.FileExtensionPng, CommonConstant.FileExtensionBmp]
  readonly ExtStrAsliRI: string = String.Join(", ", this.FileExtAllowedAsliRI);

  constructor(private toastr: NGXToastrService,
    private http: HttpClient, private fb: FormBuilder,
    private cookieService: CookieService, private modalService: NgbModal,
    private thirdPartyUploadService: ThirdPartyUploadService, 
    private UrlConstantNew: UrlConstantNew,
    private adInsHelperService: AdInsHelperService) { }

  async ngOnInit() {
    // if (this.CustId == 0)
    // {
    //   this.IsCustLoaded = true
    // }
    console.log(this.parentForm.getRawValue())
    alert(this.MrCustTypeCode)

    let context: CurrentUserContext = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
    this.officeCode = context[CommonConstant.OFFICE_CODE];
    await this.getIsUseDigitalization();
    if (this.IsUseDigitalization == CommonConstant.TRUE_CONDITION) {
      await this.getDigitalizationSvcType();
      if (this.CustId > 0) {
        await this.getCustDocFiles();
      }
      await this.getListDocumentToBeUpload();
    }
  }

  async getIsUseDigitalization() {
    await this.http.post(this.UrlConstantNew.GetGeneralSettingValueByCode, { Code: CommonConstant.GSCodeIsUseDigitalization }).toPromise().then(
      (response) => {
        this.IsUseDigitalization = response["GsValue"];
      }
    );
  }

  async getDigitalizationSvcType() {
    await this.http.post<ResSysConfigResultObj>(this.UrlConstantNew.GetSysConfigPncplResultByCode, { Code: CommonConstant.ConfigCodeDigitalizationSvcType }).toPromise().then(
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

    await this.http.post<ResSysConfigResultObj>(this.UrlConstantNew.GetSysConfigPncplResultByCode, { Code: CommonConstant.SvcTypeAsliRi }).toPromise().then(
      (response) => {
        if(response.ConfigValue == "1")
        {
          this.IsUseAsliRI = true;
        }
      });

    await this.http.post<ResSysConfigResultObj>(this.UrlConstantNew.GetSysConfigPncplResultByCode, { Code: CommonConstant.SvcTypeCbasSlik }).toPromise().then(
      (response) => {
        if(response.ConfigValue == "1") this.IsUseCbasSlik = true;
      }
    );
  }

  async getListDocumentToBeUpload() {
    let tempReq: ReqRefMasterByTypeCodeAndMappingCodeObj = new ReqRefMasterByTypeCodeAndMappingCodeObj();
    tempReq.RefMasterTypeCode = CommonConstant.RefMasterTypeCodeCustDocType;
    tempReq.MappingCode = this.MrCustTypeCode;
    await this.http.post(this.UrlConstantNew.GetListActiveRefMasterWithMappingCodeAll, tempReq).toPromise().then(
      async (response) => {
        this.ListDocumentKeyValueObj = response[CommonConstant.ReturnObj];
        for (let i = 0; i < this.ListDocumentKeyValueObj.length; i++) {
          var custDocFileFormObj = new CustDocFileFormObj();

          custDocFileFormObj.MrCustDocTypeCode = this.ListDocumentKeyValueObj[i].Key;
          custDocFileFormObj.DocTypeName = this.ListDocumentKeyValueObj[i].Value;
          var existingCustDocFile = this.CustDocFileObjs.find(x => x.MrCustDocTypeCode == this.ListDocumentKeyValueObj[i].Key);
          if (this.CustId == 0 || existingCustDocFile == undefined) {
            custDocFileFormObj.IsRequired = true;
          } else {
            custDocFileFormObj.IsRequired = false;
          }

          if(custDocFileFormObj.DocTypeName == CommonConstant.ASLI_RI_SELFIE)
          {
            custDocFileFormObj.IsRequired = false;
          }
          custDocFileFormObj.File = null;

          this.CustDocFileFormObjs.push(custDocFileFormObj);
        }
        this.setDocFormCustMaritalTypeChanged();
        // this.OutputUploadFile.emit(this.CustDocFileFormObjs);
      }
    );
  }

  setDocFormCustMaritalTypeChanged(){
    let idxObj = this.CustDocFileFormObjs.findIndex(x => x.MrCustDocTypeCode == CommonConstant.MasterCodeCustDocTypeSpouseId);
    if(this.parentForm.controls.MrMaritalStatCode.value == CommonConstant.MR_MARITAL_STAT_CODE_SINGLE){
      this.CustDocFileFormObjs[idxObj].IsRequired = false;
    }
    else{
      this.CustDocFileFormObjs[idxObj].IsRequired = true;
    }
  }

  async getCustDocFiles() {
    var reqByIdObj = { Id: this.CustId };
    await this.http.post(this.UrlConstantNew.GetListCustDocFileByCustId, reqByIdObj).toPromise().then(
      async (response) => {
        this.CustDocFileObjs = response[CommonConstant.ReturnObj];
      }
    );
  }

  SetThirdPartyTrxNo(ev: any)
  {

  }

  SetCustFileFormObjs(ev: any)
  {

  }

}
