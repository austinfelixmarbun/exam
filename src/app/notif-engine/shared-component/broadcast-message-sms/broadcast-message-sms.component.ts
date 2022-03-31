import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-broadcast-message-sms',
  templateUrl: './broadcast-message-sms.component.html'
})
export class BroadcastMessageSmsComponent implements OnInit {

  @Input() enjiForm: NgForm;
  @Input() parentForm: FormGroup;
  readonly title: string = "Broadcast SMS";
  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    
  }
}
