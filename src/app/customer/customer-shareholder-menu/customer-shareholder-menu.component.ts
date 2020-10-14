import { UcPagingObj } from '@adins/ucpaging/lib/model/UcPagingObj.Model';
import { Component, OnInit } from '@angular/core';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-customer-shareholder-menu',
  templateUrl: './customer-shareholder-menu.component.html',
  styles: []
})
export class CustomerShareholderMenuComponent implements OnInit {
  inputPagingObj: UcPagingObj;

  constructor() { }

  ngOnInit() {
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/ucpaging/searchCustShareholder.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = URLConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchCustShareholder.json";
    this.inputPagingObj.deleteUrl = URLConstant.DeleteAssetAccessory;
    this.inputPagingObj.ddlEnvironments = [
      {
        name: "CS.MR_CUST_TYPE_CODE",
        environment: environment.FoundationR3Url
      }
    ];
  }

}
