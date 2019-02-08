import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd, NavigationStart } from "@angular/router";
import { AuthService } from 'app/shared/auth/auth.service';
import { UserService } from 'app/shared/auth/user.service';
import { formatDate } from '@angular/common';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent implements OnInit{
    @ViewChild('user') userInputRef: ElementRef;
    @ViewChild('pass') userPassRef: ElementRef;
    @ViewChild('f') loginForm: NgForm;
    private previousUrl: string;
    private currentUrl: string;
    jstoday = '';

    constructor(private router: Router,
        private route: ActivatedRoute, private Auth: AuthService, private user: UserService) {
        console.log('test')
        
        this.user.getSomeData().subscribe(data =>{
            if (data.success) {
            this.router.navigate(['dashboard/dash-board'])
            }else{
                this.router.navigate(['pages/login'])
            }
        })
    }

    ngOnInit() { 
        this.currentUrl = this.router.url;
        this.router.events.subscribe(event => {
            console.log(event)
        if (event instanceof NavigationEnd) {   
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
            this.user.getSomeData().subscribe(data =>{
                if (!data.success) {
                    this.router.navigate(['pages/login'])
                }
            });
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
                customKey : {
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
        // console.log(username, password);

        this.Auth.getuserDetails(username, password).subscribe(data =>{
        if (data['success']) {
            localStorage.setItem('currentUserContext', JSON.stringify(myObj));
            localStorage.setItem('pageAccess', JSON.stringify(pageAccess));
            //redirect the person to admin
            this.router.navigate(['dashboard/dash-board'])
            this.Auth.setLoggedIn(true)
        }else{
            window.alert(data['message'])
        }
        })
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