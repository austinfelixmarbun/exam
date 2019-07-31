import { Component, OnInit, ViewChild } from '@angular/core';
import { InputSearchObj } from 'app/shared/model/InputSearchObj.Model';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UCSearchComponent } from '@adins/ucsearch';
import { UcgridfooterComponent } from '@adins/ucgridfooter';
import { InputGridObj } from 'app/shared/model/inputGridObj.Model';

@Component({
  selector: 'app-test-paging',
  templateUrl: './test-paging.component.html',
  styleUrls: ['./test-paging.component.scss']
})
export class TestPagingComponent implements OnInit {

  //** Start UC Search **//
  @ViewChild(UCSearchComponent) searchComponent;
  @ViewChild(UcgridfooterComponent) ucgridFooter;
  inputObj: any;
  gridObj: any;
  //** End UC Search **//

  apiUrl: any;
  settingUrl: string = environment.settingUrl;
  pageNow: any = 1;
  pageSize: any = 10;
  totalData: any;
  resultData: any;
  orderByKey: any = null;
  orderByValue: boolean = true;
  
  constructor() { }

  ngOnInit() {
    this.apiUrl = this.settingUrl + AdInsConstant.GetBankPaging;

    this.gridObj = new InputGridObj();
    this.gridObj.apiUrl = this.apiUrl;
    this.gridObj.pageNow = this.pageNow;
    this.gridObj.pageSize = this.pageSize;
    this.gridObj.searchComp = this.searchComponent;

    this.inputObj = new InputSearchObj();
    this.inputObj._url = "./assets/search/searchBank.json";
    this.inputObj.enviromentUrl = environment.settingUrl;
    this.inputObj.apiQryPaging = AdInsConstant.GetBankPaging;
    
  }

  //** Start UC Search **/
  getResult(event) {
    this.gridObj.resultData = event.response.returnObject;
    this.totalData = event.response.returnObject.count;
    this.ucgridFooter.pageNow = event.pageNow;
    this.ucgridFooter.totalData = this.totalData;
    this.ucgridFooter.resultData = this.gridObj.resultData;
  }

  getOutput(event) {
    this.orderByKey = event.orderByKey;
    this.orderByValue = event.orderByValue;
  }

  onSelect(event) {
    this.pageNow = event.pageNow;
    this.pageSize = event.pageSize;
    this.gridObj.pageNow = event.pageNow;
    this.gridObj.pageSize = event.pageSize;
    this.searchPagination(this.pageNow);
  }

  searchPagination(event: number) {
    this.pageNow = event;
    this.gridObj.pageNow = event;
    var order = null;
    if (this.orderByKey != null) {
      order = {
        key: this.orderByKey,
        value: this.orderByValue
      }
    }
    this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order);
  }


  // genBody(item, property) {
  //   return item[property];
  // }
}
