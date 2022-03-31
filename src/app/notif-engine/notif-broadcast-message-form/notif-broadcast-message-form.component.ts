import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { InputLookupObj } from 'app/shared/model/input-lookup-obj.model';
import { KeyValueObj } from 'app/shared/model/key-value/key-value-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-notif-broadcast-message-form',
  templateUrl: './notif-broadcast-message-form.component.html'
})
export class NotifBroadcastMessageFormComponent implements OnInit {

  NotifBroadcastForm = this.fb.group({
    MrNotificationTypeCode: ['', Validators.required],
    Subject: '',
    Body: ['', Validators.required],
  });
  InputLookupTemplateMessageObj: InputLookupObj = new InputLookupObj();
  readonly title: string = "Notification Broadcast";
  readonly IdentifierLookupTemplateMessage: string = "lookupTemplateMessage";
  readonly CancelLink: string = NavigationConstant.BACK_TO_PAGING;
  readonly MrNotificationTypeCode: string = "MrNotificationTypeCode";
  DictListRefMaster: { [id: string]: Array<KeyValueObj> } = {};
  constructor(private fb: FormBuilder, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      // if (params["NotificationTemplateId"]) {
      //   this.NotificationTemplateId = params["NotificationTemplateId"];
      // }
    });
  }

  ngOnInit(): void {
    this.SetLookupTemplate();
    this.SetMrNotificationTypeCode();
  }

  get GetMrNotificationTypeCodeValue(): string{
    return this.NotifBroadcastForm.get("MrNotificationTypeCode").value;
  }

  readonly TypeSms: string = "SMS";
  readonly TypeWA: string = "WHATSAPP";
  readonly TypeEmail: string = "EMAIL";
  readonly TypeNotif: string = "NOTIF";
  SetMrNotificationTypeCode() {
    const listKeyValueObj: Array<KeyValueObj> = new Array();
    const keyValueObj1: KeyValueObj = new KeyValueObj();
    keyValueObj1.Key = this.TypeSms;
    keyValueObj1.Value = "SMS";
    listKeyValueObj.push(keyValueObj1);
    const keyValueObj2: KeyValueObj = new KeyValueObj();
    keyValueObj2.Key = this.TypeWA;
    keyValueObj2.Value = "Whats App";
    listKeyValueObj.push(keyValueObj2);
    const keyValueObj3: KeyValueObj = new KeyValueObj();
    keyValueObj3.Key = this.TypeNotif;
    keyValueObj3.Value = "Notification";
    listKeyValueObj.push(keyValueObj3);
    const keyValueObj4: KeyValueObj = new KeyValueObj();
    keyValueObj4.Key = this.TypeEmail;
    keyValueObj4.Value = "Email";
    listKeyValueObj.push(keyValueObj4);
    this.DictListRefMaster[this.MrNotificationTypeCode] = listKeyValueObj;
  }

  SetLookupTemplate() {    
    this.InputLookupTemplateMessageObj.urlJson = "./assets/lookup/lookupOfficeParent.json";
    this.InputLookupTemplateMessageObj.isRequired = true;
    this.InputLookupTemplateMessageObj.addCritInput = new Array();
  }
  getLookUp(ev){
    console.log(ev);
  }

  SaveForm(){
    console.dir(this.NotifBroadcastForm);
  }
}
