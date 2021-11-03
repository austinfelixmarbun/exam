import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-asset-scheme-paging',
  templateUrl: './asset-scheme-paging.component.html'
})
export class AssetSchemePagingComponent implements OnInit {
  inputPagingObj: UcPagingObj = new UcPagingObj();
  readonly AddLink: string = NavigationConstant.ASSET_SCHM_INFO_DETAIL;
  constructor() { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchAssetScheme.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchAssetScheme.json";
  }
}
