import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';

@Component({
  selector: 'app-asset-document-master-paging',
  templateUrl: './asset-document-master-paging.component.html',
  styleUrls: ['./asset-document-master-paging.component.scss'],

})
export class AssetDocumentMasterPagingComponent implements OnInit {
  inputPagingObj: any;
  constructor() { }

  ngOnInit() {
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/ucpaging/searchAssetDocumentMaster.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchAssetDocumentMaster.json";
    this.inputPagingObj.deleteUrl = AdInsConstant.DeleteRefAssetDocData;

  }

}
