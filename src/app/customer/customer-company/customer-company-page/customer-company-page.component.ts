import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import Stepper from 'bs-stepper';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { DMSObj } from 'app/shared/model/DMS/DMSObj.model';
import { DMSLabelValueObj } from 'app/shared/model/DMS/DMSLabelValueObj.Model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { CookieService } from 'ngx-cookie';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { PathConstant } from 'app/shared/PathConstant';
import { ResponseSysConfigResultObj } from 'app/shared/model/Response/ResponseSysConfigResultObj.Model';

@Component({
  selector: 'app-customer-company-page',
  templateUrl: './customer-company-page.component.html',
  styleUrls: [],
  providers: [NGXToastrService],
})
export class CustomerCompanyPageComponent implements OnInit {
  private stepper: Stepper;

  IdCust: number;
  CustCompanyId: number;
  CustStepIndex: number;

  isGroup: boolean;
  isLegal: boolean;
  isOther: boolean;
  isDetail: boolean;
  isAddress: boolean;
  isContact: boolean;
  isFinancial: boolean;
  isManagement: boolean;

  Page: string;
  From: string;
  dmsObj: DMSObj;
  SysConfigResultObj: ResponseSysConfigResultObj = new ResponseSysConfigResultObj()


  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient,  private cookieService: CookieService) {

    this.route.queryParams.subscribe(params => {
      if (params["IdCust"] != null) {
        this.IdCust = params["IdCust"];
      }
      if (params["Page"] != null) {
        this.Page = params["Page"];
      }
      if (params["From"] != null) {
        this.From = params["From"];
      }
    });
  }
  
  back() {
    if (this.From) {
      AdInsHelper.RedirectUrl(this.router, ["/" + PathConstant.LR_CUST + "/" + this.From + "/" + PathConstant.PAGING], {});
    } else {
      AdInsHelper.RedirectUrl(this.router,[NavigationConstant.CUST_PAGING],{});
    }
  }

  async ngOnInit() : Promise<void> {
    if (this.IdCust == null) {
      AdInsHelper.RedirectUrl(this.router,[NavigationConstant.CUST_PAGING],{});
    }
    else {
      var custObj = { CustId: this.IdCust };
      this.http.post(URLConstant.GetCustCompanyByCustId, { Id: this.IdCust }).subscribe(
        (response: any) => {
          this.CustCompanyId = response['CustCompanyId'];
        } 
      );

      //check DMS
      await this.http.post<ResponseSysConfigResultObj>(URLConstant.GetSysConfigPncplResultByCode, { Code: CommonConstant.ConfigCodeIsUseDms}).toPromise().then(
        (response) => {
          this.SysConfigResultObj = response;
      });
      if(this.SysConfigResultObj.ConfigValue == '1'){
        await this.http.post(URLConstant.GetCustByCustId, {Id : this.IdCust}).toPromise().then(
          (response: any) => {
            let currentUserContext = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
            this.dmsObj = new DMSObj();
            this.dmsObj.User = currentUserContext.UserName;
            this.dmsObj.Role = currentUserContext.RoleCode;
            this.dmsObj.ViewCode = CommonConstant.DmsViewCodeCust;
            this.dmsObj.MetadataParent = null;
            this.dmsObj.MetadataObject.push(new DMSLabelValueObj(CommonConstant.DmsNoCust, response["CustNo"]));
            this.dmsObj.Option.push(new DMSLabelValueObj(CommonConstant.DmsOverideSecurity, CommonConstant.DmsOverideUploadView));  
          }
        );
      }
      this.stepper = new Stepper(document.querySelector('#stepper1'), {
        linear: false,
        animation: true
      });
      this.EnterTab("Detail");
      this.CustStepIndex = 1;
      this.stepper.to(this.CustStepIndex);
    }
  }

  EnterTab(type) {
    if (type == "Detail") {
      this.CustStepIndex = 1;
    }
    if (type == "Address") {
      this.CustStepIndex = 2;
    }
    if (type == "Management") {
      this.CustStepIndex = 3;
    }
    if (type == "Group") {
      this.CustStepIndex = 4;
    }
    if (type == "Contact") {
      this.CustStepIndex = 5;
    }
    if (type == "Financial") {
      this.CustStepIndex = 6;
    }
    if (type == "Legal") {
      this.CustStepIndex = 7;
    }
    if (type == "UploadData") {
      this.CustStepIndex = 8;
    }
    if (type == "CustAttr") {
      this.CustStepIndex = 9;
    }

    this.stepper.to(this.CustStepIndex);
  }
  
  getValue(ev: any) {
    if (ev.stepMode != undefined) {
      if (ev.stepMode == "next"){
        this.stepper.next();
        this.CustStepIndex++;

        //skip dms
        if(this.CustStepIndex == 8 && this.SysConfigResultObj.ConfigValue != '1'){
          this.stepper.next();
          this.CustStepIndex++;
        }
      }
      else{
        this.stepper.previous();
        this.CustStepIndex--;

        //skip dms
        if(this.CustStepIndex == 8 && this.SysConfigResultObj.ConfigValue != '1'){
          this.stepper.previous();
          this.CustStepIndex--;
        }
      }
    }
  }
}
