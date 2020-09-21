import { Component, OnInit } from '@angular/core';
import { UcViewGenericObj } from 'app/shared/model/UcViewGenericObj.model';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-ho-address-info',
  templateUrl: './ho-address-info.component.html',
  styleUrls: ['./ho-address-info.component.scss']
})
export class HoAddressInfoComponent implements OnInit {
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj();

  constructor() { }

  ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewHOInfoLegalAddr.json";
    this.viewGenericObj.viewEnvironment = environment.FoundationR3Url;
  }

}
