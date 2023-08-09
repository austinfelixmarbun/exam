import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-self-custom-customer-personal-address',
  templateUrl: './self-custom-customer-personal-address.component.html',
  styleUrls: ['./self-custom-customer-personal-address.component.css']
})
export class SelfCustomCustomerPersonalAddressComponent implements OnInit {

  pageName: string;

  constructor() {
    this.pageName = "CustPersonalAddress"
  }

  ngOnInit(): void {
  }

}
