import { Component, OnInit } from '@angular/core';
import { UcPagingObj, WhereValueObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';
import { ActivatedRoute } from '@angular/router';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-vendor-holding-paging',
  templateUrl: './vendor-holding-paging.component.html'
})
export class VendorHoldingPagingComponent implements OnInit {
  inputPagingObj: UcPagingObj = new UcPagingObj();
  arrCrit: any;

  readonly AddLink: string = NavigationConstant.VENDOR_HOLDING_DETAIL;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchVendorHolding.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchVendorHolding.json";
    this.inputPagingObj.ddlEnvironments = [
      {
        name: "V.MR_VENDOR_CATEGORY_CODE",
        environment: environment.FoundationR3Url
      }
    ];

    var WVendorClassObj = new WhereValueObj();
    WVendorClassObj.property = "VendorClass";
    WVendorClassObj.value = "HOLDING";
    this.inputPagingObj.whereValue.push(WVendorClassObj);
  }

}
