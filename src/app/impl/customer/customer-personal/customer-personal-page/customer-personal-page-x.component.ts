import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CustPersonalObj } from 'app/shared/model/CustPersonalObj.Model';
import { DMSLabelValueObj } from 'app/shared/model/DMS/DMSLabelValueObj.Model';
import { DMSObj } from 'app/shared/model/DMS/DMSObj.model';
import { ResSysConfigResultObj } from 'app/shared/model/Response/ResSysConfigResultObj,model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { PathConstant } from 'app/shared/PathConstant';
import Stepper from 'bs-stepper';
import { CookieService } from 'ngx-cookie';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CustObj } from 'app/shared/model/CustObj.Model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { PathConstantX } from 'app/impl/shared/PathConstantX';

@Component({
  selector: 'app-customer-personal-page-x',
  templateUrl: './customer-personal-page-x.component.html',
  providers: [NGXToastrService],
})
export class CustomerPersonalPageXComponent implements OnInit {
  private stepper: Stepper;

  IdCust: number;
  CustPersonalId: number;
  CustStepIndex: number;
  isMarried: boolean = false;
  isJob: boolean;
  isGroup: boolean;
  isOther: boolean;
  isDetail: boolean;
  isAddress: boolean;
  isContact: boolean;
  isFinancial: boolean;
  Page: string;
  From: string;
  dmsObj: DMSObj;
  SysConfigResultObj: ResSysConfigResultObj = new ResSysConfigResultObj()

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private cookieService: CookieService) { 
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
  

  CustStep = {
    "Detail": 1,
    "Address": 2,
    "Family": 3,
    "Contact": 4,
    "Group": 5,
    "Job": 6,
    "Financial": 7,
    "CustAsset": 8,
    "Upload": 9,
    "CustAttr": 10
  }

  back() {
    if (this.Page != null) {
      AdInsHelper.RedirectUrl(this.router, ["/" + PathConstant.LR_CUST + "/" + this.From + "/" + PathConstantX.CUST_PAGING_X], {});
    } else {
      AdInsHelper.RedirectUrl(this.router,[NavigationConstant.CUST_PAGING_X],{});
    }
  }
 
  async ngOnInit() : Promise<void> {
    await this.http.post(URLConstant.GetCustPersonalbyCustId, {Id : this.IdCust}).toPromise().then(
      (response: any) => {
        this.CustPersonalId = response['CustPersonalId'];
      }
    );

    //check DMS
    await this.http.post<ResSysConfigResultObj>(URLConstant.GetSysConfigPncplResultByCode, { Code: CommonConstant.ConfigCodeIsUseDms}).toPromise().then(
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

      await this.http.post<CustPersonalObj>(URLConstant.GetCustPersonalbyCustId, {Id : this.IdCust}).toPromise().then(
        (response) => {
          if(response.MrMaritalStatCode == CommonConstant.MasteCodeMartialStatsMarried){
            this.isMarried = true;
          }
        }
      );
    }
    
    this.stepper = new Stepper(document.querySelector('#stepper1'), {
      linear: false,
      animation: true
    })
    this.EnterTab("Detail");
    this.CustStepIndex = 1;
    this.stepper.to(this.CustStepIndex);
  }

  EnterTab(type) {
    if (type == "Detail") {
      this.CustStepIndex = 1;
    }

    if (type == "Address") {
      this.CustStepIndex = 2;
    }
    if (type == "Family") {
      this.CustStepIndex = 3;
    }
    if (type == "Contact") {
      this.CustStepIndex = 4;
    }
    if (type == "Group") {
      this.CustStepIndex = 5;
    }
    if (type == "Job") {
      this.CustStepIndex = 6;
    }
    if (type == "Financial") {
      this.CustStepIndex = 7;
    }
    if (type == "CustAsset") {
      this.CustStepIndex = 8;
    }
    if (type == "Upload") {
      this.CustStepIndex = 9;
    }
    if (type == "CustAttr") {
      this.CustStepIndex = 10;
    }
    this.stepper.to(this.CustStepIndex);
  }

  getValue(ev: any) {
    if (ev.stepMode != undefined) {
      if (ev.stepMode == "next"){
        this.stepper.next();
        this.CustStepIndex++;

        //skip dms
        if(this.CustStepIndex == 9 && this.SysConfigResultObj.ConfigValue != '1'){
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
  
  endStepper(ev:any){
    if (this.From) {
      AdInsHelper.RedirectUrl(this.router, ["/" + PathConstant.LR_CUST + "/" + this.From + "/" + PathConstant.PAGING], {});
    } else {
      AdInsHelper.RedirectUrl(this.router,[NavigationConstant.CUST_PAGING],{});
    }
  }
}
