
import { RefRoleObj } from 'app/shared/model/RefRoleObj.Model';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm, FormBuilder, Validators } from '@angular/forms';
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

  foundationUrl: string = environment.FoundationR3Url;
  apiUrl: any;
  parents: string;
  refRoleObj: RefRoleObj;
  type: string = 'Add';
  roleCodeModel: any;
  roleNameModel: any;
  IsActive: boolean = true;
  RefRoleId: any;
  resultData: any;
  RefRoleForm = this.fb.group({
    RoleCode: ['', [Validators.required, Validators.maxLength(50)]],
    RoleName: ['', [Validators.required, Validators.maxLength(100)]],
    IsActive: [true]
  });
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private spinner: NgxSpinnerService,
    private httpClient: HttpClient,
    private service: NGXToastrService,
    private fb: FormBuilder
  ) {
    this.route.queryParams.subscribe(params => {
      if (params['mode'] != null) {
        this.type = params['mode'];
      }
      if (params['RefRoleId'] != null) {
        this.RefRoleId = params['RefRoleId'];
      }
      console.log(this.type)
      console.log(this.RefRoleId)
    });
  }


  ngOnInit() {
    if (this.type == 'edit') {
      this.RefRoleForm.controls["RoleCode"].disable();
      this.refRoleObj = new RefRoleObj();
      this.refRoleObj.RefRoleId = this.RefRoleId;
      this.httpClient.post(AdInsConstant.GetRefRoleByRefRoleId, this.refRoleObj).subscribe(
        response => {
          this.resultData = response;
          this.RefRoleForm.patchValue({
            RoleCode: this.resultData.RoleCode,
            RoleName: this.resultData.RoleName,
            IsActive: this.resultData.IsActive
          });

        },
        error => {
          console.log(error);
        }
      );
    }
  }

  Back(): void {
    this.location.back();
  }

  SaveForm() {
    if (this.type == "Add") {
      this.refRoleObj = new RefRoleObj();
      this.refRoleObj.RoleCode = this.RefRoleForm.controls["RoleCode"].value
      this.refRoleObj.RoleName = this.RefRoleForm.controls["RoleName"].value;
      this.refRoleObj.IsActive = this.RefRoleForm.controls["IsActive"].value;
      this.httpClient.post(AdInsConstant.AddRefRole, this.refRoleObj).subscribe(
        response => {
            this.service.successMessage(response["Message"]);
            this.router.navigate(["/systemSetting/role"]);
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.refRoleObj = this.resultData;
      this.refRoleObj.RefRoleId = this.RefRoleId;
      this.refRoleObj.RoleCode = this.RefRoleForm.controls["RoleCode"].value;
      this.refRoleObj.RoleName = this.RefRoleForm.controls["RoleName"].value;
      this.refRoleObj.IsActive = this.RefRoleForm.controls["IsActive"].value;
      this.httpClient.post(AdInsConstant.EditRefRole, this.refRoleObj).subscribe(
        response => {
          console.log(response);
          this.service.successMessage(response["Message"]);
          this.router.navigate(["/systemSetting/role"]);
        },
        error => {
          console.log(error);
        }
      );
    }
  }
}
