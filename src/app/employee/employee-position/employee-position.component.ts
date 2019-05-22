import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RefEmpObj } from 'app/shared/model/RefEmpObj.Model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { NgForm } from '@angular/forms';
import { EmpPositionObj } from 'app/shared/model/EmpPositionObj.Model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { RefOfficeObj } from 'app/shared/model/RefOfficeObj.model';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { formatDate, DecimalPipe } from '@angular/common';
import { UcgridfooterComponent } from '@adins/ucgridfooter';
import { UCSearchComponent } from '@adins/ucsearch';
@Component({
  selector: 'app-employee-position',
  templateUrl: './employee-position.component.html',
  styleUrls: ['./employee-position.component.scss'],
  providers: [NGXToastrService, DecimalPipe]
})
export class EmployeePositionComponent implements OnInit {

  @ViewChild(UcgridfooterComponent) searchComponent;
  @ViewChild(UCSearchComponent) ucgridFooter;
  urlJson: string = "./assets/search/searchEmpList.json";
  urlQryPaging : string = AdInsConstant.GetEmpPositionPaging;
  urlEnviPaging : string = environment.foundationUrl;
  refEmpId: any;
  empNo: any
  empName: any
  empObj: RefEmpObj;
  refOfficeObj: RefOfficeObj
  empPositionObj: EmpPositionObj;
  apiUrl: any;
  deleteUrl: any;
  foundationUrl: string = environment.foundationUrl;
  pageNow: any;
  totalData: any;
  pageSize: any = 10;
  resultData: any;
  orderByKey: any = null;
  orderByValue: boolean = true;
  arrCrit: any;

  constructor(private route: ActivatedRoute, private httpClient: HttpClient, private toastr: NGXToastrService) {
    this.apiUrl = this.foundationUrl + AdInsConstant.GetEmpPositionPaging;
    this.deleteUrl = this.foundationUrl + AdInsConstant.DeleteEmpPosition;
    
    this.route.queryParams.subscribe(params => {
      if (params['refEmpId'] != null) {
        this.refEmpId = params['refEmpId'];
      }
      if (params['empNo'] != null) {
        this.empNo = params['empNo'];
      }
      if (params['empName'] != null) {
        this.empName = params['empName'];
      }
    });
  }

  ngOnInit() {
    this.arrCrit = new Array();
    var critObj = new CriteriaObj();
      critObj.DataType = 'Numeric'
      critObj.restriction = AdInsConstant.RestrictionEq;
      critObj.propName = 'refEmpId';
      critObj.value = this.refEmpId
      this.arrCrit.push(critObj);
  }

  searchSort(event: any) {
    if (this.resultData != null) {
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
      this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order, this.arrCrit);
    }
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
    this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order, this.arrCrit);
  }

  delete(empPositionId: any) {
    if (confirm("Are you sure to delete this record?")) {
      this.empPositionObj = new EmpPositionObj();
      this.empPositionObj.empPositionId = empPositionId;
      this.httpClient.post(this.deleteUrl, this.empPositionObj).subscribe(
        (response) => {
          this.toastr.successMessage(response['message']);
        },
        (error) => {
          console.log("Error");
          console.log(error);
        });
    }
  }

  reset() {
    this.searchComponent.initiateForm();
  }

  //** Start UC Search **/
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
}