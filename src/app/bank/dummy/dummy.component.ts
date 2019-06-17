import { Component, OnInit, ViewChild } from '@angular/core';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { environment } from 'environments/environment';
import { SearchComponent } from 'app/shared/search/search.component';
import { UCGridFooterComponent } from 'app/shared/UserControl/ucgrid-footer/ucgrid-footer.component';

@Component({
  selector: 'app-dummy',
  templateUrl: './dummy.component.html',
  styleUrls: ['./dummy.component.scss']
})
export class DummyComponent implements OnInit {

  @ViewChild(SearchComponent) searchComponent;
  @ViewChild(UCGridFooterComponent) ucgridFooter;
  urlQryPaging : string = AdInsConstant.GetBankPaging;
  urlEnviPaging : string = environment.settingUrl;

  urlJson: string = "./assets/search/searchDummy.json";
  resultData: string;
  pageNow: any;
  totalData: any;
  pageSize: any;
  apiUrl: any;

  settingUrl: string = environment.settingUrl;
  orderByKey: any = null;
  orderByValue: boolean = true;
  
  constructor() { }

  ngOnInit() {
    this.apiUrl = this.settingUrl + AdInsConstant.GetBankPaging;
  }

  getResult(event){
    this.resultData = event.response.returnObject;
    this.totalData = event.response.returnObject.count;
    this.ucgridFooter.pageNow = event.pageNow;
    this.ucgridFooter.totalData = this.totalData;
    this.ucgridFooter.resultData = this.resultData;
  }

  onSelect(event)
  {
    this.pageNow = event.pageNow;
    this.pageSize = event.pageSize;
    this.searchPagination(this.pageNow);
  }

  searchSort(event: any) {
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
    this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order);
  }

  searchPagination(event: number) {
    this.pageNow = event;
    var order = null;
    if (this.orderByKey != null) {
      order = {
        key: this.orderByKey,
        value: this.orderByValue
      }
    }
    this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order);
  }
  
  onChangeType(type: any) {
    console.log(type);
    if (type == 1) {
      this.urlJson = "./assets/search/searchDummy.json";
    } else if (type == 2) {
      this.urlJson = "./assets/search/searchOffice.json";
    } else if (type == 3) {
      this.urlJson = "./assets/search/searchBank.json";
    }
    this.searchComponent.initiateForm();
  }
}
