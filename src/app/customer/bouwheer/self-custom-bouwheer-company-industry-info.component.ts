import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CustPersonalFinDataObj } from 'app/shared/model/cust-personal-fin-data-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { FormBuilder, Validators } from '@angular/forms';
import { ResBouwheerCompanyIncustryInfoObj } from 'app/shared/model/res-bouwheer-company-industry-info-obj.model';
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

@Component({
  selector: 'app-self-custom-bouwheer-company-industry-info',
  templateUrl: './self-custom-bouwheer-company-industry-info.component.html',
  styleUrls: []
})
export class SelfCustomBouwheerCompanyIndustryInfo implements OnInit {
  ListBouwheerIndustryInfo: Array<ResBouwheerCompanyIncustryInfoObj> = [];
  ReqBouwheerIndustryInfoObj = new ReqAddEditBouwheerCompanyIndustryInfoObj;
  industryInfo: ResBouwheerCompanyIncustryInfoObj;
  custPersonalId: number;
  CustId: number;
  BouwheerNo: string;
  mrMaritalStatCode: string;
  currentModal: any;
  lookUpObj: InputLookupObj;
  mode : string;
  
  @Input() BwrNo: string;
  @Input() BwrId: number;
  @Input() dicts: any;
  @ViewChild('ModalPersonalFinData') ModalPersonalFinData;
  @ViewChild('ModalIndustryList') ModalIndustryList;

  IndustryInfoForm = this.fb.group({
    BusinessStartDate: ['', [Validators.required]],
    Notes: [''],
    IsMain: [false],
    RefIndustryTypeCode: [],
    RefIndustryTypeName: [],
    RowVersion: ['']
  });
  constructor(
      private http: HttpClient,
      private router: Router,
      private toastr: NGXToastrService,
      private fb: FormBuilder,
      private modalService: NgbModal, 
      private UrlConstantNew: UrlConstantNew,
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
    await this.http.post(this.UrlConstantNew.GetBouwheerCompanyIndustryInfoByBouwheerNo, { Code: this.BwrNo  }).toPromise().then((response: ResBouwheerCompanyIncustryInfoObj) => {
      this.ListBouwheerIndustryInfo = response['ListBouwheerCompanyIndustryInfo']; 
    })    
  }

  showModalIndustryInfo(i: number) {
      this.getSingleIndustryInfo(i);
      this.currentModal = this.modalService.open(this.ModalIndustryList, { ariaLabelledBy: 'modal-basic-title', backdrop: 'static', keyboard: false });
  }

  getSingleIndustryInfo (i : number){
      this.industryInfo = this.ListBouwheerIndustryInfo[i];
      var datePipe = new DatePipe("en-US");
      if (!this.industryInfo) {
        this.mode = 'add';
        this.industryInfo = new ResBouwheerCompanyIncustryInfoObj();
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
    if(this.BwrId > 0){
      this.ReqBouwheerIndustryInfoObj = new ReqAddEditBouwheerCompanyIndustryInfoObj
      this.ReqBouwheerIndustryInfoObj.BouwheerId = this.BwrId,
      this.ReqBouwheerIndustryInfoObj.RefIndustryTypeCode =this.IndustryInfoForm.controls['RefIndustryTypeCode'].value,
      this.ReqBouwheerIndustryInfoObj.BusinessStartDate= this.IndustryInfoForm.controls['BusinessStartDate'].value,
      this.ReqBouwheerIndustryInfoObj.IsMain= this.IndustryInfoForm.controls['IsMain'].value
      this.ReqBouwheerIndustryInfoObj.Notes= this.IndustryInfoForm.controls['Notes'].value
      if(this.mode ==='edit'){
        this.ReqBouwheerIndustryInfoObj.BouwheerCompanyId = this.industryInfo.BouwheerCompanyId;
        this.ReqBouwheerIndustryInfoObj.BouwheerCompanyIndustryInfoId = this.industryInfo.BouwheerCompanyIndustryInfoId;
        this.ReqBouwheerIndustryInfoObj.RowVersion = this.industryInfo.RowVersion;
      }
      await this.http.post(this.UrlConstantNew.AddEditBouwheerCompanyIndustryInfo, this.ReqBouwheerIndustryInfoObj, AdInsConstant.SpinnerOptions).toPromise().then(
        (response) => {
          this.toastr.successMessage(response["Message"]);
        }
      );
      this.currentModal.close("Success");
      this.getListBouwheerIndustryInfo();
      AdInsHelper.RedirectUrl(this.router,["/Customer/SelfCustom/Bouwheer/Detail"],{ BwrNo : this.BwrNo, CustType : CommonConstant.CustTypeCompany, mode : 'edit'});
    }else{
      this.ListBouwheerIndustryInfo.push({
        RefIndustryTypeCode: this.IndustryInfoForm.controls['RefIndustryTypeCode'].value,
        BusinessStartDate: this.IndustryInfoForm.controls['BusinessStartDate'].value,
        IsMain: this.IndustryInfoForm.controls['IsMain'].value,
        Notes: this.IndustryInfoForm.controls['Notes'].value,
        BouwheerCompanyIndustryInfoId: 0,
        BouwheerCompanyId: 0,
        RefIndustryTypeName: this.IndustryInfoForm.controls['RefIndustryTypeName'].value,
        RowVersion: undefined
      });
      this.dicts['ListBouwheerIndustryInfo'] = this.ListBouwheerIndustryInfo;
      this.currentModal.close("");
    }
  }

  async deleteModalIndustryInfo(i : number){
    if (confirm(ExceptionConstant.DELETE_CONFIRMATION)) {       
         if (this.ListBouwheerIndustryInfo[i].IsMain == true && this.ListBouwheerIndustryInfo.length > 1){
          this.toastr.warningMessage("Cannot Delete Main Industry");
         }else{
           var ReqIdForDelete = { 
            BouwheerCompanyIndustryInfoId : this.ListBouwheerIndustryInfo[i].BouwheerCompanyIndustryInfoId,
            IsMain : this.ListBouwheerIndustryInfo[i].IsMain
           };
           await this.http.post(this.UrlConstantNew.DeleteBouwheerCompanyIndustryInfo, ReqIdForDelete, AdInsConstant.SpinnerOptions).toPromise().then(
             (response) => {
               this.ListBouwheerIndustryInfo.splice(i, 1);
             }
           );
         }
    }
  }


}
