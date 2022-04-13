import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';

@Component({
  selector: 'app-notif-broadcast-message-paging',
  templateUrl: './notif-broadcast-message-paging.component.html'
})
export class NotifBroadcastMessagePagingComponent implements OnInit {

  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);

  constructor(private UrlConstantNew: UrlConstantNew) { }
  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/notif-engine/search-notif-broadcast.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/notif-engine/search-notif-broadcast.json";
    this.inputPagingObj.enviromentUrl = this.UrlConstantNew.env.NotifEngineURL + '/v2.1';
  }

}
