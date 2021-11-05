import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { environment } from 'environments/environment';
import { NavigationConstant } from 'app/shared/NavigationConstant';


@Component({
  selector: 'app-vendor-group-paging',
  templateUrl: './vendor-group-paging.component.html'
})
export class VendorGroupPagingComponent implements OnInit {

  readonly AddLink: string = NavigationConstant.VENDOR_GRP_ADD;
  constructor() { }
  inputPagingObj: UcPagingObj = new UcPagingObj();

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchVendorGroup.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchVendorGroup.json";
  }

}
