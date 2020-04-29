import { Component, OnInit, ViewChild } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { InputSearchObj } from 'app/shared/model/InputSearchObj.Model';
import { UcgridfooterComponent } from '@adins/ucgridfooter';
import { UCSearchComponent } from '@adins/ucsearch';

@Component({
  selector: 'app-upload-monitoring-asset-master',
  templateUrl: './upload-monitoring-asset-master.component.html',
  styleUrls: ['./upload-monitoring-asset-master.component.scss']
})
export class UploadMonitoringAssetMasterComponent implements OnInit {
  @ViewChild(UcgridfooterComponent) ucgridFooter;
  @ViewChild(UCSearchComponent) UCSearchComponent;
  inputPagingObj: UcPagingObj;
  inputObj: any;
  resultData = new Array();
  totalData: any;
  pageNow: any;
  pageSize: any;
  orderByKey: any;
  orderByValue: any;
  apiUrl: any;

  constructor() { }

  ngOnInit() {
    console.log('test');
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/search/searchUploadMonitoringAssetMaster.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/search/searchUploadMonitoringAssetMaster.json";
  }
  download(ev){
    console.log('masuk download');
  }
}
