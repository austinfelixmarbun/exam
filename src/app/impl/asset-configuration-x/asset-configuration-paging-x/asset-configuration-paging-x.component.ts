import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';

@Component({
  selector: 'app-asset-configuration-paging-x',
  templateUrl: './asset-configuration-paging-x.component.html',
})
export class AssetConfigurationPagingXComponent implements OnInit {

  inputPagingObj: UcPagingObj = new UcPagingObj(this.UrlConstantNew);

  constructor(private UrlConstantNew: UrlConstantNew) { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchAssetConfiguration.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchAssetConfiguration.json";
  }

}
