import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { ReqAddTrxSrcDataForCbasSlik } from 'app/shared/model/cbas-slik/req-add-trx-src-data-for-cbas-slik-obj.model';
import { ResGenerateTrxNoObj } from 'app/shared/model/master-sequence/res-generate-trx-no-obj.model';

@Component({
  selector: 'app-cbas-slik-req-header',
  templateUrl: './cbas-slik-req-header.component.html',
})
export class CbasSlikReqHeaderComponent implements OnInit {

  constructor(
    public activeModal: NgbActiveModal, 
    private http: HttpClient, 
    private UrlConstantNew: UrlConstantNew
  ) { }

  @Input() ParentForm: FormGroup;
  @Input() MrCustTypeCode: string;
  @Output() SubmitReqTrxNo = new EventEmitter<string>();


  ReqObj: ReqAddTrxSrcDataForCbasSlik = new ReqAddTrxSrcDataForCbasSlik();
  TrxNo: string;

  ngOnInit() {
    let formValue = this.ParentForm.value;

    this.ReqObj.Name = formValue.CustName;
    this.ReqObj.Npwp = formValue.TaxIdNo;
    this.ReqObj.Address = [formValue.UcAddress.Addr, formValue.UcAddress.AreaCode4, formValue.UcAddress.AreaCode3, formValue.UcAddress.AreaCode2, formValue.UcAddress.AreaCode1, formValue.UcAddress.City].join(', ');

    if (this.MrCustTypeCode == CommonConstant.CustTypePersonal)
    {
      this.ReqObj.CustType = 1 ;
      this.ReqObj.BirthDate = formValue.BirthDt;
      this.ReqObj.BirthPlace = formValue.BirthPlace;
      this.ReqObj.KtpNo = formValue.MrIdTypeCode == CommonConstant.MrIdTypeCodeEKTP ? formValue.IdNo : "";
      this.ReqObj.Gender = formValue.MrGenderCode == CommonConstant.GENDER_MALE ? "M" : "F";
      this.ReqObj.MotherName = formValue.MotherMaidenName;
    }
    else
    {
      this.ReqObj.AktaNo = formValue.MrIdTypeCode == CommonConstant.MrIdTypeCodeAKTA ? formValue.IdNo : "";
    }
  }

  Submit(){
    this.http.post(this.UrlConstantNew.AddTrxSrcDataForCbasSlik, this.ReqObj, AdInsConstant.SpinnerOptions).subscribe(
      (response:ResGenerateTrxNoObj) => {
        this.TrxNo = response.TrxNo;
        this.SubmitReqTrxNo.emit(this.TrxNo)
        this.activeModal.dismiss('')
      }
    );
  }

}
