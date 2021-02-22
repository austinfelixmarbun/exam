import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { environment } from 'environments/environment';
import { UcViewGenericObj } from 'app/shared/model/UcViewGenericObj.model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';

@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html'
})
export class CustomerViewComponent implements OnInit {
  custModel: any;
  custResultData: any;

  viewCustMainInfoHeaderObj: UcViewGenericObj = new UcViewGenericObj();
  viewCustCoyMainInfoHeader: UcViewGenericObj = new UcViewGenericObj();

  CustId: number;


  navLinks: any[];
  activeLinkIndex = -1;

  custType: string;
  viewCustJobData: string;
  getCustByCustIdUrl: string;
  viewCustJobDataAddress: string;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.getCustByCustIdUrl = URLConstant.GetCustByCustId;
  }
  changeRoute(url) {
    this.router.navigateByUrl('', { skipLocationChange: true });
    setTimeout(() => AdInsHelper.RedirectUrl(this.router,[url],{ }));
  }
  ngOnInit() {
    this.viewCustMainInfoHeaderObj.viewInput = "./assets/ucviewgeneric/viewCustMainInfoHeader.json";
    this.viewCustMainInfoHeaderObj.viewEnvironment = environment.FoundationR3Url;

    this.viewCustCoyMainInfoHeader.viewInput = "./assets/ucviewgeneric/viewCustCoyMainInfoHeader.json";
    this.viewCustCoyMainInfoHeader.viewEnvironment = environment.FoundationR3Url;
    this.route.queryParams.subscribe(params => {
      if (params["CustId"] != null) {
        this.CustId = params["CustId"];
      }
    });
    var custObj = {
      CustId: this.CustId
    }
    this.http.post(this.getCustByCustIdUrl, custObj).subscribe(
      (response) => {
        this.custResultData = response;
        this.custModel = this.custResultData['MrCustModelCode'];
        this.custType = this.custResultData['MrCustTypeCode'];
      }
    );

  }

  mencuba(ev) {
    console.log(ev);
    if (this.custType == CommonConstant.CustomerPersonal) {
      if (ev == 0) {
        this.router.navigateByUrl("/View/Customer", { skipLocationChange: true }).then(() => {
          AdInsHelper.RedirectUrl(this.router,["/View/Customer/PersonalDetail"],{ "CustId": this.CustId });
        });
      }
      else if (ev == 1) {
        this.router.navigateByUrl("/View/Customer", { skipLocationChange: true }).then(() => {
          AdInsHelper.RedirectUrl(this.router,["/View/Customer/Address"],{ "CustId": this.CustId });
        });
      }
      else if (ev == 2) {
        this.router.navigateByUrl("/View/Customer", { skipLocationChange: true }).then(() => {
          AdInsHelper.RedirectUrl(this.router,["/View/Customer/PersonalContactPerson"],{ "CustId": this.CustId });
        });
      }
      else if (ev == 3) {
        this.router.navigateByUrl("/View/Customer", { skipLocationChange: true }).then(() => {
          AdInsHelper.RedirectUrl(this.router,["/View/Customer/CustomerGroup"],{ "CustId": this.CustId });
        });
      }
      else if (ev == 4) {
        if (this.custModel == "PROF")
          this.router.navigateByUrl("/View/Customer", { skipLocationChange: true }).then(() => {
            AdInsHelper.RedirectUrl(this.router,["/View/Customer/PersonalJobData"],{ "CustId": this.CustId });
          });
        else if (this.custModel == "NONPROF")
          this.router.navigateByUrl("/View/Customer", { skipLocationChange: true }).then(() => {
            AdInsHelper.RedirectUrl(this.router,["/View/Customer/PersonalJobDataNonProf"],{ "CustId": this.CustId });
          });
        else if (this.custModel == "EMP")
          this.router.navigateByUrl("/View/Customer", { skipLocationChange: true }).then(() => {
            AdInsHelper.RedirectUrl(this.router,["/View/Customer/PersonalJobDataEmp"],{ "CustId": this.CustId });
          });
        else if (this.custModel == "SME")
          this.router.navigateByUrl("/View/Customer", { skipLocationChange: true }).then(() => {
            AdInsHelper.RedirectUrl(this.router,["/View/Customer/PersonalJobDataSme"],{ "CustId": this.CustId });
          });
      }
      else if (ev == 5) {
        this.router.navigateByUrl("/View/Customer", { skipLocationChange: true }).then(() => {
          AdInsHelper.RedirectUrl(this.router,["/View/Customer/PersonalFinancialData"],{ "CustId": this.CustId });
        });
      }
      // else if (ev == 6) {
      //   this.router.navigateByUrl("/View/Customer", { skipLocationChange: true }).then(() => {
      //     AdInsHelper.RedirectUrl(this.router,["/View/Customer/CoyOther"],{ "CustId": this.CustId });
      //   });
      // }
      // else if (ev == 7) {
      //   this.router.navigateByUrl("/View/Customer", { skipLocationChange: true }).then(() => {
      //     AdInsHelper.RedirectUrl(this.router,["/View/Customer/PersonalAppListing"],{ "CustId": this.CustId });
      //   });
      // }

      else if (ev == 6) {
        this.router.navigateByUrl("/View/Customer", { skipLocationChange: true }).then(() => {
          AdInsHelper.RedirectUrl(this.router, ["/View/Customer/HighligtComment"], { "CustId": this.CustId });
        });
      }
      else if (ev == 7) {
        this.router.navigateByUrl("/View/Customer", { skipLocationChange: true }).then(() => {
          AdInsHelper.RedirectUrl(this.router, ["/View/Customer/CustDocument"], { "CustId": this.CustId });
        });
      }
    }
    else if (this.custType == CommonConstant.CustomerCompany) {
      if (ev == 0) {
        this.router.navigateByUrl("/View/Customer", { skipLocationChange: true }).then(() => {
          AdInsHelper.RedirectUrl(this.router,["/View/Customer/CoyDetail"],{ "CustId": this.CustId });
        });
      }
      else if (ev == 1) {
        this.router.navigateByUrl("/View/Customer", { skipLocationChange: true }).then(() => {
          AdInsHelper.RedirectUrl(this.router,["/View/Customer/Address"],{ "CustId": this.CustId });
        });
      }
      else if (ev == 2) {
        this.router.navigateByUrl("/View/Customer", { skipLocationChange: true }).then(() => {
          AdInsHelper.RedirectUrl(this.router,["/View/Customer/CoyManagement"],{ "CustId": this.CustId });
        });
      }
      else if (ev == 3) {
        this.router.navigateByUrl("/View/Customer", { skipLocationChange: true }).then(() => {
          AdInsHelper.RedirectUrl(this.router,["/View/Customer/CustomerGroup"],{ "CustId": this.CustId });
        });
      }
      else if (ev == 4) {
        this.router.navigateByUrl("/View/Customer", { skipLocationChange: true }).then(() => {
          AdInsHelper.RedirectUrl(this.router,["/View/Customer/CoyContact"],{ "CustId": this.CustId });
        });
      }
      else if (ev == 5) {
        this.router.navigateByUrl("/View/Customer", { skipLocationChange: true }).then(() => {
          AdInsHelper.RedirectUrl(this.router,["/View/Customer/CoyFinancial"],{ "CustId": this.CustId });
        });
      }
      else if (ev == 6) {
        this.router.navigateByUrl("/View/Customer", { skipLocationChange: true }).then(() => {
          AdInsHelper.RedirectUrl(this.router,["/View/Customer/CoyLegal"],{ "CustId": this.CustId });
        });
      }
      // else if (ev == 7) {
      //   this.router.navigateByUrl("/View/Customer", { skipLocationChange: true }).then(() => {
      //     AdInsHelper.RedirectUrl(this.router,["/View/Customer/CoyOther"],{ "CustId": this.CustId });
      //   });
      // }
      else if (ev == 7) {
        this.router.navigateByUrl("/View/Customer", { skipLocationChange: true }).then(() => {
          AdInsHelper.RedirectUrl(this.router,["/View/Customer/HighligtComment"],{ "CustId": this.CustId });
        });
      }
      else if (ev == 8) {
        this.router.navigateByUrl("/View/Customer", { skipLocationChange: true }).then(() => {
          AdInsHelper.RedirectUrl(this.router,["/View/Customer/CustDocument"],{ "CustId": this.CustId });
        });
      }
    }
  }
}
