import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'environments/environment';
import { RefEmpObj } from 'app/shared/model/RefEmpObj.Model';
import { HttpClient } from '@angular/common/http';
import { InputSearchObj } from 'app/shared/model/InputSearchObj.Model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { Observable } from 'rxjs';
import { UCSearchComponent } from '@adins/ucsearch';
import { UcgridfooterComponent } from '@adins/ucgridfooter';
import { formatDate } from '@angular/common';
import { RefEmpLeaveMngmntObj } from 'app/shared/model/RefEmpLeaveMngmntObj.Model';

@Component({
  selector: 'app-leave-maintenance',
  templateUrl: './leave-maintenance.component.html',
  styleUrls: ['./leave-maintenance.component.scss'],
  providers: [NGXToastrService]
})
export class LeaveMaintenanceComponent implements OnInit {
  //** Start Query Paging */
  @ViewChild(UCSearchComponent) searchComponent;
  @ViewChild(UcgridfooterComponent) ucgridFooter;
  inputObj: any;
  //** End Query Paging */

  resultData: any;
  ExcelData: any;
  refEmpLeaveMngmntObj: RefEmpLeaveMngmntObj;
  pageNow: any;
  totalData: any;
  pageSize: any = 10;
  apiUrl: any;
  deleteUrl: any;
  exportData: any;
  orderByKey: any = null;
  orderByValue: boolean = true;
  countForm: any;

  foundationUrl: string = environment.foundationUrl;
  constructor(private http: HttpClient, private toastr: NGXToastrService) { }

  ngOnInit() {
    this.inputObj = new InputSearchObj();
    this.inputObj._url = "./assets/search/searchLeaveMaintenance.json";
    this.inputObj.enviromentUrl = environment.foundationUrl;
    this.inputObj.apiQryPaging = AdInsConstant.GetRefEmpLeaveMngmntPaging;

    this.pageNow = 1;
    this.apiUrl = this.foundationUrl + AdInsConstant.GetRefEmpLeaveMngmntPaging;
    this.deleteUrl = this.foundationUrl + AdInsConstant.DeleteRefEmpLeaveMngmnt;
  }

  //** Start UC Search **/

  getResult(event) {
    this.resultData = event.response.returnObject;
    this.totalData = event.response.returnObject.count;
    this.ucgridFooter.pageNow = event.pageNow;
    this.ucgridFooter.totalData = this.totalData;
    this.ucgridFooter.resultData = this.resultData;
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

  //** End UC Search **/

  delete(refEmpLeaveMngmntId: any) {
    if (confirm("Are you sure to delete this record?")) {
      this.refEmpLeaveMngmntObj = new RefEmpLeaveMngmntObj();
      this.refEmpLeaveMngmntObj.refEmpLeaveMngmntId = refEmpLeaveMngmntId;
      this.http.post(this.deleteUrl, this.refEmpLeaveMngmntObj).subscribe(
        (response) => {
          this.toastr.successMessage(response['message']);
          this.searchPagination(this.pageNow);
        },
        (error) => {
          console.log("Error");
          console.log(error);
        });
    }
  }
}
