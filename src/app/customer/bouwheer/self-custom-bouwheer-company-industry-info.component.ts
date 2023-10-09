import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CustPersonalFinDataObj } from 'app/shared/model/cust-personal-fin-data-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { FormBuilder, Validators } from '@angular/forms';
import { CustPersonalObj } from 'app/shared/model/cust-personal-obj.model';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InputLookupObj } from 'app/shared/model/input-lookup-obj.model';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { Router } from '@angular/router';
import { CustCompanyObj } from 'app/shared/model/cust-company-obj.model';
import { ReqAddEditBouwheerCompanyIndustryInfoObj } from 'app/shared/model/req-add-edit-bouwheer-company-industry-info-obj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { DatePipe } from '@angular/common';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { ResBouwheerCompanyIndustryInfoObj } from 'app/shared/model/res-bouwheer-company-industry-info-obj.model';
import { CookieService } from 'ngx-cookie';
import { environment } from 'environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { downloadDmsDocument, sendXhr } from 'app/shared/function/customer-function';

@Component({
  selector: 'app-self-custom-bouwheer-company-industry-info',
  templateUrl: './self-custom-bouwheer-company-industry-info.component.html',
  styleUrls: []
})
export class SelfCustomBouwheerCompanyIndustryInfo implements OnInit {
  ListBouwheerIndustryInfo: Array<ResBouwheerCompanyIndustryInfoObj> = [];
  ReqBouwheerIndustryInfoObj = new ReqAddEditBouwheerCompanyIndustryInfoObj;
  industryInfo: ResBouwheerCompanyIndustryInfoObj;
  custPersonalId: number;
  CustId: number;
  BouwheerNo: string;
  mrMaritalStatCode: string;
  currentModal: any;
  lookUpObj: InputLookupObj;
  mode: string;
  showDownload : boolean = false;
  Id : number = 0;

  @Input() BwrNo: string;
  @Input() BwrId: number;
  @Input() dicts: Record<string, any>;
  @ViewChild('ModalPersonalFinData') ModalPersonalFinData;
  @ViewChild('ModalIndustryList') ModalIndustryList;

  IndustryInfoForm = this.fb.group({
    BouwheerCompanyIndustryInfoId: [0],
    BusinessStartDate: ['', [Validators.required]],
    Notes: [''],
    IsMain: [false],
    RefIndustryTypeCode: [],
    RefIndustryTypeName: [],
    ByteBase64: [''],
    DocUploadName: [''],
    RowVersion: [''],
    index : [0]
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
    if (this.BwrId > 0){
      this.showDownload = true;
    }
    await this.getListBouwheerIndustryInfo();
  }


  async getListBouwheerIndustryInfo() {
    this.ListBouwheerIndustryInfo = [];
    await this.http.post(this.UrlConstantNew.GetBouwheerCompanyIndustryInfoByBouwheerNo, { Code: this.BwrNo }).toPromise().then((response: ResBouwheerCompanyIndustryInfoObj) => {
      this.ListBouwheerIndustryInfo = response['ListBouwheerCompanyIndustryInfo'];
    })
  }

  showModalIndustryInfo(i: number) {
    this.getSingleIndustryInfo(i);
    this.currentModal = this.modalService.open(this.ModalIndustryList, { ariaLabelledBy: 'modal-basic-title', backdrop: 'static', keyboard: false });
  }

  getSingleIndustryInfo(i: number) {
    this.industryInfo = this.ListBouwheerIndustryInfo[i];
    var datePipe = new DatePipe("en-US");
    if (!this.industryInfo) {
      this.mode = 'add';
      this.industryInfo = new ResBouwheerCompanyIndustryInfoObj();
      this.lookUpObj.nameSelect = ''
      this.lookUpObj.jsonSelect = { IndustryTypeName: '' }
    } else {
      this.mode = 'edit'
      this.lookUpObj.nameSelect = this.industryInfo.RefIndustryTypeName
      this.lookUpObj.jsonSelect = { IndustryTypeName: this.industryInfo.RefIndustryTypeName }
    }
    this.IndustryInfoForm.patchValue({
      BusinessStartDate: datePipe.transform(this.industryInfo.BusinessStartDate, 'yyyy-MM-dd'),
      Notes: this.industryInfo.Notes,
      IsMain: this.industryInfo.IsMain,
      RefIndustryTypeCode: this.industryInfo.RefIndustryTypeCode,
      RefIndustryTypeName: this.industryInfo.RefIndustryTypeName,
      BouwheerCompanyIndustryInfoId: this.industryInfo.BouwheerCompanyIndustryInfoId,
      index : i
    });
  }

  getLookUp(ev) {
    this.IndustryInfoForm.patchValue({
      RefIndustryTypeCode: ev.IndustryTypeCode,
      RefIndustryTypeName: ev.IndustryTypeName
    })
  }

  async SaveIndustryInfo() {
    
    if (this.BwrId > 0) {
      this.ReqBouwheerIndustryInfoObj = new ReqAddEditBouwheerCompanyIndustryInfoObj
      this.ReqBouwheerIndustryInfoObj.BouwheerId = this.BwrId,
        this.ReqBouwheerIndustryInfoObj.RefIndustryTypeCode = this.IndustryInfoForm.controls['RefIndustryTypeCode'].value,
        this.ReqBouwheerIndustryInfoObj.BusinessStartDate = this.IndustryInfoForm.controls['BusinessStartDate'].value,
        this.ReqBouwheerIndustryInfoObj.IsMain = this.IndustryInfoForm.controls['IsMain'].value
      this.ReqBouwheerIndustryInfoObj.Notes = this.IndustryInfoForm.controls['Notes'].value
      if (this.mode === 'edit') {
        this.ReqBouwheerIndustryInfoObj.BouwheerCompanyId = this.industryInfo.BouwheerCompanyId;
        this.ReqBouwheerIndustryInfoObj.BouwheerCompanyIndustryInfoId = this.industryInfo.BouwheerCompanyIndustryInfoId;
        this.ReqBouwheerIndustryInfoObj.RowVersion = this.industryInfo.RowVersion;
      }
      await this.http.post(this.UrlConstantNew.AddEditBouwheerCompanyIndustryInfo, this.ReqBouwheerIndustryInfoObj, AdInsConstant.SpinnerOptions).toPromise().then(
        async (response) => {
          this.toastr.successMessage(response["Message"]);
          // this.toastr.successMessage(response["Message"]);

          if (this.IndustryInfoForm.controls['DocUploadName'].value == "") {
            this.currentModal.close("Success");
            this.getListBouwheerIndustryInfo();
            return;
          }

          let reqObj = {
            BouwheerId: this.BwrId,
            uploadIndustryDocs: [
              {
                // BouwheerCompanyIndustryInfoId: response["Id"],
                RefIndustryTypeCode: this.ReqBouwheerIndustryInfoObj.RefIndustryTypeCode,
                ByteBase64: this.IndustryInfoForm.controls['ByteBase64'].value,
                DocUploadName: this.IndustryInfoForm.controls['DocUploadName'].value,
              }
            ]
          };
          // try {

            sendXhr(
              reqObj, 
              response["Message"], 
              this.toastr, 
              this.cookieService, 
              "/v1/BouwheerCompanyIndustryInfo/UploadBouwheerCompanyIndustryDoc",
              environment.FoundationR3Url,
              "reqObj"
              )
            .then(() => {
              // Berhasil diunggah
            })
            .catch((error) => {
              // Gagal unggah, error dapat digunakan untuk menampilkan pesan kesalahan
            });

            // if (environment.SpinnerOnHttpPost) this.spinner.show();

            // const formData: any = new FormData();
            // formData.append('reqObj', JSON.stringify(reqObj));

            // const xhr = new XMLHttpRequest();

            // const xhrPromise = new Promise<void>((resolve, reject) => {
            //   xhr.onreadystatechange = evnt => {
            //     if (xhr.readyState === 4) {
            //       if (xhr.status === 200 || xhr.status === 201) {
            //         resolve();
            //       } else {
            //         reject(new Error('Upload Failed !'));
            //       }
            //     }
            //   };

            //   xhr.onerror = evnt => {
            //     reject(new Error('Upload Failed !'));
            //   };

            //   xhr.open('POST', this.UrlConstantNew.UploadBouwheerCompanyIndustryDoc, true);
            //   const value = this.cookieService.get('XSRF-TOKEN');
            //   const token = this.DecryptString(value, environment.ChipperKeyCookie);
            //   xhr.setRequestHeader('AdInsKey', `${token}`);
            //   xhr.send(formData);
            // });

            // await xhrPromise;

          // } catch (error) {
          //   this.toastr.errorMessage(error.message || 'An error occurred during upload.');
          // } finally {
          //   // if (environment.SpinnerOnHttpPost) this.spinner.hide();
          // }
        });
      this.currentModal.close();
      this.getListBouwheerIndustryInfo();
    } else {
      if (this.mode == 'edit'){
        if (this.ListBouwheerIndustryInfo.length == 0) {
          if (this.IndustryInfoForm.controls['IsMain'].value == false) {
            this.toastr.warningMessage("The first input must be the main industry!")
            return;
          }
        } else {      
          let duplicateIndustryTypeCode = this.ListBouwheerIndustryInfo.find(x => x.RefIndustryTypeCode === this.IndustryInfoForm.controls['RefIndustryTypeCode'].value && x.BouwheerCompanyIndustryInfoId != this.IndustryInfoForm.controls['BouwheerCompanyIndustryInfoId'].value);
          if (duplicateIndustryTypeCode) {
            this.toastr.warningMessage("Industry type already exists!")
            return;
          }
          let duplicateMainIndustry = this.ListBouwheerIndustryInfo.find(x => x.IsMain === true && x.BouwheerCompanyIndustryInfoId != this.IndustryInfoForm.controls['BouwheerCompanyIndustryInfoId'].value);
          if (duplicateMainIndustry && this.IndustryInfoForm.controls['IsMain'].value == true) {
            this.toastr.warningMessage("There can only be one main industry!")
            return;
          }
        }
        let index =  this.IndustryInfoForm.controls['index'].value
        this.ListBouwheerIndustryInfo[index].RefIndustryTypeCode = this.IndustryInfoForm.controls['RefIndustryTypeCode'].value
        this.ListBouwheerIndustryInfo[index].BusinessStartDate = this.IndustryInfoForm.controls['BusinessStartDate'].value
        this.ListBouwheerIndustryInfo[index].IsMain = this.IndustryInfoForm.controls['IsMain'].value
        this.ListBouwheerIndustryInfo[index].Notes = this.IndustryInfoForm.controls['Notes'].value
        this.ListBouwheerIndustryInfo[index].RefIndustryTypeName = this.IndustryInfoForm.controls['RefIndustryTypeName'].value
      }
      else{
        if (this.ListBouwheerIndustryInfo.length == 0) {
          if (this.IndustryInfoForm.controls['IsMain'].value == false) {
            this.toastr.warningMessage("The first input must be the main industry!")
            return;
          }
        } else {      
          let duplicateIndustryTypeCode = this.ListBouwheerIndustryInfo.find(x => x.RefIndustryTypeCode == this.IndustryInfoForm.controls['RefIndustryTypeCode'].value);
          if (duplicateIndustryTypeCode) {
            this.toastr.warningMessage("Industry type already exists!")
            return;
          }
          let duplicateMainIndustry = this.ListBouwheerIndustryInfo.find(x => x.IsMain == true);
          if (duplicateMainIndustry && this.IndustryInfoForm.controls['IsMain'].value == true) {
            this.toastr.warningMessage("There can only be one main industry!")
            return;
          }
        }
        this.Id = this.Id + 1;        
        this.ListBouwheerIndustryInfo.push({
          RefIndustryTypeCode: this.IndustryInfoForm.controls['RefIndustryTypeCode'].value,
          BusinessStartDate: this.IndustryInfoForm.controls['BusinessStartDate'].value,
          IsMain: this.IndustryInfoForm.controls['IsMain'].value,
          Notes: this.IndustryInfoForm.controls['Notes'].value,
          BouwheerCompanyIndustryInfoId: this.Id,
          BouwheerCompanyId: 0,
          RefIndustryTypeName: this.IndustryInfoForm.controls['RefIndustryTypeName'].value,
          ByteBase64: this.IndustryInfoForm.controls['ByteBase64'].value,
          DocUploadName: this.IndustryInfoForm.controls['DocUploadName'].value,
          DocDmsId: 0,
          RowVersion: undefined
        });
      }
      this.dicts['ListBouwheerIndustryInfo'] = this.ListBouwheerIndustryInfo;
      this.currentModal.close("");
    }
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

  async readFileAsDataURL(file) {
    let result_base64 = await new Promise((resolve) => {
      let reader = new FileReader();
      reader.onload = (e) => resolve(reader.result);
      reader.readAsDataURL(file);
    });
    return result_base64;
  }

  async deleteModalIndustryInfo(i: number) {
    if (confirm(ExceptionConstant.DELETE_CONFIRMATION)) {
      if (this.ListBouwheerIndustryInfo[i].IsMain == true && this.ListBouwheerIndustryInfo.length > 1) {
        this.toastr.warningMessage("Cannot Delete Main Industry");
      } else {
        if (this.BwrId > 0) {
          var ReqIdForDelete = {
            BouwheerCompanyIndustryInfoId: this.ListBouwheerIndustryInfo[i].BouwheerCompanyIndustryInfoId,
            IsMain: this.ListBouwheerIndustryInfo[i].IsMain
          };
          await this.http.post(this.UrlConstantNew.DeleteBouwheerCompanyIndustryInfo, ReqIdForDelete, AdInsConstant.SpinnerOptions).toPromise().then(
            (response) => {
              this.ListBouwheerIndustryInfo.splice(i, 1);
            }
          );
        }
        else {
          this.ListBouwheerIndustryInfo.splice(i, 1);
        }
      }
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

  DownloadFileIndustryInfo(i:number){
    downloadDmsDocument(this.http, this.toastr, this.ListBouwheerIndustryInfo[i]);
  }
}
