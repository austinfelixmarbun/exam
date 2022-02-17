import { Component, OnInit } from '@angular/core';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';

@Component({
  selector: 'app-customer-family-menu',
  templateUrl: './customer-family-menu.component.html',
  styles: []
})
export class CustomerFamilyMenuComponent implements OnInit {
  inputPagingObj: UcPagingObj = new UcPagingObj();

  constructor(private UrlConstantNew: UrlConstantNew) { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchCustFamily.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchCustFamily.json";
    this.inputPagingObj.deleteUrl = this.UrlConstantNew.DeleteAssetAccessory;
  }

}
