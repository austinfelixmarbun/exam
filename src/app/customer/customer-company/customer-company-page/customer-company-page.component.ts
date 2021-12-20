import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Stepper from 'bs-stepper';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { DMSObj } from 'app/shared/model/dms/dms-obj.model';
import { DMSLabelValueObj } from 'app/shared/model/dms/dms-label-value-obj.model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { CookieService } from 'ngx-cookie';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { PathConstant } from 'app/shared/PathConstant';
import { ResSysConfigResultObj } from 'app/shared/model/response/res-sys-config-result-obj,model';
import { CustObj } from 'app/shared/model/cust-obj.model';
import { NewCustSetData } from 'app/customer/sharing-component/new-cust-component/NewCustSetData.Service';
import { CustomerCompanyDetailComponent } from '../customer-company-detail/customer-company-detail.component';
import { CustomerCompanyContactInformationComponent } from '../customer-company-contact-information/customer-company-contact-information.component';
import { CustFinDataTabComponent } from 'app/customer/cust-fin-data-tab/cust-fin-data-tab.component';
import { CustAttrSectionComponent } from 'app/customer/cust-attr-section/cust-attr-section.component';
import { CustomerViewHeaderCompanyComponent } from 'app/customer/customer-view/customer-view-header-company/customer-view-header-company.component';

@Component({
  selector: 'app-customer-company-page',
  templateUrl: './customer-company-page.component.html',
  styleUrls: []
})
export class CustomerCompanyPageComponent implements OnInit {
  private stepper: Stepper;

  @ViewChild('viewCustCoy') viewCustCoy: CustomerViewHeaderCompanyComponent;
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
  CustNo: string = "";
  dmsObj: DMSObj;
  SysConfigResultObj: ResSysConfigResultObj = new ResSysConfigResultObj()


  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private cookieService: CookieService, private CustSetData: NewCustSetData) {

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

  SetUrlBack(): string{
    let urlBack: string = NavigationConstant.CUST_PAGING;
    if (this.From) urlBack = "/" + PathConstant.LR_CUST + "/" + this.From + "/" + PathConstant.PAGING;
    return urlBack;
  }

  back() {
    AdInsHelper.RedirectUrl(this.router, [this.SetUrlBack()], {});
  }

  async ngOnInit(): Promise<void> {
    if (this.IdCust == null) {
      AdInsHelper.RedirectUrl(this.router, [NavigationConstant.CUST_PAGING], {});
    }
    else {
      var custObj = { CustId: this.IdCust };
      this.http.post(URLConstant.GetCustCompanyByCustId, { Id: this.IdCust }).subscribe(
        (response: any) => {
          this.CustCompanyId = response['CustCompanyId'];
        }
      );

      await this.http.post(URLConstant.GetCustByCustId, { Id: this.IdCust }).toPromise().then(
        (response: CustObj) => {
          this.CustNo = response.CustNo;
        }
      );
      //check DMS
      await this.http.post<ResSysConfigResultObj>(URLConstant.GetSysConfigPncplResultByCode, { Code: CommonConstant.ConfigCodeIsUseDms}).toPromise().then(
        (response) => {
          this.SysConfigResultObj = response;
        });
      if (this.SysConfigResultObj.ConfigValue == '1') {
        let currentUserContext = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
        this.dmsObj = new DMSObj();
        this.dmsObj.User = currentUserContext.UserName;
        this.dmsObj.Role = currentUserContext.RoleCode;
        this.dmsObj.ViewCode = CommonConstant.DmsViewCodeCust;
        this.dmsObj.MetadataParent = null;
        this.dmsObj.MetadataObject.push(new DMSLabelValueObj(CommonConstant.DmsNoCust, this.CustNo));
        this.dmsObj.Option.push(new DMSLabelValueObj(CommonConstant.DmsOverideSecurity, CommonConstant.DmsOverideUploadView));
      }

      setTimeout(() => {
        this.stepper = new Stepper(document.querySelector('#stepper1'), {
          linear: false,
          animation: true
        });
        this.EnterTab("Detail");
        this.CustStepIndex = 1;
        this.stepper.to(this.CustStepIndex);
      }, 500)
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
    if (type == "Contact") {
      this.CustStepIndex = 4;
    }
    if (type == "Financial") {
      this.CustStepIndex = 5;
    }
    if (type == "CustAsset") {
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
      if (ev.stepMode == "next") {
        this.stepper.next();
        this.CustStepIndex++;

        //skip dms
        if (this.CustStepIndex == 8 && this.SysConfigResultObj.ConfigValue != '1') {
          this.stepper.next();
          this.CustStepIndex++;
        }
      }
      else {
        this.stepper.previous();
        this.CustStepIndex--;

        //skip dms
        if (this.CustStepIndex == 8 && this.SysConfigResultObj.ConfigValue != '1') {
          this.stepper.previous();
          this.CustStepIndex--;
        }
      }
      this.viewCustCoy.ReloadUcViewGeneric();
    }
  }

  @ViewChild('CustCoyDetail') private CustCoyDetail: CustomerCompanyDetailComponent;
  @ViewChild('CustCoyContact') private CustCoyContact: CustomerCompanyContactInformationComponent;
  @ViewChild('CustFinData') private CustFinData: CustFinDataTabComponent;
  @ViewChild('CustAttrData') private CustAttrData: CustAttrSectionComponent;
  async SendToR2() {
    console.log(this.CustStepIndex);
    if(!await this.SaveData(this.CustStepIndex)) return;
    await this.CustSetData.SendCustomerDataToRabbitMq(this.CustNo, this.SetUrlBack());
  }
  async SaveData(stepIdx: number): Promise<boolean> {
    let flag: boolean = true;
    switch (stepIdx) {
      case 1:
        flag = await this.CustCoyDetail.SaveValue(true);
        break;
      case 4:
        flag = await this.CustCoyContact.SaveValue(true);
        break;
      case 5:
        flag = await this.CustFinData.saveCustAttrContentAndNext(true);
        break;
      case 9:
        flag = await this.CustAttrData.SaveForm();
        break;
    }
    return flag;
  }
}
