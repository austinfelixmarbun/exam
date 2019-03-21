import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RefEmpObj } from 'app/shared/model/RefEmpObj.Model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { SearchComponent } from 'app/shared/search/search.component';
import { NgForm } from '@angular/forms';
import { EmpPositionObj } from 'app/shared/model/EmpPositionObj.Model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { RefOfficeObj } from 'app/shared/model/RefOfficeObj.model';
import { OrgJobTitleObj } from 'app/shared/model/OrgJobTitleObj.Model';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-employee-position',
  templateUrl: './employee-position.component.html',
  styleUrls: ['./employee-position.component.scss'],
  providers: [NGXToastrService]
})
export class EmployeePositionComponent implements OnInit {

  @ViewChild(SearchComponent) searchComponent;
  urlJson: string = "./assets/search/searchEmpList.json";
  refEmpId: any;
  refOfficeId: any;
  empNo: any
  empName: any
  empObj: RefEmpObj;
  refOfficeObj: RefOfficeObj
  empPositionObj: EmpPositionObj;
  orgJobTitleObj: OrgJobTitleObj;
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

  constructor(private router: Router, private route: ActivatedRoute, private httpClient: HttpClient, private toastr: NGXToastrService) {
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
    console.log('test')
    const getuserAccess = JSON.parse(localStorage.getItem('UserAccess'));
    this.refOfficeId = getuserAccess.refOfficeId
    this.arrCrit = new Array();
    var critObj = new CriteriaObj();
    critObj.DataType = 'Numeric'
    critObj.restriction = AdInsConstant.RestrictionEq;
    critObj.propName = 'refEmpId';
    critObj.value = this.refEmpId
    this.arrCrit.push(critObj);
    var critObj = new CriteriaObj();
    critObj.DataType = 'Numeric'
    critObj.restriction = AdInsConstant.RestrictionEq;
    critObj.propName = 'refOfficeId';
    critObj.value = this.refOfficeId
    this.arrCrit.push(critObj);
  }

  search() {
    this.orderByKey = null
    this.orderByValue = true
    this.pageNow = 1;
    console.log(this.searchComponent)
    this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, null, this.arrCrit)
      .subscribe(
        (response) => {
          console.log("Success");
          this.resultData = response.returnObject;
          this.totalData = response.returnObject.count;
          console.log(this.resultData);
        },
        (error) => {
          console.log("Error");
          console.log(error);
        }
      );
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
      this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order, this.arrCrit)
        .subscribe(
          (response) => {
            console.log("Success");
            this.resultData = response.returnObject;
            this.totalData = response.returnObject.count;
            console.log(this.resultData);
          },
          (error) => {
            console.log("Error");
            console.log(error);
          }
        );
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
    this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order, this.arrCrit)
      .subscribe(
        (response) => {
          console.log("Success");
          this.resultData = response.returnObject;
          this.totalData = response.returnObject.count;
          console.log(this.resultData);
        },
        (error) => {
          console.log("Error");
          console.log(error);
        }
      );
  }

  onChange() {
    var order = null;
    if (this.orderByKey != null) {
      order = {
        key: this.orderByKey,
        value: this.orderByValue
      }
    }
    this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order, this.arrCrit)
      .subscribe(
        (response) => {
          console.log("Success");
          this.resultData = response.returnObject;
          this.totalData = response.returnObject.count;
          console.log(this.resultData);
        },
        (error) => {
          console.log("Error");
          console.log(error);
        }
      );
  }

  delete(empPositionId: any) {
    if (confirm("Are you sure to delete this record?")) {
      this.empPositionObj = new EmpPositionObj();
      this.empPositionObj.empPositionId = empPositionId;
      this.httpClient.post(this.deleteUrl, this.empPositionObj).subscribe(
        (response) => {
          this.toastr.successMessage(response['message']);
          this.onChange()
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

  pageChange(page: number) {
    this.pageNow = page;
    this.search();
  }

}