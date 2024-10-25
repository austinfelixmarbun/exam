import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchComponent } from 'app/shared/search/search.component';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { RefEmpObj } from 'app/shared/model/ref-emp-obj.model';
import { RefUserObj } from 'app/shared/model/ref-user-obj.model';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { NgxRouterService } from '@adins/fe-core';


@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
})
export class UserRoleComponent implements OnInit {

  @ViewChild(SearchComponent) searchComponent;
  resultData: any;
  apiUrl: any;
  refUserObj: RefUserObj;
  refEmpObj: RefEmpObj;
  refUserId: any;

  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private location: Location, 
    private ngxRouter: NgxRouterService    
  ) {
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      if (queryParams['refUserId'] != null) {
        this.refUserId = queryParams['refUserId'];
      }
    });
  }

  ngOnInit() {
    this.apiUrl = URLConstant.GetRefUserPaging;

    this.initiateForm();
  }

  initiateForm() {
    var urlGetUser: any = URLConstant.GetRefUser;
    var urlGetEmp: any = URLConstant.GetRefEmployeeById;
    var urlGetListEmpPos: any = URLConstant.GetListEmployeebyRefEmpId;
    var empObj: RefEmpObj = new RefEmpObj;

    this.refUserObj = new RefUserObj();
    this.refEmpObj = new RefEmpObj();

    // this.refUserObj.refUserId = this.refUserId;

    this.httpClient.post(urlGetUser, this.refUserObj).subscribe(
      (response) => {
        this.refUserObj = response['returnObject'];
        // this.refEmpObj.refEmpId = +this.refUserObj.refEmpId;
        this.httpClient.post(urlGetEmp, {Id : this.refEmpObj.RefEmpId}).subscribe(
          (response) => {
            this.refEmpObj = response["returnObject"];

            // empObj.refEmpId = this.refEmpObj.refEmpId;
            this.httpClient.post(urlGetListEmpPos, empObj).subscribe(
              (response) => {
                this.resultData = response["returnObject"];
              })
          })
      }
    );
  }


  Back(): void {
    this.location.back();
  }

}
