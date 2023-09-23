import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CustPersonalFinDataObj } from 'app/shared/model/cust-personal-fin-data-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { FormBuilder, Validators } from '@angular/forms';
import { InputLookupObj } from 'app/shared/model/input-lookup-obj.model';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { Router } from '@angular/router';
import { CustCompanyObj } from 'app/shared/model/cust-company-obj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { DatePipe } from '@angular/common';
import { ResCustCompanyIndustryInfoObj } from 'app/shared/model/res-cust-company-industry-info-obj.model';
import { ReqAddEditCustCompanyIndustryInfoObj } from 'app/shared/model/req-add-edit-cust-company-industry-info-obj.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { CookieService } from 'ngx-cookie';
import { environment } from 'environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-self-custom-cust-company-industry-info',
  templateUrl: './self-custom-cust-company-industry-info.component.html',
  styleUrls: []
})
export class SelfCustomCustCompanyIndustryInfo implements OnInit {
  ListCustIndustryInfo: Array<ResCustCompanyIndustryInfoObj> = [];
  ReqCustIndustryInfoObj = new ReqAddEditCustCompanyIndustryInfoObj;
  industryInfo: ResCustCompanyIndustryInfoObj;
  custPersonalId: number;
  mrMaritalStatCode: string;
  currentModal: any;
  lookUpObj: InputLookupObj;
  mode : string;
  
  @Input() CustId: number;
  @Input() CustNo: string;
  @ViewChild('ModalIndustryList') ModalIndustryList;

  IndustryInfoForm = this.fb.group({
    BusinessStartDate: ['', [Validators.required]],
    Notes: [''],
    IsMain: [false],
    RefIndustryTypeCode: [],
    RefIndustryTypeName: [],
    RowVersion: [''],
    ByteBase64: [''],
    DocUploadName: [''],
  });
  constructor(
      private http: HttpClient,
      private router: Router,
      private toastr: NGXToastrService,
      private fb: FormBuilder,
      private modalService: NgbModal, 
      private UrlConstantNew: UrlConstantNew,
      private cookieService: CookieService,
      private spinner: NgxSpinnerService
  ) { }

  async ngOnInit(): Promise<void> { 
    this.lookUpObj = new InputLookupObj(this.UrlConstantNew);
    this.lookUpObj.urlJson = "./assets/lookup/lookupIndustryType.json";
    this.lookUpObj.pagingJson = "./assets/lookup/lookupIndustryType.json";
    this.lookUpObj.genericJson = "./assets/lookup/lookupIndustryType.json";
    this.lookUpObj.isReady = true
    await this.getListCustIndustryInfo();
  }

  
  async getListCustIndustryInfo() {
    this.ListCustIndustryInfo = [];
    await this.http.post(this.UrlConstantNew.GetListCustCompanyIndustryInfoByCustId, { Id: this.CustId  }).toPromise().then((response: ResCustCompanyIndustryInfoObj) => {
      this.ListCustIndustryInfo = response['ListCustCompanyIndustryInfoObj']; 
    })    
  }

  showModalIndustryInfo(i: number) {
      this.getSingleIndustryInfo(i);
      this.currentModal = this.modalService.open(this.ModalIndustryList, { ariaLabelledBy: 'modal-basic-title', backdrop: 'static', keyboard: false });
  }

  getSingleIndustryInfo (i : number){
      this.industryInfo = this.ListCustIndustryInfo[i];
      var datePipe = new DatePipe("en-US");
      if (!this.industryInfo) {
        this.mode = 'add';
        this.industryInfo = new ResCustCompanyIndustryInfoObj();
        this.lookUpObj.nameSelect = ''
        this.lookUpObj.jsonSelect = {IndustryTypeName : ''}
      }else{
        this.mode = 'edit'
        this.lookUpObj.nameSelect = this.industryInfo.RefIndustryTypeName
        this.lookUpObj.jsonSelect = {IndustryTypeName : this.industryInfo.RefIndustryTypeName}
      }
      this.IndustryInfoForm.patchValue({
        BusinessStartDate: datePipe.transform(this.industryInfo.BusinessStartDate, 'yyyy-MM-dd'),
        Notes: this.industryInfo.Notes,
        IsMain: this.industryInfo.IsMain,
        RefIndustryTypeCode: this.industryInfo.RefIndustryTypeCode
      });
  }

  getLookUp(ev){
    this.IndustryInfoForm.patchValue({
      RefIndustryTypeCode: ev.IndustryTypeCode,
      RefIndustryTypeName: ev.IndustryTypeName
    })
  }

  async SaveIndustryInfo(){  
   
      this.ReqCustIndustryInfoObj = new ReqAddEditCustCompanyIndustryInfoObj
      this.ReqCustIndustryInfoObj.CustNo = this.CustNo,
      this.ReqCustIndustryInfoObj.RefIndustryTypeCode =this.IndustryInfoForm.controls['RefIndustryTypeCode'].value,
      this.ReqCustIndustryInfoObj.BusinessStartDate= this.IndustryInfoForm.controls['BusinessStartDate'].value,
      this.ReqCustIndustryInfoObj.IsMain= this.IndustryInfoForm.controls['IsMain'].value
      this.ReqCustIndustryInfoObj.Notes= this.IndustryInfoForm.controls['Notes'].value
      if(this.mode ==='edit'){
        this.ReqCustIndustryInfoObj.CustCompanyIndustryInfoId = this.industryInfo.CustCompanyIndustryInfoId;
        this.ReqCustIndustryInfoObj.RowVersion = this.industryInfo.RowVersion;
      }
      await this.http.post(this.UrlConstantNew.AddEditCustCompanyIndustryInfo, this.ReqCustIndustryInfoObj, AdInsConstant.SpinnerOptions).toPromise().then(
        async (response) => {
          this.toastr.successMessage(response["Message"]);

          if (this.IndustryInfoForm.controls['DocUploadName'].value == "") {
            this.currentModal.close("Success");
            this.getListCustIndustryInfo();
            return;
          }

          let reqObj = {
            CustCompanyIndustryInfoId: response["Id"] ,
            ByteBase64: this.IndustryInfoForm.controls['ByteBase64'].value,
            DocUploadName: this.IndustryInfoForm.controls['DocUploadName'].value,
          };
    
          let urlUpload = environment.FoundationR3Url + "/v1/BouwheerCompanyIndustryInfo/UploadBouwheerCompanyIndustryDoc";
          // await this.uploadDocFileMultipartForGeneralPurpose(reqObj, resSave["Message"], toastr, cookieService, urlUpload, router)
          
          try {
            if (environment.SpinnerOnHttpPost) this.spinner.show();
        
            const formData: any = new FormData();
            formData.append('reqObj', JSON.stringify(reqObj));
        
            const xhr = new XMLHttpRequest();
        
            const xhrPromise = new Promise<void>((resolve, reject) => {
              xhr.onreadystatechange = evnt => {
                if (xhr.readyState === 4) {
                  if (xhr.status === 200 || xhr.status === 201) {
                    resolve();
                  } else {
                    reject(new Error('Upload Failed !'));
                  }
                }
              };
        
              xhr.onerror = evnt => {
                reject(new Error('Upload Failed !'));
              };
        
              xhr.open('POST', this.UrlConstantNew.UploadCustCompanyIndustryDoc, true);
              const value = this.cookieService.get('XSRF-TOKEN');
              const token = this.DecryptString(value, environment.ChipperKeyCookie);
              xhr.setRequestHeader('AdInsKey', `${token}`);
              xhr.send(formData);
            });
        
            await xhrPromise; // Tunggu sampai permintaan XHR selesai
        
          } catch (error) {
            this.toastr.errorMessage(error.message || 'An error occurred during upload.');
          } finally {
            if (environment.SpinnerOnHttpPost) this.spinner.hide();
            this.currentModal.close(response["Message"]);
            this.getListCustIndustryInfo();
          }
        }
      );
      
    }

    DecryptString(chipperText: string, chipperKey: string) {
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
  
    async deleteModalIndustryInfo(i : number){
      if (confirm(ExceptionConstant.DELETE_CONFIRMATION)) {
          var ReqIdForDelete = { 
            CustCompanyIndustryInfoId : this.ListCustIndustryInfo[i].CustCompanyIndustryInfoId,
            CustNo : this.CustNo
           };
          await this.http.post(this.UrlConstantNew.DeleteCustCompanyIndustryInfo, ReqIdForDelete, AdInsConstant.SpinnerOptions).toPromise().then(
            (response) => {
              if(response['Message'] === 'Success'){
                this.ListCustIndustryInfo.splice(i, 1);
              }
            }
          );
      }
    }

    async onFileChange(event) {
      const file = (event.target as HTMLInputElement).files[0];
      let ByteBase64: any = await this.readFileAsDataURL(file);
      this.IndustryInfoForm.patchValue({
        ByteBase64: ByteBase64.substring(ByteBase64.lastIndexOf(',') + 1),
        DocUploadName: file.name
      });
    }

    async readFileAsDataURL(file) {
      let result_base64 = await new Promise((resolve) => {
        let reader = new FileReader();
        reader.onload = (e) => resolve(reader.result);
        reader.readAsDataURL(file);
      });
      return result_base64;
    }
}
