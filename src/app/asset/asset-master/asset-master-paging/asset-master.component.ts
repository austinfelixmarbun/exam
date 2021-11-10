import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-asset-master',
  templateUrl: './asset-master.component.html'
})
export class AssetMasterComponent implements OnInit {

  inputPagingObj: UcPagingObj = new UcPagingObj();

  readonly AddLink: string = NavigationConstant.ASSET_MASTER_DETAIL;
  constructor() { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchAssetMaster.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchAssetMaster.json";
  }
}
