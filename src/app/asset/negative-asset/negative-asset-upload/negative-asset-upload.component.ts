import { Component, OnInit } from '@angular/core';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { environment } from 'environments/environment';

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
      ErrorDownloadUrl: AdInsConstant.GetUploadAssetNegativeByUploadMonitoringNoAndTrxType, // URL untuk Download Error File
      TemplateUrl: AdInsConstant.DownloadTemplate, // URL untuk Download Template File
      TemplateName: 'Upload_Negative_Asset_Template', // Nama Excel Template File
      FileErrorName: "Upload_Negative_Asset_ErrorDownload", // Nama Excel Download Error File
      // SheetName: 'TemplateGan',

      environmentUrl: environment.FoundationR3Url,
      apiQryPaging: AdInsConstant.GetPagingObjectBySQL,
      pagingJson: "./assets/ucpaging/searchNegativeAssetMonitoring.json",
      url: AdInsConstant.UploadFile
    }
  }
}

