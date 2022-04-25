import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
import { PushNotifSendToObj } from 'app/shared/model/notif-engine/push-notif-send-to-obj';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NotificationTemplateObj } from 'app/shared/model/notif-engine/notification-template-obj.model';

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
    SendTo: ['', Validators.required],
    BccEmail: '',
    CcEmail: '',
    ListPhone: [],
    Body: ['', Validators.required],
    UsedParamBody: [''],
    ParamArr: this.fb.array([])
  });

  InputLookupTemplateMessageObj: InputLookupObj = new InputLookupObj(this.UrlConstantNew);
  readonly title: string = "Notification Broadcast";
  readonly IdentifierLookupTemplateMessage: string = "lookupTemplateMessage";
  readonly IdentifierLookupSendToPush: string = "LookupSendToPush";
  readonly CancelLink: string = NavigationConstant.BACK_TO_PAGING;
  readonly MrNotificationLevelCode: string = CommonConstant.RefMasterTypeCodeNotificationLevel;
  readonly MrNotificationSourceCode: string = CommonConstant.RefMasterTypeCodeNotificationSource;
  readonly MrNotificationTypeCode: string = CommonConstant.RefMasterTypeCodeNotificationTypes;
  ClassColMd8: string = "col-md-8";
  ClassColMd9: string = "col-md-9";
  DictListRefMaster: { [id: string]: Array<KeyValueObj> } = {};
  NotificationHistHId: number;
  NotificationTemplateId: number;
  IsResend: boolean = false;
  IsFirstGet: boolean = this.IsResend;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private UrlConstantNew: UrlConstantNew, private http: HttpClient, private toastr: NGXToastrService, private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (params["NotificationHistHId"]) {
        this.NotificationHistHId = params["NotificationHistHId"];
        this.IsResend = true;
      }
    });
  }

  async ngOnInit() {
    this.GetRefMasterListKeyValueActiveByCode(this.MrNotificationTypeCode);
    this.GetRefMasterListKeyValueActiveByCode(this.MrNotificationLevelCode);
    this.GetRefMasterListKeyValueActiveByCode(this.MrNotificationSourceCode);
    this.SetLookupTemplate();
    if(this.IsResend) {
      await this.PatchResendForm();
    }
    if(this.IsUsedTemplate){
      this.DisableSelectControl();
    }
  }

  DisableSelectControl() {
    this.NotifBroadcastForm.controls['MrNotificationTypeCode'].disable();
    this.NotifBroadcastForm.controls['MrNotificationSourceCode'].disable();
    this.NotifBroadcastForm.controls['MrNotificationLevelCode'].disable();
  }

  EnableSelectControl() {
    this.NotifBroadcastForm.controls['MrNotificationTypeCode'].enable();
    this.NotifBroadcastForm.controls['MrNotificationSourceCode'].enable();
    this.NotifBroadcastForm.controls['MrNotificationLevelCode'].enable();
  }

  ResetValueSelectControl(){
    this.NotifBroadcastForm.patchValue({
      MrNotificationTypeCode: "",
      MrNotificationLevelCode: "",
      MrNotificationSourceCode: "",
      }
    )
  }

  get GetMrNotificationTypeCodeValue(): string{
    return this.NotifBroadcastForm.get("MrNotificationTypeCode").value;
  }

  get GetInputParamArr(){
    return this.NotifBroadcastForm.get('ParamArr') as FormArray;
  }

  GetRefMasterListKeyValueActiveByCode(RefMasterTypeCode: string) {
    this.http.post(this.UrlConstantNew.GetRefMasterListKeyValueActiveByCode, { RefMasterTypeCode: RefMasterTypeCode }).subscribe(
      (response) => {
        this.DictListRefMaster[RefMasterTypeCode] = response[CommonConstant.ReturnObj];
      }
    );
  }

  async PatchResendForm(){
    this.InputLookupTemplateMessageObj.isReady = false;
    await this.GetNotificationHistHByNotificationHistHId(this.NotificationHistHId);
    await this.PatchSubjectBody(this.GetMrNotificationTypeCodeValue);
    if(this.NotificationHistHId != null){
      await this.GetNotificationTemplate();
      if(this.IsResend && this.IsShowPreviewMessage){
        this.InputLookupTemplateMessageObj.isDisable = true;
        this.InputLookupTemplateMessageObj.isReady = false;
        this.InputLookupTemplateMessageObj.isReady = true;
      }
    }
    if(this.NotificationTemplateId != null) this.PatchDataUcLookupTemplate(this.NotificationTemplateId);
    if(this.IsShowPreviewMessage) await this.GetListNotificationHistDByNotificationHistHId(this.NotificationHistHId);
    this.InputLookupTemplateMessageObj.isReady = false;
    this.InputLookupTemplateMessageObj.isReady = true;
  }

  PatchDataUcLookupTemplate(NotificationTemplateId: number){
    let objPatch = {
      NotificationTemplateId : NotificationTemplateId,
      NotificationTemplateCode: this.NotificationTemplateCode
    }
    this.InputLookupTemplateMessageObj.nameSelect = objPatch.NotificationTemplateCode;
    this.InputLookupTemplateMessageObj.jsonSelect = objPatch;
  }

  NotificationTypeCode: string;
  async GetNotificationHistHByNotificationHistHId(NotificationHistHId: number) {
    await this.http.post(this.UrlConstantNew.GetNotificationHistHByNotificationHistHId, { Id: NotificationHistHId }).toPromise().then(
      (response: any) => {
        this.NotificationTemplateId = response.NotificationTemplateId;
        this.NotificationTypeCode = response.MrNotificationTypeCode;
        this.NotifBroadcastForm.patchValue({
          MrNotificationTypeCode: response.MrNotificationTypeCode,
          MrNotificationLevelCode: response.MrNotificationLevelCode,
          MrNotificationSourceCode: response.MrNotificationSourceCode,
          }
        )
      }
    );
  }

  ParamArrFromGet: Array<string> = new Array<string>();
  async GetListNotificationHistDByNotificationHistHId(NotificationHistHId: number) {
    if(this.IsResend){
      await this.http.post(this.UrlConstantNew.GetListNotificationHistDByNotificationHistHId, { Id: NotificationHistHId }).toPromise().then(
        (response: any) => {
          this.ParamArrFromGet = new Array<string>();
          for (let index = 0; index < this.ParamListCount; index++) {
            this.ParamArrFromGet.push(response.ReturnObject[index]["Param"]);
          }
          this.IsShowPreviewMessage = false;
          setTimeout (() => {
            this.IsShowPreviewMessage = true;
          }, 10);
      }
      );
    }
  }
  
  PushSendTo: string;
  async GetPushNotificationHistByNotificationHistHId(NotificationHistHId: number) {
    await this.http.post(this.UrlConstantNew.GetPushNotificationHistByNotificationHistHId, { Id: NotificationHistHId }).toPromise().then(
      (response: any) => {
        this.PushSendTo = response.SendTo;
        let jsonMessagesObj = JSON.parse(response.JsonMessages);
        this.NotifBroadcastForm.patchValue({
          Subject: jsonMessagesObj["Title"],
          Body: jsonMessagesObj["Message"],
          }
        )
      }
    );
    this.RefreshReady();
  }

  SmsWaSendTo: string;
  async GetSmsWaNotificationHistByNotificationHistHId(NotificationHistHId: number) {
    await this.http.post(this.UrlConstantNew.GetSmsWaNotificationHistByNotificationHistHId, { Id: NotificationHistHId }).toPromise().then(
      (response: any) => {
        this.SmsWaSendTo = response.SendTo;
        this.NotifBroadcastForm.patchValue({
          Body: response.Body,
          SendTo: this.SmsWaSendTo
          }
        )
      }
    );
    this.RefreshReady();
  }

  async PatchSubjectBody(TypeCode: string) {
    if(TypeCode == this.TypePush){
      await this.GetPushNotificationHistByNotificationHistHId(this.NotificationHistHId);
    }
    if(TypeCode == this.TypeSms || TypeCode == this.TypeWA){
      await this.GetSmsWaNotificationHistByNotificationHistHId(this.NotificationHistHId);
    }
    this.CheckIfWA();
  }

  async GetNotificationTemplate() {
    if (this.NotificationTemplateId == 0 || this.NotificationTemplateId == null) return;
    await this.http.post(this.UrlConstantNew.GetNotificationTemplateByNotificationTemplateId, { Id: this.NotificationTemplateId }).toPromise().then(
      (response: NotificationTemplateObj) => {
        this.NotificationTemplateCode = response.NotificationTemplateCode;
        this.ParamListCount = response.TotalParam;
        this.Version = response.Version;
        if(this.ParamListCount > 0) this.IsShowPreviewMessage = true;
        this.NotifBroadcastForm.patchValue({
          Subject: response.Subject,
          Body: response.Body
        });
      }
    )
    this.IsUsedTemplate = true;
  }

  OnChangeType(){
    this.RefreshComponent();
    this.SetLookupTemplate();
    this.CheckIfWA();
  }

  ResetValidator() {
    this.NotifBroadcastForm.get('UsedParamBody').clearValidators();
    this.NotifBroadcastForm.get('UsedParamBody').updateValueAndValidity();
  }

  CheckIfWA() {
    if (this.GetMrNotificationTypeCodeValue == this.TypeWA){
      this.IsWa = true;
    }
    if (this.GetMrNotificationTypeCodeValue != this.TypeWA){
      this.IsWa = false;
    }
  }

  readonly TypeSms: string = CommonConstant.RefMasterTypeCodeNotificationTypesSms;
  readonly TypeWA: string = CommonConstant.RefMasterTypeCodeNotificationTypesWA;
  readonly TypeEmail: string = CommonConstant.RefMasterTypeCodeNotificationTypesEmail;
  readonly TypePush: string = CommonConstant.RefMasterTypeCodeNotificationTypesPush;

  SetLookupTemplate() {   
    this.IsUsedTemplate = false;
    this.InputLookupTemplateMessageObj = new InputLookupObj(this.UrlConstantNew); 
    this.InputLookupTemplateMessageObj.isReady = false;
    
    this.InputLookupTemplateMessageObj.urlJson = "./assets/uclookup/notif-engine/lookup-notif-template.json";
    this.InputLookupTemplateMessageObj.isRequired = false;
    this.InputLookupTemplateMessageObj.urlEnviPaging = this.UrlConstantNew.env.NotifEngineURL + '/v2.1';
    
    this.SetUcLookupTemplateCrit();
  }

  SetUcLookupTemplateCrit(){
    this.InputLookupTemplateMessageObj.isReady = false;

    this.InputLookupTemplateMessageObj.addCritInput = new Array();

    let critObj: CriteriaObj = new CriteriaObj();
    critObj.restriction = AdInsConstant.RestrictionEq;
    critObj.propName = 'IS_ACTIVE';
    critObj.value = true;
    this.InputLookupTemplateMessageObj.addCritInput.push(critObj);

    setTimeout (() => {
      this.InputLookupTemplateMessageObj.isReady = true;
    }, 10);
  }

  IsUsedTemplate: boolean = false;
  NotificationTemplateCode: string;
  Version: number;
  Param: Array<String>;
  ParamListCount: number = 0;
  IsWa: boolean = false;
  IsShowPreviewMessage: boolean = false;
  IsBroadcast: boolean = true;

  getLookUp(ev){
    this.ParamArrFromGet = new Array<string>();
    this.ParamListCount = ev.TotalParam;
    if(this.ParamListCount>0){
      this.IsShowPreviewMessage = true;
      this.NotifBroadcastForm.get('UsedParamBody').setValidators(Validators.required);
      this.NotifBroadcastForm.get('UsedParamBody').updateValueAndValidity();
    }
    this.NotificationTemplateCode = ev.NotificationTemplateCode;
    this.Version = ev.Version;
    this.NotifBroadcastForm.patchValue({
      UsedParamBody: "",
      ListPhone: [],
      ParamArr: [],
      Subject: ev.Subject,
      Body: ev.Body,
      MrNotificationTypeCode: ev.MrNotificationTypeCode,
      MrNotificationLevelCode: ev.MrNotificationLevelCode,
      MrNotificationSourceCode: ev.MrNotificationSourceCode,
      }
    )
    this.IsUsedTemplate = true;
    this.DisableSelectControl();
  }

  IsReady: boolean = true;
  ResetTemplate(){
    this.IsShowPreviewMessage = false;
    this.PushSendTo = "";
    this.SetLookupTemplate();
    this.RefreshComponent();
    this.EnableSelectControl();
    this.ResetValueSelectControl();
  }

  RefreshComponent(){
    this.ResetValidator();
    this.NotifBroadcastForm.patchValue({
      SendTo: "",
      Subject: "",
      Body: "",
      UsedParamBody: "",
      ListPhone: [],
      ParamArr: []
      }
    )
    this.RefreshReady();
  }

  RefreshReady() {
    this.IsReady = false;
    setTimeout (() => {
      this.IsReady = true
    }, 10);
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
    let Value:string = this.DictListRefMaster[RefMasterTypeCode].find(i => i.Key === Key).Value;
    return Value;
  }

  SendToNotificationEngineSaveObj: SendToNotificationEngineObj = new SendToNotificationEngineObj();
  Params: Array<string>;
  SetSaveObj(){
    this.SendToNotificationEngineSaveObj = new SendToNotificationEngineObj();
    this.SendToNotificationEngineSaveObj.NotificationTemplateCode = this.NotificationTemplateCode;
    this.SendToNotificationEngineSaveObj.MrNotificationLevelCode = this.NotifBroadcastForm.get("MrNotificationLevelCode").value
    this.SendToNotificationEngineSaveObj.MrNotificationLevelDescr = this.GetDescrFromCode(this.MrNotificationLevelCode, "MrNotificationLevelCode");
    this.SendToNotificationEngineSaveObj.MrNotificationSourceCode = this.NotifBroadcastForm.get("MrNotificationSourceCode").value;
    this.SendToNotificationEngineSaveObj.MrNotificationSourceDescr = this.GetDescrFromCode(this.MrNotificationSourceCode, "MrNotificationSourceCode");
    this.SendToNotificationEngineSaveObj.MrNotificationTypeCode = this.GetMrNotificationTypeCodeValue;
    this.SendToNotificationEngineSaveObj.MrNotificationTypeDescr = this.GetDescrFromCode(this.MrNotificationTypeCode, "MrNotificationTypeCode");
    this.SendToNotificationEngineSaveObj.Version = this.Version;
    if(this.ParamListCount>0){
      let tempParam = this.NotifBroadcastForm.get("ParamArr").value;
      this.Params = new Array<string>();
      
      for(let i = 0; i < tempParam.length; i++){
        this.Params.push(tempParam[i]["Param"]);
      }

      this.SendToNotificationEngineSaveObj.Param = this.Params;
    }

    if(this.GetMrNotificationTypeCodeValue == this.TypePush){
      this.SetPushNotifObj();
    }
    if(this.GetMrNotificationTypeCodeValue == this.TypeSms || this.GetMrNotificationTypeCodeValue == this.TypeWA){
      this.SetSmsWaObj();
    }
    if(this.GetMrNotificationTypeCodeValue == this.TypeEmail){
      this.SetEmailObj();
    }
  }

  //#region PushNotif Logic
  PushUrl: string;
  PushKey: string;
  GetPushFromChild(EventObj: PushNotifSendToObj) {
    this.PushUrl = EventObj.Url;
    this.PushKey = EventObj.Key;
    this.PushSendTo = EventObj.SendTo;
  }

  SetPushNotifObj() {
    this.SendToNotificationEngineSaveObj.PushNotificationObj.Title = this.NotifBroadcastForm.get("Subject").value;
    this.SendToNotificationEngineSaveObj.PushNotificationObj.Message = this.NotifBroadcastForm.get("Body").value;
    if(this.IsUsedTemplate && this.ParamListCount>0){
      this.SendToNotificationEngineSaveObj.PushNotificationObj.Message = "";
      this.SendToNotificationEngineSaveObj.PushNotificationObj.Title = "";
    }
    // this.SendToNotificationEngineSaveObj.PushNotificationObj.Url = this.PushUrl;
    // this.SendToNotificationEngineSaveObj.PushNotificationObj.Key = this.PushKey;
    this.SendToNotificationEngineSaveObj.SendTo = this.PushSendTo;
  }

  SetEmailObj() {
    // Mekanisme save email obj
  }

  SetSmsWaObj() {
    let ListPhone: Array<string> = this.NotifBroadcastForm.get("SendTo").value;
    let SendToSmsWa: string = ListPhone["e164Number"];
    this.SendToNotificationEngineSaveObj.SendTo = SendToSmsWa;
    this.SendToNotificationEngineSaveObj.SmsWaNotificationObj.IsWa = this.IsWa;
    this.SendToNotificationEngineSaveObj.SmsWaNotificationObj.SendFrom = "";
    this.SendToNotificationEngineSaveObj.SmsWaNotificationObj.Body = this.NotifBroadcastForm.get("Body").value;
    if(this.IsShowPreviewMessage){
      this.SendToNotificationEngineSaveObj.SmsWaNotificationObj.Body = this.NotifBroadcastForm.get("UsedParamBody").value;
    }
  }
  //#endregion

  async SaveForm(){
    this.SetSaveObj();
    let urlSave = this.UrlConstantNew.SendToNotificationEngine;
    await this.http.post(urlSave, this.SendToNotificationEngineSaveObj).toPromise().then(
      (response: SendToNotificationEngineObj) => {
        if (response["StatusCode"] == "200") {
          this.toastr.successMessage(response['message']);
          this.CancelButton();
        }
      }
    );
  }
  
  CancelButton() {
    AdInsHelper.RedirectUrl(this.router, [NavigationConstant.NOTIF_ENGINE_BROADCAST_PAGING], {});
  }
}

