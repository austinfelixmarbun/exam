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
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  providers: [RolePickService, NGXToastrService]
})

export class LoginPageComponent implements OnInit {
  @ViewChild('user') userInputRef: ElementRef;
  @ViewChild('pass') userPassRef: ElementRef;
  @ViewChild('otp') otpInputRef: ElementRef;
  @ViewChild('f') loginForm: NgForm;
  private apiUrl: string;
  IsNeedUpdate: boolean;
  FoundationR3Url: string;
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
    response: "",
    user: "",
    pwd: ""
  };
  isInvalidOtp: boolean = false;

  constructor(private router: Router, private http: HttpClient, public rolePickService: RolePickService,
    private route: ActivatedRoute, private currentUserContextService: CurrentUserContextService, private cookieService: CookieService,
    private toastr: NGXToastrService) {
    //Ini buat check klo misal udah login jadi lgsg lempar ke tempat laennya lagi

    this.version = localStorage.getItem(CommonConstant.VERSION);
    this.route.queryParams.subscribe(params => {
      if (params['token'] != null) {
        this.token = params['token'];
      }
    });

    if (AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS) != null) {
      this.router.navigate([NavigationConstant.DASHBOARD]);
    }
  }

  ngOnInit() {
    this.FoundationR3Url = environment.FoundationR3Url;

    if (this.token != null) {
      this.http.post(AdInsConstant.LoginWithToken, {ModuleCode: environment.Module},  {withCredentials: true}).subscribe(
        (response) => {
          this.router.navigate([NavigationConstant.DASHBOARD]);
        }
      );
    }
    else{
      this.http.post(URLConstant.GetOtpProperties, {}).subscribe(
        (response) => {
          this.otpProperties = response;
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
    //this.rolePickService.openDialog(data.returnObject);
    this.http.post(this.apiUrl, requestObj).subscribe(
      (response) => {
        if (response["StatusCode"] == CommonConstant.STATUS_CODE_USER_LOCKED) {
          this.mode = "locked";
        }
        else {
          //this.cookieService.put("username", username);
          this.loginObj = {
            response: response[CommonConstant.ReturnObj],
            user: username,
            pwd: password
          };
          this.http.post<any>(URLConstant.GetUserEmpByUsername, requestObj).subscribe(
            (response) => {
              this.result = response;
              if (this.result.IsNeedUpdatePassword) {
                this.router.navigate([NavigationConstant.PAGES_CHANGE_PASSWORD], { queryParams: { "Username": username } });
              }
              else {
                if(this.otpProperties['IsUseOtp']){
                  this.sendOtp();
                }
                else{
                  this.selectRole();
                }
              }
            }
          )
        };
      }
    );
  }

  onSubmitOtp(){
    if(this.onGoingTimer >= this.otpProperties.ExpiredTimeOTP){
      this.toastr.errorMessage("OTP code has expired, please regenerate OTP code!"); 
    }
    else if(this.otpInputRef.nativeElement.value != ""){
      let reqConfirmOtpObj = {
        Username:this.result.Username, 
        Counter: this.counterOtp,
        InputOtp: this.otpInputRef.nativeElement.value,
        IsLastAttempt: this.otpConfirmCount >= this.otpProperties['MaxAttempOTP'] ? true : false
      }

      this.http.post<any>(URLConstant.ConfirmOtp, reqConfirmOtpObj).subscribe(
        (response) => {
          if(response.IsOtpMatch){
            this.selectRole();
          }
          else{
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

  onRegenerateClick(){
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
        if(this.mode != "otp"){
          this.mode = "otp";
        }
      },
      (error) => {
        this.toastr.errorMessage(error);
      }
    );
  }

  selectRole(){
    this.rolePickService.openDialog(this.loginObj);
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

  startTimer() {
    this.timer = setInterval(() => {
      this.onGoingTimer++
    },1000)
  }

  resetTimer(){
    clearInterval(this.timer);
    this.onGoingTimer = 0
    this.startTimer();
  }
}
