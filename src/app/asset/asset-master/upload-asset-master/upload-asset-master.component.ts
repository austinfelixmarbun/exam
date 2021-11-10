import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { UcUploadObj } from 'app/shared/model/uc-upload-obj.model';

@Component({
  selector: 'app-upload-asset-master',
  templateUrl: './upload-asset-master.component.html'
})
export class UploadAssetMasterComponent implements OnInit {
  uploadObj: UcUploadObj = new UcUploadObj();
  constructor() { }

  ngOnInit() {
    this.uploadObj.title = "Upload Asset Master";
    this.uploadObj.subsectionId = "UcUploadFile";
    this.uploadObj.UploadTypeCode = "UPL_ASM";
    this.uploadObj.ErrorDownloadUrl = URLConstant.GetUploadAssetMasterByUploadMonitoringNoAndTrxType;
    this.uploadObj.TemplateUrl = URLConstant.DownloadTemplate;
    this.uploadObj.TemplateName = "Upload_Asset_Master_Template";
    this.uploadObj.FileErrorName = "Upload_Asset_Master_ErrorDownload";
    this.uploadObj.environmentUrl = environment.FoundationR3Url + "/v1";
    this.uploadObj.apiQryPaging = URLConstant.GetPagingObjectBySQL;
    this.uploadObj.pagingJson = "./assets/ucpaging/searchAssetMasterMonitoring.json";
    if (!environment.isCore) {
      this.uploadObj.formatsAllowed = ".xls, .xlsx";
      this.uploadObj.url = URLConstant.UploadFile;
    }
    else {
      this.uploadObj.formatsAllowed = ".xls, .xlsx, .txt, .TXT";
      this.uploadObj.url = URLConstant.UploadFileV2;
    }
  }
}
