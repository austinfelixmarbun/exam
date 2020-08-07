import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { SearchComponent } from 'app/shared/search/search.component';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { RefEmpObj } from 'app/shared/model/RefEmpObj.Model';
import { environment } from 'environments/environment';
import { RefUserObj } from 'app/shared/model/RefUserObj.Model';
import { URLConstant } from 'app/shared/constant/URLConstant';


@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  providers: [NGXToastrService]
})
export class UserRoleComponent implements OnInit {

  @ViewChild(SearchComponent) searchComponent;
  resultData: any;
  foundationUrl: string = environment.FoundationR3Url;
  apiUrl: any;
  refUserObj: RefUserObj;
  refEmpObj: RefEmpObj;
  refUserId: any;

  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private location: Location,
  ) {
    this.route.queryParams.subscribe(params => {
      if (params['refUserId'] != null) {
        this.refUserId = params['refUserId'];
      }
    });
  }

  ngOnInit() {
    this.apiUrl = this.foundationUrl + URLConstant.GetRefUserPaging;

    this.initiateForm();
  }

  initiateForm() {
    var urlGetUser: any = this.foundationUrl + URLConstant.GetRefUser;
    var urlGetEmp: any = this.foundationUrl + URLConstant.GetRefEmployeeById;
    var urlGetListEmpPos: any = this.foundationUrl + URLConstant.GetListEmployeebyRefEmpId;
    var empObj: RefEmpObj = new RefEmpObj;
    var urlGetEmpPosition: any;

    this.refUserObj = new RefUserObj();
    this.refEmpObj = new RefEmpObj();

    // this.refUserObj.refUserId = this.refUserId;

    this.httpClient.post(urlGetUser, this.refUserObj).subscribe(
      (response) => {
        this.refUserObj = response['returnObject'];
        // this.refEmpObj.refEmpId = +this.refUserObj.refEmpId;
        this.httpClient.post(urlGetEmp, this.refEmpObj).subscribe(
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
