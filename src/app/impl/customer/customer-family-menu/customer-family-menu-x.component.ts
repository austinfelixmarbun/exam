import { Component, OnInit } from '@angular/core';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';

@Component({
  selector: 'app-customer-family-menu-x',
  templateUrl: './customer-family-menu-x.component.html'
})
export class CustomerFamilyMenuXComponent implements OnInit {
  inputPagingObj: UcPagingObj = new UcPagingObj();

  constructor() { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchCustFamily.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchCustFamily.json";
    this.inputPagingObj.deleteUrl = URLConstant.DeleteAssetAccessory;
  }


}
