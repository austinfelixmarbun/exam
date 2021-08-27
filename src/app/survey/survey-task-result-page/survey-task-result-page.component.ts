import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { DMSLabelValueObj } from 'app/shared/model/DMS/DMSLabelValueObj.Model';
import { DMSObj } from 'app/shared/model/DMS/DMSObj.model';
import { GenericObj } from 'app/shared/model/Generic/GenericObj.Model';
import { ResSysConfigResultObj } from 'app/shared/model/Response/ResSysConfigResultObj,model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import Stepper from 'bs-stepper';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-survey-task-result-page',
  templateUrl: './survey-task-result-page.component.html'
})
export class SurveyTaskResultPageComponent implements OnInit {
  private stepper: Stepper;

  ReqGenericObj: GenericObj = new GenericObj();
  SrvyTaskId: number;
  SrvyOrderId: number;
  SrvyTaskNo: string;
  SrvyOrderNo: string;
  SurveyorName: string;
  Type: string;
  CustStepIndex: number;
  isDmsReady: boolean = false;
  dmsObj: DMSObj;
  SysConfigResultObj: ResSysConfigResultObj = new ResSysConfigResultObj()

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private cookieService: CookieService) { 
    this.route.queryParams.subscribe(params => {
      if(params["SrvyTaskId"] != null){
        this.SrvyTaskId = params["SrvyTaskId"];
      }
      if(params["SrvyOrderId"] != null){
        this.SrvyOrderId = params["SrvyOrderId"];
      }
      if(params["SurveyorName"] != null){
        this.SurveyorName = params["SurveyorName"];
      }
      if(params["Type"] != null){
        this.Type = params["Type"];
      }
    });
  }
  

  CustStep = {
    "Detail": 1,
    "Upload": 2
  }

  back() {
      AdInsHelper.RedirectUrl(this.router,[NavigationConstant.SURVEY_TASK_RESULT_PAGING],{});
  }
 
  async ngOnInit() {
    await this.GetSrvyOrderNo();
    await this.GetSrvyTaskNo();

    // check DMS
    await this.http.post<ResSysConfigResultObj>(URLConstant.GetSysConfigPncplResultByCode, { Code: CommonConstant.ConfigCodeIsUseDms}).toPromise().then(
      (response) => {
        this.SysConfigResultObj = response;
    });

    if (this.SysConfigResultObj.ConfigValue == '1') {
      let currentUserContext = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
      this.dmsObj = new DMSObj();
      this.dmsObj.User = currentUserContext.UserName;
      this.dmsObj.Role = currentUserContext.RoleCode;
      this.dmsObj.ViewCode = CommonConstant.DmsViewCodeSurvey;
      this.dmsObj.MetadataObject.push(new DMSLabelValueObj(CommonConstant.DmsSurveyId, this.SrvyOrderNo), new DMSLabelValueObj(CommonConstant.DmsTaskId, this.SrvyTaskNo));
      this.dmsObj.Option.push(new DMSLabelValueObj(CommonConstant.DmsOverideSecurity, CommonConstant.DmsOverideUploadView));
      this.isDmsReady = true;
    }

    this.stepper = new Stepper(document.querySelector('#stepperSrvy'), {
      linear: false,
      animation: true
    })
    this.EnterTab("Detail");
    this.CustStepIndex = 1;
    this.stepper.to(this.CustStepIndex);
  }

  async GetSrvyTaskNo(){
    this.ReqGenericObj.Id = this.SrvyTaskId;
    await this.http.post(URLConstant.GetSrvyTaskBySrvyTaskId, this.ReqGenericObj).toPromise().then(
      (response) => {
        this.SrvyTaskNo = response["SrvyTaskNo"];
      });
  }

  async GetSrvyOrderNo(){
    this.ReqGenericObj.Id = this.SrvyOrderId;
    await this.http.post(URLConstant.GetSrvyOrderBySrvyOrderId, this.ReqGenericObj).toPromise().then(
      (response) => {
        this.SrvyOrderNo = response["SrvyOrderNo"];
      });
  }

  EnterTab(type) {
    if (type == "Detail") {
      this.CustStepIndex = 1;
    }
    if (type == "Upload") {
      this.CustStepIndex = 2;
    }
    this.stepper.to(this.CustStepIndex);
  }

  getValue(ev: any) {
    if (ev.stepMode != undefined) {
      if (ev.stepMode == "next"){
        this.stepper.next();
        this.CustStepIndex++;

        //skip dms
        if(this.CustStepIndex == 2 && this.SysConfigResultObj.ConfigValue != '1'){
          this.stepper.next();
          this.CustStepIndex++;
        }
      }
      else{
        this.stepper.previous();
        this.CustStepIndex--;

        //skip dms
        if(this.CustStepIndex == 2 && this.SysConfigResultObj.ConfigValue != '1'){
          this.stepper.previous();
          this.CustStepIndex--;
        }
      }
    }
  }
  
  endStepper(){
      AdInsHelper.RedirectUrl(this.router,[NavigationConstant.SURVEY_TASK_RESULT_PAGING],{});
  }

}
