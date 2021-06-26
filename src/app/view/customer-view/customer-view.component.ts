import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { environment } from 'environments/environment';
import { UcViewGenericObj } from 'app/shared/model/UcViewGenericObj.model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { ResSysConfigResultObj } from 'app/shared/model/Response/ResSysConfigResultObj,model';
import { GenericObj } from 'app/shared/model/Generic/GenericObj.Model';

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

  SysConfigResultObj: ResSysConfigResultObj = new ResSysConfigResultObj();

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

    let reqGetSysConfigResultLOSObj = new GenericObj();
    reqGetSysConfigResultLOSObj.Code  = CommonConstant.MODULE_LOS;
    await this.http.post<ResSysConfigResultObj>(URLConstant.GetSysConfigResultByCode, reqGetSysConfigResultLOSObj).toPromise().then(
      (response) => {
        if(response.ConfigValue === "1") {
          this.IsLos = true;
        }
        else {
          this.IsLos = false;
        }
      }
    );

    let reqGetSysConfigResultLMSObj = new GenericObj();
    reqGetSysConfigResultLMSObj.Code  = CommonConstant.MODULE_LMS;
    await this.http.post<ResSysConfigResultObj>(URLConstant.GetSysConfigResultByCode, reqGetSysConfigResultLMSObj).toPromise().then(
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
    await this.http.post<ResSysConfigResultObj>(URLConstant.GetSysConfigPncplResultByCode, { Code: CommonConstant.ConfigCodeIsUseDms }).toPromise().then(
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
      else if (ev == 2) { // Family
        this.router.navigateByUrl(NavigationConstant.VIEW_CUST, { skipLocationChange: true }).then(() => {
          AdInsHelper.RedirectUrl(this.router,[NavigationConstant.VIEW_CUST_PERSONAL_FAMILY],{ "CustId": this.CustId });
        });
      }
      else if (ev == 3) { // Contact Person
        this.router.navigateByUrl(NavigationConstant.VIEW_CUST, { skipLocationChange: true }).then(() => {
          AdInsHelper.RedirectUrl(this.router,[NavigationConstant.VIEW_CUST_PERSONAL_CONTACT_PERSON],{ "CustId": this.CustId });
        });
      }
      else if (ev == 4) { // Customer Group
        this.router.navigateByUrl(NavigationConstant.VIEW_CUST, { skipLocationChange: true }).then(() => {
          AdInsHelper.RedirectUrl(this.router,[NavigationConstant.VIEW_CUST_GRP],{ "CustId": this.CustId });
        });
      }
      else if (ev == 5) { // Job Data
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
      else if (ev == 6) { // Financial Data
        this.router.navigateByUrl(NavigationConstant.VIEW_CUST, { skipLocationChange: true }).then(() => {
          AdInsHelper.RedirectUrl(this.router,[NavigationConstant.VIEW_CUST_PERSONAL_FINANCIAL_DATA],{ "CustId": this.CustId });
        });
      }
      else if (ev == 7) { // Customer Asset
        this.router.navigateByUrl(NavigationConstant.VIEW_CUST, { skipLocationChange: true }).then(() => {
          AdInsHelper.RedirectUrl(this.router,[NavigationConstant.VIEW_CUST_ASSET_DATA],{ "CustId": this.CustId });
        });
      }
      else if (ev == 8) { // Highlight Comment
        this.router.navigateByUrl(NavigationConstant.VIEW_CUST, { skipLocationChange: true }).then(() => {
          AdInsHelper.RedirectUrl(this.router, [NavigationConstant.VIEW_CUST_HIGHLIGHT_COMMENT], { "CustId": this.CustId });
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
      else if (ev == 9) {
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
      else if (ev == 10) {
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
      else if (ev == 11) {
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
      else if (ev == 12) { // Other Info
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
      else if (ev == 6) { // Customer Asset
        this.router.navigateByUrl(NavigationConstant.VIEW_CUST, { skipLocationChange: true }).then(() => {
          AdInsHelper.RedirectUrl(this.router,[NavigationConstant.VIEW_CUST_ASSET_DATA],{ "CustId": this.CustId });
        });
      }
      else if (ev == 7) { // Legal Document
        this.router.navigateByUrl(NavigationConstant.VIEW_CUST, { skipLocationChange: true }).then(() => {
          AdInsHelper.RedirectUrl(this.router,[NavigationConstant.VIEW_CUST_COY_LEGAL],{ "CustId": this.CustId });
        });
      }
      else if (ev == 8) { // Highlight Comment
        this.router.navigateByUrl(NavigationConstant.VIEW_CUST, { skipLocationChange: true }).then(() => {
          AdInsHelper.RedirectUrl(this.router,[NavigationConstant.VIEW_CUST_HIGHLIGHT_COMMENT],{ "CustId": this.CustId });
        });
      }
      // else if (ev == 7) {
      //   this.router.navigateByUrl(NavigationConstant.VIEW_CUST, { skipLocationChange: true }).then(() => {
      //     AdInsHelper.RedirectUrl(this.router,["/View/Customer/CoyOther"],{ "CustId": this.CustId });
      //   });
      // }
      else if (ev == 9) {
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
      else if (ev == 10) { // Other Info
        this.router.navigateByUrl(NavigationConstant.VIEW_CUST, { skipLocationChange: true }).then(() => {
          AdInsHelper.RedirectUrl(this.router,[NavigationConstant.VIEW_CUST_OTH_INFO],{ "CustId": this.CustId });
        });
      }
    }
  }
}