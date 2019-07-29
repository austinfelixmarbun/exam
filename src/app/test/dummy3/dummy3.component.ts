import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'environments/environment';
import { RefBankObj } from 'app/shared/model/RefBankObj.Model';
import { UCSearchComponent } from '@adins/ucsearch';
import { UcgridfooterComponent } from '@adins/ucgridfooter';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { InputSearchObj } from 'app/shared/model/InputSearchObj.Model';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';

@Component({
  selector: 'app-dummy3',
  templateUrl: './dummy3.component.html',
  styleUrls: ['./dummy3.component.scss']
})
export class Dummy3Component implements OnInit {

  //** Start UC Search **//
  @ViewChild('search1') searchComponent1 : UCSearchComponent;
  @ViewChild('footer1') ucgridFooter1 : UcgridfooterComponent;
  @ViewChild('search2') searchComponent2 : UCSearchComponent;
  @ViewChild('footer2') ucgridFooter2: UcgridfooterComponent;
  inputObj1: any;
  inputObj2: any;
  //** End UC Search **//
  bankObj: RefBankObj;
  resultData1: string;
  resultData2: string;
  pageNow1: any;
  pageNow2: any;
  totalData1: any;
  totalData2: any;
  pageSize1: any;
  pageSize2: any;
  apiUrl1: any;
  apiUrl2: any;
  addCrit: CriteriaObj[];

  settingUrl: string = environment.settingUrl;
  orderByKey: any = null;
  orderByValue: boolean = true;

  constructor() { }

  ngOnInit() {
    console.log("dummy3");
    this.inputObj1 = new InputSearchObj();
    this.inputObj1._url = "./assets/search/searchBank.json";
    this.inputObj1.enviromentUrl = environment.settingUrl;
    this.inputObj1.apiQryPaging = AdInsConstant.GetBankPaging;

    this.inputObj2 = new InputSearchObj();
    this.inputObj2._url = "./assets/search/searchMaster.json";
    this.inputObj2.enviromentUrl = environment.settingUrl;
    this.inputObj2.apiQryPaging = AdInsConstant.GetRefMasterPaging;

    this.pageNow1 = 1;
    this.pageSize1 = 10;
    this.pageNow2 = 1;
    this.pageSize2 = 10;
    this.apiUrl1 = this.settingUrl + AdInsConstant.GetBankPaging;
    this.apiUrl2 = this.settingUrl + AdInsConstant.GetRefMasterPaging;
  }

  //** Start UC Search **/
  getResult1(event) {
    this.resultData1 = event.response.returnObject;
    this.totalData1 = event.response.returnObject.count;
    this.ucgridFooter1.pageNow = event.pageNow;
    this.ucgridFooter1.totalData = this.totalData1;
    this.ucgridFooter1.resultData = this.resultData1;
  }

  onSelect1(event) {
    this.pageNow1 = event.pageNow;
    this.pageSize1 = event.pageSize;
    this.searchPagination1(this.pageNow1);
  }

  searchSort1(event: any) {
    if (this.orderByKey == event.target.attributes.name.nodeValue) {
      this.orderByValue = !this.orderByValue
    } else {
      this.orderByValue = true
    }
    this.orderByKey = event.target.attributes.name.nodeValue
    var order = {
      key: this.orderByKey,
      value: this.orderByValue
    }
    this.searchComponent1.search(this.apiUrl1, this.pageNow1, this.pageSize1, order);
  }

  searchPagination1(event: number) {
    this.pageNow1 = event;
    var order = null;
    if (this.orderByKey != null) {
      order = {
        key: this.orderByKey,
        value: this.orderByValue
      }
    }
    this.searchComponent1.search(this.apiUrl1, this.pageNow1, this.pageSize1, order);
  }
  //** End UC Search **/
  
  //** Start UC Search **/
  getResult2(event) {
    this.resultData2 = event.response.returnObject;
    this.totalData2 = event.response.returnObject.count;
    this.ucgridFooter2.pageNow = event.pageNow;
    this.ucgridFooter2.totalData = this.totalData2;
    this.ucgridFooter2.resultData = this.resultData2;
  }

  onSelect2(event) {
    this.pageNow2 = event.pageNow;
    this.pageSize2 = event.pageSize;
    this.searchPagination2(this.pageNow2);
  }

  searchSort2(event: any) {
    if (this.orderByKey == event.target.attributes.name.nodeValue) {
      this.orderByValue = !this.orderByValue
    } else {
      this.orderByValue = true
    }
    this.orderByKey = event.target.attributes.name.nodeValue
    var order = {
      key: this.orderByKey,
      value: this.orderByValue
    }
    this.searchComponent2.search(this.apiUrl2, this.pageNow2, this.pageSize2, order, this.addCrit);
  }

  searchPagination2(event: number) {
    this.pageNow2 = event;

    var order = null;
    if (this.orderByKey != null) {
      order = {
        key: this.orderByKey,
        value: this.orderByValue
      }
    }
    this.searchComponent2.search(this.apiUrl2, this.pageNow2, this.pageSize2, order, this.addCrit);
  }
  //** End UC Search **/

}
