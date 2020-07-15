import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';

@Component({
  selector: 'app-asset-scheme-paging',
  templateUrl: './asset-scheme-paging.component.html'
})
export class AssetSchemePagingComponent implements OnInit {
  inputPagingObj: UcPagingObj = new UcPagingObj();
  constructor() { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchAssetScheme.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = URLConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchAssetScheme.json";
    this.inputPagingObj.ddlEnvironments = [
      {
        name: "ATH.ASSET_TYPE_ID",
        environment: environment.FoundationR3Url
      }
    ];
  }
}
