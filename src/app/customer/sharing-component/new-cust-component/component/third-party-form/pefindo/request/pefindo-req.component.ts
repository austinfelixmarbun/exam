import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { ReqPefindoSmartSearchObj } from 'app/shared/model/digitalization/req-pefindo-smart-search-obj.model';
import { PefindoSmartSearchCoyObj } from 'app/shared/model/digitalization/pefindo-smart-search-coy-obj.model';
import { PefindoSmartSearchPersonalObj } from 'app/shared/model/digitalization/pefindo-smart-search-personal-obj.model';
import { ReqAddTrxSrcDataForPefindoObj } from 'app/shared/model/digitalization/req-add-trx-src-data-for-pefindo-obj.model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { GeneralSettingObj } from 'app/shared/model/general-setting-obj.model';
import { ReqAddTrxSrcDataForPefindoMultiResultObj } from 'app/shared/model/digitalization/req-add-trx-src-data-for-pefindo-multi-result-obj.model';
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

  PefindoForm: FormGroup = this.fb.group({
    PefindoArr: this.fb.array([])
  });

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    public activeModal: NgbActiveModal,
    private toastr: NGXToastrService, 
    private UrlConstantNew: UrlConstantNew

  }

  async ngOnInit() {
    await this.getGenSet();
    await this.initGrid();
  }

  async initGrid(){
    this.http.post(URLConstant.PefindoSmartSearch, this.ReqPefindoSmartSearchObj).toPromise().then(
      (response) => {
        if(this.ReqPefindoSmartSearchObj.CustType == this.CustTypePersonal){
          this.PefindoSmartSearchPersonalObjs = response["ReturnObject"];
        }
        if(this.ReqPefindoSmartSearchObj.CustType == this.CustTypeCompany){
          this.PefindoSmartSearchCoyObjs = response["ReturnObject"];
        }

        if (this.pefindoMultiResMax > 0) this.setData();
      }
    );
  }

  pefindoMultiResMax: number = 0;
  @Input() CustId: number;
  @Output() thirdPartyGroupTrxNo: EventEmitter<string> = new EventEmitter();
  async getGenSet()
  {
    await this.http.post(URLConstant.GetGeneralSettingByCode, { Code: CommonConstant.GsPefindoMultiResultMax }).toPromise().then(
      (result: GeneralSettingObj) => {
        this.pefindoMultiResMax = parseInt(result.GsValue);
      }
    );
  }

  setData()
  {
    let PefindoArr = this.PefindoForm.get("PefindoArr") as FormArray;
    
    if(this.ReqPefindoSmartSearchObj.CustType == this.CustTypePersonal)
    {
      this.PefindoSmartSearchPersonalObjs.forEach(x => {
        let pefindo = this.fb.group({
          IsChecked: false,
          PefindoId: x.PefindoId,
          IdCardNumber: x.KTP,
          Name: x.FullName,
          BirthDt: x.DateOfBirth,
          Address: x.Address
        })

        PefindoArr.push(pefindo);
      });
    }

    if(this.ReqPefindoSmartSearchObj.CustType == this.CustTypeCompany)
    {
      this.PefindoSmartSearchCoyObjs.forEach(x => {
        let pefindo = this.fb.group({
          IsChecked: false,
          PefindoId: x.PefindoId,
          IdCardNumber: x.NPWP,
          Name: x.CompanyName,
          Address: x.Address
        })

        PefindoArr.push(pefindo);
      });
    }
  }

  async Request()
  {
    var reqAddTrxSrcDataForPefindoMultiResultObj = new ReqAddTrxSrcDataForPefindoMultiResultObj();

    let PefindoArr = this.PefindoForm.value.PefindoArr.filter(x => x.IsChecked);

    await this.getGenSet();

    if (PefindoArr.length == 0)
    {
      this.toastr.warningMessage(ExceptionConstant.PLEASE_SELECT_MIN_1_PEFINDO_DATA);
      return;
    }
    if (PefindoArr.length > this.pefindoMultiResMax)
    {
      this.toastr.warningMessage(ExceptionConstant.CAN_NOT_REQUEST_PEFINDO_MORE_THAN + " "  + this.pefindoMultiResMax);
      return;
    }

    if (this.CustId) reqAddTrxSrcDataForPefindoMultiResultObj.CustId = this.CustId;
    reqAddTrxSrcDataForPefindoMultiResultObj.ReqAddTrxSrcDataForPefindoObj = new Array<ReqAddTrxSrcDataForPefindoObj>();
    PefindoArr.forEach(x => {
      let reqAddTrxSrcDataForPefindoObj = new ReqAddTrxSrcDataForPefindoObj();

      reqAddTrxSrcDataForPefindoObj.PefindoId = x.PefindoId;
      reqAddTrxSrcDataForPefindoObj.IdNo = x.IdCardNumber;
      reqAddTrxSrcDataForPefindoObj.IdType = this.ReqPefindoSmartSearchObj.IdType;
      reqAddTrxSrcDataForPefindoObj.CustName = x.Name;
      reqAddTrxSrcDataForPefindoObj.Addr = x.Address;

      if (this.ReqPefindoSmartSearchObj.CustType == this.CustTypePersonal)
      {
        reqAddTrxSrcDataForPefindoObj.CustType = this.CustTypePersonal;
        reqAddTrxSrcDataForPefindoObj.BirthDt = x.BirthDt;
      }
      
      if (this.ReqPefindoSmartSearchObj.CustType == this.CustTypeCompany)
      {
        reqAddTrxSrcDataForPefindoObj.CustType = this.CustTypeCompany;
        reqAddTrxSrcDataForPefindoObj.IdType = CommonConstant.MrIdTypeCodeNPWP;
      }

      reqAddTrxSrcDataForPefindoMultiResultObj.ReqAddTrxSrcDataForPefindoObj.push(reqAddTrxSrcDataForPefindoObj);
    });

    this.http.post(URLConstant.AddTrxSrcDataForPefindoMultiResult, reqAddTrxSrcDataForPefindoMultiResultObj, AdInsConstant.SpinnerOptions).subscribe(
      (response) => {
        this.thirdPartyGroupTrxNo.emit(response['ThirdPartyRsltHGroupNo'])
        this.toastr.successMessage(response["Message"]);
        this.activeModal.close(response["ThirdPartyRsltHGroupNo"]);
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

    if (pefindoSmartSearchPersonalObj.KTP == null)
    {
      this.toastr.warningMessage(ExceptionConstant.PEFINDO_DATA_NOT_FOUND);
    }
    
    if(environment.isCore){
      this.http.post(this.UrlConstantNew.AddTrxSrcDataForPefindoV2, reqAddTrxSrcDataForPefindoObj, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          this.toastr.successMessage(response["Message"]);
          this.activeModal.dismiss('Cross click');
        }
      );
    }else{
      this.http.post(this.UrlConstantNew.AddTrxSrcDataForPefindo, reqAddTrxSrcDataForPefindoObj, AdInsConstant.SpinnerOptions).subscribe(
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

    if (pefindoSmartSearchCoyObj.NPWP == null)
    {
      this.toastr.warningMessage(ExceptionConstant.PEFINDO_DATA_NOT_FOUND);
    }

    if(environment.isCore){
      this.http.post(this.UrlConstantNew.AddTrxSrcDataForPefindoV2, reqAddTrxSrcDataForPefindoObj, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          this.toastr.successMessage(response["Message"]);
          this.activeModal.dismiss('Cross click');
        }
      );
    }else{
      this.http.post(this.UrlConstantNew.AddTrxSrcDataForPefindo, reqAddTrxSrcDataForPefindoObj, AdInsConstant.SpinnerOptions).subscribe(
        (response) => {
          this.toastr.successMessage(response["Message"]);
          this.activeModal.dismiss('Cross click');
        }
      );
    }

  }
}
