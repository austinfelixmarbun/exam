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
  EmployeeName: any;
  Username: any;
  Password: any;
  RePassword: any;
  LockedStatus: any;
  IsActive: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private spinner: NgxSpinnerService,
    private adInsService: AdInsServiceService,
    private httpClient: HttpClient,
    private toastr: NGXToastrService,
    private service: NGXToastrService,
    ) {  }


  ngOnInit() {
  }

  Back(): void {
    this.location.back();
  }

  Save(RoleAddEditForm: NgForm): void {
    this.spinner.show();
    if (this.type !== 'edit') {

      this.apiUrl = this.foundationUrl + AdInsConstant.AddRefRole;

      this.refRoleObj = new RefRoleObj();
      this.refRoleObj.roleCode = RoleAddEditForm.value.RoleCode;
      this.refRoleObj.roleName = RoleAddEditForm.value.RoleName;
      if (RoleAddEditForm.value.IsActive) { this.refRoleObj.isActive = '1' } else { this.refRoleObj.isActive = '0' };

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

  }
}

 FillFormEdit() {
  }
}
