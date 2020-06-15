import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';

@Component({
  selector: 'app-test-paging-v3',
  templateUrl: './test-paging-v3.component.html',
  styleUrls: ['./test-paging-v3.component.scss']
})
export class TestPagingV3Component implements OnInit {

  inputPagingObj: any;
  
  constructor() { }

  ngOnInit() {
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/search/searchCurrency.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = AdInsConstant.GetRefCurrPaging;
    this.inputPagingObj.pagingJson = "./assets/form-setting/currencyPaging.json";
  }
}
