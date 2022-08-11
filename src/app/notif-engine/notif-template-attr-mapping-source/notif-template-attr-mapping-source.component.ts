import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { UcPagingObj, WhereValueObj } from 'app/shared/model/uc-paging-obj.model';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-notif-template-attr-mapping-source',
  templateUrl: './notif-template-attr-mapping-source.component.html',
  styleUrls: ['./notif-template-attr-mapping-source.component.css']
})
export class NotifTemplateAttrMappingSourceComponent implements OnInit {

  RefNotificationSourceId: string;
  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);

  readonly CancelLink: string = NavigationConstant.NOTIF_ENGINE_NOTIF_SOURCE_PAGING;
  readonly AddLink: string = NavigationConstant.NOTIF_ENGINE_NOTIF_ATTR_TEMPLATE_MAPPING_SOURCE_DETAIL;
  constructor(private route: ActivatedRoute, private UrlConstantNew: UrlConstantNew) {
    this.route.queryParams.subscribe(params => {
      this.RefNotificationSourceId = params["RefNotificationSourceId"];
    })
  }

  ngOnInit() {
    this.viewGenericObj.viewEnvironment = this.UrlConstantNew.env.NotifEngineURL + '/v1';
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/notification-template/view-notification-source.json";

    this.inputPagingObj = new UcPagingObj(this.UrlConstantNew);
    this.inputPagingObj._url = "./assets/ucpaging/notif-engine/search-notif-template-attr-mapping.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/notif-engine/search-notif-template-attr-mapping.json";
    this.inputPagingObj.enviromentUrl = this.UrlConstantNew.env.NotifEngineURL + '/v2.1';
    this.inputPagingObj.deleteUrl = this.UrlConstantNew.DeleteRefNotifAttrSourceContent;

    var whereValue = new WhereValueObj();
    whereValue.property = "RefNotificationSourceId";
    whereValue.value = this.RefNotificationSourceId;
    this.inputPagingObj.whereValue.push(whereValue);
  }

}
