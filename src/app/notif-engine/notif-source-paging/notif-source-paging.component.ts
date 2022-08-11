import { Component, OnInit } from '@angular/core';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-notif-source-paging',
  templateUrl: './notif-source-paging.component.html',
  styleUrls: ['./notif-source-paging.component.css']
})
export class NotifSourcePagingComponent implements OnInit {

  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);

  readonly AddLink: string = NavigationConstant.NOTIF_ENGINE_NOTIF_SOURCE_ADD_EDIT;
  constructor(private UrlConstantNew: UrlConstantNew) { }
  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/notif-engine/search-notif-source.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/notif-engine/search-notif-source.json";
    this.inputPagingObj.enviromentUrl = this.UrlConstantNew.env.NotifEngineURL + '/v2.1';
  }
}
