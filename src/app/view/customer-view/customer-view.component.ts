import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { environment } from 'environments/environment';
import { UcViewGenericObj } from 'app/shared/model/UcViewGenericObj.model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { ResponseSysConfigResultObj } from 'app/shared/model/Response/ResponseSysConfigResultObj.Model';

@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html'
})
export class CustomerViewComponent implements OnInit {
  custResultData: any;

  viewCustMainInfoHeaderObj: UcViewGenericObj = new UcViewGenericObj();
  viewCustCoyMainInfoHeader: UcViewGenericObj = new UcViewGenericObj();

  CustId: number;

  CustNo: string;
  custModel: string;
  custType: string;
  viewCustJobData: string;
  getCustByCustIdUrl: string;
  viewCustJobDataAddress: string;

  IsLos: boolean = false;
  IsLms: boolean = false;
  IsUseDms: boolean = false;

  SysConfigResultObj: ResponseSysConfigResultObj = new ResponseSysConfigResultObj();

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.getCustByCustIdUrl = URLConstant.GetCustByCustId;
  }

  changeRoute(url) {
    this.router.navigateByUrl('', { skipLocationChange: true });
    setTimeout(() => AdInsHelper.RedirectUrl(this.router,[url],{ }));
  }

  async ngOnInit() : Promise<void> {
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
    await this.http.post(this.getCustByCustIdUrl, {Id : this.CustId}).toPromise().then(
      (response) => {
        this.custResultData = response;
        this.CustNo = this.custResultData['CustNo'];
        this.custModel = this.custResultData['MrCustModelCode'];
        this.custType = this.custResultData['MrCustTypeCode'];
      }
    );

    await this.http.post<ResponseSysConfigResultObj>(URLConstant.GetSysConfigResultByCode, { ConfigCode : CommonConstant.MODULE_LOS }).toPromise().then(
      (response) => {
        if(response.ConfigValue === "1") {
          this.IsLos = true;
        }
        else {
          this.IsLos = false;
        }
      }
    );

    await this.http.post<ResponseSysConfigResultObj>(URLConstant.GetSysConfigResultByCode, { ConfigCode : CommonConstant.MODULE_LMS }).toPromise().then(
      (response) => {
        if(response.ConfigValue === "1") {
          this.IsLms = true;
        }
        else {
          this.IsLms = false;
        }
      }
    );

    //check DMS
    await this.http.post<ResponseSysConfigResultObj>(URLConstant.GetSysConfigPncplResultByCode, { Code: CommonConstant.ConfigCodeIsUseDms }).toPromise().then(
      (response) => {
        this.SysConfigResultObj = response;
        if(response.ConfigValue === "1") {
          this.IsUseDms = true;
        }
        else {
          this.IsUseDms = false;
        }
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
      else if (ev == 6) {
        if(this.IsUseDms) { // Document
          this.router.navigateByUrl(NavigationConstant.VIEW_CUST, { skipLocationChange: true }).then(() => {
            AdInsHelper.RedirectUrl(this.router,[NavigationConstant.VIEW_CUST_DOC],{ "CustId": this.CustId });
          });
        }
        else {
          if(this.IsLos) { // Application List
            this.router.navigateByUrl(NavigationConstant.VIEW_CUST, { skipLocationChange: true }).then(() => {
              window.open(environment.losR3Web + "/View/AppList?CustId=" + this.CustId + "&CustNo=" + this.CustNo, "_blank");
            });
          }
          else if(this.IsLms) { // Agreement list
            this.router.navigateByUrl(NavigationConstant.VIEW_CUST, { skipLocationChange: true }).then(() => {
              window.open(environment.lmsWeb + "/view/agrmntlist?CustId=" + this.CustId + "&CustNo=" + this.CustNo, "_blank");
            });
          }
          else { // Other Info
            this.router.navigateByUrl(NavigationConstant.VIEW_CUST, { skipLocationChange: true }).then(() => {
              AdInsHelper.RedirectUrl(this.router,[NavigationConstant.VIEW_CUST_OTH_INFO],{ "CustId": this.CustId });
            });
          }
        }
      }
      else if (ev == 7) {
        if(this.IsUseDms) {
          if(this.IsLos) { // Application List
            this.router.navigateByUrl(NavigationConstant.VIEW_CUST, { skipLocationChange: true }).then(() => {
              window.open(environment.losR3Web + "/View/AppList?CustId=" + this.CustId + "&CustNo=" + this.CustNo, "_blank");
            });
          }
          else {
            if(this.IsLms) { // Agreement list
              this.router.navigateByUrl(NavigationConstant.VIEW_CUST, { skipLocationChange: true }).then(() => {
                window.open(environment.lmsWeb + "/view/agrmntlist?CustId=" + this.CustId + "&CustNo=" + this.CustNo, "_blank");
              });
            }
            else { // Other Info
              this.router.navigateByUrl(NavigationConstant.VIEW_CUST, { skipLocationChange: true }).then(() => {
                AdInsHelper.RedirectUrl(this.router,[NavigationConstant.VIEW_CUST_OTH_INFO],{ "CustId": this.CustId });
              });
            }
          }
        }
        else {
          if(this.IsLms) { // Agreement List
            this.router.navigateByUrl(NavigationConstant.VIEW_CUST, { skipLocationChange: true }).then(() => {
              window.open(environment.lmsWeb + "/view/agrmntlist?CustId=" + this.CustId + "&CustNo=" + this.CustNo, "_blank");
            });
          }
          else { // Other Info
            this.router.navigateByUrl(NavigationConstant.VIEW_CUST, { skipLocationChange: true }).then(() => {
              AdInsHelper.RedirectUrl(this.router,[NavigationConstant.VIEW_CUST_OTH_INFO],{ "CustId": this.CustId });
            });
          }
        }
      }
      else if (ev == 8) {
        if(this.IsUseDms) {
          if(this.IsLos) {
            if(this.IsLms) { // Agreement List
              this.router.navigateByUrl(NavigationConstant.VIEW_CUST, { skipLocationChange: true }).then(() => {
                window.open(environment.lmsWeb + "/view/agrmntlist?CustId=" + this.CustId + "&CustNo=" + this.CustNo, "_blank");
              });
            }
            else { // Other Info
              this.router.navigateByUrl(NavigationConstant.VIEW_CUST, { skipLocationChange: true }).then(() => {
                AdInsHelper.RedirectUrl(this.router,[NavigationConstant.VIEW_CUST_OTH_INFO],{ "CustId": this.CustId });
              });
            }
          }
          else { // Other Info
            this.router.navigateByUrl(NavigationConstant.VIEW_CUST, { skipLocationChange: true }).then(() => {
              AdInsHelper.RedirectUrl(this.router,[NavigationConstant.VIEW_CUST_OTH_INFO],{ "CustId": this.CustId });
            });
          }
        }
        else {
          if(this.IsLos) { // Other Info
            this.router.navigateByUrl(NavigationConstant.VIEW_CUST, { skipLocationChange: true }).then(() => {
              AdInsHelper.RedirectUrl(this.router,[NavigationConstant.VIEW_CUST_OTH_INFO],{ "CustId": this.CustId });
            });
          }
        }
      }
      else if (ev == 9) { // Other Info
        this.router.navigateByUrl(NavigationConstant.VIEW_CUST, { skipLocationChange: true }).then(() => {
          AdInsHelper.RedirectUrl(this.router,[NavigationConstant.VIEW_CUST_OTH_INFO],{ "CustId": this.CustId });
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
      else if (ev == 7) {
        if(this.IsUseDms) { // Document
          this.router.navigateByUrl(NavigationConstant.VIEW_CUST, { skipLocationChange: true }).then(() => {
            AdInsHelper.RedirectUrl(this.router,[NavigationConstant.VIEW_CUST_DOC],{ "CustId": this.CustId });
          });
        }
        else { // Other Info
          this.router.navigateByUrl(NavigationConstant.VIEW_CUST, { skipLocationChange: true }).then(() => {
            AdInsHelper.RedirectUrl(this.router,[NavigationConstant.VIEW_CUST_OTH_INFO],{ "CustId": this.CustId });
          });
        }
      }
      else if (ev == 8) { // Other Info
        this.router.navigateByUrl(NavigationConstant.VIEW_CUST, { skipLocationChange: true }).then(() => {
          AdInsHelper.RedirectUrl(this.router,[NavigationConstant.VIEW_CUST_OTH_INFO],{ "CustId": this.CustId });
        });
      }
    }
  }
}