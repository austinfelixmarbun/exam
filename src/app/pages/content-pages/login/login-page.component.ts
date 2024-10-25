import { Component, ViewChild, OnInit, ElementRef, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RolePickService } from 'app/shared/rolepick/rolepick.service';
import { environment } from 'environments/environment';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { CookieService } from 'ngx-cookie';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { NGXToastrService } from 'app/shared/services/toastr.service';
import { formatDate } from '@angular/common';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { NgxRouterService } from '@adins/fe-core';
import { ConfinsAuthService } from 'app/shared/auth/confins-auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page-new.component.html',
  providers: [RolePickService, /*NGXToastrService*/]
})

export class LoginPageComponent implements OnInit {
  @ViewChild('user') userInputRef: ElementRef;
  @ViewChild('pass') userPassRef: ElementRef;
  @ViewChild('otp') otpInputRef: ElementRef;
  @ViewChild('f') loginForm: NgForm;
  IsNeedUpdate: boolean;
  token: string;
  version: string;
  result: any;
  mode: string = "login";
  otpProperties: any;
  timer: any;
  onGoingTimer: number = 0;
  counterOtp: number = -1;
  otpConfirmCount: number = 0;
  loginObj = {
    response: {},
    user: "",
    pwd: ""
  };
  isInvalidOtp: boolean = false;
  showPass: boolean = false;
  gsValueDefaultPass: string = "";

  SpinnerHeaders = new HttpHeaders({
    'IsLoading': "true"
  });
  SpinnerOptions = { headers: this.SpinnerHeaders, withCredentials: true };

  // Open ID Integration
  public providers: any[] = [];
  public iamOptions: Record<string, any>;

  constructor(private router: Router, private http: HttpClient, public rolePickService: RolePickService,
    private route: ActivatedRoute, private cookieService: CookieService,
    private toastr: NGXToastrService, private cdr: ChangeDetectorRef,
    private ngxRouter: NgxRouterService, private authService: ConfinsAuthService) {
    //Ini buat check klo misal udah login jadi lgsg lempar ke tempat laennya lagi

    this.iamOptions = environment.identityProviders;
    this.version = localStorage.getItem(CommonConstant.VERSION);
    this.route.queryParams.subscribe(async params => {
      const query = this.ngxRouter.getQueryParams(params);
      if (query['token'] != null) {
        this.token = query['token'];
        AdInsHelper.SetCookie(this.cookieService, CommonConstant.TOKEN, this.token);
      }

      await this.fetchIdentityProvider();

      if (query['code']) {
        const redirectUri = `${window.location.origin}/Pages/Login`;
        this.http.post(URLConstant.LoginByCode, {Code: query['code'], RedirectUri: redirectUri}, AdInsConstant.SpinnerOptions).subscribe({
          next: async (res) => {
            // if (res?.error) {
            //   return this.toastr.errorMessage(res['error_description']);
            // }

            console.log('Token', res);
            this.authService.token = res;
            const identity = this.authService.introspect(this.authService.token?.AccessToken);
            const AuthObj  = {Username: identity['preferred_username'], Password: ''};
            await this.getUserDetail(AuthObj?.Username, AuthObj?.Password);
          },
          error: err => {
            console.error('Error: ', err);
            this.toastr.errorMessage('Authentication failed!');
          }
        })
      }
    });

    if (AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS) != null) {
      this.router.navigate([NavigationConstant.DASHBOARD]);
    }
  }

  async ngOnInit() {
    if (this.token != null) {
      await this.http.post(URLConstant.LoginWithToken, { ModuleCode: environment.Module }, this.SpinnerOptions).toPromise().then(
        async (response) => {
          var DateParse = formatDate(response["Identity"].BusinessDt, 'yyyy/MM/dd', 'en-US');
          AdInsHelper.SetCookie(this.cookieService, "BusinessDateRaw", formatDate(response["Identity"].BusinessDt, 'yyyy/MM/dd', 'en-US'));
          AdInsHelper.SetCookie(this.cookieService, "BusinessDate", DateParse);
          AdInsHelper.SetCookie(this.cookieService, "UserAccess", JSON.stringify(response["Identity"]));
          AdInsHelper.SetCookie(this.cookieService, "Username", JSON.stringify(response["Identity"]["UserName"]));
          AdInsHelper.SetCookie(this.cookieService, CommonConstant.TOKEN, response['Token']);
          if(typeof response["Identity_JWT"] === 'string')
          {
              AdInsHelper.SetCookie(this.cookieService, CommonConstant.JWT_TOKEN, response["Identity_JWT"] ?? "");
          }
          else
          {
              AdInsHelper.SetCookie(this.cookieService, CommonConstant.JWT_TOKEN, "");              
          }
          AdInsHelper.SetLocalStorage(CommonConstant.ENVIRONMENT_MODULE, environment.Module);

          await this.http.post(URLConstant.GetAllActiveRefFormByRoleCodeAndModuleCode, { RoleCode: response["Identity"].RoleCode, ModuleCode: environment.Module }, { withCredentials: true }).toPromise().then(
            (response) => {
              AdInsHelper.SetLocalStorage(CommonConstant.MENU, JSON.stringify(response[CommonConstant.ReturnObj]));
              AdInsHelper.RedirectUrl(this.ngxRouter, [NavigationConstant.DASHBOARD], {});
            });
        }
      );
    }
    
    // Get  OTP Properties if not used iam integration
    if (!this.iamOptions.enabled) {
      this.http.post(URLConstant.GetOtpProperties, {}).subscribe(
        (response) => {
          this.otpProperties = response;
        }
      );
    }
  }

  private async fetchIdentityProvider() {
    await this.http.post(URLConstant.GetIdentityProviders, null, AdInsConstant.SpinnerOptions).subscribe({
      next: (response) => {
        // this.providers.push(...response['Providers']);
        const list: any[] = response['Providers'] || [];
        this.providers = list.sort((a, b) => a?.Order.localeCompare(b?.Order));
        console.log('Providers', this.providers);
      }
    });
  }

  loginWithProvider(authUrl: string) {
    const redirectUri = window.location.origin + '/Pages/Login';
    window.location.href = `${authUrl}&redirect_uri=${redirectUri}`;
  }

  async getUserDetail(username: string, password: string = '') {
    var requestObj = { "Username": username, "Password": password };
    await this.http.post(URLConstant.GetListJobTitleByUsernameAndModuleV2, {UserName : username, Module : environment.Module}, AdInsConstant.SpinnerOptions).toPromise().then(
      (response) => {
        this.loginObj.response = response;
      });
    
    this.loginObj.user = username;
    this.loginObj.pwd = password;
    
    await this.http.post<any>(URLConstant.GetUserEmpByUsername, requestObj).toPromise().then(
      async (response) => {
        this.result = response;
        if (this.result.IsNeedUpdatePassword) {
          this.toastr.warningMessage(ExceptionConstant.EXP_PASSWORD);
          this.router.navigate([NavigationConstant.PAGES_CHANGE_PASSWORD], { queryParams: { "Username": username } });
        }
        else {
          if (Boolean(this.otpProperties?.IsUseOtp)) {
            this.sendOtp();
          }
          else {
            this.selectRole();
          }
        }
      }
    );
  }

  async onSubmit(event) {
    event.preventDefault();
    const username = this.userInputRef.nativeElement.value;
    const password = this.userPassRef.nativeElement.value;
    var requestObj = { "Username": username, "Password": password };
    localStorage.setItem('AuthObj', JSON.stringify(requestObj));
    //this.rolePickService.openDialog(data.returnObject);

    const loginUrl = this.iamOptions.enabled ? URLConstant.LoginV4 : URLConstant.LoginV2;
    this.http.post(loginUrl, requestObj, AdInsConstant.SpinnerOptions).subscribe(
      async (response) => {
        if (response["StatusCode"] == CommonConstant.STATUS_CODE_USER_LOCKED) {
          this.mode = "locked";
          return;
        }

        console.log('Token @Login:', response);
        this.authService.token = response;
        await this.getUserDetail(username, password);
      }
    );
  }

  onSubmitOtp() {
    if (this.onGoingTimer >= this.otpProperties.ExpiredTimeOTP) {
      this.toastr.errorMessage("OTP code has expired, please regenerate OTP code!");
    }
    else if (this.otpInputRef.nativeElement.value != "") {
      let reqConfirmOtpObj = {
        Username: this.result.Username,
        Counter: this.counterOtp,
        InputOtp: this.otpInputRef.nativeElement.value,
        IsLastAttempt: this.otpConfirmCount >= this.otpProperties['MaxAttempOTP'] ? true : false
      }

      this.http.post<any>(URLConstant.ConfirmOtp, reqConfirmOtpObj).subscribe(
        (response) => {
          if (response.IsOtpMatch) {
            this.selectRole();
          }
          else {
            this.isInvalidOtp = true;
          }
          this.otpConfirmCount++;
        },
        (error) => {
          this.toastr.errorMessage(error);
        }
      );
    }
  }

  onRegenerateClick() {
    this.counterOtp = -1;
    this.sendOtp();
    this.isInvalidOtp = false;
  }

  // On Forgot password link click
  onForgotPassword() {
    this.router.navigate([NavigationConstant.PAGES_REQ_PASSWORD]);
  }
  // On registration link click
  onRegister() {
    this.router.navigate(['register'], { relativeTo: this.route.parent });
  }

  sendOtp(){
    this.http.post<any>(URLConstant.SendOtp, {Counter: this.counterOtp, Username: this.result.Username}).subscribe(
      (response) => {
        this.toastr.successMessage(response.msg);
        this.counterOtp = response.Counter;
        this.resetTimer();
        if (this.mode != "otp") {
          this.mode = "otp";
        }
      },
      (error) => {
        this.toastr.errorMessage(error);
      }
    );
  }

  selectRole() {
    this.rolePickService.openDialog(this.loginObj);
    
    // Sent Password expiration if not used iam integration
    if (!this.iamOptions.enabled) {
      let object2 = {
        Usernames: [
          this.loginObj.user
        ],
        Role: "",
        Message: "",
        Title: "Password Expiration",
        Type: "Notification"
      };
      this.http.post(URLConstant.SendNotificationRemainingPasswordExpirationDaysToUser, object2).subscribe();    
    }
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.onGoingTimer++
    }, 1000)
  }

  resetTimer() {
    clearInterval(this.timer);
    this.onGoingTimer = 0
    this.startTimer();
  }

  onClickShowPass() {
    this.showPass = !this.showPass;
  }
}
