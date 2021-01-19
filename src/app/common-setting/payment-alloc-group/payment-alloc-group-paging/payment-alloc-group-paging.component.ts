import { Component, OnInit } from '@angular/core';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-payment-alloc-group-paging',
  templateUrl: './payment-alloc-group-paging.component.html'
})
export class PaymentAllocGroupPagingComponent implements OnInit {
  inputPagingObj: UcPagingObj = new UcPagingObj();
  isReady: boolean;

  constructor() { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/common-setting/payment-alloc-group/search-payment-alloc-group-paging.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = URLConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/common-setting/payment-alloc-group/search-payment-alloc-group-paging.json";
    this.inputPagingObj.ddlEnvironments = [{
      name: "RPAG.MR_PAY_ALLOC_GRP_CODE",
      environment: environment.FoundationR3Url
    }];
    this.isReady = true;
  }
}