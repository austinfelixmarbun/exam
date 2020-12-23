import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { HttpClient } from '@angular/common/http';
import { RolePickService } from 'app/shared/rolepick/rolepick.service';
import { environment } from 'environments/environment';
import { CurrentUserContextService } from 'app/shared/CurrentUserContext/current-user-context.service';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  providers: [RolePickService]
})

export class LoginPageComponent implements OnInit {
  @ViewChild('user') userInputRef: ElementRef;
  @ViewChild('pass') userPassRef: ElementRef;
  @ViewChild('f') loginForm: NgForm;
  private apiUrl: string;
  IsNeedUpdate: boolean;
  FoundationR3Url: string;
  token: string;
  version: string;
  result: any;
  isLocked: boolean = false;
  constructor(private router: Router, private http: HttpClient, public rolePickService: RolePickService,
    private route: ActivatedRoute, private currentUserContextService: CurrentUserContextService, private cookieService: CookieService) {
    //Ini buat check klo misal udah login jadi lgsg lempar ke tempat laennya lagi

    this.version = localStorage.getItem(CommonConstant.VERSION);
    this.route.queryParams.subscribe(params => {
      if (params['token'] != null) {
        this.token = params['token'];
      }
    });

    if (AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS) != null) {
      this.router.navigate(['dashboard/dash-board']);
    }
  }

  ngOnInit() {
    this.FoundationR3Url = environment.FoundationR3Url;

    if (this.token != null) {
      localStorage.setItem("Token", this.token);
      this.cookieService.put('access_token', this.token)
      this.http.post(AdInsConstant.LoginWithToken, { ModuleCode: environment.Module }).subscribe(
        (response) => {
          AdInsHelper.CreateUserAccess(this.cookieService, response);
          this.router.navigate(['dashboard/dash-board']);
        }
      );
    }
  }

  onSubmit(event) {
    event.preventDefault();
    const username = this.userInputRef.nativeElement.value;
    const password = this.userPassRef.nativeElement.value;
    this.apiUrl = this.FoundationR3Url + AdInsConstant.Login;
    var requestObj = { "Username": username, "Password": password };
    localStorage.setItem("Username", username);
    this.cookieService.put("username", username);
    //this.rolePickService.openDialog(data.returnObject);
    this.http.post(this.apiUrl, requestObj).subscribe(
      (response) => {
        if (response["StatusCode"] == CommonConstant.STATUS_CODE_USER_LOCKED) {
          this.isLocked = true;
        }
        else {
          localStorage.setItem("Username", username);
          //this.cookieService.put("username", username);
          const object = {
            response: response[CommonConstant.ReturnObj],
            user: username,
            pwd: password
          };
          this.http.post(URLConstant.GetRefUserByUsername, requestObj).subscribe(
            (response) => {
              this.result = response;
              if (this.result.IsNeedUpdatePassword) {
                this.router.navigate(['/pages/ChangePassword'], { queryParams: { "Username": username } });
              }
              else {
                this.rolePickService.openDialog(object);
                const object2 = {
                  Usernames: [
                    username
                  ],
                  Role: "",
                  Message: "",
                  Title: "Password Expiration",
                  Type: "Notification"
                };
                this.http.post(URLConstant.SendNotificationRemainingPasswordExpirationDaysToUser, object2).subscribe();
              }
            })
        };
      }
    );
  }
  // On Forgot password link click
  onForgotPassword() {
    this.router.navigate(['RequestPassword'], { relativeTo: this.route.parent });
  }
  // On registration link click
  onRegister() {
    this.router.navigate(['register'], { relativeTo: this.route.parent });
  }
}
