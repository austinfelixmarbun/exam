import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { RefFormObj } from 'app/shared/model/RefFormObj.Model';
import { UcgridfooterComponent } from '@adins/ucgridfooter';
import { UCSearchComponent } from '@adins/ucsearch';
import { DecimalPipe } from '@angular/common';
import { InputSearchObj } from 'app/shared/model/InputSearchObj.Model';

@Component({
  selector: 'menu-setting',
  templateUrl: './menu-setting.component.html',
  providers: [NgbPaginationConfig, NGXToastrService, DecimalPipe]
})
export class MenuSettingComponent implements OnInit {

  @ViewChild(UCSearchComponent) searchComponent;
  @ViewChild(UcgridfooterComponent) ucgridFooter;
  inputObj: any;
  resultData: any;
  pageNow: any;
  totalData: any;
  pageSize: any;
  apiUrl: any;
  orderByKey: any = null;
  orderByValue: boolean = true;
  editUrl: any;

  foundationUrl: any = environment.foundationUrl;
  refCoyId: any;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.inputObj = new InputSearchObj();
    this.inputObj._url = "./assets/search/searchRefForm.json";
    this.inputObj.enviromentUrl = environment.foundationUrl;
    this.inputObj.apiQryPaging = AdInsConstant.GetRefFormPaging;

    this.pageNow = 1;
    this.pageSize = 10;
    this.apiUrl = this.foundationUrl + AdInsConstant.GetRefFormPaging;
  }

  getResult(event) {
    this.resultData = event.response.returnObject;
    this.totalData = event.response.returnObject.count;
    this.ucgridFooter.pageNow = event.pageNow;
    this.ucgridFooter.totalData = this.totalData;
    this.ucgridFooter.resultData = this.resultData;
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

  onChange() {
    var order = null;
    if (this.orderByKey != null) {
      order = {
        key: this.orderByKey,
        value: this.orderByValue
      }
    }
    this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order);
  }

  reset() {
    this.searchComponent.initiateForm();
  }
  onSelect(event) {
    this.pageNow = event.pageNow;
    this.pageSize = event.pageSize;
    this.searchPagination(this.pageNow);
  }

  delete(refFormId: any) {
    if (confirm("Are you sure to delete this record?")) {
      this.editUrl = this.foundationUrl + AdInsConstant.DeleteRefForm;
      var refFormObj = new RefFormObj();
      refFormObj.RefFormId = refFormId;
      this.http.post(this.editUrl, refFormObj).subscribe(
        (response) => {
          console.log(response);
          this.searchPagination(1);
        });
    }
  }
}
