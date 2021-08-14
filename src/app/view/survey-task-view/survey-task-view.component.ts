import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { DMSLabelValueObj } from 'app/shared/model/DMS/DMSLabelValueObj.Model';
import { DMSObj } from 'app/shared/model/DMS/DMSObj.model';
import { ResSysConfigResultObj } from 'app/shared/model/Response/ResSysConfigResultObj,model';
import { UcViewGenericObj } from 'app/shared/model/UcViewGenericObj.model';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-survey-task-view',
  templateUrl: './survey-task-view.component.html'
})
export class SurveyTaskViewComponent implements OnInit {

  SrvyTaskId: string;
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj();
  viewGenericSbjctObj: UcViewGenericObj = new UcViewGenericObj();
  isDmsReady: boolean = false;
  dmsObj: DMSObj;
  SysConfigResultObj: ResSysConfigResultObj = new ResSysConfigResultObj()
  
  constructor(private route: ActivatedRoute, private http: HttpClient, private cookieService: CookieService) { 
    this.route.queryParams.subscribe(params => {
      if (params["SrvyTaskId"] != null) {
        this.SrvyTaskId = params["SrvyTaskId"];
      }
    });
  }

  async ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewSurveyTask.json";
    this.viewGenericSbjctObj.viewInput = "./assets/ucviewgeneric/viewSrvyTaskSubject.json";

    await this.http.post<ResSysConfigResultObj>(URLConstant.GetSysConfigPncplResultByCode, { Code: CommonConstant.ConfigCodeIsUseDms}).toPromise().then(
      (response) => {
        this.SysConfigResultObj = response;
    });

    // this.ReqGenericObj.Id = this.SrvyOrderId;
    // await this.http.post(URLConstant.GetSrvyOrderBySrvyOrderId, this.ReqGenericObj).toPromise().then(
    //   (response) => {
        let currentUserContext = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
        if (this.SysConfigResultObj.ConfigValue == '1') {
          this.dmsObj = new DMSObj();
          this.dmsObj.User = currentUserContext.UserName;
          this.dmsObj.Role = currentUserContext.RoleCode;
          this.dmsObj.ViewCode = CommonConstant.DmsViewCodeApp;
          this.dmsObj.MetadataParent.push(new DMSLabelValueObj(CommonConstant.DmsNoApp, this.SrvyTaskId));
          this.dmsObj.MetadataObject.push(new DMSLabelValueObj(CommonConstant.DmsNoApp, this.SrvyTaskId));
          this.dmsObj.Option.push(new DMSLabelValueObj(CommonConstant.DmsOverideSecurity, CommonConstant.DmsOverideView));
          this.isDmsReady = true;
        }
      // });
  }

}
