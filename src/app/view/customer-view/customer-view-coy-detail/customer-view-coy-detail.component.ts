import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { UcViewGenericObj } from 'app/shared/model/UcViewGenericObj.model';

@Component({
  selector: 'app-customer-view-coy-detail',
  templateUrl: './customer-view-coy-detail.component.html'
})
export class CustomerViewCoyDetailComponent implements OnInit {
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj();

  constructor() { }

  ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewCustCoyMainDataMainInfo.json";
    this.viewGenericObj.viewEnvironment = environment.FoundationR3Url;
  }

}
