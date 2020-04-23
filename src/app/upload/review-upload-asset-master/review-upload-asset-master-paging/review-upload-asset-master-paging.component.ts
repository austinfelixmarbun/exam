import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';

@Component({
  selector: 'app-review-upload-asset-master-paging',
  templateUrl: './review-upload-asset-master-paging.component.html',
  styleUrls: ['./review-upload-asset-master-paging.component.scss']
})
export class ReviewUploadAssetMasterPagingComponent implements OnInit {
  inputPagingObj: UcPagingObj;
  constructor(){}
  ngOnInit() {
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/ucpaging/searchReviewUploadAssetMaster.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchReviewUploadAssetMaster.json";
  }

}