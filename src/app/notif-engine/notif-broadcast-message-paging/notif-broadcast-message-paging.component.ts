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
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { KeyValueObj } from 'app/shared/model/key-value/key-value-obj.model';

@Component({
  selector: 'app-notif-broadcast-message-paging',
  templateUrl: './notif-broadcast-message-paging.component.html'
})
export class NotifBroadcastMessagePagingComponent implements OnInit {
  readonly AddLink: string = NavigationConstant.NOTIF_ENGINE_BROADCAST_ADD_EDIT;
  TempPagingObj: UcTempPagingObj = new UcTempPagingObj(this.UrlConstantNew);
  ListNotifTypeKvp : Array<KeyValueObj> = new Array<KeyValueObj>();
  ResendAllObj: ResendAllNotificationObj = new ResendAllNotificationObj();
  ListNotificationJobId: Array<string> = new Array<string>();
  ShowButton: boolean = false;
  ShowTempPaging: boolean = false;

  readonly TypeSms: string = CommonConstant.RefMasterTypeCodeNotificationTypesSms;
  readonly TypeWA: string = CommonConstant.RefMasterTypeCodeNotificationTypesWA;
  readonly TypeEmail: string = CommonConstant.RefMasterTypeCodeNotificationTypesEmail;
  readonly TypePush: string = CommonConstant.RefMasterTypeCodeNotificationTypesPush;

  constructor(private UrlConstantNew: UrlConstantNew, private router: Router, private http: HttpClient, private toastr: NGXToastrService) { }
  ngOnInit() {
    this.GetRefMasterListKeyValueActiveByCode(CommonConstant.RefMasterTypeCodeNotificationTypes);
    this.TempPagingObj.enviromentUrl = this.UrlConstantNew.env.NotifEngineURL + '/v2.1';
  }

  GetRefMasterListKeyValueActiveByCode(RefMasterTypeCode: string) {
    this.http.post(this.UrlConstantNew.GetRefMasterListKeyValueActiveByCode, { RefMasterTypeCode: RefMasterTypeCode }).subscribe(
      (response) => {
        this.ListNotifTypeKvp = response[CommonConstant.ReturnObj];
      }
    );
  }

  getListTemp(ev){
    this.ResendAllObj = new ResendAllNotificationObj();
    this.AppendResendAllObj(ev);
    this.ListNotificationJobId = ev.TempListId;
    this.ShowButton = true;
  }

  AppendResendAllObj(ev){
    for(let i = 0; i<ev.TempListObj.length; i++){
      let NotifTypeCode = ev.TempListObj.at(i).MrNotificationTypeCode
      let PushObj = ev.TempListObj.at(i).NotificationHId.toString()
      if(NotifTypeCode == this.TypeSms){
        this.ResendAllObj.ListIdSms.push(PushObj);
      }
      if(NotifTypeCode == this.TypeWA){
        this.ResendAllObj.ListIdWa.push(PushObj);
      }
      if(NotifTypeCode == this.TypeEmail){
        this.ResendAllObj.ListIdPushNotif.push(PushObj);
      }
      if(NotifTypeCode == this.TypePush){
        this.ResendAllObj.ListIdEmail.push(PushObj);
      }
    }
  }

  ResendNotif(ev){
    if(ev.Key == "resend"){
      AdInsHelper.RedirectUrl(this.router, [this.AddLink], {NotificationHistHId: ev.RowObj.NotificationHId});
    }
  }
  async ResendFromList(){
    let urlResendMultiple = this.UrlConstantNew.MultipleResendToNotificationEngine;
    await this.http.post(urlResendMultiple, this.ResendAllObj).toPromise().then(
      (response) => {
        if (response["StatusCode"] == "200") {
          this.toastr.successMessage(response['message']);
        }
      }
    );
    AdInsHelper.RedirectUrl(this.router, [NavigationConstant.NOTIF_ENGINE_BROADCAST_PAGING], {});
  }

  OnChangeType(TypeCode){
    this.ShowTempPaging = false;
    this.ShowButton = false;
    this.SetPagingObj(TypeCode);

    this.TempPagingObj.addCritInput = new Array<CriteriaObj>();
    this.SetCritIsNullSendDt();

    let critObj = new CriteriaObj();

    if(TypeCode == CommonConstant.RefMasterTypeCodeNotificationTypesSms || TypeCode == CommonConstant.RefMasterTypeCodeNotificationTypesWA){
      critObj.restriction = AdInsConstant.RestrictionLike;
      critObj.propName = 'NHH.MR_NOTIFICATION_TYPE_CODE';
      critObj.value = TypeCode;
      
      this.TempPagingObj.addCritInput.push(critObj);
    }

    if(TypeCode){
      setTimeout(() => {
        this.ShowTempPaging = true
      }, 10);
    }
  }

  SetCritIsNullSendDt(){
    let criteriaTempPagingObj = new CriteriaObj();
    criteriaTempPagingObj.DataType = "date";
    criteriaTempPagingObj.propName = 'NHH.SEND_DT';
    criteriaTempPagingObj.restriction = AdInsConstant.RestrictionIsNull;
    this.TempPagingObj.addCritInput.push(criteriaTempPagingObj);
  }

  SetPagingObj(TypeCode: string) {
    switch(TypeCode){
      case this.TypePush:{
        this.TempPagingObj.urlJson = "./assets/ucpaging/notif-engine/broadcast/add-to-temp-notif-broadcast-resend-push.json";
        this.TempPagingObj.pagingJson = "./assets/ucpaging/notif-engine/broadcast/add-to-temp-notif-broadcast-resend-push.json";
        break;
      }
      case this.TypeSms || this.TypeWA:{
        this.TempPagingObj.urlJson = "./assets/ucpaging/notif-engine/broadcast/add-to-temp-notif-broadcast-resend-sms-wa.json";
        this.TempPagingObj.pagingJson = "./assets/ucpaging/notif-engine/broadcast/add-to-temp-notif-broadcast-resend-sms-wa.json";
        break;
      }
      case this.TypeEmail:{
        this.TempPagingObj.urlJson = "./assets/ucpaging/notif-engine/broadcast/add-to-temp-notif-broadcast-resend-email.json";
        this.TempPagingObj.pagingJson = "./assets/ucpaging/notif-engine/broadcast/add-to-temp-notif-broadcast-resend-email.json";
        break;
      }
    }
  }
}
