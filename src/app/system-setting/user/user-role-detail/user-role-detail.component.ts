import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { SearchComponent } from 'app/shared/search/search.component';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { NgForm, FormBuilder } from '@angular/forms';
import { RefRoleObj } from 'app/shared/model/RefRoleObj.Model';
import { environment } from 'environments/environment';
import { UserTitleRoleObj } from 'app/shared/model/UserTitleRoleObj';
import { EmpPositionObj } from 'app/shared/model/EmpPositionObj.Model';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { URLConstant } from 'app/shared/constant/URLConstant';


@Component({
  selector: 'app-user-role-detail',
  templateUrl: './user-role-detail.component.html',
  providers: [NGXToastrService]
})
export class UserRoleDetailComponent implements OnInit {

  @ViewChild(SearchComponent) searchComponent;
  inputLookupObj: any;
  resultData: string;
  foundationUrl: string = environment.FoundationR3Url;
  apiUrl: any;
  nameSelect: any;
  idSelect: any;
  jsonSelect: any;
  isActive: any;
  mode: any;

  userName: any;
  officeCode: any;
  officeName: any;
  bizUnitName: any;
  jobTitleName: any;
  empPositionId: any;
  userTitleRoleId: any;

  userTitleRoleObj: UserTitleRoleObj = new UserTitleRoleObj();

  RefUserRoleForm = this.fb.group({});

  constructor(
    private spinner: NgxSpinnerService,
    private service: NGXToastrService,
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder
  ) {
    this.route.queryParams.subscribe(params => {
      if (params['officeCode'] != null) {
        this.officeCode = params['officeCode'];
      }
      if (params['officeName'] != null) {
        this.officeName = params['officeName'];
      }
      if (params['bizUnitName'] != null) {
        this.bizUnitName = params['bizUnitName'];
      }
      if (params['jobTitleName'] != null) {
        this.jobTitleName = params['jobTitleName'];
      }
      if (params['userName'] != null) {
        this.userName = params['userName'];
      }
      if (params['empPositionId'] != null) {
        this.empPositionId = params['empPositionId'];
      }
    });
  }

  ngOnInit() {
    this.inputLookupObj = new InputLookupObj();
    this.inputLookupObj.urlJson = "./assets/lookup/lookupRole.json";
    this.inputLookupObj.urlQryPaging = URLConstant.GetPagingObjectBySQL;
    this.inputLookupObj.urlEnviPaging = environment.FoundationR3Url;
    this.inputLookupObj.pagingJson = "./assets/lookup/lookupRole.json";
    this.inputLookupObj.genericJson = "./assets/lookup/lookupRole.json";

    this.apiUrl = this.foundationUrl + URLConstant.GetRefRolePaging;
    this.initiateForm()
  }

  initiateForm() {
    this.spinner.show();
    var refRoleObj: RefRoleObj = new RefRoleObj();
    this.userTitleRoleObj = new UserTitleRoleObj();
    var empPositionObj: EmpPositionObj = new EmpPositionObj();
    var getRoleUrl: any = this.foundationUrl + URLConstant.GetRefRoleByEmpPositionId;
    var getUserTitleRole: any = this.foundationUrl + URLConstant.GetUserTitleRoleByEmpPositionIdAndRefRoleId;
    empPositionObj.empPositionId = this.empPositionId;

    this.httpClient.post(getRoleUrl, empPositionObj).subscribe(
      (response) => {
        if (response['returnObject'] !== null) {
          this.mode = 'edit';
          refRoleObj = response['returnObject'];
          this.inputLookupObj.nameSelect = refRoleObj.RoleName;
          this.inputLookupObj.jsonSelect = response["returnObject"];
          this.inputLookupObj.idSelect = refRoleObj.RefRoleId;
          this.userTitleRoleObj.empPositionId = this.empPositionId;
          this.userTitleRoleObj.refRoleId = refRoleObj.RefRoleId;

          this.httpClient.post(getUserTitleRole, this.userTitleRoleObj).subscribe(
            (response) => {
              this.userTitleRoleObj = response['returnObject'];

              if (this.userTitleRoleObj.isActive == '1') { this.isActive = true } else { this.isActive = false }
              //this.userTitleRoleId = this.userTitleRoleObj.userTitleRoleId;
            }
          );
          this.spinner.hide();
        }
      }
    );
  }


  Back(): void {
    this.location.back();
  }

  Save(UserRoleDetailForm: NgForm, lookupRole: any): void {
    this.spinner.show();
    if (this.mode == 'edit') {
      this.apiUrl = this.foundationUrl + URLConstant.EditUserTitleRole;
      //this.userTitleRoleObj.userTitleRoleId = +this.userTitleRoleId;
      this.userTitleRoleObj.empPositionId = +this.empPositionId;
      this.userTitleRoleObj.refRoleId = lookupRole.idSelect;
      if (UserRoleDetailForm.value.isActive) { this.userTitleRoleObj.isActive = '1' } else { this.userTitleRoleObj.isActive = '0' };

      this.httpClient.post(this.apiUrl, this.userTitleRoleObj).subscribe(
        (response) => {

          this.service.typeSave('Edit Successed');
          this.location.back();
          this.spinner.hide();

        },
        (error) => {
          this.service.typeErrorCustom(error);
          this.spinner.hide();
        }
      );

    }
    else {
      this.apiUrl = this.foundationUrl + URLConstant.AddUserTitleRole;
      this.userTitleRoleObj.empPositionId = +this.empPositionId;
      this.userTitleRoleObj.refRoleId = lookupRole.idSelect;
      if (UserRoleDetailForm.value.isActive) { this.userTitleRoleObj.isActive = '1' } else { this.userTitleRoleObj.isActive = '0' };

      this.httpClient.post(this.apiUrl, this.userTitleRoleObj).subscribe(
        (response) => {

          this.service.typeSave('Save Successed');
          this.location.back();
          this.spinner.hide();

        },
        (error) => {
          this.service.typeErrorCustom(error);
          this.spinner.hide();
        }
      );
    }
  }

  getLookupResponse(e) {
    this.userTitleRoleObj.refRoleId = e.RefRoleId
  }
}
