import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-negative-customer',
  templateUrl: './negative-customer.component.html'
})
export class NegativeCustomerComponent implements OnInit {
  inputPagingObj: UcPagingObj = new UcPagingObj();

  readonly AddLink: string = NavigationConstant.CUST_NEG_DETAIL;
  constructor() { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchNegativeCustomer.json";
    this.inputPagingObj.deleteUrl = URLConstant.DeleteNegativeCustomer;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchNegativeCustomer.json";
  }
}
