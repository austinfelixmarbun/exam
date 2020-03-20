import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ho-address-info',
  templateUrl: './ho-address-info.component.html',
  styleUrls: ['./ho-address-info.component.scss']
})
export class HoAddressInfoComponent implements OnInit {
  viewLegalAddressObj: any;

  constructor() { }

  ngOnInit() {
    this.viewLegalAddressObj = "./assets/ucviewgeneric/viewHOInfoLegalAddr.json";
  }

}
