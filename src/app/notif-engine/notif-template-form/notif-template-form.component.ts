import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { KeyValueObj } from 'app/shared/model/key-value/key-value-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-notif-template-form',
  templateUrl: './notif-template-form.component.html'
})
export class NotifTemplateFormComponent implements OnInit {

  NotifTemplateForm = this.fb.group({
    MrNotificationLevelCode: ['', Validators.required],
    MrNotificationSourceCode: ['', Validators.required],
    MrNotificationTypeCode: ['', Validators.required],
    Subject: '',
    Body: ['', Validators.required],
  });

  DictListRefMaster: { [id: string]: Array<KeyValueObj> } = {};
  NotificationTemplateId: number = 0;

  readonly title: string = "Notification Template";
  readonly MrNotificationLevelCode: string = "MrNotificationLevelCode";
  readonly MrNotificationSourceCode: string = "MrNotificationSourceCode";
  readonly MrNotificationTypeCode: string = "MrNotificationTypeCode";
  readonly CancelLink: string = NavigationConstant.BACK_TO_PAGING;
  constructor(private fb: FormBuilder, private route: ActivatedRoute) {

    this.route.queryParams.subscribe(params => {
      if (params["NotificationTemplateId"]) {
        this.NotificationTemplateId = params["NotificationTemplateId"];
      }
    });
  }

  ngOnInit(): void {
    this.SetMrNotificationLevelCode();
    this.SetMrNotificationSourceCode();
    this.SetMrNotificationTypeCode();

  }

  SetMrNotificationLevelCode() {
    const listKeyValueObj: Array<KeyValueObj> = new Array();
    const keyValueObj1: KeyValueObj = new KeyValueObj();
    keyValueObj1.Key = "LVL1";
    keyValueObj1.Value = "Level 1";
    listKeyValueObj.push(keyValueObj1);
    const keyValueObj2: KeyValueObj = new KeyValueObj();
    keyValueObj2.Key = "LVL2";
    keyValueObj2.Value = "Level 2";
    listKeyValueObj.push(keyValueObj2);
    const keyValueObj3: KeyValueObj = new KeyValueObj();
    keyValueObj3.Key = "LVL3";
    keyValueObj3.Value = "Level 3";
    listKeyValueObj.push(keyValueObj3);
    this.DictListRefMaster[this.MrNotificationLevelCode] = listKeyValueObj;
  }

  SetMrNotificationSourceCode() {
    const listKeyValueObj: Array<KeyValueObj> = new Array();
    const keyValueObj1: KeyValueObj = new KeyValueObj();
    keyValueObj1.Key = "Source1";
    keyValueObj1.Value = "Source 1";
    listKeyValueObj.push(keyValueObj1);
    const keyValueObj2: KeyValueObj = new KeyValueObj();
    keyValueObj2.Key = "Source2";
    keyValueObj2.Value = "Source 2";
    listKeyValueObj.push(keyValueObj2);
    const keyValueObj3: KeyValueObj = new KeyValueObj();
    keyValueObj3.Key = "Source3";
    keyValueObj3.Value = "Source 3";
    listKeyValueObj.push(keyValueObj3);
    this.DictListRefMaster[this.MrNotificationSourceCode] = listKeyValueObj;
  }

  SetMrNotificationTypeCode() {
    const listKeyValueObj: Array<KeyValueObj> = new Array();
    const keyValueObj1: KeyValueObj = new KeyValueObj();
    keyValueObj1.Key = "SMS";
    keyValueObj1.Value = "SMS";
    listKeyValueObj.push(keyValueObj1);
    const keyValueObj2: KeyValueObj = new KeyValueObj();
    keyValueObj2.Key = "WHATSAPP";
    keyValueObj2.Value = "Whats App";
    listKeyValueObj.push(keyValueObj2);
    const keyValueObj3: KeyValueObj = new KeyValueObj();
    keyValueObj3.Key = "NOTIF";
    keyValueObj3.Value = "Notification";
    listKeyValueObj.push(keyValueObj3);
    const keyValueObj4: KeyValueObj = new KeyValueObj();
    keyValueObj4.Key = "EMAIL";
    keyValueObj4.Value = "Email";
    listKeyValueObj.push(keyValueObj4);
    this.DictListRefMaster[this.MrNotificationTypeCode] = listKeyValueObj;
  }

  SaveForm() {
    console.dir(this.NotifTemplateForm);
  }
}
