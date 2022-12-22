import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';

@Component({
  selector: 'app-mapping-asset-usage-paging',
  templateUrl: './mapping-asset-usage-paging.component.html',
  styleUrls: ['./mapping-asset-usage-paging.component.css']
})
export class MappingAssetUsagePagingComponent implements OnInit {

  inputPagingObj: UcPagingObj = new UcPagingObj();

  constructor() { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchMappingAssetUsage.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchMappingAssetUsage.json";
  }

}
