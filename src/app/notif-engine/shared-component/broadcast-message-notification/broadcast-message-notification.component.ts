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
  SendtoLookupObj: InputLookupObj = new InputLookupObj(this.UrlConstantNew);
  readonly title: string = "Broadcast Notification";
  readonly IdentifierLookupSendTo: string = "LookupSendTo";
  constructor(private fb: FormBuilder, private UrlConstantNew: UrlConstantNew) {}
  @Output() GetPushNotificationObj: EventEmitter<PushNotifSendToObj> = new EventEmitter();
  PushNotifSendToObj: PushNotifSendToObj = new PushNotifSendToObj();

  ngOnInit(): void {
    this.SetLookupSendToPush();
  }

  SetLookupSendToPush() {
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


  ngOnDestroy(): void {
    
  }
}
