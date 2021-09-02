import { Component, OnInit } from '@angular/core';
import { UcViewGenericObj } from 'app/shared/model/UcViewGenericObj.model';

@Component({
  selector: 'app-customer-view-personal-detail-x',
  templateUrl: './customer-view-personal-detail-x.component.html'
})
export class CustomerViewPersonalDetailXComponent implements OnInit {
  viewCustMainDataMainInfo : UcViewGenericObj = new UcViewGenericObj();
  viewCustMainDataContactInformation: UcViewGenericObj = new UcViewGenericObj();
  constructor() { }

  ngOnInit() {
    this.viewCustMainDataMainInfo.viewInput =  "./assets/ucviewgeneric/viewCustMainDataMainInfoX.json";
    this.viewCustMainDataContactInformation.viewInput  = "./assets/ucviewgeneric/viewCustMainDataContactInformation.json";
  }
}
