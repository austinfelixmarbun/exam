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
  CustObj: CustObj = new CustObj();

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {
    this.route.queryParams.subscribe(params => {
      if (params["CustNo"] != null) {
        this.CustNo = params["CustNo"];
      }

      if (params["TrxNo"] != null) {
        this.TrxNo = params["TrxNo"];
      }
    });
  }
  // http://localhost:4200/View/Pefindo?CustNo=0002CUST20210802922
  async ngOnInit() {
    // this.CustNo = '0002CUST20210802921';
    this.Param = this.TrxNo;
    let reqByCustNo: GenericObj = new GenericObj();
    reqByCustNo.CustNo = this.CustNo;
    if(this.CustNo != null){
      await this.http.post(URLConstant.GetCustByCustNo, reqByCustNo).toPromise().then(
        (response: CustObj) => {
          console.log(response);
          this.CustObj = response;
          this.Param = response.ThirdPartyTrxNo;
        }
      )
    }
    this.mencuba(0);
  }

  mencuba(ev) {
    if (ev == 0) { // Subject Info Personal
      console.log("Subject Info Personal");

      let url: string = "/View/Pefindo/SubjectInfoPersonal";
      if(this.CustObj.MrCustTypeCode == CommonConstant.CustTypeCompany){
        url = "/View/Pefindo/SubjectInfoCompany"
      }

      this.router.navigateByUrl("/" + PathConstant.CR_VIEW + "/" + PathConstant.VIEW_PEFINDO, { skipLocationChange: true }).then(() => {
        AdInsHelper.RedirectUrl(this.router,[url],{ "TrxNo": this.Param });
      });
    }
    else if (ev == 1) { // MO Summary
      console.log("MO Summary");
      this.router.navigateByUrl("/" + PathConstant.CR_VIEW + "/" + PathConstant.VIEW_PEFINDO, { skipLocationChange: true }).then(() => {
        AdInsHelper.RedirectUrl(this.router,["/View/Pefindo/MoSummary"],{ "TrxNo": this.Param });
      });
    }
    else if (ev == 2) { // PEFINDO Score
      console.log("PEFINDO Score");
      this.router.navigateByUrl("/" + PathConstant.CR_VIEW + "/" + PathConstant.VIEW_PEFINDO, { skipLocationChange: true }).then(() => {
        AdInsHelper.RedirectUrl(this.router,["/View/Pefindo/PefindoScore"],{ "TrxNo": this.Param });
      });
    }
  }

}
