import { Component, OnInit } from '@angular/core';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-customer-shareholder-menu',
  templateUrl: './customer-shareholder-menu.component.html',
  styles: []
})
export class CustomerShareholderMenuComponent implements OnInit {
  inputPagingObj: UcPagingObj = new UcPagingObj();

  constructor() { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchCustShareholder.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchCustShareholder.json";
    this.inputPagingObj.deleteUrl = URLConstant.DeleteAssetAccessory;
  }

}
