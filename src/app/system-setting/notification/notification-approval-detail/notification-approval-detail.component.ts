import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { NotificationDObj} from 'app/shared/model/NotificationDObj.Model'
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { environment } from 'environments/environment';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.Model';
import { NotificationHObj } from 'app/shared/model/NotificationHObj.Model';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { UcViewGenericObj } from 'app/shared/model/UcViewGenericObj.model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { CookieService } from 'ngx-cookie';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-notification-approval-detail',
  templateUrl: './notification-approval-detail.component.html',
  providers: [NGXToastrService]
})
export class NotificationApprovalDetailComponent implements OnInit {
  inputPagingObj:any;
  arrCrit: any;
  settingUrl: string = environment.FoundationR3Url;
  notificationHObj: NotificationHObj;
  NotificationHId: any;
  detailData: any;
  countDetailData: any;
  detailDataForGrid: any;
  deleteUrl: any;
  resultData: any;
  getUrl:any;
  submitUrl:any;
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj();
  
  readonly CancelLink: string = NavigationConstant.SYSTEM_SETTING_NOTIF_APPRV;
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private cookieService: CookieService) { 
    this.route.queryParams.subscribe(params => {
      if (params["NotificationHId"] != null) {
        this.NotificationHId = params["NotificationHId"];
      }

    });
  }

  ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewNotificationOnApproval.json";
    this.viewGenericObj.viewEnvironment = environment.FoundationR3Url;

    this.getUrl = this.settingUrl + URLConstant.GetNotificationHByNotificationHId;
    this.submitUrl = this.settingUrl + URLConstant.EditNotificationH;
    this.notificationHObj = new NotificationHObj();
    this.notificationHObj.NotificationHId = this.NotificationHId;
    this.http.post(this.getUrl, this.notificationHObj).subscribe(
      response => {
        this.resultData = response;
      }
    );

    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/ucpaging/searchNotificationDOnApproval.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = URLConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchNotificationDOnApproval.json";
    this.inputPagingObj.deleteUrl = URLConstant.DeleteNotificationD;

    this.arrCrit = new Array();
    var critObj = new CriteriaObj();
    critObj.restriction = AdInsConstant.RestrictionEq;
    critObj.propName = 'NOTIFICATION_H_ID';
    critObj.value = this.NotificationHId;
    this.arrCrit.push(critObj);
    this.inputPagingObj.addCritInput = this.arrCrit;
  }

  SaveForm(event: any)
  {
    var currentUserContext = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
    var notificationResultStat;
    var resultForMsg;

    if (event.target.id == "btnApprove")//Approve
    {
      notificationResultStat = "APV";
      resultForMsg = "Approve ";
    }
    else if (event.target.id == "btnReject")//Reject
    {
      notificationResultStat = "RJC";
      resultForMsg = "Reject ";
    }
    else if (event.target.id == "btnReturn")//Return
    {
      notificationResultStat = "RTN";
      resultForMsg = "Return ";
    }
    
    this.notificationHObj = this.resultData;
    this.notificationHObj.Status = notificationResultStat;
    this.notificationHObj.ApproveBy = currentUserContext.UserName;
    
      this.http.post(this.submitUrl, this.notificationHObj).subscribe(
        response => {
          this.toastr.successMessage(resultForMsg + " " + response["Message"]);
          AdInsHelper.RedirectUrl(this.router,[NavigationConstant.SYSTEM_SETTING_NOTIF_APPRV],{ });
        }
      );
  }

}
