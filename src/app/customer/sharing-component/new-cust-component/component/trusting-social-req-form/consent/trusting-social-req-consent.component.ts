import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { ReqPersonalObj } from 'app/shared/model/NewCust/ReqPersonalObj.Model';
import { ReqCoyObj } from 'app/shared/model/NewCust/ReqCoyObj.Model';
import { ReqRefMasterByTypeCodeAndMasterCodeObj } from 'app/shared/model/RefMaster/ReqRefMasterByTypeCodeAndMasterCodeObj.Model';
import { CustObj } from 'app/shared/model/CustObj.Model';
import { CustPersonalObj } from 'app/shared/model/CustPersonalObj.Model';
import { ReqUploadConsentTsObj } from 'app/shared/model/ThirdPartyRslt/ReqUploadConsentTsObj.model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { ThirdPartyRsltHObj } from 'app/shared/model/ThirdPartyRslt/ThirdPartyRsltHObj.model';


@Component({
  selector: 'app-trusting-social-req-consent',
  templateUrl: './trusting-social-req-consent.component.html',
  styleUrls: ['./trusting-social-req-consent.component.css'],
})
export class TrustingSocialReqConsentComponent implements OnInit {
  @Input() CustObj: CustObj;
  @Input() CustPersonalObj: CustPersonalObj;
  @Output() outUpload: EventEmitter<ThirdPartyRsltHObj> = new EventEmitter();


  readonly CustTypePersonal: string = CommonConstant.CustomerPersonal;

  CustTypeName: string;

  FileToUpload: File;
  Consent: any;

  ConsentForm = this.fb.group({
    Consent: ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    public activeModal: NgbActiveModal,
    private toastr: NGXToastrService
  ) { }

  ngOnInit() {
    this.getCustTypeDescr();
  }

  getCustTypeDescr(){
    var refMasterObj = new ReqRefMasterByTypeCodeAndMasterCodeObj();
    refMasterObj.RefMasterTypeCode = CommonConstant.RefMasterTypeCodeCustType;
    refMasterObj.MasterCode = this.CustObj.MrCustTypeCode;
    this.http.post(URLConstant.GetRefMasterByRefMasterTypeCodeAndMasterCode, refMasterObj).subscribe(
      (response) => {
        this.CustTypeName = response["Descr"];
      }
    );
  }

  UploadConsent(){
    var reqUploadConsentTsObj = new ReqUploadConsentTsObj();
    reqUploadConsentTsObj.TrxNo = this.CustObj.ThirdPartyTrxNo;
    reqUploadConsentTsObj.CustName = this.CustObj.CustName;
    reqUploadConsentTsObj.IdType = this.CustObj.MrIdTypeCode;
    reqUploadConsentTsObj.IdNo = this.CustObj.IdNo;
    
    if(this.CustObj.MrCustTypeCode == CommonConstant.MR_CUST_TYPE_CODE_PERSONAL){
      reqUploadConsentTsObj.MobilePhnNo = this.CustPersonalObj.MobilePhnNo1;
    }
    reqUploadConsentTsObj.FileName = this.FileToUpload.name;

    let reader = new FileReader();
    reader.readAsDataURL(this.FileToUpload);
    reader.onload = () => {
        reqUploadConsentTsObj.ConsentBase64 = reader.result;
        reqUploadConsentTsObj.ConsentBase64 = reqUploadConsentTsObj.ConsentBase64.substring(reqUploadConsentTsObj.ConsentBase64.lastIndexOf(',') + 1)
        this.http.post(URLConstant.UploadConsentTrustingSocial, reqUploadConsentTsObj).subscribe(
          (response: ThirdPartyRsltHObj) => {
            this.toastr.successMessage(response["Message"]);
            this.outUpload.emit(response);
          }
        );
    }
  }

  HandleFileInput(files: FileList){
    this.FileToUpload = files.item(0);
  }

  ConvertSize(fileSize: number) {
    // console.log(fileSize + " - "+ str);
    return fileSize < 1024000
      ? (fileSize / 1024).toFixed(2) + ' KB'
      : (fileSize / 1024000).toFixed(2) + ' MB';
  }
}
