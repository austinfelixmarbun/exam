import {HttpClient} from '@angular/common/http';
import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AdInsHelper} from 'app/shared/AdInsHelper';
import {CommonConstant} from 'app/shared/constant/CommonConstant';
import {URLConstant} from 'app/shared/constant/URLConstant';
import {DMSObj} from 'app/shared/model/DMS/dms-obj.model';
import {ResSysConfigResultObj} from 'app/shared/model/Response/res-sys-config-result-obj,model';
import {NewCustSetData} from 'app/customer/sharing-component/new-cust-component/NewCustSetData.Service';
import {DMSLabelValueObj} from 'app/shared/model/dms/dms-label-value-obj.model';
import {NavigationConstant} from 'app/shared/NavigationConstant';
import {PathConstant} from 'app/shared/PathConstant';
import Stepper from 'bs-stepper';
import {CookieService} from 'ngx-cookie';
import {CustObj} from 'app/shared/model/cust-obj.model';
import {NGXToastrService} from 'app/components/extra/toastr/toastr.service';
import {URLConstantX} from 'app/impl/shared/constant/URLConstantX';
import {CustPersonalObj} from 'app/shared/model/cust-personal-obj.model';
import {CustomerPersonalDetailXComponent} from '../customer-personal-detail/customer-personal-detail-x.component';
import {CustomerEmergencyContactComponent} from 'app/customer/customer-personal/customer-contact-person/customer-emergency-contact/customer-emergency-contact.component';
import {CustFinDataTabXComponent} from 'app/impl/customer/cust-fin-data-tab/cust-fin-data-tab-x.component';
import {CustAttrSectionComponent} from 'app/customer/cust-attr-section/cust-attr-section.component';
import {CustomerPersonalJobDataXComponent} from 'app/impl/customer/customer-personal/customer-personal-job-data/customer-personal-job-data-x.component';


@Component({
  selector: 'app-customer-personal-page-x',
  templateUrl: './customer-personal-page-x.component.html',
  providers: [NGXToastrService],
})
export class CustomerPersonalPageXComponent implements OnInit {
  private stepper: Stepper;

  IdCust: number;
  CustPersonalId: number;
  CustStepIndex: number = 1;
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
  CustNo: string = "";
  dmsObj: DMSObj;
  SysConfigResultObj: ResSysConfigResultObj = new ResSysConfigResultObj()

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private cookieService: CookieService,
    private toastr: NGXToastrService,
    private CustSetData: NewCustSetData
  ) {
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
    "Job": 5,
    "Financial": 6,
    "CustAsset": 7,
    "Upload": 8,
    "CustAttr": 9
  }

  SetUrlBack(): string {
    let urlBack: string = NavigationConstant.CUST_PAGING;
    if (this.From) urlBack = "/" + PathConstant.LR_CUST + "/" + this.From + "/" + PathConstant.PAGING;
    return urlBack;
  }

  back() {
    AdInsHelper.RedirectUrl(this.router, [this.SetUrlBack()], {});
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
    await this.http.post(URLConstant.GetCustByCustId, { Id: this.IdCust }).toPromise().then(
      (response: CustObj) => {
        this.CustNo = response.CustNo;
      }
    );

    if(this.SysConfigResultObj.ConfigValue == '1'){
          let currentUserContext = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
          this.dmsObj = new DMSObj();
          this.dmsObj.User = currentUserContext.UserName;
          this.dmsObj.Role = currentUserContext.RoleCode;
          this.dmsObj.ViewCode = CommonConstant.DmsViewCodeCust;
          this.dmsObj.MetadataParent = null;
      	  this.dmsObj.MetadataObject.push(new DMSLabelValueObj(CommonConstant.DmsNoCust, this.CustNo));
          this.dmsObj.Option.push(new DMSLabelValueObj(CommonConstant.DmsOverideSecurity, CommonConstant.DmsOverideUploadView));

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
    if (type == "Job") {
      this.CustStepIndex = 5;
    }
    if (type == "Financial") {
      this.CustStepIndex = 6;
    }
    if (type == "CustAsset") {
      this.CustStepIndex = 7;
    }
    if (type == "Upload") {
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

  @ViewChild('CustPersDetail') private CustPersDetail: CustomerPersonalDetailXComponent;
  @ViewChild('CustEmrgcyCtc') private CustEmrgcyCtc: CustomerEmergencyContactComponent;
  @ViewChild('CustFinData') private CustFinData: CustFinDataTabXComponent;
  @ViewChild('CustJobData') private CustJobData: CustomerPersonalJobDataXComponent;
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
        flag = await this.CustPersDetail.SaveValue(true);
        break;
      case 4:
        flag = await this.CustEmrgcyCtc.SaveValue(true);
        break;
      case 6:
        flag = await this.CustFinData.saveCustAttrContentAndNext(true);
        break;
      case 5:
        flag = await this.CustJobData.SaveData();
        break;
      case 9:
        flag = await this.CustAttrData.SaveForm();
        break;
    }
    return flag;
  }
}
