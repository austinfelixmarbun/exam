import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-asset-type-paging',
  templateUrl: './asset-type-paging.component.html'
})
export class AssetTypePagingComponent implements OnInit {
  inputPagingObj: UcPagingObj = new UcPagingObj();

  readonly AddLink: string = NavigationConstant.ASSET_TYPE_DETAIL;
  constructor() { }
  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchAssetType.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchAssetType.json";
  }
}
