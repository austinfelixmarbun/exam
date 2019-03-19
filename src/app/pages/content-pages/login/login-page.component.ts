import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd, NavigationStart } from "@angular/router";
import { AuthService } from 'app/shared/auth/auth.service';
import { formatDate, getLocaleDateTimeFormat } from '@angular/common';
import { AdInsServiceService } from 'app/ad-ins-service.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { environment } from '../../../../environments/environment';
import { CurrentUserContext } from 'app/shared/model/CurrentUserContext.model';
import { CurrentUserContextService } from 'app/shared/CurrentUserContext/current-user-context.service';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { RolePickService } from 'app/shared/rolepick/rolepick.service';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss'],
    providers:[RolePickService]
})

export class LoginPageComponent implements OnInit {
    @ViewChild('user') userInputRef: ElementRef;
    @ViewChild('pass') userPassRef: ElementRef;
    @ViewChild('f') loginForm: NgForm;
    private previousUrl: string;
    private currentUrl: string;
    private apiUrl: string;
    foundationUrl: string;
    jstoday = '';

    constructor(private router: Router, private currentUserContextService: CurrentUserContextService,
        private http: HttpClient,
        public rolePickService : RolePickService,
        private route: ActivatedRoute, private Auth: AuthService, private adInsService: AdInsServiceService) {
        console.log('Constructor Login');
        //Ini buat check klo misal udah login jadi lgsg lempar ke tempat laennya lagi
        if(localStorage.getItem("UserContext"!)!="")
        {
            this.router.navigate(['dashboard/dash-board']);
        }

    }

    ngOnInit() {
        console.log("Init Login");
        this.foundationUrl = environment.foundationUrl;
        this.currentUrl = this.router.url;
        this.router.events.subscribe(event => {
            console.log(event);
            if (event instanceof NavigationEnd) {
                console.log("Event Init");
                let today = new Date();
                this.previousUrl = this.currentUrl;
                this.currentUrl = event.url;
                this.jstoday = formatDate(today, 'dd-MM-yyyy hh:mm:ss a', 'en-US');

                var pageAccess = {
                    prevUrl: this.previousUrl,
                    currUrl: this.currentUrl,
                    bussinessDt: this.jstoday
                }
                localStorage.setItem('pageAccess', JSON.stringify(pageAccess));
            };
            if (event instanceof NavigationStart) {
                // this.user.getSomeData().subscribe(data =>{
                //     if (!data.success) {
                //         this.router.navigate(['pages/login'])
                //     }
                // });
            }
        });
    }
    onSubmit(event) {
        // this.loginForm.reset();
        event.preventDefault();
        const target = event.target;
        const username = this.userInputRef.nativeElement.value;
        const password = this.userPassRef.nativeElement.value;
        var myObj = {
            one: {
                title: 'first',
                id: 1,
                customKey: {
                    first: "first",
                    second: "second"
                }
            },
            two: {
                title: 'second',
                id: 2
            },
            three: {
                title: 'this is the third',
                id: 3
            }
        };
        var pageAccess = {
            prevUrl: '',
            currUrl: '',
            bussinessDt: ''
        };
        this.apiUrl = this.foundationUrl + AdInsConstant.Login;
        var requestObj = { "Username": username, "Password": password };

        var currentUserContext = new CurrentUserContext;
        let today = new Date();
        var businessDt = formatDate(today, 'yyyy-MM-dd', 'en-US')
        this.http.post(this.apiUrl, requestObj).subscribe(
            (response) => {
                console.log(response);
                currentUserContext.UserName = username;
                //currentUserContext.Office = "HO";
                //currentUserContext.Role = "SUPUSR";
                currentUserContext.BusinessDate = businessDt;
                localStorage.setItem("Username",username);
                //this.currentUserContextService.addCurrentUserContext(currentUserContext);
                //localStorage.setItem("ListRole",)
                var object = response["returnObject"];
                console.log(object);
                this.rolePickService.openDialog(object);
                //this.router.navigate(['dashboard/dash-board']);

            },
            (error) => {
                console.log("Error");
                console.log(error);
            }
        );
        // var currentUserContext = new CurrentUserContext;
        // let today = new Date();
        // var businessDt = formatDate(today, 'yyyy-MM-dd', 'en-US')
        // if ("Admin" == username && "Admin" == password) {
        //     currentUserContext.UserName = username;
        //     currentUserContext.Office = "HO";
        //     currentUserContext.Role = "SUPUSR";
        //     currentUserContext.BusinessDate = businessDt;
        //     currentUserContext.TokenId = "dbbbf15f-2360-3a32-b6e9-2373d8b5556b";
        //     this.currentUserContextService.addCurrentUserContext(currentUserContext);
        //     this.router.navigate(['dashboard/dash-board']);
        // }
        // else {
        //     window.alert('Login Failed');
        // }

    }
    // On Forgot password link click
    onForgotPassword() {
        this.router.navigate(['forgotpassword'], { relativeTo: this.route.parent });
    }
    // On registration link click
    onRegister() {
        this.router.navigate(['register'], { relativeTo: this.route.parent });
    }
}