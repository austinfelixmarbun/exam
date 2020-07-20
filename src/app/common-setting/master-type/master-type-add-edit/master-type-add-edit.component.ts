import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { RefRoleObj } from 'app/shared/model/RefRoleObj.Model';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';

@Component({
  selector: 'app-master-type-add-edit',
  templateUrl: './master-type-add-edit.component.html',
  providers: [NGXToastrService]
})
export class MasterTypeAddEditComponent implements OnInit {

  foundationUrl: any = environment.FoundationR3Url;
  apiUrl: any;
  parents: any;
  refRoleObj: RefRoleObj;
  type: any = 'Add';
  roleCodeModel: any;
  roleNameModel: any;
  isActive: any;
  refRoleId: any;
  resultData: any;
  masterType: any;
  masterTypeCodeModel: any;
  descrModel: any;
  sandiBiModel: any;
  

  constructor(private route: ActivatedRoute, private location: Location, private spinner: NgxSpinnerService, private httpClient: HttpClient, private service: NGXToastrService) {
    this.route.queryParams.subscribe(params => {
      if (params['mode'] != null) {
        this.type = params['mode'];
      }
      if (params['efRoleId'] != null) {
        this.refRoleId = params['refRoleId'];
      }
      console.log(this.type)
      console.log(this.refRoleId)
    });
  }


  ngOnInit() {
    if (this.type == 'edit') {
      this.apiUrl = this.foundationUrl + URLConstant.GetRefRoleByRefRoleId;
      this.refRoleObj = new RefRoleObj()
      this.refRoleObj.RefRoleId = +this.refRoleId
      this.httpClient.post(this.apiUrl, this.refRoleObj).subscribe(
        (response) => {
          console.log('Success Get');
          this.refRoleObj = response['returnObject'];
          console.log(this.refRoleObj);
          this.roleCodeModel = response['returnObject']['roleCode']
          this.roleNameModel = response['returnObject']['roleName']
          this.isActive = this.refRoleObj.IsActive;

        },
        (error) => {
          console.log('Error Get');
          console.log(error);
        }
      );
    }
  }

  Back(): void {
    this.location.back();
  }

  Save(RoleAddEditForm: NgForm): void {
    this.spinner.show();
    var getRoleUrl = this.foundationUrl + URLConstant.GetRefRole;
    var getRoleUrlGateway = 'http://01-05-0064-0618/FOUNDATION_R3/RefRole/GetRefRole'
    var roleObj: RefRoleObj;
    roleObj = new RefRoleObj()
    roleObj.RoleCode = RoleAddEditForm.value.roleCodeModel;



    //MODE-ADD
    if (this.type != 'edit') {

      //CHECK-DUPLICATE-CODE
      this.httpClient.post(getRoleUrl, roleObj).subscribe(
        (response) => {
          console.log("Success Check Duplicate");
          roleObj = response['returnObject'];
          if (roleObj != null) {
            this.service.typeErrorCustom(ExceptionConstant.CODE_HAS_BEEN_USED);
          }
          else {
            this.apiUrl = this.foundationUrl + URLConstant.AddRefRole;

            this.refRoleObj = new RefRoleObj();
            this.refRoleObj.RoleCode = RoleAddEditForm.value.roleCodeModel;
            this.refRoleObj.RoleName = RoleAddEditForm.value.roleNameModel;
            this.refRoleObj.IsActive = RoleAddEditForm.value.isActive;

            //SAVE
            this.httpClient.post(this.apiUrl, this.refRoleObj).subscribe(
              (response) => {
                console.log("Success Save");

                this.service.typeSave(ExceptionConstant.SAVE_SUCCESSED);
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
        },
        (error) => {
          console.log("Error Check Duplicate");
          this.service.typeErrorCustom(error);
        }
      );


    }
    //MODE-EDIT
    else {
      this.apiUrl = this.foundationUrl + URLConstant.EditRefRole;

      this.refRoleObj.RefRoleId = this.refRoleId;
      this.refRoleObj.RoleCode = RoleAddEditForm.value.roleCodeModel;
      this.refRoleObj.RoleName = RoleAddEditForm.value.roleNameModel;
      this.refRoleObj.IsActive = RoleAddEditForm.value.isActive;

      //SAVE
      this.httpClient.post(this.apiUrl, this.refRoleObj).subscribe(
        (response) => {
          console.log("Success Edit");

          this.service.typeSave(ExceptionConstant.EDIT_SUCCESSED);
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

  }

  FillFormEdit() {
  }
}
