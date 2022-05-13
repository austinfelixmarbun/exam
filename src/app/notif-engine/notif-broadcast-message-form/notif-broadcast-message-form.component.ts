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
import { NotificationHistHObj } from 'app/shared/model/notif-engine/notification-hist-h-obj.model';
import { ResPushNotificationObj } from 'app/shared/model/notif-engine/res-push-notification-obj.model';
import { ListNotificationHistDObj } from 'app/shared/model/notif-engine/list-notification-hist-d-obj';
import { ResSmsWaNotificationObj } from 'app/shared/model/notif-engine/res-sms-wa-notification-obj.model';
import { TagInputObj } from 'app/shared/model/generic/tag-input-obj.model';
import { ResEmailNotificationObj } from 'app/shared/model/notif-engine/res-email-notification-obj.model';

@Component({
  selector: 'app-notif-broadcast-message-form',
  templateUrl: './notif-broadcast-message-form.component.html'
})
export class NotifBroadcastMessageFormComponent implements OnInit {
  NotifBroadcastForm = this.fb.group({
    MrNotificationTypeCode: ['', Validators.required],
    MrNotificationLevelCode: ['', Validators.required],
    MrNotificationSourceCode: ['', Validators.required],
    RefNo: '',
    Subject: '',
    SendTo: ['', Validators.required],
    BccEmail: '',
    CcEmail: '',
    ListPhone: [],
    Body: ['', Validators.required],
    UsedParamBody: '',
    PhoneNum: '',    
    SendType: CommonConstant.SEND_TYPE_SPECIFIC_USER,
    TemplateVersion: '',
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
  DictListRefMaster: { [id: string]: Array<KeyValueObj> } = {};
  NotificationHistHId: number;
  NotificationTemplateId: number;
  IsResend: boolean = false;

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
        this.PatchDataUcLookupTemplate(this.NotificationTemplateId);
        this.InputLookupTemplateMessageObj.isDisable = true;
      }
    }
    if(this.IsShowPreviewMessage) await this.GetListNotificationHistDByNotificationHistHId(this.NotificationHistHId);
    this.InputLookupTemplateMessageObj.isReady = true;
  }

  PatchDataUcLookupTemplate(NotificationTemplateId: number){
    let objPatch = {
      NotificationTemplateId : NotificationTemplateId,
      NotificationTemplateDescr: this.NotificationTemplateDescr
    }
    this.InputLookupTemplateMessageObj.nameSelect = objPatch.NotificationTemplateDescr;
    this.InputLookupTemplateMessageObj.jsonSelect = objPatch;
  }

  async GetNotificationHistHByNotificationHistHId(NotificationHistHId: number) {
    await this.http.post(this.UrlConstantNew.GetNotificationHistHByNotificationHistHId, { Id: NotificationHistHId }).toPromise().then(
      (response: NotificationHistHObj) => {
        this.NotificationTemplateId = response.NotificationTemplateId;
        this.NotifBroadcastForm.patchValue({
          MrNotificationTypeCode: response.MrNotificationTypeCode,
          MrNotificationLevelCode: response.MrNotificationLevelCode,
          MrNotificationSourceCode: response.MrNotificationSourceCode,
          RefNo: response.RefNo
          }
        )
      }
    );
  }

  ParamArrFromGet: Array<string> = new Array<string>();
  async GetListNotificationHistDByNotificationHistHId(NotificationHistHId: number) {
    if(this.IsResend){
      await this.http.post(this.UrlConstantNew.GetListNotificationHistDByNotificationHistHId, { Id: NotificationHistHId }).toPromise().then(
        (response: ListNotificationHistDObj) => {
          this.ParamArrFromGet = new Array<string>();
          for (let index = 0; index < this.ParamListCount; index++) {
            this.ParamArrFromGet.push(response.ReturnObject.at(index).Param);
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
      (response: ResPushNotificationObj) => {
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

  async GetEmailNotificationHistByNotificationHistHId(NotificationHistHId: number) {
    await this.http.post(this.UrlConstantNew.GetEmailNotificationHistByNotificationHistHId, { Id: NotificationHistHId }).toPromise().then(
      (response: ResEmailNotificationObj) => {
        this.NotifBroadcastForm.patchValue({
          SendTo: response.SendTo,
          CcEmail: response.Cc,
          BccEmail: response.Bcc,
          Subject: response.Subject,
          Body: response.Body,
          }
        )
      }
    );
    this.RefreshReady();
  }

  async GetSmsWaNotificationHistByNotificationHistHId(NotificationHistHId: number) {
    await this.http.post(this.UrlConstantNew.GetSmsWaNotificationHistByNotificationHistHId, { Id: NotificationHistHId }).toPromise().then(
      (response: ResSmsWaNotificationObj) => {
        this.NotifBroadcastForm.patchValue({
          Body: response.Body,
          SendTo: response.SendTo
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
    if(TypeCode == this.TypeEmail){
      await this.GetEmailNotificationHistByNotificationHistHId(this.NotificationHistHId);
    }
    this.CheckTypeMechanism();
  }

  async GetNotificationTemplate() {
    if (!this.NotificationTemplateId) return;
    await this.http.post(this.UrlConstantNew.GetNotificationTemplateByNotificationTemplateId, { Id: this.NotificationTemplateId }).toPromise().then(
      (response: NotificationTemplateObj) => {
        this.NotificationTemplateCode = response.NotificationTemplateCode;
        this.NotificationTemplateDescr = response.NotificationTemplateDescr;
        this.ParamListCount = response.TotalParam;
        if(this.ParamListCount > 0) this.IsShowPreviewMessage = true;
        this.NotifBroadcastForm.patchValue({
          TemplateVersion: response.Version,
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
    this.CheckTypeMechanism();
  }

  ResetValidatorUsedParamBody() {
    this.NotifBroadcastForm.get('UsedParamBody').clearValidators();
    this.NotifBroadcastForm.get('UsedParamBody').updateValueAndValidity();
  }

  CheckTypeMechanism() {
    this.IsWa = false;
    this.SetSendToValidators();
    this.SetSubjectValidators();
    this.SetCcBccValidators();
  }

  SetCcBccValidators() {
    this.NotifBroadcastForm.get('CcEmail').clearValidators();
    this.NotifBroadcastForm.get('CcEmail').updateValueAndValidity();
    this.NotifBroadcastForm.get('BccEmail').clearValidators();
    this.NotifBroadcastForm.get('BccEmail').updateValueAndValidity();

    if(this.GetMrNotificationTypeCodeValue == this.TypeEmail){
      this.NotifBroadcastForm.get('CcEmail').setValidators(Validators.pattern(CommonConstant.regexMultipleEmail));
      this.NotifBroadcastForm.get('CcEmail').updateValueAndValidity();
      this.NotifBroadcastForm.get('BccEmail').setValidators(Validators.pattern(CommonConstant.regexMultipleEmail));
      this.NotifBroadcastForm.get('BccEmail').updateValueAndValidity();
    }
  }

  SetSendToValidators() {
    this.NotifBroadcastForm.get('SendTo').setValidators(Validators.required);

    if(this.GetMrNotificationTypeCodeValue == this.TypeWA){
      this.IsWa = true;
    }
    if (this.GetMrNotificationTypeCodeValue == this.TypeEmail){
      this.NotifBroadcastForm.get('SendTo').setValidators([Validators.required, Validators.pattern(CommonConstant.regexMultipleEmail)]);
    }
    this.NotifBroadcastForm.get('SendTo').updateValueAndValidity();
  }

  SetSubjectValidators() {
    this.NotifBroadcastForm.get('Subject').clearValidators();
    if (this.GetMrNotificationTypeCodeValue == this.TypeEmail || this.GetMrNotificationTypeCodeValue == this.TypePush) {
      this.NotifBroadcastForm.get('Subject').setValidators(Validators.required);
    }
    this.NotifBroadcastForm.get('Subject').updateValueAndValidity();
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
  NotificationTemplateDescr: string;
  Version: number;
  Param: Array<String>;
  ParamListCount: number = 0;
  IsWa: boolean = false;
  IsShowPreviewMessage: boolean = false;
  IsBroadcast: boolean = true;

  getLookUp(ev){
    this.IsShowPreviewMessage = false;
    this.ParamArrFromGet = new Array<string>();
    this.ParamListCount = ev.TotalParam;
    if(this.ParamListCount>0){
      this.NotifBroadcastForm.get('UsedParamBody').setValidators(Validators.required);
      this.NotifBroadcastForm.get('UsedParamBody').updateValueAndValidity();
      setTimeout (() => {
        this.IsShowPreviewMessage = true
      }, 10);
    }
    this.NotificationTemplateCode = ev.NotificationTemplateCode;
    this.NotificationTemplateDescr = ev.NotificationTemplateDescr;
    this.NotifBroadcastForm.patchValue({
      UsedParamBody: "",
      ListPhone: [],
      ParamArr: [],
      Subject: ev.Subject,
      Body: ev.Body,
      TemplateVersion: ev.Version,
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
    this.NotifBroadcastForm.patchValue({
      SendTo: "",
      }
    )
    this.SetLookupTemplate();
    this.RefreshComponent();
    this.EnableSelectControl();
    this.ResetValueSelectControl();
  }

  RefreshComponent(){
    this.ResetValidatorUsedParamBody();
    this.NotifBroadcastForm.patchValue({
      SendTo: "",
      Subject: "",
      Body: "",
      UsedParamBody: "",
      ListPhone: [],
      ParamArr: [],
      CcEmail: "",
      BccEmail: ""
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
    if(RefMasterTypeCode){
      let Key: string = this.NotifBroadcastForm.get(VariableForm).value;
      let Value:string = this.DictListRefMaster[RefMasterTypeCode].find(i => i.Key === Key).Value;
      return Value;
    }
  }

  SendToNotificationEngineSaveObj: SendToNotificationEngineObj = new SendToNotificationEngineObj();
  SetSaveObj(){
    this.SendToNotificationEngineSaveObj = new SendToNotificationEngineObj();
    if(this.IsUsedTemplate){
      this.SendToNotificationEngineSaveObj.NotificationTemplateCode = this.NotificationTemplateCode;
      this.SendToNotificationEngineSaveObj.Version = this.NotifBroadcastForm.get("TemplateVersion").value;
    }
    this.SendToNotificationEngineSaveObj.MrNotificationLevelCode = this.NotifBroadcastForm.get("MrNotificationLevelCode").value
    this.SendToNotificationEngineSaveObj.MrNotificationLevelDescr = this.GetDescrFromCode(this.MrNotificationLevelCode, "MrNotificationLevelCode");
    this.SendToNotificationEngineSaveObj.MrNotificationSourceCode = this.NotifBroadcastForm.get("MrNotificationSourceCode").value;
    this.SendToNotificationEngineSaveObj.MrNotificationSourceDescr = this.GetDescrFromCode(this.MrNotificationSourceCode, "MrNotificationSourceCode");
    this.SendToNotificationEngineSaveObj.MrNotificationTypeCode = this.GetMrNotificationTypeCodeValue;
    this.SendToNotificationEngineSaveObj.MrNotificationTypeDescr = this.GetDescrFromCode(this.MrNotificationTypeCode, "MrNotificationTypeCode");
    if(this.ParamListCount>0){
      let tempParam = this.GetInputParamArr.value;
      this.SendToNotificationEngineSaveObj.Param = new Array<string>();
      
      for(let i = 0; i < tempParam.length; i++){
        this.SendToNotificationEngineSaveObj.Param.push(tempParam[i]["Param"]);
      }
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
  GetPushFromChild(EventObj: PushNotifSendToObj) {
    this.NotifBroadcastForm.patchValue({
      SendTo: EventObj.SendTo
      }
    )
  }

  SetSendToMultipleUser(): Array<string> {
    const listSendToTemp: Array<TagInputObj> = this.NotifBroadcastForm.get("SendTo").value;
    let listSendTo: Array<string> = new Array();
    for (let index = 0; index < listSendToTemp.length; index++) {
      const element = listSendToTemp[index];
      listSendTo.push(element.value);
    }
    return listSendTo;
  }

  SetPushNotifObj() {
    this.SendToNotificationEngineSaveObj.PushNotificationObj.Title = this.NotifBroadcastForm.get("Subject").value;
    this.SendToNotificationEngineSaveObj.PushNotificationObj.Message = this.NotifBroadcastForm.get("Body").value;
    if(this.IsUsedTemplate && this.ParamListCount>0){
      this.SendToNotificationEngineSaveObj.PushNotificationObj.Message = "";
      this.SendToNotificationEngineSaveObj.PushNotificationObj.Title = "";
    }
    this.SendToNotificationEngineSaveObj.SendTos = this.SetSendToMultipleUser();
  }

  SetEmailObj() {
    this.SendToNotificationEngineSaveObj.SendTos = [this.NotifBroadcastForm.get("SendTo").value];
    this.SendToNotificationEngineSaveObj.EmailNotificationObj.Subject = this.NotifBroadcastForm.get("Subject").value;
    this.SendToNotificationEngineSaveObj.EmailNotificationObj.Cc = this.NotifBroadcastForm.get("CcEmail").value;
    this.SendToNotificationEngineSaveObj.EmailNotificationObj.Bcc = this.NotifBroadcastForm.get("BccEmail").value;
    this.SendToNotificationEngineSaveObj.EmailNotificationObj.Body = this.NotifBroadcastForm.get("Body").value;
    this.SendToNotificationEngineSaveObj.EmailNotificationObj.SendFrom = "";

    // Set File attachment
  }

  SetSmsWaObj() {
    this.SendToNotificationEngineSaveObj.SendTos = this.SetSendToMultipleUser();
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
    let urlSave = this.UrlConstantNew.MultipleSendToNotificationEngine;
    if (this.IsResend) urlSave = "";
    console.log(this.SendToNotificationEngineSaveObj);
    await this.http.post(urlSave, this.SendToNotificationEngineSaveObj).toPromise().then(
      (response) => {
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

