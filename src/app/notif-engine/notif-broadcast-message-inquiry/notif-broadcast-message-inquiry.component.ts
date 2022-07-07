import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { Router } from '@angular/router';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { HttpClient } from '@angular/common/http';
import { KeyValueObj } from 'app/shared/model/key-value/key-value-obj.model';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-notif-broadcast-message-inquiry',
  templateUrl: './notif-broadcast-message-inquiry.component.html',
})
export class NotifBroadcastMessageInquiryComponent implements OnInit {
  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);
  readonly MrNotificationTypeCode: string = CommonConstant.RefMasterTypeCodeNotificationTypes;
  readonly TypeSms: string = CommonConstant.RefMasterTypeCodeNotificationTypesSms;
  readonly TypeWA: string = CommonConstant.RefMasterTypeCodeNotificationTypesWA;
  readonly TypeEmail: string = CommonConstant.RefMasterTypeCodeNotificationTypesEmail;
  readonly TypePush: string = CommonConstant.RefMasterTypeCodeNotificationTypesPush;
  ListNotifTypeKvp : Array<KeyValueObj> = new Array<KeyValueObj>();
  IsShowPaging: boolean = false;

  NotifInquiryType = this.fb.group({
    MrNotificationTypeCode: [''],
  });

  constructor(private fb: FormBuilder, private UrlConstantNew: UrlConstantNew, private router: Router, private http: HttpClient) { }
  ngOnInit() {
    this.GetRefMasterListKeyValueActiveByCode(this.MrNotificationTypeCode);

    this.inputPagingObj.enviromentUrl = this.UrlConstantNew.env.NotifEngineURL + '/v2.1';
  }

  GetRefMasterListKeyValueActiveByCode(RefMasterTypeCode: string) {
    this.http.post(this.UrlConstantNew.GetRefMasterListKeyValueActiveByCode, { RefMasterTypeCode: RefMasterTypeCode }).subscribe(
      (response) => {
        this.ListNotifTypeKvp = response[CommonConstant.ReturnObj];
      }
    );
  }

  GetCallbackPaging(ev){
    if(ev.Key == "resend"){
      AdInsHelper.RedirectUrl(this.router, [NavigationConstant.NOTIF_ENGINE_BROADCAST_ADD_EDIT], {NotificationHistHId: ev.RowObj.NotificationHId});
    }
  }
  critObj: CriteriaObj = new CriteriaObj();
  arrCrit: Array<CriteriaObj> = new Array<CriteriaObj>();

  OnChangeType(){
    this.IsShowPaging = false;
    let TypeCode: string = this.NotifInquiryType.value.MrNotificationTypeCode;

    this.SetPagingObj(TypeCode);
    this.critObj = new CriteriaObj();
    this.critObj.restriction = AdInsConstant.RestrictionLike;
    this.critObj.propName = 'NHH.MR_NOTIFICATION_TYPE_CODE';
    this.critObj.value = TypeCode;

    this.arrCrit = new Array<CriteriaObj>();
    this.arrCrit.push(this.critObj);
    this.inputPagingObj.addCritInput = this.arrCrit;

    setTimeout(() => {
      this.IsShowPaging = true
    }, 10);
    console.log(this.NotifInquiryType);
  }

  SetPagingObj(TypeCode: string){
    switch(TypeCode){
      case this.TypePush:{
        this.inputPagingObj._url = "./assets/ucpaging/notif-engine/inquiry/search-notif-broadcast-inquiry-push.json";
        this.inputPagingObj.pagingJson = "./assets/ucpaging/notif-engine/inquiry/search-notif-broadcast-inquiry-push.json";
        break;
      }
      case this.TypeSms || this.TypeWA:{
        this.inputPagingObj._url = "./assets/ucpaging/notif-engine/inquiry/search-notif-broadcast-inquiry-sms-wa.json";
        this.inputPagingObj.pagingJson = "./assets/ucpaging/notif-engine/inquiry/search-notif-broadcast-inquiry-sms-wa.json";
        break;
      }
      case this.TypeEmail:{
        this.inputPagingObj._url = "./assets/ucpaging/notif-engine/inquiry/search-notif-broadcast-inquiry-email.json";
        this.inputPagingObj.pagingJson = "./assets/ucpaging/notif-engine/inquiry/search-notif-broadcast-inquiry-email.json";
        break;
      }
    }

  }
}
