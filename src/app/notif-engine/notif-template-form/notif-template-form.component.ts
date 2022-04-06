import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { KeyValueObj } from 'app/shared/model/key-value/key-value-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { BodyMessageTosendComponent } from '../shared-component/body-message-tosend/body-message-tosend.component';

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
    BodyMessageParam: this.fb.array([])
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

  readonly IdentifierBodyMessageParam: string = "BodyMessageParam";
  AddParameter() {
    let BodyMessage: string = this.NotifTemplateForm.get("Body").value;
    const ListParam: FormArray = this.NotifTemplateForm.get(this.IdentifierBodyMessageParam) as FormArray;
    const LastIdx: number = ListParam.length;
    const ParamaterVar: string = "{" + LastIdx + "}";
    const lenBody: number = BodyMessage.length;
    if (lenBody > 0 && BodyMessage.charAt(lenBody) != " ") {
      BodyMessage += " ";
    }
    BodyMessage += ParamaterVar + " ";
    this.NotifTemplateForm.get("Body").setValue(BodyMessage);
    // this.ListParameterBodyMessage.push(ParamaterVar);
    ListParam.push(this.fb.group({
      Param: "",
      ParamIdxAt: ParamaterVar
    }));
    this.InputParamValue();
  }

  @ViewChild("TempMessage") TempMessage: BodyMessageTosendComponent;
  InputParamValue() {
    this.TempMessage.InputParamValue();
  }

  SaveForm() {
    console.dir(this.NotifTemplateForm);
  }
}
