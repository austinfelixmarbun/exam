
import { RefRoleObj } from 'app/shared/model/RefRoleObj.Model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { URLConstant } from 'app/shared/constant/URLConstant';


@Component({
  selector: 'app-role-add-edit',
  templateUrl: './role-add-edit.component.html',
  providers: [NGXToastrService]
})
export class RoleAddEditComponent implements OnInit {

  foundationUrl: string = environment.FoundationR3Url;

  
  refRoleObj: RefRoleObj;
  type: string = 'Add';
  RefRoleId: any;
  resultData: any;
  title : string = "Role-Add";
  RefRoleForm = this.fb.group({
    RoleCode: ['', [Validators.required, Validators.maxLength(50)]],
    RoleName: ['', [Validators.required, Validators.maxLength(100)]],
    IsActive: [true]
  });
  constructor(
    private router: Router,
    private route: ActivatedRoute,
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
      this.title="Role-Edit";
      this.RefRoleForm.controls["RoleCode"].disable();
      this.refRoleObj = new RefRoleObj();
      this.refRoleObj.RefRoleId = this.RefRoleId;
      this.httpClient.post(URLConstant.GetRefRoleByRefRoleId, this.refRoleObj).subscribe(
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

  SaveForm() {
    if (this.type == "Add") {
      this.refRoleObj = new RefRoleObj();
      this.refRoleObj.RoleCode = this.RefRoleForm.controls["RoleCode"].value
      this.refRoleObj.RoleName = this.RefRoleForm.controls["RoleName"].value;
      this.refRoleObj.IsActive = this.RefRoleForm.controls["IsActive"].value;
      this.httpClient.post(URLConstant.AddRefRole, this.refRoleObj).subscribe(
        response => {
            this.service.successMessage(response["Message"]);
            this.router.navigate(["/SystemSetting/Role"]);
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
      this.httpClient.post(URLConstant.EditRefRole, this.refRoleObj).subscribe(
        response => {
          console.log(response);
          this.service.successMessage(response["Message"]);
          this.router.navigate(["/SystemSetting/Role"]);
        },
        error => {
          console.log(error);
        }
      );
    }
  }
}
