import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notif-broadcast-message-paging',
  templateUrl: './notif-broadcast-message-paging.component.html'
})
export class NotifBroadcastMessagePagingComponent implements OnInit {

  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);
  readonly AddLink: string = NavigationConstant.NOTIF_ENGINE_BROADCAST_ADD_EDIT;

  constructor(private UrlConstantNew: UrlConstantNew, private router: Router) { }
  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/notif-engine/search-notif-broadcast.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/notif-engine/search-notif-broadcast.json";
    this.inputPagingObj.enviromentUrl = this.UrlConstantNew.env.NotifEngineURL + '/v2.1';
  }

  GetCallbackPaging(ev){
    console.log(ev);
    if(ev.Key == "resend"){
      AdInsHelper.RedirectUrl(this.router, [NavigationConstant.NOTIF_ENGINE_BROADCAST_ADD_EDIT], {NotificationHistHId: ev.RowObj.NotificationHId});
    }
  }
}
