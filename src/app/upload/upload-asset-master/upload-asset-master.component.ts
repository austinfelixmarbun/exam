import { Component, OnInit } from '@angular/core';
import { UcUploadObj } from 'app/shared/model/UcUploadObj.Model';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-upload-asset-master',
  templateUrl: './upload-asset-master.component.html',
  styleUrls: ['./upload-asset-master.component.scss']
})
export class UploadAssetMasterComponent implements OnInit {
  uploadInputObj: UcUploadObj;

  constructor() { }

  ngOnInit() {
    this.uploadInputObj = new UcUploadObj();
    // this.uploadInputObj.title = "UPLOAD ASSET MASTER";
    this.uploadInputObj.subsectionId = "uploadId";
    this.uploadInputObj.environmentUrl = environment.FoundationR3Url;
    this.uploadInputObj.formatsAllowed = '.txt, .xls, .xlsx, .csv';
    this.uploadInputObj.searchUploadName = 'searchUploadMaster';
    this.uploadInputObj.pagingJson = 'assets/ucupload/searchUploadMaster.json';

    // searchUploadName: 'searchTestUpload',
    // pagingJson: "./assets/search/searchTestUpload.json",
    // this.uploadInputObj.searchUploadName = 'searchUploadMaster';
    // - environmentUrl  : environment Url, not mandatory, default: 'http://R3App-Server/Foundation'
    // - apiQryPaging    : Upload Monitoring Paging Url, not mandatory, default: '/UploadMonitoring/GetUploadMonitoringPaging'
    // - searchUploadName: Your searchUpload.json name without '.json'. ex: 'searchUploadGenericPaging' 
    // - title           : Title of page and Subsection
    // - subsectionId    : Id of the subsection
    // - formatsAllowed  : .txt, .xls, .xlsx, .csv
    // - url             : Full url of Backend Upload API ex: Environment Url + Url Constant
  }

}
