import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { CustObj } from 'app/shared/model/cust-obj.model';
import { ResGenerateTrxNoObj } from 'app/shared/model/master-sequence/res-generate-trx-no-obj.model';

@Component({
  selector: 'app-customer-view-cbas-slik',
  templateUrl: './customer-view-cbas-slik.component.html'
})
export class CustomerViewCbasSlikComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private UrlConstantNew: UrlConstantNew
  )
  {
    this.route.queryParams.subscribe(params => {
      if (params['CustId'] != null) this.CustId = params['CustId'];
      if (params['TrxNo'] != null) this.TrxNo = params['TrxNo'];
      if (params['KtpNo'] != null) this.KtpNo = params['KtpNo'];
      if (params['Npwp'] != null) this.Npwp = params['Npwp'];

      if (params["IsEmbedded"] != null && params["Token"] != null) {
        const embeddHeaders = new HttpHeaders({
          'AdInsKey': params["Token"]
        });
        this.embeddOptions = { headers: embeddHeaders, withCredentials: true };
      }
    });
  }

  @Input() ActiveModal: NgbActiveModal;
  @Input() ParentForm: FormGroup;
  @Input() InputTrxNo: string;
  @Input() InputKtpNo: string;
  @Input() InputNpwp: string;

  CustId: number = null;
  TrxNo: string = null;
  KtpNo: string = null;
  Npwp: string = null;
  embeddOptions: object;

  IsResultReady: boolean = false;
  ResultErrorMsg: string = "";
  ResultCbasSlikObj: ResultCbasSlikObj = null;

  NikNpwp: string = "";
  ResIndvd: object = {};
  ResIndvdPokok: object = {};
  ResRingkasanFasilitas: object = {};
  ResFasilitasKreditPembiayan: Array<object> = [];

  async ngOnInit()
  {
    if (this.InputTrxNo) this.TrxNo = this.InputTrxNo;
    if (this.InputKtpNo) this.KtpNo = this.InputKtpNo;
    if (this.InputNpwp) this.Npwp = this.InputNpwp;

    if (this.CustId) await this.getDataByCustId();
    else if (this.TrxNo) await this.getDataByTrxNo();
    else if (this.KtpNo || this.Npwp) await this.getDataByKtpNpwp();

    this.resultErrorHandling();
    if (this.ResultErrorMsg) return;

    this.processResult();
  }

  async getDataByCustId()
  {
    if (!this.CustId) return;
    await this.http.post(this.UrlConstantNew.GetCustByCustId, { Id: this.CustId }, this.embeddOptions).toPromise().then(
      (response: CustObj) => {
        if(response.MrCustTypeCode == CommonConstant.CustTypePersonal && response.MrIdTypeCode == CommonConstant.MrIdTypeCodeEKTP) this.KtpNo = response.IdNo;
        else this.Npwp = response.TaxIdNo;
      }
    );
    await this.getDataByKtpNpwp();
  }

  async getDataByTrxNo()
  {
    if (!this.TrxNo) return;
    await this.http.post(this.UrlConstantNew.GetTrxResultDataForCbasSlik, { TrxNo: this.TrxNo }, this.embeddOptions).toPromise().then(
      (response:ResultCbasSlikObj) => {
        this.ResultCbasSlikObj = response;
      }
    );
  }

  async getDataByKtpNpwp()
  {
    await this.http.post(this.UrlConstantNew.GetCbasSlikLatestTrxNoByKtpNoNpwp, { KtpNo: this.KtpNo, Npwp: this.Npwp }, this.embeddOptions).toPromise().then(
      async (response:ResGenerateTrxNoObj) => {
        if (response && response.TrxNo)
        {
          this.TrxNo = response.TrxNo
          await this.getDataByTrxNo();
        }
      }
    );
  }

  resultErrorHandling()
  {
    if (!this.ResultCbasSlikObj) this.ResultErrorMsg = "No Data Available or transaction failed";
    else if (this.ResultCbasSlikObj.RequestTrxStat == "CBASSLIK_INP" || this.ResultCbasSlikObj.RequestTrxStat == "CBASSLIK_REQ") this.ResultErrorMsg = "CBAS SLIK Cheking is still in progress, please wait";
    else if (this.ResultCbasSlikObj.RequestTrxStat == "CBASSLIK_FAIL") this.ResultErrorMsg = "CBAS SLIK Cheking failed with following error :";
    else if (!this.ResultCbasSlikObj.ResultObj.ResultFlag) this.ResultErrorMsg = "CBAS SLIK Cheking failed with following error :";
    else if (!this.ResultCbasSlikObj.ResultObj.ResultIdeb || this.ResultCbasSlikObj.ResultObj.ResultIdeb.length < 1) this.ResultErrorMsg = "Customer in CBAS SLIK not found or invalid ";
  }

  processResult(i:number = 0)
  {
    this.NikNpwp = this.ResultCbasSlikObj.ResultObj.ResultIdeb[i]['nik_npwp'];
    if(this.ResultCbasSlikObj.ResultObj.ResultIdeb[i]['Ideb'] && this.ResultCbasSlikObj.ResultObj.ResultIdeb[i]['Ideb']['IdebIndividu'])
    {
      this.ResIndvd = this.ResultCbasSlikObj.ResultObj.ResultIdeb[i]['Ideb']['IdebIndividu'];
      this.ResIndvdPokok = this.ResIndvd['individual']['dataPokokDebitur'][0];
      this.ResRingkasanFasilitas = this.ResIndvd['individual']['ringkasanFasilitas'];
      this.ResFasilitasKreditPembiayan = this.ResIndvd['individual']['fasilitas']['kreditPembiayan'];
    }

    this.IsResultReady = true;
  }

  DateFormat(date: string = "")
  {
    let arr = [date.slice(0, 4), date.slice(4, 6), date.slice(6, 8)].filter((str) => str !== '');
    return  arr.join('-');
  }
}

class ResultCbasSlikObj
{
  RequestTrxStat: string = '';
  ResultErrorMessage: string = '';
  ResultObj: {
    ResultFlag: boolean,
    ErrorMsg: string,
    ResultIdeb: Array<object>
  } = null
}
