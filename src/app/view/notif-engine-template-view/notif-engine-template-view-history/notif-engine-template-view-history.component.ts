import { Component, Input, OnInit } from '@angular/core';
import { NotificationTemplateObj } from 'app/shared/model/notif-engine/notification-template-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { HttpClient } from '@angular/common/http';
import { InputGridObj } from 'app/shared/model/input-grid-obj.model';

@Component({
  selector: 'app-notif-engine-template-view-history',
  templateUrl: './notif-engine-template-view-history.component.html',
})
export class NotifEngineTemplateViewHistoryComponent implements OnInit {
  
  @Input() TemplateCode: string;
  InputGridTemplateHistObj: InputGridObj = new InputGridObj();

  constructor(private http: HttpClient, private UrlConstantNew: UrlConstantNew) { }

  async ngOnInit() {
    this.InputGridTemplateHistObj.pagingJson = "./assets/ucgridview/notif-engine/grid-notif-template-history-view.json";
    let listTemplateHist: Array<NotificationTemplateObj> = new Array<NotificationTemplateObj>();
    this.InputGridTemplateHistObj.resultData = {
      Data: ""
    }
    this.InputGridTemplateHistObj.resultData["Data"] = new Array();
    this.InputGridTemplateHistObj.resultData.Data = await this.GetListTemplateHist(listTemplateHist);
  }

  async GetListTemplateHist(listTemplateHist: Array<NotificationTemplateObj>) {
    await this.http.post(this.UrlConstantNew.GetListNotificationTemplateByNotificationTemplateCode, { Code: this.TemplateCode }).toPromise().then(
      (response: Array<NotificationTemplateObj>) => {
        listTemplateHist = response;
      }
    );
    return listTemplateHist;
  }
}
