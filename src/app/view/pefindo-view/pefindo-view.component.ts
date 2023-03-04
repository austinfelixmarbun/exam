import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { CustObj } from 'app/shared/model/cust-obj.model';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-pefindo-view',
  templateUrl: './pefindo-view.component.html'
})
export class PefindoViewComponent implements OnInit {
  CustNo: string;
  TrxNo: string;
  Param: string;
  IsLos: boolean;
  CustObj: CustObj = new CustObj();
  MrCustTypeCode: string;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private UrlConstantNew: UrlConstantNew) {
    this.route.queryParams.subscribe(params => {
      if (params["CustNo"] != null) {
        this.CustNo = params["CustNo"];
      }

      if (params["TrxNo"] != null) {
        this.TrxNo = params["TrxNo"];
      }

      if (params["MrCustTypeCode"] != null) {
        this.MrCustTypeCode = params["MrCustTypeCode"];
      }

      if (params["IsLos"] != null) {
        this.IsLos = JSON.parse(params["IsLos"]);
      }
    });
  }

  async ngOnInit() {
    this.Param = this.TrxNo;
    let reqByCustNo: GenericObj = new GenericObj();
    reqByCustNo.CustNo = this.CustNo;
    if(this.CustNo != null){
      await this.http.post(this.UrlConstantNew.GetCustByCustNo, reqByCustNo).toPromise().then(
        (response: CustObj) => {
          this.CustObj = response;
          this.Param = response.ThirdPartyTrxNo;
          this.MrCustTypeCode = this.CustObj.MrCustTypeCode;
        }
      )
    }
    this.redirectTab(0);
  }

  redirectTab(ev) {
    let url: string = "";
    if (ev == 0) { // Subject Info Personal / Company
      url = NavigationConstant.PEFINDO_SUBJECT_INFO_PERSONAL;
      if (this.MrCustTypeCode == CommonConstant.CustTypeCompany) {
        url = NavigationConstant.PEFINDO_SUBJECT_INFO_COMPANY
      }
    }
    else if (ev == 1) { // MO Summary
      url = NavigationConstant.PEFINDO_MO_SUMMARY;
    }
    else if (ev == 2) { // PEFINDO Score
      url = NavigationConstant.PEFINDO_PEFINDO_SCORE;
    }
    else if (ev == 3) { // Contracts
      url = NavigationConstant.PEFINDO_CONTRACTS;
    }
    /*
    else if (ev == 4) { // PEFINDO Alert Quest
      url = NavigationConstant.PEFINDO_PEFINDO_ALERT_QUEST;
    }
    else if (ev == 5) { // Securities
      url = NavigationConstant.PEFINDO_SECURITIES;
    }
    else if (ev == 6) { // Other Liabilities
      url = NavigationConstant.PEFINDO_OTHER_LIABILITIES;
    }
    else if (ev == 7) { // Involvements
      url = NavigationConstant.PEFINDO_INVOLVEMENTS;
    }
    else if (ev == 8) { // Relations
      url = NavigationConstant.PEFINDO_RELATIONS;
    }
    else if (ev == 9) { // Inquiries
      url = NavigationConstant.PEFINDO_INQUIRIES;
    }
    else if (ev == 10) { // Disputes
      url = NavigationConstant.PEFINDO_DISPUTES;
    }
    else if (ev == 11) { // Financial Statements
      url = NavigationConstant.PEFINDO_FINANCIAL_STATEMENTS;
    }
    */
    else if (ev == 4) { // Inquiries
      url = NavigationConstant.PEFINDO_INQUIRIES;
    }
    else if (ev == 5 && this.MrCustTypeCode == CommonConstant.CustTypeCompany) { // Financial Statements
      url = NavigationConstant.PEFINDO_FINANCIAL_STATEMENTS;
    }
    else if (ev == 5 && this.MrCustTypeCode != CommonConstant.CustTypeCompany || ev == 6) { // Others
      url = NavigationConstant.PEFINDO_OTHERS;
    }
    AdInsHelper.RedirectUrlView(this.router, [url], { "TrxNo": this.Param }, true);
  }

}
