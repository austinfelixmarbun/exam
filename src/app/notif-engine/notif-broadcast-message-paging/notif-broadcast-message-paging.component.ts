import { Component, OnInit } from '@angular/core';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UcTempPagingObj } from 'app/shared/model/temp-paging/uc-temp-paging-obj.model';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { Router } from '@angular/router';
import { ResendAllNotificationObj } from 'app/shared/model/notif-engine/resend-all-notification-obj';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { ReqResendAllNotificationObj } from 'app/shared/model/notif-engine/req-resend-all-notification-obj';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';

@Component({
  selector: 'app-notif-broadcast-message-paging',
  templateUrl: './notif-broadcast-message-paging.component.html'
})
export class NotifBroadcastMessagePagingComponent implements OnInit {
  readonly AddLink: string = NavigationConstant.NOTIF_ENGINE_BROADCAST_ADD_EDIT;
  TempPagingObj: UcTempPagingObj = new UcTempPagingObj(this.UrlConstantNew);
  ResendAllObj: ResendAllNotificationObj = new ResendAllNotificationObj();
  ListNotificationJobId: Array<string> = new Array<string>();
  ShowButton: boolean = false;

  readonly TypeSms: string = CommonConstant.RefMasterTypeCodeNotificationTypesSms;
  readonly TypeWA: string = CommonConstant.RefMasterTypeCodeNotificationTypesWA;
  readonly TypeEmail: string = CommonConstant.RefMasterTypeCodeNotificationTypesEmail;
  readonly TypePush: string = CommonConstant.RefMasterTypeCodeNotificationTypesPush;

  constructor(private UrlConstantNew: UrlConstantNew, private router: Router, private http: HttpClient, private toastr: NGXToastrService) { }
  ngOnInit() {
    this.TempPagingObj.urlJson = "./assets/ucpaging/notif-engine/add-to-temp-notif-broadcast-resend.json";
    this.TempPagingObj.pagingJson = "./assets/ucpaging/notif-engine/add-to-temp-notif-broadcast-resend.json";
    this.TempPagingObj.enviromentUrl = this.UrlConstantNew.env.NotifEngineURL + '/v2.1';
    this.TempPagingObj.isReady = false;

    let criteriaListTempPagingObj = new Array();
    let criteriaTempPagingObj = new CriteriaObj();
    criteriaTempPagingObj.DataType = "date";
    criteriaTempPagingObj.propName = 'NHH.SEND_DT';
    criteriaTempPagingObj.restriction = AdInsConstant.RestrictionIsNull;
    criteriaListTempPagingObj.push(criteriaTempPagingObj);

    this.TempPagingObj.addCritInput = criteriaListTempPagingObj;
    this.TempPagingObj.isReady = true;
  }

  getListTemp(ev){
    console.log(ev);
    this.ResendAllObj = new ResendAllNotificationObj();
    this.AppendResendAllObj(ev);
    this.ListNotificationJobId = ev.TempListId;
    this.ShowButton = true;
    console.log(this.ListNotificationJobId);
  }

  AppendResendAllObj(ev){
    for(let i = 0; i<ev.TempListObj.length; i++){
      if(ev.TempListObj.at(i).MrNotificationTypeCode == this.TypeSms){
        this.ResendAllObj.ListIdSms.push(ev.TempListObj.at(i).NotificationHId.toString());
      }
      if(ev.TempListObj.at(i).MrNotificationTypeCode == this.TypeWA){
        this.ResendAllObj.ListIdWa.push(ev.TempListObj.at(i).NotificationHId.toString());
      }
      if(ev.TempListObj.at(i).MrNotificationTypeCode == this.TypePush){
        this.ResendAllObj.ListIdPushNotif.push(ev.TempListObj.at(i).NotificationHId.toString());
      }
      if(ev.TempListObj.at(i).MrNotificationTypeCode == this.TypeEmail){
        this.ResendAllObj.ListIdEmail.push(ev.TempListObj.at(i).NotificationHId.toString());
      }
    }
  }

  ResendNotif(ev){
    console.log(ev);
    if(ev.Key == "resend"){
      AdInsHelper.RedirectUrl(this.router, [this.AddLink], {NotificationHistHId: ev.RowObj.NotificationHId});
    }
  }
  async ResendFromList(){
    console.log(this.ResendAllObj);
    let urlResendMultiple = this.UrlConstantNew.MultipleResendToNotificationEngine;
    await this.http.post(urlResendMultiple, this.ResendAllObj).toPromise().then(
      (response) => {
        if (response["StatusCode"] == "200") {
          this.toastr.successMessage(response['message']);
        }
      }
    );
  }
}
