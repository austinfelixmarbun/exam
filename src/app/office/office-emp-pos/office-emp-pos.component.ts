import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UcgridfooterComponent } from '@adins/ucgridfooter';
import { UCSearchComponent } from '@adins/ucsearch';
import { environment } from 'environments/environment';
import { RefEmpObj } from 'app/shared/model/RefEmpObj.Model';
import { RefOfficeObj } from 'app/shared/model/RefOfficeObj.model';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { EmpPositionObj } from 'app/shared/model/EmpPositionObj.Model';
import { DecimalPipe } from '@angular/common';
import { InputSearchObj } from 'app/shared/model/InputSearchObj.Model';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';

@Component({
  selector: 'app-office-emp-pos',
  templateUrl: './office-emp-pos.component.html',
  providers: [NGXToastrService, DecimalPipe]
})
export class OfficeEmpPosComponent implements OnInit {

  @ViewChild(UCSearchComponent) searchComponent;
  @ViewChild(UcgridfooterComponent) ucgridFooter;
  inputObj: any;
  refOfficeId: any;
  officeCode: any;
  officeName: any;
  empObj: RefEmpObj;
  refOfficeObj: RefOfficeObj;
  empPositionObj: EmpPositionObj;
  apiUrl: any;
  deleteUrl: any;
  foundationUrl: string = environment.FoundationR3Url;
  pageNow: any;
  totalData: any;
  pageSize: any = 10;
  resultData: any;
  orderByKey: any = null;
  orderByValue: boolean = true;
  arrCrit: any;

  refEmpId: any;
  empNo: any;
  empName: any;

  constructor(private route: ActivatedRoute, private httpClient: HttpClient, private toastr: NGXToastrService) {
    this.apiUrl = this.foundationUrl + AdInsConstant.GetEmpPositionPaging;
    this.deleteUrl = this.foundationUrl + AdInsConstant.DeleteEmpPosition;

    this.route.queryParams.subscribe(params => {
      if (params['refOfficeId'] != null) {
        this.refOfficeId = params['refOfficeId'];
      }
      if (params['officeCode'] != null) {
        this.officeCode = params['officeCode'];
      }
      if (params['officeName'] != null) {
        this.officeName = params['officeName'];
      }
    });
  }

  ngOnInit() {
    this.inputObj = new InputSearchObj();
    this.inputObj._url = "./assets/search/searchEmpList.json";
    this.inputObj.enviromentUrl = environment.FoundationR3Url;
    this.inputObj.apiQryPaging = AdInsConstant.GetEmpPositionPaging;
    this.inputObj.ddlEnvironments = [
      {
        name: "refOfficeId",
        environment: environment.FoundationR3Url
      }
    ];

    this.pageNow = 1;
    this.arrCrit = new Array();
    var critObj = new CriteriaObj();
    critObj.DataType = 'Numeric'
    critObj.restriction = AdInsConstant.RestrictionEq;
    critObj.propName = 'refOfficeId';
    critObj.value = this.refOfficeId
    this.arrCrit.push(critObj);
    this.inputObj.arrCritObj = this.arrCrit;
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

  reset() {
    this.searchComponent.initiateForm();
  }

  delete(empPositionId: any) {
    if (confirm(ExceptionConstant.DELETE_CONFIRMATION)) {
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

}
