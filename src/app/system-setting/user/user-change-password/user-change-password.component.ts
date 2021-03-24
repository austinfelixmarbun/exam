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
import { URLConstant } from "app/shared/constant/URLConstant";
import { CommonConstant } from "app/shared/constant/CommonConstant";
import { AdInsHelper } from "app/shared/AdInsHelper";
import { CookieService } from "ngx-cookie";
import { NavigationConstant } from "app/shared/NavigationConstant";

@Component({
  selector: "app-user-change-password",
  templateUrl: "./user-change-password.component.html",
  providers: [NGXToastrService]
})
export class UserChangePasswordComponent implements OnInit {
  foundationUrl: string = environment.FoundationR3Url;
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
    private service: NGXToastrService, 
    private cookieService: CookieService
  ) {
    var currentUserContext = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
    this.username = currentUserContext.UserName;
  }

  ngOnInit() {
    var getEmpUrl: any;

    this.apiUrl = this.foundationUrl + URLConstant.GetUserByUsername;
    this.refUserObj = new RefUserObj();
    // this.refUserObj.username = this.username;
    this.httpClient.post(this.apiUrl, this.refUserObj).subscribe(
      response => {
        this.refUserObj = response["returnObject"];
        this.refEmpObj = new RefEmpObj();
        getEmpUrl = this.foundationUrl + URLConstant.GetRefEmployeeById;
        // this.refEmpObj.refEmpId = +this.refUserObj.refEmpId;
        this.httpClient.post(getEmpUrl, {Id : this.refEmpObj.RefEmpId}).subscribe(response => {
          this.refEmpObj = response["returnObject"];
        });
      }
    );
  }

  Back(): void {
    this.location.back();
  }

  Save(UserAddEditForm: NgForm): void {
    this.spinner.show();
    if (
      UserAddEditForm.value.NewPassword != UserAddEditForm.value.NewRePassword
    ) {
      this.service.typeErrorCustom(
        "New Password and New Re-Password Not Valid"
      );
      this.spinner.hide();
    } else {
      // this.refUserObj.newPass = UserAddEditForm.value.NewPassword;
      // this.refUserObj.oldPass = UserAddEditForm.value.Password;
      // this.refUserObj.newPassVerif = UserAddEditForm.value.NewRePassword;
      //SAVE
      this.apiUrl = this.foundationUrl + URLConstant.ChangePassword;
      this.httpClient.post(this.apiUrl, this.refUserObj).subscribe(
        response => {
          this.service.typeSave(response["message"]);
          this.router.navigateByUrl(NavigationConstant.SYSTEM_SETTING_REF_USER, { skipLocationChange: true })
            .then(() =>
              AdInsHelper.RedirectUrl(this.router,[NavigationConstant.SYSTEM_SETTING_CHANGE_PASSWORD],{})
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
