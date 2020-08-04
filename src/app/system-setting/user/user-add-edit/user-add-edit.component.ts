
import { RefUserObj } from "app/shared/model/RefUserObj.Model";
import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { NgForm, FormBuilder } from "@angular/forms";
import { environment } from "environments/environment";
import { AdInsConstant } from "app/shared/AdInstConstant";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { NGXToastrService } from "app/components/extra/toastr/toastr.service";

import { RefEmpObj } from "app/shared/model/RefEmpObj.Model";
import { InputLookupObj } from "app/shared/model/InputLookupObj.Model";
import { URLConstant } from "app/shared/constant/URLConstant";

@Component({
  selector: "app-user-add-edit",
  templateUrl: "./user-add-edit.component.html",
  providers: [NGXToastrService]
})
export class UserAddEditComponent implements OnInit {
  foundationUrl: string = environment.FoundationR3Url;
  inputLookupObj: any;
  apiUrl: any;
  parents: string;
  refUserObj: RefUserObj = new RefUserObj();
  type: string = "add";
  nameSelect: any;
  idSelect: any;
  jsonSelect: any;
  EmployeeName: any;
  EmpName: any;
  Username: any;
  Password: any;
  RePassword: any;
  IsActive: boolean=true;
  RefUserId: any;
  loggedInMethod: any = 'DB';

  
  RefUserForm = this.fb.group({});

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
      if (params["mode"] != null) {
        this.type = params["mode"];
      }
      if (params["refUserId"] != null) {
        this.RefUserId = params["refUserId"];
      }
    });
  }

  ngOnInit() {
    this.inputLookupObj = new InputLookupObj();
    this.inputLookupObj.urlJson = "./assets/lookup/lookupEmp.json";
    this.inputLookupObj.urlQryPaging = URLConstant.GetPagingObjectBySQL;
    this.inputLookupObj.urlEnviPaging = environment.FoundationR3Url;
    this.inputLookupObj.pagingJson = "./assets/lookup/lookupEmp.json";
    this.inputLookupObj.genericJson = "./assets/lookup/lookupEmp.json";

    if (this.type == "edit") {
      var empObj: RefEmpObj;
      var getEmpUrl: any;
      var userTemp: RefUserObj;

      this.apiUrl = this.foundationUrl + URLConstant.GetRefUser;
      this.refUserObj = new RefUserObj();
      // this.refUserObj.refUserId = this.RefUserId;
      this.httpClient.post(this.apiUrl, this.refUserObj).subscribe(
        response => {
          userTemp = new RefUserObj();
          userTemp = response["returnObject"];
          // this.refUserObj.refUserId = userTemp.refUserId;
          // this.refUserObj.username = userTemp.username;
          // this.refUserObj.refEmpId = userTemp.refEmpId;
          // this.refUserObj.password = userTemp.password;
          // this.refUserObj.isActive = userTemp.isActive;
          // this.refUserObj.isLockedOut = userTemp.isLockedOut;
          // this.refUserObj.loggedInMethod = userTemp.loggedInMethod;

          // this.Username = this.refUserObj.username;
          // if (this.refUserObj.loggedInMethod != null) {
          //   this.loggedInMethod = this.refUserObj.loggedInMethod;
          // }

          // if (this.refUserObj.isActive == "1") {
          //   this.IsActive = true;
          // } else {
          //   this.IsActive = false;
          // }

          empObj = new RefEmpObj();
          getEmpUrl = this.foundationUrl + URLConstant.GetRefEmployeeById;
          // empObj.refEmpId = +this.refUserObj.refEmpId;
          this.httpClient.post(getEmpUrl, empObj).subscribe(response => {
            empObj = response["returnObject"];
            // this.inputLookupObj.nameSelect = empObj.empName;
            this.inputLookupObj.jsonSelect = response["returnObject"];
            // this.inputLookupObj.idSelect = empObj.refEmpId;
          });
        }
      );
    } else if (this.type == "changePassword") {
      var empObj: RefEmpObj;
      var getEmpUrl: any;

      this.apiUrl = this.foundationUrl + URLConstant.GetRefUser;
      this.refUserObj = new RefUserObj();
      // this.refUserObj.refUserId = this.RefUserId;
      this.httpClient.post(this.apiUrl, this.refUserObj).subscribe(
        response => {
          this.refUserObj = response["returnObject"];

          // this.Username = this.refUserObj.username;

          empObj = new RefEmpObj();
          getEmpUrl = this.foundationUrl + URLConstant.GetRefEmployeeById;
          // empObj.refEmpId = +this.refUserObj.refEmpId;
          this.httpClient.post(getEmpUrl, empObj).subscribe(response => {
            empObj = response["returnObject"];
            // this.inputLookupObj.nameSelect = empObj.empName;
            this.inputLookupObj.jsonSelect = response["returnObject"];
            // this.inputLookupObj.idSelect = empObj.refEmpId;
          });
        }
      );
    }
  }

  Back(): void {
    this.location.back();
  }

  Save(UserAddEditForm: NgForm, lookupEmp: any): void {

    this.spinner.show();
    var getUserUrl = this.foundationUrl + URLConstant.GetUserByUsername;
    var getCountUserUrl =
      this.foundationUrl + URLConstant.GetCountRefUserByRefEmpId;
    var empObj: RefEmpObj;
    empObj = new RefEmpObj();
    // empObj.refEmpId = lookupEmp.idSelect;
    var userObj: RefUserObj;
    userObj = new RefUserObj();
    // userObj.username = UserAddEditForm.value.Username;

    //MODE-ADD
    if (this.type == "add" || this.type == '' || this.type ==  undefined) {
      if (UserAddEditForm.value.Password != UserAddEditForm.value.RePassword) {
        this.service.typeErrorCustom("Password and Re-Password Not Valid");
        this.spinner.hide();
      } else {
        this.httpClient.post(getUserUrl, userObj).subscribe(
          response => {
            userObj = response["returnObject"];
            if (userObj != null) {
              this.service.typeErrorCustom("Username Has Been Used");
              this.spinner.hide();
            } else {
              this.httpClient.post(getCountUserUrl, empObj).subscribe(
                response => {
                  if (response['returnObject'] > 0) {
                    this.service.typeErrorCustom("Employee Already Have User");
                    this.spinner.hide();
                  } else {
                    this.apiUrl = this.foundationUrl + URLConstant.AddRefUser;
                    // this.refUserObj.refEmpId = lookupEmp.idSelect;
                    // this.refUserObj.username = UserAddEditForm.value.Username;
                    // this.refUserObj.password = UserAddEditForm.value.Password;
                    // this.refUserObj.loggedInMethod = UserAddEditForm.value.loggedInMethod;
                    // this.refUserObj.isLockedOut = '0';


                    // if (UserAddEditForm.value.IsActive) {
                    //   this.refUserObj.isActive = '1';
                    // } else {
                    //   this.refUserObj.isActive = '0';
                    // }

                    //SAVE
                    this.httpClient
                      .post(this.apiUrl, this.refUserObj)
                      .subscribe(
                        response => {

                          this.service.typeSave(response['message']);
                          this.router.navigateByUrl('/systemSetting/refUser', { skipLocationChange: true }).then(() =>
                          this.router.navigate(['/systemSetting/refUser/Detail']));
                          this.spinner.hide();
                        },
                        error => {
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
            this.service.typeErrorCustom(error);
            this.spinner.hide();
          }
        );
      }
    }
    //MODE-EDIT
    // else if (this.type == "edit") {
    //   this.apiUrl = this.foundationUrl + AdInsConstant.EditRefUser;
    //   this.httpClient.post(getCountUserUrl, empObj).subscribe(
    //     response => {
          // if (
          //   response["returnObject"] > 0 &&
          //   this.refUserObj.refEmpId != lookupEmp.idSelect
          // ) {
          //   this.service.typeErrorCustom("Employee Already Have User");
          //   this.spinner.hide();
          // } else {
          //   this.refUserObj.refEmpId = lookupEmp.idSelect;
          //   this.refUserObj.username = UserAddEditForm.value.Username;
          //   this.refUserObj.loggedInMethod = UserAddEditForm.value.loggedInMethod;
          //   if (UserAddEditForm.value.IsActive) {
          //     this.refUserObj.isActive = "1";
          //   } else {
          //     this.refUserObj.isActive = "0";
          //   }

            //SAVE
      //       this.httpClient.post(this.apiUrl, this.refUserObj).subscribe(
      //         response => {

      //           this.service.typeSave(response['message']);
      //           this.location.back();
      //           this.spinner.hide();
      //         },
      //         error => {

      //           this.service.typeErrorCustom(error);
      //           this.spinner.hide();
      //         }
      //       );
      //     }
      //   },
      //   error => {
      //     this.service.typeErrorCustom(error);
      //     this.spinner.hide();
      //   }
      // );
    //CHANE PASSWORD
    // } else if (this.type == "changePassword") {
    //   var validateOldPassUrl: any =
    //     this.foundationUrl + AdInsConstant.ValidatePwd;
    //   var oldUser: RefUserObj;

    //   if (
    //     UserAddEditForm.value.NewPassword !=
    //     UserAddEditForm.value.NewRePassword
    //   ) {
    //     this.service.typeErrorCustom(
    //       "New Password and New Re-Password Not Valid"
    //     );
    //     this.spinner.hide();
    //   } else {
    //     this.refUserObj.newPass = UserAddEditForm.value.NewPassword;
    //     this.refUserObj.oldPass = UserAddEditForm.value.Password;
    //     this.refUserObj.newPassVerif = UserAddEditForm.value.NewRePassword;
    //     //SAVE
    //     this.apiUrl = this.foundationUrl + AdInsConstant.ChangePassword;
    //     this.httpClient.post(this.apiUrl, this.refUserObj).subscribe(
    //       response => {
    //         this.service.typeSave(response['message']);
    //         this.location.back();
    //         this.spinner.hide();
    //       },
    //       error => {
    //         this.service.typeErrorCustom(error);
    //         this.spinner.hide();
    //       }
    //     );
    //   }
    // }
  }

  getLookupResponse(e){
    this.refUserObj.RefUserId = e.RefEmpId
  }
}
