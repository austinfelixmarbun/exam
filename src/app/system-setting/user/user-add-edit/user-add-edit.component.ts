
import { RefUserObj } from "app/shared/model/RefUserObj.Model";
import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { NgForm } from "@angular/forms";
import { environment } from "environments/environment";
import { AdInsConstant } from "app/shared/AdInstConstant";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { NGXToastrService } from "app/components/extra/toastr/toastr.service";

import { RefEmpObj } from "app/shared/model/RefEmpObj.Model";

@Component({
  selector: "app-user-add-edit",
  templateUrl: "./user-add-edit.component.html",
  providers: [NGXToastrService]
})
export class UserAddEditComponent implements OnInit {
  foundationUrl: string = environment.foundationUrl;
  apiUrl: any;
  parents: string;
  refUserObj: RefUserObj;
  type: string = "add";
  nameSelect: any;
  idSelect: any;
  jsonSelect: any;
  EmployeeName: any;
  EmpName: any;
  Username: any;
  Password: any;
  RePassword: any;
  IsActive: any;
  RefUserId: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private spinner: NgxSpinnerService,
    private httpClient: HttpClient,
    private toastr: NGXToastrService,
    private service: NGXToastrService
  ) {
    this.route.queryParams.subscribe(params => {
      if (params["mode"] != null) {
        this.type = params["mode"];
      }
      if (params["refUserId"] != null) {
        this.RefUserId = params["refUserId"];
      }
      console.log(this.type);
      console.log(this.RefUserId);
    });
  }

  ngOnInit() {
    if (this.type === "edit") {
      var empObj: RefEmpObj;
      var getEmpUrl: any;
      var userTemp: RefUserObj;

      this.apiUrl = this.foundationUrl + AdInsConstant.GetRefUser;
      this.refUserObj = new RefUserObj();
      this.refUserObj.refUserId = this.RefUserId;
      this.httpClient.post(this.apiUrl, this.refUserObj).subscribe(
        response => {
          console.log("Success Get");
          userTemp = new RefUserObj();
          userTemp = response["returnObject"];
          console.log("A", userTemp);
          this.refUserObj.refUserId = userTemp.refUserId;
          this.refUserObj.username = userTemp.username;
          this.refUserObj.refEmpId = userTemp.refEmpId;
          this.refUserObj.password = userTemp.password;
          this.refUserObj.isActive = userTemp.isActive;
          this.refUserObj.isLockedOut = userTemp.isLockedOut;

          this.Username = this.refUserObj.username;

          if (this.refUserObj.isActive === "1") {
            this.IsActive = true;
          } else {
            this.IsActive = false;
          }

          empObj = new RefEmpObj();
          getEmpUrl = this.foundationUrl + AdInsConstant.GetRefEmployeeById;
          empObj.refEmpId = +this.refUserObj.refEmpId;
          this.httpClient.post(getEmpUrl, empObj).subscribe(response => {
            empObj = response["returnObject"];
            this.nameSelect = empObj.empName;
            this.jsonSelect = response["returnObject"];
            this.idSelect = empObj.refEmpId;
          });
        },
        error => {
          console.log("Error Get");
          console.log(error);
        }
      );
    } else if (this.type === "changePassword") {
      var empObj: RefEmpObj;
      var getEmpUrl: any;

      this.apiUrl = this.foundationUrl + AdInsConstant.GetRefUser;
      this.refUserObj = new RefUserObj();
      this.refUserObj.refUserId = this.RefUserId;
      this.httpClient.post(this.apiUrl, this.refUserObj).subscribe(
        response => {
          console.log("Success Get");
          this.refUserObj = response["returnObject"];
          console.log("A", this.refUserObj);

          this.Username = this.refUserObj.username;

          empObj = new RefEmpObj();
          getEmpUrl = this.foundationUrl + AdInsConstant.GetRefEmployeeById;
          empObj.refEmpId = +this.refUserObj.refEmpId;
          this.httpClient.post(getEmpUrl, empObj).subscribe(response => {
            empObj = response["returnObject"];
            this.nameSelect = empObj.empName;
            this.jsonSelect = response["returnObject"];
            this.idSelect = empObj.refEmpId;
          });
        },
        error => {
          console.log("Error Get");
          console.log(error);
        }
      );
    }
  }

  Back(): void {
    this.location.back();
  }

  Save(UserAddEditForm: NgForm, lookupEmp: any): void {
    console.log("Masuk Save");

    this.spinner.show();
    console.log(UserAddEditForm.value);
    var getUserUrl = this.foundationUrl + AdInsConstant.GetUserByUsername;
    var getCountUserUrl =
      this.foundationUrl + AdInsConstant.GetCountRefUserByRefEmpId;
    var empObj: RefEmpObj;
    empObj = new RefEmpObj();
    empObj.refEmpId = lookupEmp.idSelect;
    var userObj: RefUserObj;
    userObj = new RefUserObj();
    userObj.username = UserAddEditForm.value.Username;

    //MODE-ADD
    if (this.type === "add" || this.type === '' || this.type ===  undefined) {
      console.log("add");
      if (UserAddEditForm.value.Password !== UserAddEditForm.value.RePassword) {
        console.log("Password and Re-Password Not Valid");
        this.service.typeErrorCustom("Password and Re-Password Not Valid");
        this.spinner.hide();
      } else {
        this.httpClient.post(getUserUrl, userObj).subscribe(
          response => {
            console.log("Success Check Duplicate");
            userObj = response["returnObject"];
            if (userObj !== null) {
              this.service.typeErrorCustom("Username Has Been Used");
              this.spinner.hide();
            } else {
              this.httpClient.post(getCountUserUrl, empObj).subscribe(
                response => {
                  console.log(response);
                  if (response['returnObject'] > 0) {
                    this.service.typeErrorCustom("Employee Already Have User");
                    this.spinner.hide();
                  } else {
                    this.apiUrl = this.foundationUrl + AdInsConstant.AddRefUser;
                    console.log(lookupEmp);
                    this.refUserObj = new RefUserObj();
                    this.refUserObj.refEmpId = lookupEmp.idSelect;
                    this.refUserObj.username = UserAddEditForm.value.Username;
                    this.refUserObj.password = UserAddEditForm.value.Password;
                    this.refUserObj.isLockedOut = '0';


                    if (UserAddEditForm.value.IsActive) {
                      this.refUserObj.isActive = '1';
                    } else {
                      this.refUserObj.isActive = '0';
                    }

                    //SAVE
                    this.httpClient
                      .post(this.apiUrl, this.refUserObj)
                      .subscribe(
                        response => {
                          console.log("Success Save");

                          this.service.typeSave(response['message']);
                          this.router.navigateByUrl('/systemSetting/refUser', { skipLocationChange: true }).then(() =>
                          this.router.navigate(['/systemSetting/refUser/detail']));
                          this.spinner.hide();
                        },
                        error => {
                          console.log("Error Save");
                          this.service.typeErrorCustom(error);
                          this.spinner.hide();
                        }
                      );
                  }
                },
                error => {
                  this.service.typeErrorCustom(error);
                  this.spinner.hide();
                }
              );
            }
          },
          error => {
            console.log("Error Check Duplicate");
            this.service.typeErrorCustom(error);
            this.spinner.hide();
          }
        );
      }
    }
    //MODE-EDIT
    else if (this.type === "edit") {
      console.log("edit");
      this.apiUrl = this.foundationUrl + AdInsConstant.EditRefUser;
      this.httpClient.post(getCountUserUrl, empObj).subscribe(
        response => {
          if (
            response["returnObject"] > 0 &&
            this.refUserObj.refEmpId !== lookupEmp.idSelect
          ) {
            this.service.typeErrorCustom("Employee Already Have User");
            this.spinner.hide();
          } else {
            this.refUserObj.refEmpId = lookupEmp.idSelect;
            this.refUserObj.username = UserAddEditForm.value.Username;
            if (UserAddEditForm.value.IsActive) {
              this.refUserObj.isActive = "1";
            } else {
              this.refUserObj.isActive = "0";
            }

            //SAVE
            this.httpClient.post(this.apiUrl, this.refUserObj).subscribe(
              response => {
                console.log("Success Edit");

                this.service.typeSave(response['message']);
                this.location.back();
                this.spinner.hide();
              },
              error => {
                console.log("Error Edit");

                this.service.typeErrorCustom(error);
                this.spinner.hide();
              }
            );
          }
        },
        error => {
          this.service.typeErrorCustom(error);
          this.spinner.hide();
        }
      );
    //CHANE PASSWORD
    } else if (this.type === "changePassword") {
      console.log("changePassword");
      var validateOldPassUrl: any =
        this.foundationUrl + AdInsConstant.ValidatePwd;
      var oldUser: RefUserObj;

      if (
        UserAddEditForm.value.NewPassword !==
        UserAddEditForm.value.NewRePassword
      ) {
        console.log("New Password and New Re-Password Not Valid");
        this.service.typeErrorCustom(
          "New Password and New Re-Password Not Valid"
        );
        this.spinner.hide();
      } else {
        this.refUserObj.newPass = UserAddEditForm.value.NewPassword;
        this.refUserObj.oldPass = UserAddEditForm.value.Password;
        this.refUserObj.newPassVerif = UserAddEditForm.value.NewRePassword;
        //SAVE
        this.apiUrl = this.foundationUrl + AdInsConstant.ChangePassword;
        this.httpClient.post(this.apiUrl, this.refUserObj).subscribe(
          response => {
            console.log("Success Edit");
            this.service.typeSave(response['message']);
            this.location.back();
            this.spinner.hide();
          },
          error => {
            console.log("Error Edit");
            this.service.typeErrorCustom(error);
            this.spinner.hide();
          }
        );
      }
    }
  }
}
