import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-self-custom-customer-emergency-contact',
  templateUrl: './self-custom-customer-emergency-contact.component.html'
})
export class SelfCustomCustomerEmergencyContactComponent implements OnInit {

  pageName: string;

  constructor() {
    this.pageName = "EmergencyCntcPerson"
  }

  ngOnInit(): void {
  }

  handler = {

    callback: ($event) => this.callback($event)

  };

  callback(ev) {
    let row = ev.RowObj;
  }

}
