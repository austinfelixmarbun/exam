import { Http } from '@angular/http';
import { RefUserObj } from './../../../shared/model/RefUserObj.Model';
import { formatDate } from '@angular/common';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-user-add-edit',
  templateUrl: './user-add-edit.component.html',
  providers: [NGXToastrService]
})
export class UserAddEditComponent implements OnInit {

  foundationUrl: string = environment.foundationUrl;
  apiUrl: any;
  parents: string;
  refUserObj: RefUserObj;
  type: string = 'Add';
  EmployeeName: any;
  Username: any;
  Password: any;
  RePassword: any;
  LockedStatus: any;
  IsActive: any;
  RefUserId: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private spinner: NgxSpinnerService,
    private httpClient: HttpClient,
    private toastr: NGXToastrService,
    private service: NGXToastrService,
  ) {
    this.route.queryParams.subscribe(params => {
      if (params['mode'] != null) {
        this.type = params['mode'];
      }
      if (params['refUserId'] != null) {
        this.RefUserId = params['refUserId'];
      }
      console.log(this.type)
      console.log(this.RefUserId)
    });
  }


  ngOnInit() {
    if (this.type === 'edit') {
      this.apiUrl = this.foundationUrl + AdInsConstant.GetRefUser;
      this.refUserObj = new RefUserObj()
      this.refUserObj.refUserId = this.RefUserId
      this.httpClient.post(this.apiUrl, this.refUserObj).subscribe(
        (response) => {
          console.log('Success Get');
          this.refUserObj = response['returnObject'];
          console.log('A', this.refUserObj);

          this.Username = this.refUserObj.username;
          this.Password = this.refUserObj.password;
          this.RePassword = this.refUserObj.password;
          if (this.refUserObj.isActive === '1') {
            this.IsActive = true;
          }
          else {
            this.IsActive = false;
          }
          if (this.refUserObj.isLocked === '1') {
            this.LockedStatus = true;
          }
          else {
            this.LockedStatus = false;
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

  Save(UserAddEditForm: NgForm, lookupEmp: any): void {
    this.spinner.show();
    console.log(UserAddEditForm.value);
    console.log(lookupEmp.idSelect);
    var getUserUrl = this.foundationUrl + AdInsConstant.GetUserByUsername;
    var userObj: RefUserObj;
    userObj = new RefUserObj()
    userObj.username = UserAddEditForm.value.Username;

    //MODE-ADD
    if (this.type !== 'edit') {
      this.httpClient.post(getUserUrl, userObj).subscribe(
        (response) => {
          console.log("Success Check Duplicate");
          userObj = response['returnObject'];
          if (userObj !== null) {
            this.service.typeErrorCustom('Username Has Been Used');
            this.spinner.hide();
          }
          else {
            this.apiUrl = this.foundationUrl + AdInsConstant.AddRefUser;

            this.refUserObj = new RefUserObj();
            this.refUserObj.refEmpId = lookupEmp.idSelect;
            this.refUserObj.username = UserAddEditForm.value.Username;
            this.refUserObj.password = UserAddEditForm.value.Password;
            if (UserAddEditForm.value.IsLocked) { this.refUserObj.isLocked = '1' } else { this.refUserObj.isLocked = '0' };
            if (UserAddEditForm.value.IsActive) { this.refUserObj.isActive = '1' } else { this.refUserObj.isActive = '0' };

            //SAVE
            this.httpClient.post(this.apiUrl, this.refUserObj).subscribe(
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
        },
        (error) => {
          console.log("Error Check Duplicate");
          this.service.typeErrorCustom(error);
          this.spinner.hide();
        }
      );
    }
    //MODE-EDIT
    else {
      this.apiUrl = this.foundationUrl + AdInsConstant.EditRefUser;

      this.refUserObj.refEmpId = lookupEmp.idSelect;
      this.refUserObj.username = UserAddEditForm.value.Username;
      this.refUserObj.password = UserAddEditForm.value.Password;
      if (UserAddEditForm.value.IsLocked) { this.refUserObj.isLocked = '1' } else { this.refUserObj.isLocked = '0' };
      if (UserAddEditForm.value.IsActive) { this.refUserObj.isActive = '1' } else { this.refUserObj.isActive = '0' };

      //SAVE
      this.httpClient.post(this.apiUrl, this.refUserObj).subscribe(
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
}
