import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';

@Component({
  selector: 'app-asset-configuration-paging',
  templateUrl: './asset-configuration-paging.component.html',
  styleUrls: ['./asset-configuration-paging.component.scss']
})
export class AssetConfigurationPagingComponent implements OnInit {

  constructor() { }
  inputPagingObj: any;
  ngOnInit() {
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/ucpaging/searchAssetConfiguration.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchAssetConfiguration.json";
    this.inputPagingObj.deleteUrl = AdInsConstant.DeleteRefEconomicSector;
  }
}
