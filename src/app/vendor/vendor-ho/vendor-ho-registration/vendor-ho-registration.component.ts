import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vendor-ho-registration',
  templateUrl: './vendor-ho-registration.component.html',
  styleUrls: ['./vendor-ho-registration.component.scss']
})
export class VendorHoRegistrationComponent implements OnInit {
  viewObj: any;

  constructor() { }

  ngOnInit() {
    this.viewObj = "./assets/ucviewgeneric/viewVendorHO.json"
  }

}
