import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { URLConstant } from 'app/shared/constant/URLConstant';

@Component({
  selector: 'app-asset-configuration-paging',
  templateUrl: './asset-configuration-paging.component.html'
})
export class AssetConfigurationPagingComponent implements OnInit {
  inputPagingObj: UcPagingObj = new UcPagingObj();

  constructor() { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchAssetConfiguration.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchAssetConfiguration.json";
  }
}
