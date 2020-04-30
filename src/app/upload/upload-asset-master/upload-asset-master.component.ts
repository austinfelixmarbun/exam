import { Component, OnInit } from '@angular/core';
import { UcUploadObj } from 'app/shared/model/UcUploadObj.Model';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';

@Component({
  selector: 'app-upload-asset-master',
  templateUrl: './upload-asset-master.component.html',
  styleUrls: ['./upload-asset-master.component.scss']
})
export class UploadAssetMasterComponent implements OnInit {
  uploadInputObj: UcUploadObj;
  uploadUrl: any;

  constructor() { }

  ngOnInit() {
    this.uploadUrl = AdInsConstant.UploadFile;
    this.uploadInputObj = new UcUploadObj();
    this.uploadInputObj.title = "UPLOAD ASSET MASTER";
    this.uploadInputObj.subsectionId = "UcUploadFile";
    this.uploadInputObj.environmentUrl = environment.FoundationR3Url;
    this.uploadInputObj.formatsAllowed = '.txt, .xls, .xlsx, .csv';
    this.uploadInputObj.searchUploadName = 'searchUploadMaster';
    this.uploadInputObj.pagingJson = 'assets/search/searchUploadMaster.json';
    this.uploadInputObj.url = this.uploadUrl;
    this.uploadInputObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;

    
  }
}
