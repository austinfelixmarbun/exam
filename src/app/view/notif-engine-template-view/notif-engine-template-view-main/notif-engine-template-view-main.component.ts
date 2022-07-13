import { Component, OnInit } from '@angular/core';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';

@Component({
  selector: 'app-notif-engine-template-view-main',
  templateUrl: './notif-engine-template-view-main.component.html',
})
export class NotifEngineTemplateViewMainComponent implements OnInit {
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);

  constructor(private UrlConstantNew: UrlConstantNew) { }

  ngOnInit(): void {
    this.viewGenericObj.viewEnvironment = this.UrlConstantNew.env.NotifEngineURL + '/v1';
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/notification-template/view-template-main-data.json";
  }

}
