import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { InputLookupObj } from 'app/shared/model/input-lookup-obj.model';
import { PushNotifSendToObj } from 'app/shared/model/notif-engine/push-notif-send-to-obj';

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
  readonly title: string = "Broadcast Notification";
  readonly IdentifierLookupSendTo: string = "LookupSendTo";
  constructor(private fb: FormBuilder, private UrlConstantNew: UrlConstantNew, private http: HttpClient) {}
  @Output() GetPushNotificationObj: EventEmitter<PushNotifSendToObj> = new EventEmitter();
  PushNotifSendToObj: PushNotifSendToObj = new PushNotifSendToObj();

  ngOnInit(): void {
    this.SetLookupSendToPush();
    if(this.IsResend) {
      this.GetRefUserSubscriptionByUsername();
      this.PatchDataUcSendTo()
    }
  }
  
  SetLookupSendToPush() {
    this.SendtoLookupObj = new InputLookupObj(this.UrlConstantNew);
    this.SendtoLookupObj.isReady = false;  
    this.SendtoLookupObj.urlJson = "./assets/uclookup/notif-engine/lookup-ref-user-subscription.json";
    this.SendtoLookupObj.isRequired = false;
    this.SendtoLookupObj.urlEnviPaging = this.UrlConstantNew.env.NotifEngineURL + '/v2.1';
    this.SendtoLookupObj.isReady = true;  
  }

  getLookUp(ev){
    this.PushNotifSendToObj = new PushNotifSendToObj();
    this.PushNotifSendToObj.Url = ev.SubscriptionEndpoint;
    this.PushNotifSendToObj.Key = ev.SubscriptionKey;
    this.PushNotifSendToObj.SendTo = ev.Username;
    this.GetPushNotificationObj.emit(this.PushNotifSendToObj);
  }
  
  PatchDataUcSendTo(){
    let objPatch = {
      RefUserSubscriptionId : this.RefUserSubscriptionId,
      Username: this.SendToUname
    }
    this.SendtoLookupObj.nameSelect = objPatch.Username;
    this.SendtoLookupObj.jsonSelect = objPatch;
  }
  
  CheckAll: boolean = false;
  SetSendToAll(){
    this.CheckAll != this.CheckAll;
    this.SetLookupSendToPush();
    if(this.CheckAll){
      let objPatch = {
        RefUserSubscriptionId : 1,
        Username: "All"
      }
      this.SendtoLookupObj.nameSelect = objPatch.Username;
      this.SendtoLookupObj.jsonSelect = objPatch;
    }
  }

  RefUserSubscriptionId: number;
  GetRefUserSubscriptionByUsername() {
    if(this.SendToUname){
      this.http.post(this.UrlConstantNew.GetRefUserSubscriptionByUsername, { username: this.SendToUname }).subscribe(
        (response: any) => {
          this.RefUserSubscriptionId = response.RefUserSubscriptionId;
        }
      );
    
    }
  }
  
  ngOnDestroy(): void {
    
  }
}
