import { Component, OnInit } from '@angular/core';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { environment } from 'environments/environment';
import { URLConstant } from 'app/shared/constant/URLConstant';

@Component({
  selector: 'app-negative-asset-upload',
  templateUrl: './negative-asset-upload.component.html'
})

export class NegativeAssetUploadComponent implements OnInit {
  uploadObj: any;
  constructor() { }

  ngOnInit() {
    this.uploadObj = {
      title: 'Upload Negative Asset', // Title Paging dan Upload Page
      subsectionId: 'UcUploadFile', // Ga perlu diubah
      formatsAllowed: '.xls, .xlsx', // File yang bisa di upload
      UploadTypeCode: 'UPL_NAS', // UploadTypeCode berdasarkan keperluan
      ErrorDownloadUrl: URLConstant.GetUploadAssetNegativeByUploadMonitoringNoAndTrxType, // URL untuk Download Error File
      TemplateUrl: URLConstant.DownloadTemplate, // URL untuk Download Template File
      TemplateName: 'Upload_Negative_Asset_Template', // Nama Excel Template File
      FileErrorName: "Upload_Negative_Asset_ErrorDownload", // Nama Excel Download Error File
      // SheetName: 'TemplateGan',

      environmentUrl: environment.FoundationR3Url,
      apiQryPaging: URLConstant.GetPagingObjectBySQL,
      pagingJson: "./assets/ucpaging/searchNegativeAssetMonitoring.json",
      ddlEnvironments: [
        {
          name: "UMH.UPLOAD_STATUS",
          environment: environment.FoundationR3Url
        },
        {
          name: "UMH.OFFICE_CODE",
          environment: environment.FoundationR3Url
        }
      ],
      url: URLConstant.UploadFile
    }
  }
}

