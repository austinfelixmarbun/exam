import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';

@Component({
  selector: 'app-asset-type-paging',
  templateUrl: './asset-type-paging.component.html'
})
export class AssetTypePagingComponent implements OnInit {
  inputPagingObj: UcPagingObj = new UcPagingObj();

  constructor() { }
  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchAssetType.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = URLConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchAssetType.json";
    this.inputPagingObj.deleteUrl = URLConstant.DeleteAssetType;
  }
}
