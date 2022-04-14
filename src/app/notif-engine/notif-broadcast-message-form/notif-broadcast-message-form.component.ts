import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { InputLookupObj } from 'app/shared/model/input-lookup-obj.model';
import { KeyValueObj } from 'app/shared/model/key-value/key-value-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UrlConstantNew } from "app/shared/constant/URLConstantNew";
import { BodyMessageTosendComponent } from '../shared-component/body-message-tosend/body-message-tosend.component';
import { HttpClient } from '@angular/common/http';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { SendToNotificationEngineObj } from 'app/shared/model/notif-engine/send-to-notification-engine-obj.model';

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
  readonly MrNotificationLevelCode: string = CommonConstant.RefMasterTypeCodeNotificationLevel;
  readonly MrNotificationSourceCode: string = CommonConstant.RefMasterTypeCodeNotificationSource;
  readonly MrNotificationTypeCode: string = CommonConstant.RefMasterTypeCodeNotificationTypes;
  DictListRefMaster: { [id: string]: Array<KeyValueObj> } = {};
  constructor(private fb: FormBuilder, private route: ActivatedRoute, private UrlConstantNew: UrlConstantNew, private http: HttpClient) {
    this.route.queryParams.subscribe(params => {
      // if (params["NotificationTemplateId"]) {
      //   this.NotificationTemplateId = params["NotificationTemplateId"];
      // }
    });
  }

  ngOnInit(): void {
    this.GetRefMasterListKeyValueActiveByCode(this.MrNotificationTypeCode);
    this.GetRefMasterListKeyValueActiveByCode(this.MrNotificationLevelCode);
    this.GetRefMasterListKeyValueActiveByCode(this.MrNotificationSourceCode);
    this.SetLookupTemplate();
  }

  get GetMrNotificationTypeCodeValue(): string{
    return this.NotifBroadcastForm.get("MrNotificationTypeCode").value;
  }

  GetRefMasterListKeyValueActiveByCode(RefMasterTypeCode: string) {
    this.http.post(this.UrlConstantNew.GetRefMasterListKeyValueActiveByCode, { RefMasterTypeCode: RefMasterTypeCode }).subscribe(
      (response) => {
        this.DictListRefMaster[RefMasterTypeCode] = response[CommonConstant.ReturnObj];
      }
    );
  }

  OnChangeType(){
    this.SetLookupTemplate();
  }

  readonly TypeSms: string = "SMS";
  readonly TypeWA: string = "WHATSAPP";
  readonly TypeEmail: string = "EMAIL";
  readonly TypePush: string = "PUSH_NOTIFICATION";

  SetLookupTemplate() {    
    this.InputLookupTemplateMessageObj.isReady = false;

    this.InputLookupTemplateMessageObj.urlJson = "./assets/uclookup/notif-engine/lookup-notif-template.json";
    this.InputLookupTemplateMessageObj.isRequired = false;
    this.InputLookupTemplateMessageObj.urlEnviPaging = this.UrlConstantNew.env.NotifEngineURL + '/v2.1';

    this.InputLookupTemplateMessageObj.addCritInput = new Array();

    let critObj: CriteriaObj = new CriteriaObj();
    critObj.restriction = AdInsConstant.RestrictionEq;
    critObj.propName = 'IS_ACTIVE';
    critObj.value = true;
    this.InputLookupTemplateMessageObj.addCritInput.push(critObj);

    let critTypeObj: CriteriaObj = new CriteriaObj();
    critTypeObj.restriction = AdInsConstant.RestrictionEq;
    critTypeObj.propName = 'MR_NOTIFICATION_TYPE_CODE';
    critTypeObj.value = this.GetMrNotificationTypeCodeValue;
    this.InputLookupTemplateMessageObj.addCritInput.push(critTypeObj);

    setTimeout (() => {
      this.InputLookupTemplateMessageObj.isReady = true
    }, 10);
  }

  NotifTemplateId: number;
  getLookUp(ev){
    this.NotifTemplateId = ev.NotificationTemplateId;
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

  GetDescrFromCode(RefMasterTypeCode: string, VariableForm: string): string{
    let Key: string;
    Key = this.NotifBroadcastForm.get(VariableForm).value;
    let Value = this.DictListRefMaster[RefMasterTypeCode].find(i => i.Key === Key).Value;
    return Value;
  }

  SendToNotificationEngineSaveObj: SendToNotificationEngineObj = new SendToNotificationEngineObj();
  SetSaveObj(): SendToNotificationEngineObj{
    this.SendToNotificationEngineSaveObj.NotificationTemplateId = this.NotifTemplateId;
    this.SendToNotificationEngineSaveObj.MrNotificationLevelCode = this.NotifBroadcastForm.get("MrNotificationLevelCode").value
    this.SendToNotificationEngineSaveObj.MrNotificationLevelDescr = this.GetDescrFromCode(this.MrNotificationTypeCode, "MrNotificationLevelCode");
    this.SendToNotificationEngineSaveObj.MrNotificationSourceCode = this.NotifBroadcastForm.get("MrNotificationSourceCode").value;
    this.SendToNotificationEngineSaveObj.MrNotificationSourceDescr = this.GetDescrFromCode(this.MrNotificationSourceCode, "MrNotificationSourceCode");
    this.SendToNotificationEngineSaveObj.MrNotificationTypeCode = this.GetMrNotificationTypeCodeValue;
    this.SendToNotificationEngineSaveObj.MrNotificationTypeDescr = this.GetDescrFromCode(this.MrNotificationLevelCode, "MrNotificationTypeCode");

    // this.SendToNotificationEngineSaveObj.Param = param;
    // this.SendToNotificationEngineSaveObj.Version = version;

    // belom nih kurang ngerti saya
    // this.SendToNotificationEngineSaveObj.SendTo = ;
    // this.SendToNotificationEngineSaveObj.EmailNotificationObj = ;
    // this.SendToNotificationEngineSaveObj.SmsWaNotificationObj = ;
    // this.SendToNotificationEngineSaveObj.PushNotificationObj = ;
    
    return this.SendToNotificationEngineSaveObj;
  }

  SaveForm(){
    console.dir(this.SetSaveObj);
    console.log(this.SetSaveObj);
  }
}
