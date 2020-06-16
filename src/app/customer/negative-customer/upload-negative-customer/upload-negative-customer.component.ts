import { Component, OnInit } from '@angular/core';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-upload-negative-customer',
  templateUrl: './upload-negative-customer.component.html',
})
export class UploadNegativeCustomerComponent implements OnInit {
  uploadObj: Object;
  constructor() { }

  ngOnInit() {
    this.uploadObj = {
      title: 'Upload Negative Customer', 
      subsectionId: 'UcUploadFile', 
      formatsAllowed: '.xls, .xlsx', 
      UploadTypeCode: 'UPL_NEG_CUST', 
      ErrorDownloadUrl: AdInsConstant.GetUploadNegativeCustomerByUploadMonitoringNoAndTrxType, 
      TemplateUrl: AdInsConstant.DownloadTemplate, 
      TemplateName: 'Upload_Negative_Customer_Template', 
      FileErrorName: "Upload_Negative_Customer_ErrorDownload", 
      environmentUrl: environment.FoundationR3Url,
      apiQryPaging: AdInsConstant.GetPagingObjectBySQL,
      pagingJson: "./assets/ucpaging/searchNegativeCustomerMonitoring.json",
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
      url: AdInsConstant.UploadFile
    }
  }
}
