import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { CustObj } from 'app/shared/model/cust-obj.model';
import { ThirdPartyTsObj } from 'app/shared/model/third-party-rslt/third-party-ts-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';

@Component({
  selector: 'app-customer-view-trusting-social',
  templateUrl: './customer-view-trusting-social.component.html'
})
export class CustomerViewTrustingSocialComponent implements OnInit {

  @Input() ThirdPartyTrxNo: string = null;
  CustId: number;
  CustNo: string;
  ThirdPartyTsObjs: Array<ThirdPartyTsObj> = new Array<ThirdPartyTsObj>();

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder, private UrlConstantNew: UrlConstantNew
  ) {
    this.route.queryParams.subscribe(params => {
      if (params['CustId'] != null) {
        this.CustId = params['CustId'];
      }
      if (params['CustNo'] != null) {
        this.CustNo = params['CustNo'];
      }
    });
  }

  ngOnInit() {
    if (this.CustNo) {
      this.getCustByCustNoAndThirdPartyTsObj();
      return;
    }

    if (this.ThirdPartyTrxNo != null) {
      this.getThirdPartyTsObj(this.ThirdPartyTrxNo);
    }

    if (this.ThirdPartyTrxNo == null && this.CustId != null) {
      this.getCustAndThirdPartyTsObj();
    }
  }

  getCustAndThirdPartyTsObj() {
    var custObj = new CustObj();
    custObj.CustId = this.CustId;

    this.http.post(this.UrlConstantNew.GetCustByCustId, { Id: this.CustId }).subscribe(
      responseCust => {
        this.getThirdPartyTsObj(responseCust["ThirdPartyTrxNo"]);
      });
  }

  getCustByCustNoAndThirdPartyTsObj() {
    this.http.post(this.UrlConstantNew.GetCustByCustNo, { CustNo: this.CustNo }).subscribe(
      responseCust => {
        this.getThirdPartyTsObj(responseCust["ThirdPartyTrxNo"]);
      });
  }

  getThirdPartyTsObj(thirdPartyTrxNo) {
    this.http.post(this.UrlConstantNew.GetListThirdPartyTrustingSocialByTrxNo, { TrxNo: thirdPartyTrxNo }).subscribe(
      responseThirdParty => {
        this.ThirdPartyTsObjs = responseThirdParty["ReturnObject"];
      });
  }
}