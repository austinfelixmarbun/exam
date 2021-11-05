import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-payment-alloc-group-paging',
  templateUrl: './payment-alloc-group-paging.component.html'
})
export class PaymentAllocGroupPagingComponent implements OnInit {
  inputPagingObj: UcPagingObj = new UcPagingObj();
  isReady: boolean;

  readonly AddLink: string = NavigationConstant.BACK_TO_DETAIL;
  constructor() { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/common-setting/payment-alloc-group/search-payment-alloc-group-paging.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/common-setting/payment-alloc-group/search-payment-alloc-group-paging.json";
    this.isReady = true;
  }
}