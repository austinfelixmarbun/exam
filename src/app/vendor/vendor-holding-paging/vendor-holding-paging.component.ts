import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vendor-holding-paging',
  templateUrl: './vendor-holding-paging.component.html',
  styleUrls: ['./vendor-holding-paging.component.scss']
})
export class VendorHoldingPagingComponent implements OnInit {
  inputPagingObj: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/ucpaging/searchVendorHolding.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchVendorHolding.json";
    this.inputPagingObj.deleteUrl = "/Vendor/DeleteVendor";
    this.inputPagingObj.addCritInput = new Array();
  }

}
