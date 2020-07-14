import { Component, OnInit } from '@angular/core';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { environment } from 'environments/environment';
import { URLConstant } from 'app/shared/constant/URLConstant';

@Component({
  selector: 'app-upload-asset-master',
  templateUrl: './upload-asset-master.component.html'
})
export class UploadAssetMasterComponent implements OnInit {
  uploadObj: Object;
  constructor() { }

  ngOnInit() {
    this.uploadObj = {
      title: 'Upload Asset Master', // Title Paging dan Upload Page
      subsectionId: 'UcUploadFile', // Ga perlu diubah
      formatsAllowed: '.xls, .xlsx', // File yang bisa di upload
      UploadTypeCode: 'UPL_ASM', // UploadTypeCode berdasarkan keperluan
      ErrorDownloadUrl: URLConstant.GetUploadAssetMasterByUploadMonitoringNoAndTrxType, // URL untuk Download Error File
      TemplateUrl: URLConstant.DownloadTemplate, // URL untuk Download Template File
      TemplateName: 'Upload_Asset_Master_Template', // Nama Excel Template File
      FileErrorName: "Upload_Asset_Master_ErrorDownload", // Nama Excel Download Error File

      environmentUrl: environment.FoundationR3Url,
      apiQryPaging: URLConstant.GetPagingObjectBySQL,
      pagingJson: "./assets/ucpaging/searchAssetMasterMonitoring.json",
      url: URLConstant.UploadFile,
      ddlEnvironments: [
        {
          name: "UMH.OFFICE_CODE",
          environment: environment.FoundationR3Url
        },
        {
          name: "UMH.UPLOAD_STATUS",
          environment: environment.FoundationR3Url
        }
      ]
    }
  }
}
