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

  @Input() BwrNo: string;
  @Input() BwrId: number;
  @Input() dicts: Record<string, any>;
  @ViewChild('ModalPersonalFinData') ModalPersonalFinData;
  @ViewChild('ModalIndustryList') ModalIndustryList;

  IndustryInfoForm = this.fb.group({
    BusinessStartDate: ['', [Validators.required]],
    Notes: [''],
    IsMain: [false],
    RefIndustryTypeCode: [],
    RefIndustryTypeName: [],
    ByteBase64: [''],
    DocUploadName: [''],
    RowVersion: ['']
  });
  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: NGXToastrService,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private UrlConstantNew: UrlConstantNew,
    private cookieService: CookieService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.lookUpObj = new InputLookupObj(this.UrlConstantNew);
    this.lookUpObj.urlJson = "./assets/lookup/lookupIndustryType.json";
    this.lookUpObj.pagingJson = "./assets/lookup/lookupIndustryType.json";
    this.lookUpObj.genericJson = "./assets/lookup/lookupIndustryType.json";
    this.lookUpObj.isReady = true
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
      RefIndustryTypeCode: this.industryInfo.RefIndustryTypeCode
    });
  }

  getLookUp(ev) {
    this.IndustryInfoForm.patchValue({
      RefIndustryTypeCode: ev.IndustryTypeCode,
      RefIndustryTypeName: ev.IndustryTypeName
    })
  }

  async SaveIndustryInfo() {
    if (this.ListBouwheerIndustryInfo.length == 0) {
      if (this.IndustryInfoForm.controls['IsMain'].value == false) {
        this.toastr.warningMessage("The first input must be the main industry!")
        return;
      }
    } else {
      if (this.IndustryInfoForm.controls['IsMain'].value == true) {
        this.toastr.warningMessage("There can only be one main industry!")
        return;
      }
      let duplicateIndustryTypeCode = this.ListBouwheerIndustryInfo.find(x => x.RefIndustryTypeCode === this.IndustryInfoForm.controls['RefIndustryTypeCode'].value);
      if (duplicateIndustryTypeCode) {
        this.toastr.warningMessage("Industry type already exists!")
        return;
      }
    }
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
        (response) => {
          this.toastr.successMessage(response["Message"]);

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

          var formData: any = new FormData();
          formData.append('reqObj', JSON.stringify(reqObj));
          const xhr = new XMLHttpRequest();
          xhr.onreadystatechange = evnt => {
            if (xhr.readyState !== 4) return;

            if (xhr.status !== 200 && xhr.status !== 201) {
              this.toastr.errorMessage('Upload Failed !');
              return;
            }
            else {
              var response = JSON.parse(xhr.response);
              if (response.HeaderObj.StatusCode != '200') {
                this.toastr.errorMessage('Upload Failed ! ' + + response.HeaderObj.Message);
                return
              }
            }

            if (xhr.status === 200) {
              this.toastr.successMessage(response["Message"]);
              // DialogRef.close()
              return;
            }
          };

          xhr.onerror = evnt => {
            this.toastr.errorMessage('Upload Failed !');
            return;
          };

          xhr.open('POST', this.UrlConstantNew.UploadBouwheerCompanyIndustryDoc, true);
          let value = this.cookieService.get('XSRF-TOKEN');
          let token = this.DecryptString(value, environment.ChipperKeyCookie);
          xhr.setRequestHeader('AdInsKey', `${token}`);
          xhr.send(formData);
        });
      this.currentModal.close("Success");
      this.getListBouwheerIndustryInfo();
      // AdInsHelper.RedirectUrl(this.router,["/Customer/SelfCustom/Bouwheer/Detail"],{ BwrNo : this.BwrNo, CustType : CommonConstant.CustTypeCompany, mode : 'edit'});
    } else {
      this.ListBouwheerIndustryInfo.push({
        RefIndustryTypeCode: this.IndustryInfoForm.controls['RefIndustryTypeCode'].value,
        BusinessStartDate: this.IndustryInfoForm.controls['BusinessStartDate'].value,
        IsMain: this.IndustryInfoForm.controls['IsMain'].value,
        Notes: this.IndustryInfoForm.controls['Notes'].value,
        BouwheerCompanyIndustryInfoId: 0,
        BouwheerCompanyId: 0,
        RefIndustryTypeName: this.IndustryInfoForm.controls['RefIndustryTypeName'].value,
        ByteBase64: this.IndustryInfoForm.controls['ByteBase64'].value,
        DocUploadName: this.IndustryInfoForm.controls['DocUploadName'].value,
        RowVersion: undefined
      });
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
}
