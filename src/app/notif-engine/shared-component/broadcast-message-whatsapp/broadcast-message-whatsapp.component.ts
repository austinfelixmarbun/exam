import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-broadcast-message-whatsapp',
  templateUrl: './broadcast-message-whatsapp.component.html'
})
export class BroadcastMessageWhatsappComponent implements OnInit {

  @Input() enjiForm: NgForm;
  @Input() parentForm: FormGroup;
  readonly title: string = "Broadcast Whats App";
  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    
  }
}
