import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { TagInputObj } from 'app/shared/model/generic/tag-input-obj.model';
import { InputLookupObj } from 'app/shared/model/input-lookup-obj.model';
import { KeyValueObj } from 'app/shared/model/key-value/key-value-obj.model';
import { PushNotifSendToObj } from 'app/shared/model/notif-engine/push-notif-send-to-obj';
import { filter, Observable, of } from 'rxjs';

@Component({
  selector: 'app-broadcast-message-notification',
  templateUrl: './broadcast-message-notification.component.html',
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class BroadcastMessageNotificationComponent implements OnInit {

  @Input() enjiForm: NgForm;
  @Input() parentForm: FormGroup;
  @Input() IsUsedTemplate: boolean = false;
  @Input() IsResend: boolean = false;
  @Input() SendToUname: string;
  SendtoLookupObj: InputLookupObj = new InputLookupObj(this.UrlConstantNew);
  readonly title: string = "Broadcast Push Notification";
  readonly IdentifierLookupSendTo: string = "LookupSendTo";
  constructor(private fb: FormBuilder, private UrlConstantNew: UrlConstantNew, private http: HttpClient) {}
  @Output() GetPushNotificationObj: EventEmitter<PushNotifSendToObj> = new EventEmitter();
  PushNotifSendToObj: PushNotifSendToObj = new PushNotifSendToObj();

  ngOnInit(): void {
    this.SetLookupSendToPush();
    this.GetMaxSpecifirUser();
    this.SetListSendType();
    if(this.IsResend) {
      this.PatchDataUcSendTo()
    }
    this.SendtoLookupObj.isReady = true;
  }

  MaxSpecificUser: number = 5;
  GetMaxSpecifirUser() {
    this.http.post(this.UrlConstantNew.GetMaxSpecificUser, {}).subscribe(
      (response: number) => {
        this.MaxSpecificUser = response;
      }
    );
  }

  get SendToLength(){
    let listSendTo: Array<TagInputObj> = this.parentForm.get("SendTo").value == "" ? new Array() : this.parentForm.get("SendTo").value;
    return listSendTo.length;
  }
  
  SetLookupSendToPush(ListUserName: Array<string> = new Array()) {
    this.SendtoLookupObj = new InputLookupObj(this.UrlConstantNew);
    this.SendtoLookupObj.isReady = false;  
    this.SendtoLookupObj.urlJson = "./assets/uclookup/notif-engine/lookup-ref-user-subscription.json";
    this.SendtoLookupObj.isRequired = false;
    if (this.IsResend) {
      this.SendtoLookupObj.isRequired = true;
    }
    this.SendtoLookupObj.urlEnviPaging = this.UrlConstantNew.env.FoundationR3Url + '/v2.1';
    this.SendtoLookupObj.addCritInput = new Array();

    if (ListUserName.length) {
      const AddCrit = new CriteriaObj();
      AddCrit.DataType = "text";
      AddCrit.propName = "USERNAME";
      AddCrit.restriction = AdInsConstant.RestrictionNotIn;
      AddCrit.listValue = ListUserName;
      this.SendtoLookupObj.addCritInput.push(AddCrit);
    }
    setTimeout(() => {
      this.SendtoLookupObj.isReady = true;
    }, 1);
  }

  getLookUp(ev){
    if(!this.IsResend) return;
    this.PushNotifSendToObj = new PushNotifSendToObj();
    this.PushNotifSendToObj.SendTo = ev.Username;
    this.GetPushNotificationObj.emit(this.PushNotifSendToObj);
  }
  
  PatchDataUcSendTo(){
    let objPatch = {
      Username: this.SendToUname
    }
    this.SendtoLookupObj.nameSelect = objPatch.Username;
    this.SendtoLookupObj.jsonSelect = objPatch;
  }
  
  CheckAll: boolean = false;
  SetSendToAll(){
    this.SendtoLookupObj.isReady = false;
    this.CheckAll = !this.CheckAll;
    this.SetLookupSendToPush();

    if(this.CheckAll){
      let objPatch = {
        Username: "All"
      }
      this.SendtoLookupObj.nameSelect = objPatch.Username;
      this.SendtoLookupObj.jsonSelect = objPatch;
    }

    this.PushNotifSendToObj = new PushNotifSendToObj();
    this.PushNotifSendToObj.Url = "";
    this.PushNotifSendToObj.Key = "";
    this.PushNotifSendToObj.SendTo = this.SendtoLookupObj.nameSelect;

    this.GetPushNotificationObj.emit(this.PushNotifSendToObj);
    this.SendtoLookupObj.isReady = true;
  }

  AddSendTo(){
    let valueUsername = this.parentForm.get(this.IdentifierLookupSendTo).value;
    const item = { display: valueUsername.value, value: valueUsername.value };
    
    let sendToVal = this.parentForm.get("SendTo").value
    let listSendTo: Array<TagInputObj> = sendToVal == "" ? new Array() : sendToVal;
    listSendTo.push(item);
    this.parentForm.get("SendTo").setValue(listSendTo);

    //#region reset lookup
    let ListUserName: Array<string> = new Array();
    for (let index = 0; index < listSendTo.length; index++) {
      const element = listSendTo[index];
      ListUserName.push(element.display);
    }
    this.SetLookupSendToPush(ListUserName);
    //#endregion
  }
  
  transform(value: string): Observable<object> {
    const item = { display: `(+62) ${value}`, value: `(+62) ${value}` };
    return of(item);
  }

  onRemoving(tag): Observable<any> {
    const confirm = window.confirm('Do you really want to remove this tag?');
    return of(tag)
      .pipe(filter(() => confirm));
  }

  ListSendType: Array<KeyValueObj> = new Array();
  readonly SendTypeSpecificUser: string = CommonConstant.SEND_TYPE_SPECIFIC_USER;
  readonly SendTypeAll: string = CommonConstant.SEND_TYPE_ALL;
  SetListSendType(){
    const item1: KeyValueObj=new KeyValueObj();
    item1.Key = CommonConstant.SEND_TYPE_ALL;
    item1.Value = CommonConstant.SEND_TYPE_ALL;
    this.ListSendType.push(item1);

    const item2: KeyValueObj=new KeyValueObj();
    item2.Key = CommonConstant.SEND_TYPE_SPECIFIC_USER;
    item2.Value = "Specific User";
    this.ListSendType.push(item2);
  }

  IsSendToReadonly: boolean = false;
  ChangeSendType(ev) {
    this.IsSendToReadonly = false;
    let listSendTo: Array<TagInputObj> = new Array();
    if (ev == this.SendTypeAll) {
      const item = { display: this.SendTypeAll, value: this.SendTypeAll };
      listSendTo.push(item);
      this.IsSendToReadonly = true;
    }
    this.parentForm.get("SendTo").setValue(listSendTo);
  }

  get GetSendType(){
    return this.parentForm.get("SendType").value;
  }
}
