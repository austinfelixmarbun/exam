import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';


@Component({
  selector: 'app-vendor-group-paging',
  templateUrl: './vendor-group-paging.component.html',
  styleUrls: ['./vendor-group-paging.component.scss']
})
export class VendorGroupPagingComponent implements OnInit {

  constructor() { }
  inputPagingObj: any;

  ngOnInit() {
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/ucpaging/searchVendorGroup.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchVendorGroup.json";

    this.inputPagingObj.ddlEnvironments = [
      {
        name: "A.MR_VENDOR_CATEGORY_CODE",
        environment: environment.FoundationR3Url
      }
    ];
  }

}
