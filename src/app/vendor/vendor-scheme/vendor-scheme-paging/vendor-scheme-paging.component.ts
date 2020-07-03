import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';

@Component({
  selector: 'app-vendor-scheme-paging',
  templateUrl: './vendor-scheme-paging.component.html'
})
export class VendorSchemePagingComponent implements OnInit {
  inputPagingObj: any;

  ngOnInit() {
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/ucpaging/searchVendorScheme.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchVendorScheme.json";
    this.inputPagingObj.ddlEnvironments = [
      {
        name: "vs.MR_VENDOR_CATEGORY_CODE",
        environment: environment.FoundationR3Url
      }
    ];
  }

}
