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
import { DatePipe } from '@angular/common';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';

@Component({
  selector: 'app-notif-template-form',
  templateUrl: './notif-template-form.component.html'
})
export class NotifTemplateFormComponent implements OnInit {

  NotifTemplateForm = this.fb.group({
    NotificationTemplateCode: ['', Validators.required],
    NotificationTemplateDescr: ['', Validators.required],
    MrNotificationLevelCode: ['', Validators.required],
    MrNotificationSourceCode: [''],
    MrNotificationTypeCode: ['', Validators.required],
    StartDt: ['', Validators.required],
    EndDt: '',
    Subject: '',
    BaseUrl: '',
    Path: '',
    Body: ['', Validators.required],
    RefAttrTemplateParam: '',
    ParamArr: this.fb.array([])
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
  ListActiveRefNotifAttrTemplateObj: Array<RefNotifAttrTemplateObj> = new Array<RefNotifAttrTemplateObj>();
  ListAllRefNotifAttrTemplateObj: Array<RefNotifAttrTemplateObj> = new Array<RefNotifAttrTemplateObj>();

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
    await this.GetListAllRefNotifAttrTemplate();
    await this.GetNotificationTemplate();
    this.GetRefMasterListKeyValueActiveByCode(this.MrNotificationLevelCode);
    this.GetRefMasterListKeyValueActiveByCode(this.MrNotificationSourceCode);
    this.GetRefMasterListKeyValueActiveByCode(this.MrNotificationTypeCode);
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
          StartDt: this.toDateString(response.StartDt),
          EndDt: this.toDateString(response.EndDt),
          Subject: response.Subject,
          Body: response.Body,
          BaseUrl: response.BaseUrl,
          Path: response.Path
        });
        this.ChangeNotifType();
        this.CheckExistingParamAttr(response.Body);
      }
    )
  }

  private toDateString(dt: Date): string {
    let date = new Date(dt);
    return (date.getFullYear().toString() + '-'
      + ("0" + (date.getMonth() + 1)).slice(-2) + '-'
      + ("0" + (date.getDate())).slice(-2))
      + 'T' + date.toTimeString().slice(0, 5);
  }

  CheckExistingParamAttr(bodyValue : string) {
    for ( let idx = 0; idx < this.ListAllRefNotifAttrTemplateObj.length; idx++ ){
      let AttrCode = this.ListAllRefNotifAttrTemplateObj.at(idx).NotifAttrTemplaceCode;
      if(bodyValue.includes(AttrCode)){
        this.AddParameter(true, AttrCode);
      }
    }
  }

  async GetListAllRefNotifAttrTemplate() {
    await this.http.post(this.UrlConstantNew.GetListRefNotifAttrTemplate, {}).toPromise().then(
      (response) => {
        this.ListAllRefNotifAttrTemplateObj = response[CommonConstant.ReturnObj];
        this.ListActiveRefNotifAttrTemplateObj = this.ListAllRefNotifAttrTemplateObj.filter(obj => {
          return obj.IsActive === true;
        });
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

  private GetDescription(RefMasterTypeCode: string, MasterCode: string): string {
    let list: Array<KeyValueObj> = this.DictListRefMaster[RefMasterTypeCode];
    if (!list) return "";
    let obj: KeyValueObj = list.find(x => x.Key == MasterCode);
    if (!obj) return "";
    return obj.Value;
  }

  private GetRefNotifAttrTemplateObj(Code: string): RefNotifAttrTemplateObj {
    return this.ListAllRefNotifAttrTemplateObj.find(x => x.NotifAttrTemplaceCode == Code);
  }

  private GetDescrAttrParam(Code: string): string {
    let attrTemplateObj: RefNotifAttrTemplateObj = this.GetRefNotifAttrTemplateObj(Code);
    if (!attrTemplateObj) return "";
    return attrTemplateObj.NotifAttrTemplaceDescr;
  }

  private GetInputTypeAttrParam(Code: string): string {
    let attrTemplateObj: RefNotifAttrTemplateObj = this.GetRefNotifAttrTemplateObj(Code);
    if (!attrTemplateObj) return "";
    return attrTemplateObj.AttrInputTypeCode;
  }

  private GetIsActiveAttrParam(Code: string): boolean {
    let attrTemplateObj: RefNotifAttrTemplateObj = this.GetRefNotifAttrTemplateObj(Code);
    if (!attrTemplateObj) return false;
    return attrTemplateObj.IsActive;
  }

  subjectIsRequired: boolean = false;
  ChangeNotifType() {
    let notifType: string = this.NotifTemplateForm.get("MrNotificationTypeCode").value;

    this.subjectIsRequired = false;
    if (notifType == CommonConstant.NOTIF_TYPE_EMAIL) this.subjectIsRequired = true;
  }

  ParamArr: Array<string> = new Array<string>();
  readonly IdentifierBodyMessageParam: string = "ParamArr";
  AddParameter(IsEdit: boolean = false, ParamAttrValue: string = "") {
    let BodyMessage: string = this.NotifTemplateForm.get("Body").value;
    const ListParam: FormArray = this.NotifTemplateForm.get(this.IdentifierBodyMessageParam) as FormArray;

    let ParamAttrCode = this.NotifTemplateForm.get("RefAttrTemplateParam").value;
    if(IsEdit) ParamAttrCode = ParamAttrValue;
    
    const ParamAttrDesc: string = this.GetDescrAttrParam(ParamAttrCode);
    const InputType: string = this.GetInputTypeAttrParam(ParamAttrCode);
    const IsActive: boolean = this.GetIsActiveAttrParam(ParamAttrCode);

    const ParamaterVar: string = "{" + ParamAttrCode + "}";

    if (!IsEdit) {
      if(!ParamAttrCode) return;
      const lenBody: number = BodyMessage.length;
      let notifType: string = this.NotifTemplateForm.get("MrNotificationTypeCode").value;
      if (lenBody > 0 && BodyMessage.charAt(lenBody) != " " && notifType != CommonConstant.NOTIF_TYPE_EMAIL) {
        BodyMessage += " ";
      }
      BodyMessage += ParamaterVar + " ";
      this.NotifTemplateForm.get("Body").setValue(BodyMessage);
    }

    if(!this.ParamArr.includes(ParamAttrCode)){
      this.ParamArr.push(ParamAttrCode);
      ListParam.push(this.fb.group({
        Param: "",
        ParamIdxAt: ParamaterVar,
        ParamAttrDesc: ParamAttrDesc,
        InputType: InputType,
        IsActive: IsActive
      }));
    }
    this.InputParamValue();
  }
  
  getDeletedParam(param: string){
    // remove { }
    let searchParamToDel = param.substring(1, param.length - 1);
    this.ParamArr.splice(this.ParamArr.indexOf(searchParamToDel), 1);
  }

  @ViewChild("TempMessage") TempMessage: BodyMessageTosendComponent;
  InputParamValue() {
    this.TempMessage.InputParamValue();
  }

  private CheckValidatorEndDt() {
    let datePipe = new DatePipe("en-US");
    let startDt = this.GetStartDt;
    let endDt = this.NotifTemplateForm.get("EndDt").value;
    if (startDt > endDt) {
      throw this.toastr.warningMessage(ExceptionConstant.END_DATE_MUST_EQUAL_OR_MORE_THAN + " " + datePipe.transform(startDt, 'MMMM d, y'));
    }
  }

  async SaveForm() {
    this.CheckValidatorEndDt();
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

  private SetSaveObj(): NotificationTemplateObj {
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
    this.NotificationTemplateSaveObj.BaseUrl = "";
    this.NotificationTemplateSaveObj.Path = "";

    if(SaveObj.MrNotificationTypeCode == this.notifTypePushNotif){
      this.NotificationTemplateSaveObj.BaseUrl = SaveObj.BaseUrl;
      this.NotificationTemplateSaveObj.Path = SaveObj.Path;
    }

    if (this.CheckParamAttrActivity() && !confirm(ExceptionConstant.PARAM_ATTR_INACTIVE)){
      throw false;
    }
    return this.NotificationTemplateSaveObj;
  }

  CheckParamAttrActivity(): boolean {
    let FlagInactive: boolean = false;
    let ActiveAttrCodes: Array<string> = this.ListActiveRefNotifAttrTemplateObj.map(Code => Code.NotifAttrTemplaceCode);
    for (let idx = 0; idx < this.ParamArr.length; idx++){
      let IdxValue = this.ParamArr.at(idx);
      if(!ActiveAttrCodes.includes(IdxValue)){
        FlagInactive = true;
      }
    }
    return FlagInactive;
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
