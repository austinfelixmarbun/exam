import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';
import { URLConstant } from 'app/shared/constant/URLConstant';

@Component({
  selector: 'app-asset-document-master-paging',
  templateUrl: './asset-document-master-paging.component.html'
})
export class AssetDocumentMasterPagingComponent implements OnInit {
  inputPagingObj: UcPagingObj = new UcPagingObj();
  
  constructor() { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchAssetDocumentMaster.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = URLConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchAssetDocumentMaster.json";
    this.inputPagingObj.deleteUrl = URLConstant.DeleteRefAssetDocData;
  }
}
