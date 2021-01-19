import { Component, OnInit } from '@angular/core';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-payment-alloc-paging',
  templateUrl: './payment-alloc-paging.component.html',
  styleUrls: ['./payment-alloc-paging.component.scss']
})
export class PaymentAllocPagingComponent implements OnInit {
  inputPagingObj: UcPagingObj = new UcPagingObj();
  isReady: boolean;

  constructor() { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/common-setting/payment-allocation/search-payment-alloc-paging.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = URLConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/common-setting/payment-allocation/search-payment-alloc-paging.json";
    
    this.isReady = true;
  }
}