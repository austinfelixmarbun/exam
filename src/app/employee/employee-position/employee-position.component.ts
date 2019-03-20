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

@Component({
  selector: 'app-employee-position',
  templateUrl: './employee-position.component.html',
  styleUrls: ['./employee-position.component.scss'],
  providers: [NGXToastrService]
})
export class EmployeePositionComponent implements OnInit {

  @ViewChild(SearchComponent) searchComponent;
  urlJson: string = "./assets/search/searchEmpList.json";
  pageType: string = "add";
  refEmpId: any
  empNo: any
  empName: any
  isActive: boolean = false;
  allRefOffice: any;
  refOfficeId: any = '1557';
  allSupervisor: any;
  superiorRefEmpId: any = '';
  allBiz: any;
  refBizUnitId: any = 'selectOne';
  allOrgJobTitle: any;
  orgJobTitleId: any = 'selectOne';
  positionStartDt: any;
  positionFinishDt: any;
  empObj: RefEmpObj;
  refOfficeObj: RefOfficeObj
  empPositionObj: EmpPositionObj;
  orgJobTitleObj: OrgJobTitleObj;
  apiUrl: any;
  addUrl: any;
  getUrl: any;
  deleteUrl: any;
  refOfficeUrl: any;
  supervisorUrl: any;
  bizUrl: any;
  orgJobTitleUrl: any;
  foundationUrl: string = environment.foundationUrl;
  empPositionVisible: boolean = true;
  addEditVisible: boolean = false;
  pageNow: any;
  totalData: any;
  pageSize: any = 10;
  resultData: string;
  orderByKey: any = null;
  orderByValue: boolean = true;
  arrCrit: any;

  constructor(private router: Router, private route: ActivatedRoute, private httpClient: HttpClient, private toastr: NGXToastrService) {
    this.getUrl = this.foundationUrl + AdInsConstant.GetRefEmployeeById;
    this.apiUrl = this.foundationUrl + AdInsConstant.GetEmpPositionPaging;
    this.addUrl = this.foundationUrl + AdInsConstant.AddEmpPosition;
    this.refOfficeUrl = this.foundationUrl + AdInsConstant.GetAllRefOffice;
    this.supervisorUrl = this.foundationUrl + AdInsConstant.GetEmpListByOfficeIdAndIsActive;
    this.bizUrl = this.foundationUrl + AdInsConstant.GetAllRefBizUnit;
    this.orgJobTitleUrl = this.foundationUrl + AdInsConstant.GetOrgJobTitleByMdlStruc;
    this.deleteUrl = '';
    
    this.route.queryParams.subscribe(params => {
      if (params['refEmpId'] != null) {
        this.refEmpId = params['refEmpId'];
      }
    });
  }

  ngOnInit() {
    console.log('test')
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

    this.empObj = new RefEmpObj()
    this.refOfficeObj = new RefOfficeObj()
    this.empObj.refEmpId = this.refEmpId
    this.httpClient.post(this.getUrl, this.empObj).subscribe(
      (response) => {
        this.empNo = response['returnObject']['empNo']
        this.empName = response['returnObject']['empName']
      },
      (error) => {
        console.log(error);
      })
    this.httpClient.post(this.refOfficeUrl, null).subscribe(
      (response) => {
        this.allRefOffice = response['returnObject']
      },
      (error) => {
        console.log(error);
      })
      this.refOfficeObj.refOfficeId = 1557
    this.httpClient.post(this.supervisorUrl, this.refOfficeObj).subscribe(
      (response) => {
        this.allSupervisor = response['returnObject']
      },
      (error) => {
        console.log(error);
      })
    this.httpClient.post(this.bizUrl, null).subscribe(
      (response) => {
        this.allBiz = response['returnObject']
      },
      (error) => {
        console.log(error);
      })
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
      this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order)
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
    this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order)
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
    this.searchComponent.search(this.apiUrl, this.pageNow, this.pageSize, order)
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

  delete(refEmpId: any) {
    if (confirm("Are you sure to delete this record?")) {
      this.empObj = new RefEmpObj();
      this.empObj.refEmpId = refEmpId;
      this.httpClient.post(this.deleteUrl, this.empObj).subscribe(
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

  reset(){
    this.searchComponent.initiateForm();
  }

  pageChange(page: number) {
    this.pageNow = page;
    this.search();
  }

  onChangeBiz(bizValue) {
    this.orgJobTitleId = 'selectOne';
    this.orgJobTitleObj = new OrgJobTitleObj()
    if (bizValue == 'selectOne') {
      bizValue = 0
    }
    this.orgJobTitleObj.orgMdlStrucId = bizValue
    this.httpClient.post(this.orgJobTitleUrl, this.orgJobTitleObj).subscribe(
      (response) => {
        console.log(response);
        this.allOrgJobTitle = response['returnObject']
      },
      (error) => {
        console.log(error);
      })
  }

  SaveForm(ReqForm: NgForm) {
    if (this.pageType == 'add') {
      this.empPositionObj = new EmpPositionObj();
      this.empPositionObj = ReqForm.value
      this.empPositionObj.refEmpId = this.refEmpId
      if (this.isActive === false) {
        this.empPositionObj.isActive = "0";
      }
      else {
        this.empPositionObj.isActive = "1";
      }

      console.log(JSON.stringify(this.empPositionObj))
      console.log(this.empPositionObj);
      this.httpClient.post(this.addUrl, this.empPositionObj).subscribe(
        (response) => {
          console.log("Success");
          console.log(response);
          this.toastr.successMessage(response['message']);
          this.router.navigate(["/employee"]);
        },
        (error) => {
          console.log("Error");
          console.log(error);
        }
      );
    }
  }

  toggleActive(e) {
    this.isActive = e.target.checked;
  }

  empPosition() {
    this.refOfficeId = 'selectOne';
    this.superiorRefEmpId = '';
    this.refBizUnitId = 'selectOne';
    this.onChangeBiz('selectOne');
    this.positionStartDt = '';
    this.positionFinishDt = '';
    this.isActive = false;
    this.addEditVisible = false;
    this.empPositionVisible = true;
  }

  addPosition() {
    this.refOfficeId = 'selectOne';
    this.superiorRefEmpId = '';
    this.refBizUnitId = 'selectOne';
    this.onChangeBiz('selectOne');
    this.positionStartDt = '';
    this.positionFinishDt = '';
    this.isActive = false;
    this.addEditVisible = true;
    this.empPositionVisible = false;
  }
}
