import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { InputLookupObj } from 'app/shared/model/input-lookup-obj.model';
import { KeyValueObj } from 'app/shared/model/key-value/key-value-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UrlConstantNew } from "app/shared/constant/URLConstantNew";
import { BodyMessageTosendComponent } from '../shared-component/body-message-tosend/body-message-tosend.component';

@Component({
  selector: 'app-notif-broadcast-message-form',
  templateUrl: './notif-broadcast-message-form.component.html'
})
export class NotifBroadcastMessageFormComponent implements OnInit {

  NotifBroadcastForm = this.fb.group({
    MrNotificationTypeCode: ['', Validators.required],
    MrNotificationLevelCode: ['', Validators.required],
    MrNotificationSourceCode: ['', Validators.required],
    Subject: '',
    ListPhone: [],
    Body: ['', Validators.required],
  });
  InputLookupTemplateMessageObj: InputLookupObj = new InputLookupObj(this.UrlConstantNew);
  readonly title: string = "Notification Broadcast";
  readonly IdentifierLookupTemplateMessage: string = "lookupTemplateMessage";
  readonly CancelLink: string = NavigationConstant.BACK_TO_PAGING;
  readonly MrNotificationLevelCode: string = "MrNotificationLevelCode";
  readonly MrNotificationSourceCode: string = "MrNotificationSourceCode";
  readonly MrNotificationTypeCode: string = "MrNotificationTypeCode";
  DictListRefMaster: { [id: string]: Array<KeyValueObj> } = {};
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private UrlConstantNew: UrlConstantNew) {
    this.route.queryParams.subscribe(params => {
      // if (params["NotificationTemplateId"]) {
      //   this.NotificationTemplateId = params["NotificationTemplateId"];
      // }
    });
  }

  ngOnInit(): void {
    this.TestTemplate();
    this.SetLookupTemplate();
    this.SetMrNotificationLevelCode();
    this.SetMrNotificationSourceCode();
    this.SetMrNotificationTypeCode();
  }

  IsUsedTemplate: boolean = false;
  ParamListCount: number = 0;
  TestTemplate() {
    this.IsUsedTemplate = true;
    this.ParamListCount = 2;
    this.NotifBroadcastForm.get("Body").setValue("Congrats Customer No {0}, Your credit {1} amount has been approved.");
  }

  get GetMrNotificationTypeCodeValue(): string{
    return this.NotifBroadcastForm.get("MrNotificationTypeCode").value;
  }

  SetMrNotificationLevelCode() {
    const listKeyValueObj: Array<KeyValueObj> = new Array();
    const keyValueObj1: KeyValueObj = new KeyValueObj();
    keyValueObj1.Key = "WARN";
    keyValueObj1.Value = "Warning";
    listKeyValueObj.push(keyValueObj1);
    const keyValueObj2: KeyValueObj = new KeyValueObj();
    keyValueObj2.Key = "INFO";
    keyValueObj2.Value = "Information";
    listKeyValueObj.push(keyValueObj2);
    this.DictListRefMaster[this.MrNotificationLevelCode] = listKeyValueObj;
  }

  SetMrNotificationSourceCode() {
    const listKeyValueObj: Array<KeyValueObj> = new Array();
    const keyValueObj1: KeyValueObj = new KeyValueObj();
    keyValueObj1.Key = "NAP";
    keyValueObj1.Value = "NAP";
    listKeyValueObj.push(keyValueObj1);
    const keyValueObj2: KeyValueObj = new KeyValueObj();
    keyValueObj2.Key = "PO";
    keyValueObj2.Value = "Purchase Order";
    listKeyValueObj.push(keyValueObj2);
    const keyValueObj3: KeyValueObj = new KeyValueObj();
    keyValueObj3.Key = "CUST";
    keyValueObj3.Value = "Customer";
    listKeyValueObj.push(keyValueObj3);
    this.DictListRefMaster[this.MrNotificationSourceCode] = listKeyValueObj;
  }

  readonly TypeSms: string = "SMS";
  readonly TypeWA: string = "WHATSAPP";
  readonly TypeEmail: string = "EMAIL";
  readonly TypeNotif: string = "NOTIF";
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

  SetLookupTemplate() {    
    this.InputLookupTemplateMessageObj.urlJson = "./assets/lookup/lookupOfficeParent.json";
    this.InputLookupTemplateMessageObj.isRequired = false;
    this.InputLookupTemplateMessageObj.addCritInput = new Array();
  }
  getLookUp(ev){
    console.log(ev);
  }
  
  @ViewChild("TempMessage") TempMessage: BodyMessageTosendComponent;
  InputParamValue() {
    this.TempMessage.InputParamValue();
  }
  getFormValidationErrors() {
    const invalid = [];
    const controls = this.NotifBroadcastForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
        console.log(name);
      }
    }
    console.log(this.NotifBroadcastForm);
    console.log(invalid);
  }

  SaveForm(){
    console.dir(this.NotifBroadcastForm);
  }
}
