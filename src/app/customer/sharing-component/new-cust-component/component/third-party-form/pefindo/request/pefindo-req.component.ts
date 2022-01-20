import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { ReqPefindoSmartSearchObj } from 'app/shared/model/digitalization/req-pefindo-smart-search-obj.model';
import { PefindoSmartSearchCoyObj } from 'app/shared/model/digitalization/pefindo-smart-search-coy-obj.model';
import { PefindoSmartSearchPersonalObj } from 'app/shared/model/digitalization/pefindo-smart-search-personal-obj.model';
import { ReqAddTrxSrcDataForPefindoObj } from 'app/shared/model/digitalization/req-add-trx-src-data-for-pefindo-obj.model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';


@Component({
  selector: 'app-pefindo-req',
  templateUrl: './pefindo-req.component.html',
})
export class PefindoReqComponent implements OnInit {

  @Input() ReqPefindoSmartSearchObj: ReqPefindoSmartSearchObj;
  @Input() ThirdPartyTrxNo: string;

  PefindoSmartSearchPersonalObjs: Array<PefindoSmartSearchPersonalObj> = new Array<PefindoSmartSearchPersonalObj>();
  PefindoSmartSearchCoyObjs: Array<PefindoSmartSearchCoyObj> = new Array<PefindoSmartSearchCoyObj>();
  
  readonly CustTypePersonal: string = CommonConstant.CustomerPersonal;
  readonly CustTypeCompany: string = CommonConstant.CustomerCompany;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    public activeModal: NgbActiveModal,
    private toastr: NGXToastrService
  ) { }

  ngOnInit() {
    this.initGrid();
  }

  initGrid(){
    this.http.post(URLConstant.PefindoSmartSearch, this.ReqPefindoSmartSearchObj).subscribe(
      (response) => {
        if(this.ReqPefindoSmartSearchObj.CustType == this.CustTypePersonal){
          this.PefindoSmartSearchPersonalObjs = response["ReturnObject"];
        }
        if(this.ReqPefindoSmartSearchObj.CustType == this.CustTypeCompany){
          this.PefindoSmartSearchCoyObjs = response["ReturnObject"];
        }
      }
    );
  }

  RequestPersonal(pefindoSmartSearchPersonalObj: PefindoSmartSearchPersonalObj){
    var reqAddTrxSrcDataForPefindoObj = new ReqAddTrxSrcDataForPefindoObj();

    reqAddTrxSrcDataForPefindoObj.TrxNo = this.ThirdPartyTrxNo;
    reqAddTrxSrcDataForPefindoObj.Addr = pefindoSmartSearchPersonalObj.Address;
    reqAddTrxSrcDataForPefindoObj.BirthDt = pefindoSmartSearchPersonalObj.DateOfBirth;
    reqAddTrxSrcDataForPefindoObj.CustName = pefindoSmartSearchPersonalObj.FullName;
    reqAddTrxSrcDataForPefindoObj.CustType = this.CustTypePersonal;
    reqAddTrxSrcDataForPefindoObj.IdNo = pefindoSmartSearchPersonalObj.KTP;
    reqAddTrxSrcDataForPefindoObj.IdType = this.ReqPefindoSmartSearchObj.IdType;
    reqAddTrxSrcDataForPefindoObj.PefindoId = pefindoSmartSearchPersonalObj.PefindoId;

    if(environment.isCore){
      this.http.post(URLConstant.AddTrxSrcDataForPefindoV2, reqAddTrxSrcDataForPefindoObj, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          this.toastr.successMessage(response["Message"]);
          this.activeModal.dismiss('Cross click');
        }
      );
    }else{
      this.http.post(URLConstant.AddTrxSrcDataForPefindo, reqAddTrxSrcDataForPefindoObj, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          this.toastr.successMessage(response["Message"]);
          this.activeModal.dismiss('Cross click');
        }
      );
    }

  }

  RequestCompany(pefindoSmartSearchCoyObj: PefindoSmartSearchCoyObj){
    var reqAddTrxSrcDataForPefindoObj = new ReqAddTrxSrcDataForPefindoObj();

    reqAddTrxSrcDataForPefindoObj.TrxNo = this.ThirdPartyTrxNo;
    reqAddTrxSrcDataForPefindoObj.Addr = pefindoSmartSearchCoyObj.Address;
    reqAddTrxSrcDataForPefindoObj.CustName = pefindoSmartSearchCoyObj.CompanyName;
    reqAddTrxSrcDataForPefindoObj.CustType = this.CustTypeCompany;
    reqAddTrxSrcDataForPefindoObj.IdNo = pefindoSmartSearchCoyObj.NPWP;
    reqAddTrxSrcDataForPefindoObj.IdType = CommonConstant.MrIdTypeCodeNPWP;
    reqAddTrxSrcDataForPefindoObj.PefindoId = pefindoSmartSearchCoyObj.PefindoId;

    if(environment.isCore){
      this.http.post(URLConstant.AddTrxSrcDataForPefindoV2, reqAddTrxSrcDataForPefindoObj, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          this.toastr.successMessage(response["Message"]);
          this.activeModal.dismiss('Cross click');
        }
      );
    }else{
      this.http.post(URLConstant.AddTrxSrcDataForPefindo, reqAddTrxSrcDataForPefindoObj, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          this.toastr.successMessage(response["Message"]);
          this.activeModal.dismiss('Cross click');
        }
      );
    }

  }
}
