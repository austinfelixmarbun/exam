import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CustExpsrHObj } from 'app/shared/model/CreditReview/CustExpsrHObj.Model';
import { CustExpsrInfoObj } from 'app/shared/model/CreditReview/CustExpsrInfoObj.Model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cust-exposure-view',
  templateUrl: './cust-exposure-view.component.html',
})
export class CustExposureViewComponent implements OnInit {

  CustId: number = 0;
  IsReady: boolean = false;
  readonly whiteIndicator: string = CommonConstant.WhiteIndicator;
  //#region Exposure Type
  readonly ExposureCustTypeCode: string = CommonConstant.ExposureCustTypeCode;
  readonly ExposureCustGroupTypeCode: string = CommonConstant.ExposureCustGroupTypeCode;
  readonly ExposureObligorTypeCode: string = CommonConstant.ExposureObligorTypeCode;
  //#endregion

  readonly CaptureStatReq: string = CommonConstant.CaptureStatReq;
  readonly CaptureStatScs: string = CommonConstant.CaptureStatScs;
  readonly CaptureStatFail: string = CommonConstant.CaptureStatFail;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private toastr: ToastrService
  ) {
    this.route.queryParams.subscribe(params => {
      if (params["CustId"] != null) {
        this.CustId = params["CustId"];
      }
    });
  }

  async ngOnInit() {
    await this.GetCustExpsrInfoByCustId();
    this.IsReady = true;
  }

  //#region Get Data  
  CustExpsrHObj: CustExpsrHObj = new CustExpsrHObj();
  CustExpsrInfoObj: CustExpsrInfoObj = new CustExpsrInfoObj();
  async GetCustExpsrInfoByCustId() {
    await this.http.post<CustExpsrInfoObj>(URLConstant.GetCustExpsrInfoByCustId, { Id: this.CustId }).toPromise().then(
      (response) => {
        console.log(response);
        this.CustExpsrInfoObj = response;
        this.CustExpsrHObj = response.CustExpsrHObj;
      }
    );
  }
  //#endregion

  async ReqExposure() {
    if (this.CustExpsrInfoObj.CaptureStat == this.CaptureStatReq) return this.toastr.warning(ExceptionConstant.CUST_EXPR_REQ);
    await this.http.post(URLConstant.RequestExposureFromR2, { CustId: this.CustId }).toPromise().then(
      (response) => {
      }
    );
  }

}
