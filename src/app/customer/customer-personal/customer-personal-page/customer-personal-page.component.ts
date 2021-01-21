import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CustObj } from 'app/shared/model/CustObj.Model';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import Stepper from 'bs-stepper';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { DMSObj } from 'app/shared/model/DMS/DMSObj.model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { DMSLabelValueObj } from 'app/shared/model/DMS/DMSLabelValueObj.Model';
import { CookieService } from 'ngx-cookie';
@Component({
  selector: 'app-customer-personal-page',
  templateUrl: './customer-personal-page.component.html',
  styleUrls: [],
  providers: [NGXToastrService],
})
export class CustomerPersonalPageComponent implements OnInit {
  private stepper: Stepper;

  IdCust: number;
  CustPersonalId: number;
  CustStepIndex: number;

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
    "CustAttr": 9,
    "Upload": 10,
    "Other": 11
  }

  back() {
    if (this.Page != null) {
      AdInsHelper.RedirectUrl(this.router,["/Customer/"+this.From+"/Paging"],{});
    } else {
      AdInsHelper.RedirectUrl(this.router,["/Customer/Paging"],{});
    }
  }
 
  async ngOnInit() {
    var custObj = { CustId: this.IdCust };
    await this.http.post(URLConstant.GetCustPersonalbyCustId, custObj).toPromise().then(
      (response: any) => {
        this.CustPersonalId = response['CustPersonalId'];
      }
    );

    await this.http.post(URLConstant.GetCustByCustId, custObj).toPromise().then(
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
    if (type == "CustAttr") {
      this.CustStepIndex = 9;
    }
    if (type == "Upload") {
      this.CustStepIndex = 10;
    }
    if (type == "Other") {
      this.CustStepIndex = 11;
    }
    this.stepper.to(this.CustStepIndex);
  }

  getValue(ev: any) {
    if (ev.stepMode != undefined) {
      if (ev.stepMode == "next"){
        this.stepper.next();
        this.CustStepIndex++;
      }
      else{
        this.stepper.previous();
        this.CustStepIndex--;
      }
    }
  }
  
  endStepper(ev:any){
    if (this.From) {
      AdInsHelper.RedirectUrl(this.router,["/Customer/"+this.From+"/Paging"],{});
    } else {
      AdInsHelper.RedirectUrl(this.router,["/Customer/Paging"],{});
    }
  }
}