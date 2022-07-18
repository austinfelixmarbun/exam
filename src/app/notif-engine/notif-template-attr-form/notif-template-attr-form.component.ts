import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { KeyValueObj } from 'app/shared/model/key-value/key-value-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { BodyMessageTosendComponent } from '../shared-component/body-message-tosend/body-message-tosend.component';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { NotificationTemplateObj } from 'app/shared/model/notif-engine/notification-template-obj.model';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { RefNotifAttrTemplateObj } from 'app/shared/model/notif-engine/ref-notif-attr-template-obj.model';

@Component({
  selector: 'app-notif-template-attr-form',
  templateUrl: './notif-template-attr-form.component.html'
})
export class NotifTemplateAttrFormComponent implements OnInit {

  RefNotifAttrTemplateId: number = 0;
  DictListRefMaster: { [id: string]: Array<KeyValueObj> } = {};
  NotifTemplateAttrForm = this.fb.group({
    NotifAttrTemplateCode: ['', Validators.required],
    NotifAttrTemplateDescr: ['', Validators.required],
    AttrInputTypeCode: ['', Validators.required],
    IsActive: [true, Validators.required],
    DefaultValue: ['']
  });

  readonly identifierFormNotifAttrTemplateCode: string = "NotifAttrTemplateCode";
  readonly identifierFormNotifAttrTemplateDescr: string = "NotifAttrTemplateDescr";
  readonly identifierFormAttrInputTypeCode: string = "AttrInputTypeCode";
  readonly identifierFormIsActive: string = "IsActive";
  readonly identifierFormDefaultValue: string = "DefaultValue";
  
  readonly title: string = "Notification Template Attribute";
  readonly MrNotificationTemplAttrInputType: string = CommonConstant.RefMasterTypeCodeNotifTemplAttrInputType;
  readonly CurrencyMaskPrct = CommonConstant.CurrencyMaskPrct;
  readonly AttrInputType = {
    Text: CommonConstant.AttrInputTypeText,
    Date: CommonConstant.AttrInputTypeDate,
    Num: CommonConstant.AttrInputTypeNum,
    NumPerc: CommonConstant.AttrInputTypeNumPerc
  };
  
  constructor(private fb: FormBuilder, private router: Router, private toastr: NGXToastrService, private route: ActivatedRoute, private http: HttpClient, private UrlConstantNew: UrlConstantNew) {
    this.route.queryParams.subscribe(params => {
      if (params["RefNotifAttrTemplateId"]) {
        this.RefNotifAttrTemplateId = params["RefNotifAttrTemplateId"];
      }
    });
  }

  async ngOnInit() {
    await this.GetExistingData();
    this.GetRefMasterListKeyValueActiveByCode(this.MrNotificationTemplAttrInputType);
  }

  existingRefNotifAttrTemplateObj: RefNotifAttrTemplateObj = new RefNotifAttrTemplateObj();
  async GetExistingData(){
    if (this.RefNotifAttrTemplateId == 0) return;
    await this.http.post(this.UrlConstantNew.GetRefNotifAttrTemplateByRefNotifAttrTemplateId, { Id: this.RefNotifAttrTemplateId }).toPromise().then(
      (response: RefNotifAttrTemplateObj) => {
        this.existingRefNotifAttrTemplateObj = response;
        this.NotifTemplateAttrForm.patchValue({
          NotifAttrTemplateCode: this.existingRefNotifAttrTemplateObj.NotifAttrTemplaceCode,
          NotifAttrTemplateDescr: this.existingRefNotifAttrTemplateObj.NotifAttrTemplaceDescr,
          AttrInputTypeCode: this.existingRefNotifAttrTemplateObj.AttrInputTypeCode,
          IsActive: this.existingRefNotifAttrTemplateObj.IsActive,
          DefaultValue: this.existingRefNotifAttrTemplateObj.DefaultValue,
        });
      }
    )

  }

  getFormControl(identifier: string): FormControl{
    return this.NotifTemplateAttrForm.get(identifier) as FormControl;
  }

  GetRefMasterListKeyValueActiveByCode(RefMasterTypeCode: string) {
    this.http.post(this.UrlConstantNew.GetRefMasterListKeyValueActiveByCode, { RefMasterTypeCode: RefMasterTypeCode }).subscribe(
      (response) => {
        this.DictListRefMaster[RefMasterTypeCode] = response[CommonConstant.ReturnObj];
      }
    );
  }

  async SaveForm() {
    let urlSave: string = this.UrlConstantNew.AddRefNotifAttrTemplate;
    if (this.RefNotifAttrTemplateId != 0) urlSave = this.UrlConstantNew.EditRefNotifAttrTemplate;
    console.dir(this.SetSaveObj());
    await this.http.post(urlSave, this.SetSaveObj()).toPromise().then(
      (response) => {
        if (response["StatusCode"] == "200") {
          this.toastr.successMessage(response['message']);
          this.CancelButton();
        }
      }
    );
  }

  SetSaveObj(): RefNotifAttrTemplateObj {
    let reqObj: RefNotifAttrTemplateObj = new RefNotifAttrTemplateObj();
    let form = this.NotifTemplateAttrForm.getRawValue();
    if (this.RefNotifAttrTemplateId != 0){
      reqObj.RefNotifAttrTemplateId = this.existingRefNotifAttrTemplateObj.RefNotifAttrTemplateId;
      reqObj.RowVersion = this.existingRefNotifAttrTemplateObj.RowVersion;
    }
    reqObj.NotifAttrTemplaceCode = form[this.identifierFormNotifAttrTemplateCode];
    reqObj.NotifAttrTemplaceDescr = form[this.identifierFormNotifAttrTemplateDescr];
    reqObj.AttrInputTypeCode = form[this.identifierFormAttrInputTypeCode];
    reqObj.AttrInputTypeDescr = this.GetDescription(this.MrNotificationTemplAttrInputType, reqObj.AttrInputTypeCode);
    reqObj.DefaultValue = form[this.identifierFormDefaultValue];
    reqObj.IsActive = form[this.identifierFormIsActive];
    return reqObj;
  }

  GetDescription(RefMasterTypeCode: string, MasterCode: string): string {
    return this.DictListRefMaster[RefMasterTypeCode].find(x => x.Key == MasterCode).Value;
  }
  CancelButton() {
    AdInsHelper.RedirectUrl(this.router, [NavigationConstant.NOTIF_ENGINE_TEMPLATE_ATTR_PAGING], {});
  }
  
  getFormValidationErrors() {
    const invalid = [];
    const controls = this.NotifTemplateAttrForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
        console.log(name);
      }
    }
    console.log(invalid);
    console.dir(this.NotifTemplateAttrForm.getRawValue());
  }
}
