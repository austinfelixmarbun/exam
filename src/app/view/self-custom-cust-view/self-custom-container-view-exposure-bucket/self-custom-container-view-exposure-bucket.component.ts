import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { CustExpsrBucketObj } from 'app/shared/model/credit-review/cust-expsr-bucket-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { CustExpsrInfoObj } from 'app/shared/model/credit-review/cust-expsr-info-obj.model';

@Component({
  selector: 'app-self-custom-container-view-exposure-bucket',
  templateUrl: './self-custom-container-view-exposure-bucket.component.html'
})
export class SelfCustomContainerViewExposureBucketComponent implements OnInit {

  @Input() CustId: number;
  @Input() exposureType: string = CommonConstant.ExposureCustTypeCode;

  CustExpsrInfo: any;

  constructor(private http: HttpClient, 
    private UrlConstantNew: UrlConstantNew) { }

  async ngOnInit() {
    await this.GetCustExpsrInfoByCustId();
    await this.GetListCustExpsrBucketByCustExpsrDId();
  }

  async GetCustExpsrInfoByCustId() {
    await this.http.post<CustExpsrInfoObj>(this.UrlConstantNew.GetCustExpsrInfoByCustIdAndExposureTypeForTemplate, { Id: this.CustId, Code: this.exposureType }).toPromise().then(
      (response) => {
        this.CustExpsrInfo = response;
      }
    );
  }

  ListCustExpsrBucketObj: Array<CustExpsrBucketObj> = new Array<CustExpsrBucketObj>();
  async GetListCustExpsrBucketByCustExpsrDId() {
    if (this.CustExpsrInfo.CustExpsrHId == 0) return;
    await this.http.post<{ ListCustExpsrBucketObj: Array<CustExpsrBucketObj> }>(this.UrlConstantNew.GetListCustExpsrBucketByCustExpsrDId, { Id: this.CustExpsrInfo.CustExpsrDId }).toPromise().then(
      (response) => {
        this.ListCustExpsrBucketObj = response.ListCustExpsrBucketObj;
      }
    );
  }

}
