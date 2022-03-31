import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-broadcast-message-notification',
  templateUrl: './broadcast-message-notification.component.html'
})
export class BroadcastMessageNotificationComponent implements OnInit {

  @Input() enjiForm: NgForm;
  @Input() parentForm: FormGroup;
  readonly title: string = "Broadcast Notification";
  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    
  }
}
