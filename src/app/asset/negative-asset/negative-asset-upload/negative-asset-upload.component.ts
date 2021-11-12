import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { UcUploadObj } from 'app/shared/model/uc-upload-obj.model';

@Component({
  selector: 'app-negative-asset-upload',
  templateUrl: './negative-asset-upload.component.html'
})
export class NegativeAssetUploadComponent implements OnInit {
  uploadObj: UcUploadObj = new UcUploadObj();
  constructor() { }

  ngOnInit() {
    this.uploadObj.title = "Upload Negative Asset";
    this.uploadObj.UploadTypeCode = "UPL_NAS";
    this.uploadObj.ErrorDownloadUrl = URLConstant.GetUploadAssetNegativeByUploadMonitoringNoAndTrxType;
    this.uploadObj.TemplateName = "Upload_Negative_Asset_Template";
    this.uploadObj.FileErrorName = "Upload_Negative_Asset_ErrorDownload";
    this.uploadObj.pagingJson = "./assets/ucpaging/searchNegativeAssetMonitoring.json";
    if (!environment.isCore) {
      this.uploadObj.formatsAllowed = ".xls, .xlsx";
      this.uploadObj.url = URLConstant.UploadFile;
    }
  }
}