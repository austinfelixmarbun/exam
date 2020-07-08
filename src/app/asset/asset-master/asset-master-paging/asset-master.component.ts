import { Component, OnInit } from '@angular/core';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { environment } from 'environments/environment';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';

@Component({
  selector: 'app-asset-master',
  templateUrl: './asset-master.component.html'
})
export class AssetMasterComponent implements OnInit {

  inputPagingObj: UcPagingObj = new UcPagingObj();

  constructor() { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchAssetMaster.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchAssetMaster.json";
    this.inputPagingObj.deleteUrl = AdInsConstant.DeleteAssetMaster;
    this.inputPagingObj.ddlEnvironments = [
      {
        name: "ATH.ASSET_TYPE_CODE",
        environment: environment.FoundationR3Url
      },
      {
        name: "AC.ASSET_CATEGORY_ID",
        environment: environment.FoundationR3Url
      }
    ];
  }
}
