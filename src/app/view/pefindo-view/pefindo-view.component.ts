import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CustObj } from 'app/shared/model/CustObj.Model';
import { GenericObj } from 'app/shared/model/Generic/GenericObj.Model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { PathConstant } from 'app/shared/PathConstant';

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

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {
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
      await this.http.post(URLConstant.GetCustByCustNo, reqByCustNo).toPromise().then(
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
    if (ev == 0) { // Subject Info Personal / Company
      let url: string = NavigationConstant.PEFINDO_SUBJECT_INFO_PERSONAL;
      if(this.MrCustTypeCode == CommonConstant.CustTypeCompany){
        url = NavigationConstant.PEFINDO_SUBJECT_INFO_COMPANY
      }

      this.router.navigateByUrl("/" + PathConstant.CR_VIEW + "/" + PathConstant.VIEW_PEFINDO, { skipLocationChange: true }).then(() => {
        AdInsHelper.RedirectUrl(this.router,[url],{ "TrxNo": this.Param }, true);
      });
    }
    else if (ev == 1) { // MO Summary
      this.router.navigateByUrl("/" + PathConstant.CR_VIEW + "/" + PathConstant.VIEW_PEFINDO, { skipLocationChange: true }).then(() => {
        AdInsHelper.RedirectUrl(this.router,[NavigationConstant.PEFINDO_MO_SUMMARY],{ "TrxNo": this.Param }, true);
      });
    }
    else if (ev == 2) { // PEFINDO Score
      this.router.navigateByUrl("/" + PathConstant.CR_VIEW + "/" + PathConstant.VIEW_PEFINDO, { skipLocationChange: true }).then(() => {
        AdInsHelper.RedirectUrl(this.router,[NavigationConstant.PEFINDO_PEFINDO_SCORE],{ "TrxNo": this.Param }, true);
      });
    }
    else if (ev == 3) { // Contracts
      this.router.navigateByUrl("/" + PathConstant.CR_VIEW + "/" + PathConstant.VIEW_PEFINDO, { skipLocationChange: true }).then(() => {
        AdInsHelper.RedirectUrl(this.router,[NavigationConstant.PEFINDO_CONTRACTS],{ "TrxNo": this.Param }, true);
      });
    }
    else if (ev == 4) { // PEFINDO Alert Quest
      this.router.navigateByUrl("/" + PathConstant.CR_VIEW + "/" + PathConstant.VIEW_PEFINDO, { skipLocationChange: true }).then(() => {
        AdInsHelper.RedirectUrl(this.router,[NavigationConstant.PEFINDO_PEFINDO_ALERT_QUEST],{ "TrxNo": this.Param }, true);
      });
    }
    else if (ev == 5) { // Securities
      this.router.navigateByUrl("/" + PathConstant.CR_VIEW + "/" + PathConstant.VIEW_PEFINDO, { skipLocationChange: true }).then(() => {
        AdInsHelper.RedirectUrl(this.router,[NavigationConstant.PEFINDO_SECURITIES],{ "TrxNo": this.Param }, true);
      });
    }
    else if (ev == 6) { // Other Liabilities
      this.router.navigateByUrl("/" + PathConstant.CR_VIEW + "/" + PathConstant.VIEW_PEFINDO, { skipLocationChange: true }).then(() => {
        AdInsHelper.RedirectUrl(this.router,[NavigationConstant.PEFINDO_OTHER_LIABILITIES],{ "TrxNo": this.Param }, true);
      });
    }
    else if (ev == 7) { // Involvements
      this.router.navigateByUrl("/" + PathConstant.CR_VIEW + "/" + PathConstant.VIEW_PEFINDO, { skipLocationChange: true }).then(() => {
        AdInsHelper.RedirectUrl(this.router,[NavigationConstant.PEFINDO_INVOLVEMENTS],{ "TrxNo": this.Param }, true);
      });
    }
    else if (ev == 8) { // Relations
      this.router.navigateByUrl("/" + PathConstant.CR_VIEW + "/" + PathConstant.VIEW_PEFINDO, { skipLocationChange: true }).then(() => {
        AdInsHelper.RedirectUrl(this.router,[NavigationConstant.PEFINDO_RELATIONS],{ "TrxNo": this.Param }, true);
      });
    }
    else if (ev == 9) { // Inquiries
      this.router.navigateByUrl("/" + PathConstant.CR_VIEW + "/" + PathConstant.VIEW_PEFINDO, { skipLocationChange: true }).then(() => {
        AdInsHelper.RedirectUrl(this.router,[NavigationConstant.PEFINDO_INQUIRIES],{ "TrxNo": this.Param }, true);
      });
    }
    else if (ev == 10) { // Disputes
      this.router.navigateByUrl("/" + PathConstant.CR_VIEW + "/" + PathConstant.VIEW_PEFINDO, { skipLocationChange: true }).then(() => {
        AdInsHelper.RedirectUrl(this.router,[NavigationConstant.PEFINDO_DISPUTES],{ "TrxNo": this.Param }, true);
      });
    }
    else if (ev == 11) { // Financial Statements
      this.router.navigateByUrl("/" + PathConstant.CR_VIEW + "/" + PathConstant.VIEW_PEFINDO, { skipLocationChange: true }).then(() => {
        AdInsHelper.RedirectUrl(this.router,[NavigationConstant.PEFINDO_FINANCIAL_STATEMENTS],{ "TrxNo": this.Param }, true);
      });
    }
  }

}
