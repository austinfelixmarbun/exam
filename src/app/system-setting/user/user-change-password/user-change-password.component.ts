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
  selector: "app-user-change-password",
  templateUrl: "./user-change-password.component.html",
  providers: [NGXToastrService]
})
export class UserChangePasswordComponent implements OnInit {
  foundationUrl: string = environment.foundationUrl;
  apiUrl: any;
  refUserObj: RefUserObj;
  refEmpObj: RefEmpObj = new RefEmpObj();
  username: any;
  Password: any;
  RePassword: any;
  RefUserId: any;
  NewPassword: any;
  NewRePassword: any;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private spinner: NgxSpinnerService,
    private httpClient: HttpClient,
    private toastr: NGXToastrService,
    private service: NGXToastrService
  ) {
    var currentUserContext = JSON.parse(localStorage.getItem("UserContext"));
    this.username = currentUserContext.UserName;
  }

  ngOnInit() {
    var getEmpUrl: any;

    this.apiUrl = this.foundationUrl + AdInsConstant.GetUserByUsername;
    this.refUserObj = new RefUserObj();
    this.refUserObj.username = this.username;
    this.httpClient.post(this.apiUrl, this.refUserObj).subscribe(
      response => {
        this.refUserObj = response["returnObject"];
        this.refEmpObj = new RefEmpObj();
        getEmpUrl = this.foundationUrl + AdInsConstant.GetRefEmployeeById;
        this.refEmpObj.refEmpId = +this.refUserObj.refEmpId;
        this.httpClient.post(getEmpUrl, this.refEmpObj).subscribe(response => {
          this.refEmpObj = response["returnObject"];
        });
      },
      error => {
        console.log("Error Get");
        console.log(error);
      }
    );
  }

  Back(): void {
    this.location.back();
  }

  Save(UserAddEditForm: NgForm): void {
    this.spinner.show();
    console.log(UserAddEditForm.value);
    if (
      UserAddEditForm.value.NewPassword !== UserAddEditForm.value.NewRePassword
    ) {
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
          this.service.typeSave(response["message"]);
          this.router
            .navigateByUrl("/systemSetting/refUser", {
              skipLocationChange: true
            })
            .then(() =>
              this.router.navigate(["/systemSetting/changePassword"])
            );
          this.spinner.hide();
        },
        error => {
          this.service.typeErrorCustom(error);
          this.spinner.hide();
        }
      );
    }
  }
}
