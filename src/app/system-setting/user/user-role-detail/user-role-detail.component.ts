import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { SearchComponent } from 'app/shared/search/search.component';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { RefRoleObj } from 'app/shared/model/RefRoleObj.Model';
import { environment } from 'environments/environment';
import { UserTitleRoleObj } from 'app/shared/model/UserTitleRoleObj';
import { EmpPositionObj } from 'app/shared/model/EmpPositionObj.Model';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';


@Component({
  selector: 'app-user-role-detail',
  templateUrl: './user-role-detail.component.html',
  providers: [NGXToastrService]
})
export class UserRoleDetailComponent implements OnInit {

  @ViewChild(SearchComponent) searchComponent;
  inputLookupObj: any;
  resultData: string;
  foundationUrl: string = environment.foundationUrl;
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



  constructor(
    private spinner: NgxSpinnerService,
    private service: NGXToastrService,
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private location: Location,
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
    this.inputLookupObj.urlQryPaging = AdInsConstant.GetRefRolePaging;
    this.inputLookupObj.urlEnviPaging = environment.foundationUrl;
    
    this.apiUrl = this.foundationUrl + AdInsConstant.GetRefRolePaging;
    this.initiateForm()
  }

  initiateForm() {
    this.spinner.show();
    var refRoleObj: RefRoleObj = new RefRoleObj();
    this.userTitleRoleObj = new UserTitleRoleObj();
    var empPositionObj: EmpPositionObj = new EmpPositionObj();
    var getRoleUrl: any = this.foundationUrl + AdInsConstant.GetRefRoleByEmpPositionId;
    var getUserTitleRole: any = this.foundationUrl + AdInsConstant.GetUserTitleRoleByEmpPositionIdAndRefRoleId;
    empPositionObj.empPositionId = this.empPositionId;

    this.httpClient.post(getRoleUrl, empPositionObj).subscribe(
      (response) => {
        console.log('Success Get');
        if (response['returnObject'] !== null) {
          this.mode = 'edit';
          refRoleObj = response['returnObject'];
          this.inputLookupObj.nameSelect = refRoleObj.roleName;
          this.inputLookupObj.jsonSelect = response["returnObject"];
          this.inputLookupObj.idSelect = refRoleObj.refRoleId;
          this.userTitleRoleObj.empPositionId = this.empPositionId;
          this.userTitleRoleObj.refRoleId = refRoleObj.refRoleId;

          console.log('A', refRoleObj);
          this.httpClient.post(getUserTitleRole, this.userTitleRoleObj).subscribe(
            (response) => {
              this.userTitleRoleObj =  response['returnObject'];
              console.log('B', this.userTitleRoleObj);

              if (this.userTitleRoleObj.isActive == '1') { this.isActive = true } else { this.isActive = false }
              //this.userTitleRoleId = this.userTitleRoleObj.userTitleRoleId;
          },
          (error) => {
            console.log('Error Get');
            console.log(error);
            this.spinner.hide();
          }
        );
          this.spinner.hide();
        }
      },
      (error) => {
        console.log('Error Get');
        console.log(error);
        this.spinner.hide();
      }
    );
  }


  Back(): void {
    this.location.back();
  }

  Save(UserRoleDetailForm: NgForm, lookupRole: any): void {
    this.spinner.show();
    if (this.mode == 'edit')
    {
      console.log ('edit');
      this.apiUrl = this.foundationUrl + AdInsConstant.EditUserTitleRole;
      //this.userTitleRoleObj.userTitleRoleId = +this.userTitleRoleId;
      this.userTitleRoleObj.empPositionId = +this.empPositionId;
      this.userTitleRoleObj.refRoleId = lookupRole.idSelect;
      if (UserRoleDetailForm.value.isActive){this.userTitleRoleObj.isActive = '1'} else {this.userTitleRoleObj.isActive = '0'}  ;

      this.httpClient.post(this.apiUrl, this.userTitleRoleObj).subscribe(
        (response) => {
          console.log("Success Edit");

          this.service.typeSave('Edit Successed');
          this.location.back();
          this.spinner.hide();

        },
        (error) => {
          console.log("Error Edit");
          this.service.typeErrorCustom(error);
          this.spinner.hide();
        }
      );

    }
    else
    {
      console.log("add");
      this.apiUrl = this.foundationUrl + AdInsConstant.AddUserTitleRole;
      this.userTitleRoleObj = new UserTitleRoleObj();
      this.userTitleRoleObj.empPositionId = +this.empPositionId;
      this.userTitleRoleObj.refRoleId = lookupRole.idSelect;
      if(UserRoleDetailForm.value.isActive){this.userTitleRoleObj.isActive = '1'} else {this.userTitleRoleObj.isActive = '0'} ;

      this.httpClient.post(this.apiUrl, this.userTitleRoleObj).subscribe(
        (response) => {
          console.log("Success Save");

          this.service.typeSave('Save Successed');
          this.location.back();
          this.spinner.hide();

        },
        (error) => {
          console.log("Error Save");
          this.service.typeErrorCustom(error);
          this.spinner.hide();
        }
      );
    }

  }

}
