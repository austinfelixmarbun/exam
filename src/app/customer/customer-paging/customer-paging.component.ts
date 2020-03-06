import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';

@Component({
  selector: 'app-customer-paging',
  templateUrl: './customer-paging.component.html',
  styleUrls: ['./customer-paging.component.scss']
})
export class CustomerPagingComponent implements OnInit {
  inputPagingObj : any;
  constructor() { }

  ngOnInit() {
    
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/ucpaging/searchCustomer.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchCustomer.json";
    this.inputPagingObj.deleteUrl = AdInsConstant.DeleteAssetAccessory;
  }

}
