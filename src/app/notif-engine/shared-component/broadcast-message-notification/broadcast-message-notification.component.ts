import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';

@Component({
  selector: 'app-broadcast-message-notification',
  templateUrl: './broadcast-message-notification.component.html',
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class BroadcastMessageNotificationComponent implements OnInit {

  @Input() enjiForm: NgForm;
  @Input() parentForm: FormGroup;
  @Input() IsUsedTemplate: boolean = false;
  readonly title: string = "Broadcast Notification";
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    const SendToControl = this.parentForm.get("SendTo");
    if(!SendToControl){
      this.parentForm.addControl("SendTo", this.fb.control(""));
    }
    const BodyControl = this.parentForm.get("Body");
    if(!BodyControl){
      this.parentForm.addControl("Body", this.fb.control(""));
    }
  }

  ngOnDestroy(): void {
    
  }
}
