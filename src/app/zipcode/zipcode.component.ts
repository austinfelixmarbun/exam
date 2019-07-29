import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { HttpClient } from '@angular/common/http';
import { RefZipcodeObj } from 'app/shared/model/RefZipcodeObj.Model';
import { UcgridfooterComponent } from '@adins/ucgridfooter';
import { UCSearchComponent } from '@adins/ucsearch';
import { DecimalPipe } from '@angular/common';
import { InputSearchObj } from 'app/shared/model/InputSearchObj.Model';

@Component({
  selector: 'app-zipcode',
  templateUrl: './zipcode.component.html',
  styleUrls: ['./zipcode.component.scss'],
  providers: [NgbPaginationConfig, DecimalPipe]
})
export class ZipcodeComponent implements OnInit {

  @ViewChild(UCSearchComponent) searchComponent;
  @ViewChild(UcgridfooterComponent) ucgridFooter;
  inputObj: any;
  editUrl: any;
  zipcodeObj: RefZipcodeObj;
  resultData: any;
  pageNow: any;
  totalData: any;
  pageSize: any;
  apiUrl: any;
  settingUrl: any = environment.settingUrl;
  orderByKey: any = null;
  orderByValue: boolean = true;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.inputObj = new InputSearchObj();
    this.inputObj._url = "./assets/search/searchRefZipcode.json";
    this.inputObj.enviromentUrl = environment.settingUrl;
    this.inputObj.apiQryPaging = AdInsConstant.GetRefZipcodePaging;
    
    this.pageNow = 1;
    this.pageSize = 10;
    this.apiUrl = this.settingUrl + AdInsConstant.GetRefZipcodePaging;
    // this.adInsService.postData(this.settingUrl + AdInsConstant.GetListOffice, null)
    //   .subscribe(data => {
    //     console.log(data);
    //   }
    //   )
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

  delete(refZipcodeId: any) {
    if(confirm("Are you sure to delete this record?")) {
      this.editUrl = this.settingUrl + AdInsConstant.DeleteRefZipcode;
      this.zipcodeObj = new RefZipcodeObj();
      this.zipcodeObj.refZipcodeId = refZipcodeId;
      this.http.post(this.editUrl, this.zipcodeObj).subscribe(
        (response) => {
          console.log(response);
        });
    }
  }

  reset(){
    this.searchComponent.initiateForm();
  }
}
