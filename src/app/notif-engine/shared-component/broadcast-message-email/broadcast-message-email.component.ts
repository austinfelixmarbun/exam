import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroup, FormGroupDirective, NgForm } from '@angular/forms';

@Component({
  selector: 'app-broadcast-message-email',
  templateUrl: './broadcast-message-email.component.html',
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class BroadcastMessageEmailComponent implements OnInit {

  @Input() enjiForm: NgForm;
  @Input() parentForm: FormGroup;
  @Input() IsUsedTemplate: boolean = false;
  readonly title: string = "Broadcast Email";
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
