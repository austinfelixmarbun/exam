import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';

@Component({
  selector: 'app-customer-view-coy-detail-x',
  templateUrl: './customer-view-coy-detail-x.component.html'
})
export class CustomerViewCoyDetailXComponent implements OnInit {
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj();

  constructor() { }

  ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/impl/ucviewgeneric/viewCustCoyMainDataMainInfo.json";
  }

}
