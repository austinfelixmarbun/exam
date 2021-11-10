import { Component, OnInit } from '@angular/core';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';

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
  }

}
