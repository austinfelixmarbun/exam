import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-notif-template-paging',
  templateUrl: './notif-template-paging.component.html'
})
export class NotifTemplatePagingComponent implements OnInit {

  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);
  readonly AddLink: string = NavigationConstant.NOTIF_ENGINE_TEMPLATE_ADD_EDIT;

  constructor(private UrlConstantNew: UrlConstantNew) { }
  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/notif-engine/search-notif-template.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/notif-engine/search-notif-template.json";
    this.inputPagingObj.enviromentUrl = this.UrlConstantNew.env.NotifEngineURL + '/v2.1';
  }

}
