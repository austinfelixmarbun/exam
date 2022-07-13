import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-notif-engine-template-view',
  templateUrl: './notif-engine-template-view.component.html',
})
export class NotifEngineTemplateViewComponent implements OnInit {
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);
  TemplateCode: string = "";
  TemplateVersion: number = 0;
  constructor(private route: ActivatedRoute, private UrlConstantNew: UrlConstantNew, private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (params["TemplateCode"] != null) {
        this.TemplateCode = params["TemplateCode"];
      }
      if (params["TemplateVersion"] != null) {
        this.TemplateVersion = params["TemplateVersion"];
      }
    });
   }

  ngOnInit(): void {
    this.viewGenericObj.viewEnvironment = this.UrlConstantNew.env.NotifEngineURL + '/v1';
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/notification-template/view-template-header.json";

    let linkUrl = NavigationConstant.VIEW_NOTIF_TEMPLATE_MAIN;
    AdInsHelper.RedirectUrlView(this.router, [linkUrl], { "TemplateCode": this.TemplateCode, "TemplateVersion": this.TemplateVersion }, true);
  }

  ChangeTab(ev: number) {
    let linkUrl: string = "";
    if (ev == 0) { 
      linkUrl = NavigationConstant.VIEW_NOTIF_TEMPLATE_MAIN;
    }
    else if (ev == 1) { 
      linkUrl = NavigationConstant.VIEW_NOTIF_TEMPLATE_HISTORY;
    }
    AdInsHelper.RedirectUrlView(this.router, [linkUrl], { "TemplateCode": this.TemplateCode, "TemplateVersion": this.TemplateVersion }, true);
  }
}
