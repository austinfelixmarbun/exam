import { Component, OnInit } from '@angular/core';
import { UcPagingObj, WhereValueObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-vendor-ho-paging',
  templateUrl: './vendor-ho-paging.component.html'
})
export class VendorHoPagingComponent implements OnInit {
  inputPagingObj: UcPagingObj = new UcPagingObj();

  readonly AddLink: string = NavigationConstant.VENDOR_HO_DETAIL;
  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchVendorHO.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchVendorHO.json";
    this.inputPagingObj.ddlEnvironments = [
      {
        name: "V.MR_VENDOR_CATEGORY_CODE",
        environment: environment.FoundationR3Url
      }
    ];
    var WVAddrTypeObj = new WhereValueObj();
    WVAddrTypeObj.property = "AddrType";
    WVAddrTypeObj.value = CommonConstant.AddrTypeTax;
    this.inputPagingObj.whereValue.push(WVAddrTypeObj);
    
    var WVendorClassObj = new WhereValueObj();
    WVendorClassObj.property = "VendorClass";
    WVendorClassObj.value = CommonConstant.HeadOffice;
    this.inputPagingObj.whereValue.push(WVendorClassObj);
  }
}
