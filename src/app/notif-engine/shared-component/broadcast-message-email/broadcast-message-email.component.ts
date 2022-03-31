import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-broadcast-message-email',
  templateUrl: './broadcast-message-email.component.html'
})
export class BroadcastMessageEmailComponent implements OnInit {

  @Input() enjiForm: NgForm;
  @Input() parentForm: FormGroup;
  readonly title: string = "Broadcast Email";
  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {

  }
}
