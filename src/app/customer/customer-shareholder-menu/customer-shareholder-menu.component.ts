import { Component, OnInit } from '@angular/core';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';

@Component({
  selector: 'app-customer-shareholder-menu',
  templateUrl: './customer-shareholder-menu.component.html',
  styles: []
})
export class CustomerShareholderMenuComponent implements OnInit {
  inputPagingObj: UcPagingObj = new UcPagingObj();

  constructor(private UrlConstantNew: UrlConstantNew) { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchCustShareholder.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchCustShareholder.json";
    this.inputPagingObj.deleteUrl = this.UrlConstantNew.DeleteAssetAccessory;
  }

}
