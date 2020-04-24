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
    // this.inputPagingObj.deleteUrl = AdInsConstant.DeleteAssetType;

    // this.inputObj = new InputSearchObj();
    // this.inputObj._url = "./assets/search/searchUploadMonitoringAssetMaster.json";
    // this.inputObj.enviromentUrl = environment.FoundationR3Url;
    // this.inputObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;
    // this.inputObj.addCritInput = new Array();
  }

  // getResult(event) {
  //   console.log(this.resultData);
  //   this.resultData = event.response.Data;
  //   this.totalData = event.response.Count;
  //   this.ucgridFooter.pageNow = event.pageNow;
  //   this.ucgridFooter.totalData = this.totalData;
  //   this.ucgridFooter.resultData = this.resultData;
  // }
  download(ev){
    console.log('masuk download');
  }
  // searchPagination(event: number) {
  //   this.pageNow = event;
  //   let order = null;
  //   if (this.orderByKey != null) {
  //     order = {
  //       key: this.orderByKey,
  //       value: this.orderByValue
  //     }
  //   }
  //   this.UCSearchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order)
  // }
  // onSelect(event) {
  //   this.pageNow = event.pageNow;
  //   this.pageSize = event.pageSize;
  //   this.searchPagination(this.pageNow);
  //   this.totalData = event.Count;
  // }

  
}
