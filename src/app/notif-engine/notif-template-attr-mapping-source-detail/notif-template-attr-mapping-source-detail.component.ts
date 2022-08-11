import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { AuthFormObj } from 'app/shared/model/auth-form-obj.model';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { ListAuthFormObj } from 'app/shared/model/list-auth-form-obj.model';
import { ReqAddListRefNotifAttrSourceContentObj } from 'app/shared/model/notif-engine/req-add-list-ref-notif-attr-source-content-obj.model';
import { FromValueObj, UcTempPagingObj } from 'app/shared/model/temp-paging/uc-temp-paging-obj.model';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-notif-template-attr-mapping-source-detail',
  templateUrl: './notif-template-attr-mapping-source-detail.component.html',
  styleUrls: ['./notif-template-attr-mapping-source-detail.component.css']
})
export class NotifTemplateAttrMappingSourceDetailComponent implements OnInit {

  RefNotificationSourceId: number;
  AuthFormObj: AuthFormObj;
  listAuthFormObj: ListAuthFormObj;
  listSelectedId: Array<number> = new Array<number>();
  tempPagingObj: UcTempPagingObj = new UcTempPagingObj(this.UrlConstantNew);
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);

  readonly CancelLink: string = NavigationConstant.NOTIF_ENGINE_NOTIF_ATTR_TEMPLATE_MAPPING_SOURCE;
  constructor(private http: HttpClient, private route: ActivatedRoute, private UrlConstantNew: UrlConstantNew, private toastr: NGXToastrService, private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.RefNotificationSourceId = params["RefNotificationSourceId"];
    })
  }

  ngOnInit() {
    this.viewGenericObj.viewEnvironment = this.UrlConstantNew.env.NotifEngineURL + '/v1';
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/notification-template/view-notification-source.json";

    this.tempPagingObj.enviromentUrl = this.UrlConstantNew.env.NotifEngineURL + '/v2.1';
    this.tempPagingObj.urlJson = "./assets/ucpaging/notif-engine/add-to-temp-notif-template-attr-mapping-source.json";
    this.tempPagingObj.pagingJson = "./assets/ucpaging/notif-engine/add-to-temp-notif-template-attr-mapping-source.json";
    
    let fromValueObj = new FromValueObj();
    fromValueObj.property = 'RefNotificationSourceId';
    fromValueObj.value = this.RefNotificationSourceId;
    this.tempPagingObj.fromValue.push(fromValueObj);

    let critObj = new CriteriaObj();
    critObj.propName = 'RNAT.IS_ACTIVE';
    critObj.restriction = AdInsConstant.RestrictionEq;
    critObj.value = "true";
    this.tempPagingObj.addCritInput.push(critObj);

    this.tempPagingObj.isReady = true;
  }

  getListTemp(ev) {
    this.listSelectedId = ev.TempListId;
  }


  SaveListAuthForm() {
    if (this.listSelectedId.length == 0) {
      this.toastr.errorMessage(ExceptionConstant.ADD_MIN_1_DATA);
      return;
    }

    let ReqObj: ReqAddListRefNotifAttrSourceContentObj = new ReqAddListRefNotifAttrSourceContentObj();
    ReqObj.ListRefNotifAttrTemplateId = this.listSelectedId;
    ReqObj.RefNotificationSourceId = this.RefNotificationSourceId;

    this.http.post(this.UrlConstantNew.AddListRefNotifAttrSourceContent, ReqObj, AdInsConstant.SpinnerOptions).subscribe(
      (response) => {
        this.toastr.successMessage(response["message"]);
        AdInsHelper.RedirectUrl(this.router, [NavigationConstant.NOTIF_ENGINE_NOTIF_ATTR_TEMPLATE_MAPPING_SOURCE],{ "RefNotificationSourceId": this.RefNotificationSourceId });
      });
  }

}
