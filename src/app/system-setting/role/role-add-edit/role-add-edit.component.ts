
import { RefRoleObj } from 'app/shared/model/RefRoleObj.Model';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';


@Component({
  selector: 'app-role-add-edit',
  templateUrl: './role-add-edit.component.html',
  providers: [NGXToastrService]
})
export class RoleAddEditComponent implements OnInit {

  foundationUrl: string = environment.foundationUrl;
  apiUrl: any;
  parents: string;
  refRoleObj: RefRoleObj;
  type: string = 'Add';
  roleCodeModel: any;
  roleNameModel: any;
  isActive: any;
  refRoleId: any;
  resultData: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private spinner: NgxSpinnerService,
    private httpClient: HttpClient,
    private service: NGXToastrService,
  ) {
    this.route.queryParams.subscribe(params => {
      if (params['mode'] != null) {
        this.type = params['mode'];
      }
      if (params['refRoleId'] != null) {
        this.refRoleId = params['refRoleId'];
      }
      console.log(this.type)
      console.log(this.refRoleId)
    });
  }


  ngOnInit() {
    if (this.type === 'edit') {
      this.apiUrl = this.foundationUrl + AdInsConstant.GetRefRoleByRefRoleId;
      this.refRoleObj = new RefRoleObj()
      this.refRoleObj.refRoleId = +this.refRoleId
      this.httpClient.post(this.apiUrl, this.refRoleObj).subscribe(
        (response) => {
          console.log('Success Get');
          this.refRoleObj = response['returnObject'];
          console.log(this.refRoleObj);
          this.roleCodeModel = response['returnObject']['roleCode']
          this.roleNameModel = response['returnObject']['roleName']
          if (this.refRoleObj.isActive === '1') {
            this.isActive = true;
          }
          else {
            this.isActive = false;
          }

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
    var getRoleUrl = this.foundationUrl + AdInsConstant.GetRefRole;
    var getRoleUrlGateway = 'http://01-05-0064-0618/FOUNDATION_R3/RefRole/GetRefRole'
    var roleObj: RefRoleObj;
    roleObj = new RefRoleObj()
    roleObj.roleCode = RoleAddEditForm.value.roleCodeModel;



    //MODE-ADD
    if (this.type !== 'edit') {

      //CHECK-DUPLICATE-CODE
      this.httpClient.post(getRoleUrl, roleObj).subscribe(
        (response) => {
          console.log("Success Check Duplicate");
          roleObj = response['returnObject'];
          if (roleObj !== null) {
            this.service.typeErrorCustom('Code Has Been Used');
          }
          else {
            this.apiUrl = this.foundationUrl + AdInsConstant.AddRefRole;

            this.refRoleObj = new RefRoleObj();
            this.refRoleObj.roleCode = RoleAddEditForm.value.roleCodeModel;
            this.refRoleObj.roleName = RoleAddEditForm.value.roleNameModel;
            if (RoleAddEditForm.value.isActive) { this.refRoleObj.isActive = '1' } else { this.refRoleObj.isActive = '0' };

            //SAVE
            this.httpClient.post(this.apiUrl, this.refRoleObj).subscribe(
              (response) => {
                console.log("Success Save");

                this.service.typeSave(response['message']);
                this.router.navigateByUrl('/systemSetting/role', { skipLocationChange: true }).then(() =>
                this.router.navigate(['/systemSetting/role/detail']));
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
      this.apiUrl = this.foundationUrl + AdInsConstant.EditRefRole;

      this.refRoleObj.refRoleId = this.refRoleId;
      this.refRoleObj.roleCode = RoleAddEditForm.value.roleCodeModel;
      this.refRoleObj.roleName = RoleAddEditForm.value.roleNameModel;
      if (RoleAddEditForm.value.isActive) { this.refRoleObj.isActive = '1' } else { this.refRoleObj.isActive = '0' };

      //SAVE
      this.httpClient.post(this.apiUrl, this.refRoleObj).subscribe(
        (response) => {
          console.log("Success Edit");

          this.service.typeSave(response['message']);
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
