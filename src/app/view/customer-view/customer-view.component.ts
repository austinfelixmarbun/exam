import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { environment } from 'environments/environment';
import { UcViewGenericObj } from 'app/shared/model/UcViewGenericObj.model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';

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

  IsLos: boolean = false;

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
    this.http.post(this.getCustByCustIdUrl, {Id : this.CustId}).subscribe(
      (response) => {
        this.custResultData = response;
        this.custModel = this.custResultData['MrCustModelCode'];
        this.custType = this.custResultData['MrCustTypeCode'];
      }
    );
  }

  mencuba(ev) {
    if (this.custType == CommonConstant.CustomerPersonal) {
      if (ev == 0) { // Main Data
        this.router.navigateByUrl(NavigationConstant.VIEW_CUST, { skipLocationChange: true }).then(() => {
          AdInsHelper.RedirectUrl(this.router,[NavigationConstant.VIEW_CUST_PERSONAL_DETAIL],{ "CustId": this.CustId });
        });
      }
      else if (ev == 1) { // Address
        this.router.navigateByUrl(NavigationConstant.VIEW_CUST, { skipLocationChange: true }).then(() => {
          AdInsHelper.RedirectUrl(this.router,[NavigationConstant.VIEW_CUST_ADDR],{ "CustId": this.CustId });
        });
      }
      else if (ev == 2) { // Contact Person
        this.router.navigateByUrl(NavigationConstant.VIEW_CUST, { skipLocationChange: true }).then(() => {
          AdInsHelper.RedirectUrl(this.router,[NavigationConstant.VIEW_CUST_PERSONAL_CONTACT_PERSON],{ "CustId": this.CustId });
        });
      }
      else if (ev == 3) { // Customer Group
        this.router.navigateByUrl(NavigationConstant.VIEW_CUST, { skipLocationChange: true }).then(() => {
          AdInsHelper.RedirectUrl(this.router,[NavigationConstant.VIEW_CUST_GRP],{ "CustId": this.CustId });
        });
      }
      else if (ev == 4) { // Job Data
        if (this.custModel == "PROF")
          this.router.navigateByUrl(NavigationConstant.VIEW_CUST, { skipLocationChange: true }).then(() => {
            AdInsHelper.RedirectUrl(this.router,[NavigationConstant.VIEW_CUST_PERSONAL_JOB_DATA],{ "CustId": this.CustId });
          });
        else if (this.custModel == "NONPROF")
          this.router.navigateByUrl(NavigationConstant.VIEW_CUST, { skipLocationChange: true }).then(() => {
            AdInsHelper.RedirectUrl(this.router,[NavigationConstant.VIEW_CUST_PERSONAL_JOB_DATA_NON_PROF],{ "CustId": this.CustId });
          });
        else if (this.custModel == "EMP")
          this.router.navigateByUrl(NavigationConstant.VIEW_CUST, { skipLocationChange: true }).then(() => {
            AdInsHelper.RedirectUrl(this.router,[NavigationConstant.VIEW_CUST_PERSONAL_JOB_DATA_EMP],{ "CustId": this.CustId });
          });
        else if (this.custModel == "SME")
          this.router.navigateByUrl(NavigationConstant.VIEW_CUST, { skipLocationChange: true }).then(() => {
            AdInsHelper.RedirectUrl(this.router,[NavigationConstant.VIEW_CUST_PERSONAL_JOB_DATA_SME],{ "CustId": this.CustId });
          });
      }
      else if (ev == 5) { // Financial Data
        this.router.navigateByUrl(NavigationConstant.VIEW_CUST, { skipLocationChange: true }).then(() => {
          AdInsHelper.RedirectUrl(this.router,[NavigationConstant.VIEW_CUST_PERSONAL_FINANCIAL_DATA],{ "CustId": this.CustId });
        });
      }
      // else if (ev == 6) {
      //   this.router.navigateByUrl(NavigationConstant.VIEW_CUST, { skipLocationChange: true }).then(() => {
      //     AdInsHelper.RedirectUrl(this.router,["/View/Customer/CoyOther"],{ "CustId": this.CustId });
      //   });
      // }
      // else if (ev == 7) {
      //   this.router.navigateByUrl(NavigationConstant.VIEW_CUST, { skipLocationChange: true }).then(() => {
      //     AdInsHelper.RedirectUrl(this.router,["/View/Customer/PersonalAppListing"],{ "CustId": this.CustId });
      //   });
      // }
      else if (ev == 6) { // Document
        this.router.navigateByUrl(NavigationConstant.VIEW_CUST, { skipLocationChange: true }).then(() => {
          AdInsHelper.RedirectUrl(this.router,[NavigationConstant.VIEW_CUST_DOC],{ "CustId": this.CustId });
        });
      }
      else if (ev == 7) { // Application List
        this.router.navigateByUrl(NavigationConstant.VIEW_CUST, { skipLocationChange: true }).then(() => {
          // AdInsHelper.RedirectUrl(this.router,[NavigationConstant.VIEW_CUST_DOC],{ "CustId": this.CustId });
        });
      }
      else if (ev == 8) { // Agreement list
        this.router.navigateByUrl(NavigationConstant.VIEW_CUST, { skipLocationChange: true }).then(() => {
          // AdInsHelper.RedirectUrl(this.router,[NavigationConstant.VIEW_CUST_DOC],{ "CustId": this.CustId });
        });
      }
      else if (ev == 9) { // Other Info
        this.router.navigateByUrl(NavigationConstant.VIEW_CUST, { skipLocationChange: true }).then(() => {
          // AdInsHelper.RedirectUrl(this.router,[NavigationConstant.VIEW_CUST_DOC],{ "CustId": this.CustId });
        });
      }
    }
    else if (this.custType == CommonConstant.CustomerCompany) {
      if (ev == 0) { // Main Data
        this.router.navigateByUrl(NavigationConstant.VIEW_CUST, { skipLocationChange: true }).then(() => {
          AdInsHelper.RedirectUrl(this.router,[NavigationConstant.VIEW_CUST_COY_DETAIL],{ "CustId": this.CustId });
        });
      }
      else if (ev == 1) { // Address
        this.router.navigateByUrl(NavigationConstant.VIEW_CUST, { skipLocationChange: true }).then(() => {
          AdInsHelper.RedirectUrl(this.router,[NavigationConstant.VIEW_CUST_ADDR],{ "CustId": this.CustId });
        });
      }
      else if (ev == 2) { // Management / Shareholder
        this.router.navigateByUrl(NavigationConstant.VIEW_CUST, { skipLocationChange: true }).then(() => {
          AdInsHelper.RedirectUrl(this.router,[NavigationConstant.VIEW_CUST_COY_MNGMNT],{ "CustId": this.CustId });
        });
      }
      else if (ev == 3) { // Customer Group
        this.router.navigateByUrl(NavigationConstant.VIEW_CUST, { skipLocationChange: true }).then(() => {
          AdInsHelper.RedirectUrl(this.router,[NavigationConstant.VIEW_CUST_GRP],{ "CustId": this.CustId });
        });
      }
      else if (ev == 4) { // Contact Information
        this.router.navigateByUrl(NavigationConstant.VIEW_CUST, { skipLocationChange: true }).then(() => {
          AdInsHelper.RedirectUrl(this.router,[NavigationConstant.VIEW_CUST_COY_CONTACT],{ "CustId": this.CustId });
        });
      }
      else if (ev == 5) { // Financial Data
        this.router.navigateByUrl(NavigationConstant.VIEW_CUST, { skipLocationChange: true }).then(() => {
          AdInsHelper.RedirectUrl(this.router,[NavigationConstant.VIEW_CUST_COY_FINANCIAL],{ "CustId": this.CustId });
        });
      }
      else if (ev == 6) { // Legal Document
        this.router.navigateByUrl(NavigationConstant.VIEW_CUST, { skipLocationChange: true }).then(() => {
          AdInsHelper.RedirectUrl(this.router,[NavigationConstant.VIEW_CUST_COY_LEGAL],{ "CustId": this.CustId });
        });
      }
      // else if (ev == 7) {
      //   this.router.navigateByUrl(NavigationConstant.VIEW_CUST, { skipLocationChange: true }).then(() => {
      //     AdInsHelper.RedirectUrl(this.router,["/View/Customer/CoyOther"],{ "CustId": this.CustId });
      //   });
      // }
      else if (ev == 7) { // Document
        this.router.navigateByUrl(NavigationConstant.VIEW_CUST, { skipLocationChange: true }).then(() => {
          AdInsHelper.RedirectUrl(this.router,[NavigationConstant.VIEW_CUST_DOC],{ "CustId": this.CustId });
        });
      }
      else if (ev == 8) { // Other Info
        this.router.navigateByUrl(NavigationConstant.VIEW_CUST, { skipLocationChange: true }).then(() => {
          // AdInsHelper.RedirectUrl(this.router,[NavigationConstant.VIEW_CUST_DOC],{ "CustId": this.CustId });
        });
      }
    }
  }
}