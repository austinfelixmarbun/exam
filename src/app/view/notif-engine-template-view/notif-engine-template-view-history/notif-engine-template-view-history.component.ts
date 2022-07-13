import { Component, OnInit } from '@angular/core';
import { NotificationTemplateObj } from 'app/shared/model/notif-engine/notification-template-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { InputGridObj } from 'app/shared/model/input-grid-obj.model';

@Component({
  selector: 'app-notif-engine-template-view-history',
  templateUrl: './notif-engine-template-view-history.component.html',
})
export class NotifEngineTemplateViewHistoryComponent implements OnInit {
  listTemplateHist: Array<NotificationTemplateObj> = new Array<NotificationTemplateObj>();
  TemplateCode: string = "";
  TemplateVersion: number = 0;
  InputGridTemplateHistObj: InputGridObj = new InputGridObj();

  constructor(private route: ActivatedRoute, private http: HttpClient, private UrlConstantNew: UrlConstantNew) {
    this.route.queryParams.subscribe(params => {
      if (params["TemplateCode"] != null) {
        this.TemplateCode = params["TemplateCode"];
      }
      if (params["TemplateVersion"] != null) {
        this.TemplateVersion = params["TemplateVersion"];
      }
    });
   }

  async ngOnInit() {
    this.InputGridTemplateHistObj.pagingJson = "./assets/ucgridview/notif-engine/grid-notif-template-history-view.json";
    await this.GetListTemplateHist();
    this.InputGridTemplateHistObj.resultData = {
      Data: ""
    }
    this.InputGridTemplateHistObj.resultData["Data"] = new Array();
    this.InputGridTemplateHistObj.resultData.Data = this.listTemplateHist;
  }

  async GetListTemplateHist() {
    await this.http.post(this.UrlConstantNew.GetListNotificationTemplateByNotificationTemplateCode, { Code: this.TemplateCode }).toPromise().then(
      (response: Array<NotificationTemplateObj>) => {
        this.listTemplateHist = response;
      }
    );
  }
}
