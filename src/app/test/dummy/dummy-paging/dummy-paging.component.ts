import { Component, OnInit, ViewChild } from '@angular/core';
import { UCSearchComponent } from '@adins/ucsearch';
import { UcgridfooterComponent } from '@adins/ucgridfooter';
import { environment } from 'environments/environment';
import { InputSearchObj } from 'app/shared/model/InputSearchObj.Model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dummy-paging',
  templateUrl: './dummy-paging.component.html',
  styleUrls: ['./dummy-paging.component.scss']
})
export class DummyPagingComponent implements OnInit {

  //** Start UC Search **//
  @ViewChild(UCSearchComponent) searchComponent;
  @ViewChild(UcgridfooterComponent) ucgridFooter;
  inputObj: any;
  //** End UC Search **//
  pageNow: any = 1;
  pageSize: any = 10;
  totalData: any;
  resultData: any;

  apiUrl: any;
  settingUrl: string = environment.settingUrl;
  orderByKey: any = null;
  orderByValue: boolean = true;

  pagingJson: any;
  gridPaging: any;
  headerList: any;
  bodyList: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.inputObj = new InputSearchObj();
    this.inputObj._url = "./assets/search/searchBank.json";
    this.inputObj.enviromentUrl = environment.settingUrl;
    this.inputObj.apiQryPaging = AdInsConstant.GetBankPaging;

    this.apiUrl = this.settingUrl + AdInsConstant.GetBankPaging;
    this.pagingJson = "./assets/form-setting/dummyPaging.json"
    this.initiateForm();
  }

  initiateForm() {
    this.getJSON(this.pagingJson).subscribe(data => {
      console.log(data);
      this.headerList = data.headerList;
      this.bodyList = data.bodyList;

    })
  }
  public getJSON(url: string): Observable<any> {
    return this.http.get(url);
  }

  //** Start UC Search **/
  getResult(event) {
    this.resultData = event.response.returnObject;
    this.totalData = event.response.returnObject.count;
    this.ucgridFooter.pageNow = event.pageNow;
    this.ucgridFooter.totalData = this.totalData;
    this.ucgridFooter.resultData = this.resultData;
  }

  // genBody(item, property) {
  //   return item[property];
  // }

  genAction(item, param) {
    var arrList = {};

    for (var i = 0; i < param.length; i++) {
      if (param[i].type == "mode") {
        arrList[param[i].type] = param[i].property;
      } else {
        arrList[param[i].type] = item[param[i].property];
      }
    }
    return arrList;
  }

  onSelect(event) {
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

  delete(refBankId: any) {
    if (confirm("Are you sure to delete this record?")) {
      // this.deleteUrl = this.settingUrl + AdInsConstant.DeleteRefBank;
      // this.bankObj = new RefBankObj();
      // this.bankObj.refBankId = refBankId;
      // this.http.post(this.deleteUrl, this.bankObj).subscribe(
      //   (response) => {
      //     this.toastr.successMessage(response['message']);
      //     this.searchPagination(1);
      //   },
      //   (error) => {
      //     console.log(error);
      //   });
    }
  }
  //** End UC Search **/
}
