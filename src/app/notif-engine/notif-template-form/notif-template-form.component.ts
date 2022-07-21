import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { KeyValueObj } from 'app/shared/model/key-value/key-value-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { BodyMessageTosendComponent } from '../shared-component/body-message-tosend/body-message-tosend.component';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NotificationTemplateObj } from 'app/shared/model/notif-engine/notification-template-obj.model';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { RefNotifAttrTemplateObj } from 'app/shared/model/notif-engine/ref-notif-attr-template-obj.model';

@Component({
  selector: 'app-notif-template-form',
  templateUrl: './notif-template-form.component.html'
})
export class NotifTemplateFormComponent implements OnInit {

  NotifTemplateForm = this.fb.group({
    NotificationTemplateCode: ['', Validators.required],
    NotificationTemplateDescr: ['', Validators.required],
    MrNotificationLevelCode: ['', Validators.required],
    MrNotificationSourceCode: ['', Validators.required],
    MrNotificationTypeCode: ['', Validators.required],
    StartDt: ['', Validators.required],
    EndDt: '',
    Subject: '',
    BaseUrl: '',
    Path: '',
    Body: ['', Validators.required],
    RefAttrTemplateParam: '',
    ParamArr: this.fb.array([]),
    ParamArrDummy: this.fb.array([])
  });

  readonly notifTypePushNotif: string =CommonConstant.RefMasterTypeCodeNotificationTypesPush;
  readonly notifTypeSms: string =CommonConstant.RefMasterTypeCodeNotificationTypesSms;
  readonly notifTypeWa: string =CommonConstant.RefMasterTypeCodeNotificationTypesWA;

  readonly QuilConfig = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
  
      // [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction
  
      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],
  
      ['clean'],                                         // remove formatting button
  
      ['image', 'video']                         // link and image, video
    ]
  };

  DictListRefMaster: { [id: string]: Array<KeyValueObj> } = {};
  NotificationTemplateId: number = 0;
  ListRefNotifAttrTemplateObj: Array<RefNotifAttrTemplateObj> = new Array<RefNotifAttrTemplateObj>();

  readonly title: string = "Notification Template";
  readonly MrNotificationLevelCode: string = CommonConstant.RefMasterTypeCodeNotificationLevel;
  readonly MrNotificationSourceCode: string = CommonConstant.RefMasterTypeCodeNotificationSource;
  readonly MrNotificationTypeCode: string = CommonConstant.RefMasterTypeCodeNotificationTypes;
  readonly DateNow: Date = new Date();
  readonly CancelLink: string = NavigationConstant.BACK_TO_PAGING;
  IsBroadcast: boolean = false;
  constructor(private fb: FormBuilder, private router: Router, private toastr: NGXToastrService, private route: ActivatedRoute, private http: HttpClient, private UrlConstantNew: UrlConstantNew) {
    this.route.queryParams.subscribe(params => {
      if (params["NotificationTemplateId"]) {
        this.NotificationTemplateId = params["NotificationTemplateId"];
      }
    });
  }

  async ngOnInit() {
    await this.GetNotificationTemplate();
    this.GetRefMasterListKeyValueActiveByCode(this.MrNotificationLevelCode);
    this.GetRefMasterListKeyValueActiveByCode(this.MrNotificationSourceCode);
    this.GetRefMasterListKeyValueActiveByCode(this.MrNotificationTypeCode);
    this.GetListActiveRefNotifAttrTemplate();
  }

  get GetStartDt(): Date{
    return this.NotifTemplateForm.get("StartDt").value;
  }

  NotificationTemplateSaveObj: NotificationTemplateObj = new NotificationTemplateObj();
  async GetNotificationTemplate() {
    if (this.NotificationTemplateId == 0) return;
    await this.http.post(this.UrlConstantNew.GetNotificationTemplateByNotificationTemplateId, { Id: this.NotificationTemplateId }).toPromise().then(
      (response: NotificationTemplateObj) => {
        this.NotificationTemplateSaveObj = response;
        this.NotifTemplateForm.patchValue({
          NotificationTemplateCode: response.NotificationTemplateCode,
          NotificationTemplateDescr: response.NotificationTemplateDescr,
          MrNotificationLevelCode: response.MrNotificationLevelCode,
          MrNotificationSourceCode: response.MrNotificationSourceCode,
          MrNotificationTypeCode: response.MrNotificationTypeCode,
          StartDt: response.StartDt,
          EndDt: response.EndDt,
          Subject: response.Subject,
          Body: response.Body,
          BaseUrl: response.BaseUrl,
          Path: response.Path
        });
        this.ChangeNotifType();
        for (let index = 0; index < response.TotalParam; index++) {
          this.AddParameter(true);
        }
      }
    )
  }

  GetListActiveRefNotifAttrTemplate() {
    this.http.post(this.UrlConstantNew.GetListActiveRefNotifAttrTemplate, {}).subscribe(
      (response) => {
        this.ListRefNotifAttrTemplateObj = response[CommonConstant.ReturnObj];
      }
    );
  }

  GetRefMasterListKeyValueActiveByCode(RefMasterTypeCode: string) {
    this.http.post(this.UrlConstantNew.GetRefMasterListKeyValueActiveByCode, { RefMasterTypeCode: RefMasterTypeCode }).subscribe(
      (response) => {
        this.DictListRefMaster[RefMasterTypeCode] = response[CommonConstant.ReturnObj];
      }
    );
  }

  GetDescription(RefMasterTypeCode: string, MasterCode: string): string {
    return this.DictListRefMaster[RefMasterTypeCode].find(x => x.Key == MasterCode).Value;
  }

  GetDescrAttrParam(Code: string): string {
    return this.ListRefNotifAttrTemplateObj.find(x => x.NotifAttrTemplaceCode == Code).NotifAttrTemplaceDescr;
  }

  subjectIsRequired: boolean = false;
  ChangeNotifType() {
    let notifType: string = this.NotifTemplateForm.get("MrNotificationTypeCode").value;

    this.subjectIsRequired = false;
    if (notifType == CommonConstant.NOTIF_TYPE_EMAIL) this.subjectIsRequired = true;
  }

  ParamArr: Array<string> = new Array<string>();
  readonly IdentifierBodyMessageParam: string = "ParamArr";
  readonly IdentifierBodyMessageParamDummy: string = "ParamArrDummy";
  AddParameter(IsEdit: boolean = false) {
    let BodyMessage: string = this.NotifTemplateForm.get("Body").value;
    const ListParam: FormArray = this.NotifTemplateForm.get(this.IdentifierBodyMessageParam) as FormArray;
    const ListParamDummy: FormArray = this.NotifTemplateForm.get(this.IdentifierBodyMessageParamDummy) as FormArray;
    const ParamAttr: string = this.GetDescrAttrParam(this.NotifTemplateForm.get("RefAttrTemplateParam").value);
    const ParamaterVar: string = "{" + ParamAttr + "}";
    if (!IsEdit) {
      const lenBody: number = BodyMessage.length;
      let notifType: string = this.NotifTemplateForm.get("MrNotificationTypeCode").value;
      if (lenBody > 0 && BodyMessage.charAt(lenBody) != " " && notifType != CommonConstant.NOTIF_TYPE_EMAIL) {
        BodyMessage += " ";
      }
      BodyMessage += ParamaterVar + " ";
      this.NotifTemplateForm.get("Body").setValue(BodyMessage);
    }
    if(!this.ParamArr.includes(ParamaterVar)){
      this.ParamArr.push(ParamaterVar);
      ListParam.push(this.fb.group({
        Param: "",
        ParamIdxAt: ParamaterVar
      }));
    }
    ListParamDummy.push(this.fb.group({
      Param: "",
      ParamIdxAt: ParamaterVar
    }));
    this.InputParamValue();
  }
  
  getDeletedParam(param: string){
    this.ParamArr.splice(this.ParamArr.indexOf(param), 1);
  }

  @ViewChild("TempMessage") TempMessage: BodyMessageTosendComponent;
  InputParamValue() {
    this.TempMessage.InputParamValue();
  }

  async SaveForm() {
    let urlSave: string = this.UrlConstantNew.AddNotificationTemplate;
    if (this.NotificationTemplateSaveObj.NotificationTemplateId != 0) urlSave = this.UrlConstantNew.EditNotificationTemplate;
    await this.http.post(urlSave, this.SetSaveObj(), AdInsConstant.SpinnerOptions).toPromise().then(
      (response: NotificationTemplateObj) => {
        if (response["StatusCode"] == "200") {
          this.toastr.successMessage(response['message']);
          this.CancelButton();
        }
      }
    );
  }

  SetSaveObj(): NotificationTemplateObj {
    const SaveObj = this.NotifTemplateForm.getRawValue();
    this.NotificationTemplateSaveObj.Body = SaveObj.Body;
    this.NotificationTemplateSaveObj.NotificationTemplateCode = SaveObj.NotificationTemplateCode;
    this.NotificationTemplateSaveObj.NotificationTemplateDescr = SaveObj.NotificationTemplateDescr;
    this.NotificationTemplateSaveObj.MrNotificationLevelCode = SaveObj.MrNotificationLevelCode;
    this.NotificationTemplateSaveObj.MrNotificationLevelDescr = this.GetDescription(this.MrNotificationLevelCode, SaveObj.MrNotificationLevelCode);
    this.NotificationTemplateSaveObj.MrNotificationSourceCode = SaveObj.MrNotificationSourceCode;
    this.NotificationTemplateSaveObj.MrNotificationSourceDescr = this.GetDescription(this.MrNotificationSourceCode, SaveObj.MrNotificationSourceCode);
    this.NotificationTemplateSaveObj.MrNotificationTypeCode = SaveObj.MrNotificationTypeCode;
    this.NotificationTemplateSaveObj.MrNotificationTypeDescr = this.GetDescription(this.MrNotificationTypeCode, SaveObj.MrNotificationTypeCode);
    this.NotificationTemplateSaveObj.Subject = SaveObj.Subject;
    const ListParam: FormArray = this.NotifTemplateForm.get(this.IdentifierBodyMessageParam) as FormArray;
    this.NotificationTemplateSaveObj.TotalParam = ListParam.length;
    this.NotificationTemplateSaveObj.StartDt = SaveObj.StartDt;
    this.NotificationTemplateSaveObj.EndDt = SaveObj.EndDt;

    if(SaveObj.MrNotificationTypeCode == this.notifTypePushNotif){
      this.NotificationTemplateSaveObj.BaseUrl = SaveObj.BaseUrl;
      this.NotificationTemplateSaveObj.Path = SaveObj.Path;
    }

    return this.NotificationTemplateSaveObj;
  }

  CancelButton() {
    AdInsHelper.RedirectUrl(this.router, [NavigationConstant.NOTIF_ENGINE_TEMPLATE_PAGING], {});
  }
  
  getFormValidationErrors() {
    const invalid = [];
    const controls = this.NotifTemplateForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
        console.log(name);
      }
    }
    console.log(invalid);
    console.dir(this.NotifTemplateForm.getRawValue());
  }

  get isHideSubject(){
    return [this.notifTypeSms,this.notifTypeWa].includes(this.NotifTemplateForm.get("MrNotificationTypeCode").value);
  }

  get subjectValue(){
    return this.NotifTemplateForm.get("MrNotificationTypeCode").value == this.notifTypePushNotif ? "TITLE" : "SUBJECT"
  }
}
