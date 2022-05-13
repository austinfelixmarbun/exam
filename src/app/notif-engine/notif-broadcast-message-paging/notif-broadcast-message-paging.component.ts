import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UcTempPagingObj } from 'app/shared/model/temp-paging/uc-temp-paging-obj.model';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notif-broadcast-message-paging',
  templateUrl: './notif-broadcast-message-paging.component.html'
})
export class NotifBroadcastMessagePagingComponent implements OnInit {
  readonly AddLink: string = NavigationConstant.NOTIF_ENGINE_BROADCAST_ADD_EDIT;
  TempPagingObj: UcTempPagingObj = new UcTempPagingObj(this.UrlConstantNew);
  ListNotificationJobId: Array<string> = new Array<string>();
  ShowButton: boolean = false;

  constructor(private UrlConstantNew: UrlConstantNew, private router: Router) { }
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
    this.ListNotificationJobId = ev.TempListId;
    this.ShowButton = true;
    console.log(this.ListNotificationJobId);
  }

  ResendNotif(ev){
    console.log(ev);
    if(ev.Key == "resend"){
      AdInsHelper.RedirectUrl(this.router, [this.AddLink], {NotificationHistHId: ev.RowObj.NotificationHId});
    }
  }

  ResendFromList(){
    let StrListIdObj: string = this.ListNotificationJobId.toString();
    console.log(StrListIdObj);
  }
}
