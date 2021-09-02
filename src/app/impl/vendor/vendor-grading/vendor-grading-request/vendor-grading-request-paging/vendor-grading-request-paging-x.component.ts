import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';

@Component({
  selector: 'app-vendor-grading-request-paging-x',
  templateUrl: './vendor-grading-request-paging-x.component.html'
})
export class VendorGradingRequestPagingXComponent implements OnInit {

  inputPagingObj: UcPagingObj = new UcPagingObj();
  mode: string;
  constructor() {
  }
 
  ngOnInit(): void {

    this.inputPagingObj.pagingJson = "./assets/impl/ucpaging/dealer-grading/searchDealerGradingRequestX.json";
    this.inputPagingObj._url = "./assets/impl/ucpaging/dealer-grading/searchDealerGradingRequestX.json";
  }
}
