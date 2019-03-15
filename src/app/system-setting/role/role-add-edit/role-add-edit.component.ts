import { FormGroup } from '@angular/forms';
import { RefRoleObj } from './../../../shared/model/RefRoleObj.Model';
import { Http } from '@angular/http';
import { formatDate } from '@angular/common';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { AdInsServiceService } from 'app/ad-ins-service.service';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { HttpHeaders } from '@angular/common/http';

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
    private adInsService: AdInsServiceService,
    private httpClient: HttpClient,
    private toastr: NGXToastrService,
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
    var duplicate: string;
    var roleObj: RefRoleObj;
    roleObj = new RefRoleObj()
    roleObj.roleCode = RoleAddEditForm.value.roleCodeModel;

    this.httpClient.post(getRoleUrl, roleObj).subscribe(
      (response) => {
        console.log("Success Check Duplicate");
        roleObj = response['returnObject'];
        if (roleObj !== null) {
          duplicate = '1';
        }
        else {
          duplicate = '0';
        }
      },
      (error) => {
        console.log("Error Check Duplicate");
        this.service.typeErrorCustom(error);
      }
    );

    if (this.type !== 'edit') {
      if (duplicate !== '' && duplicate !== undefined && duplicate !== '1') {
        this.apiUrl = this.foundationUrl + AdInsConstant.AddRefRole;

        this.refRoleObj = new RefRoleObj();
        this.refRoleObj.roleCode = RoleAddEditForm.value.roleCodeModel;
        this.refRoleObj.roleName = RoleAddEditForm.value.roleNameModel;
        if (RoleAddEditForm.value.isActive) { this.refRoleObj.isActive = '1' } else { this.refRoleObj.isActive = '0' };

        //SAVE
        this.httpClient.post(this.apiUrl, this.refRoleObj).subscribe(
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
      else {
        this.service.typeErrorCustom('Code Has Been Used');
        this.spinner.hide();
      }
    }
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

  }

  FillFormEdit() {
  }
}
