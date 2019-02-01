import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from 'app/shared/auth/auth.service';
import { UserService } from 'app/shared/auth/user.service';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})

export class LoginPageComponent implements OnInit{
    @ViewChild('user') userInputRef: ElementRef;
    @ViewChild('pass') userPassRef: ElementRef;
    @ViewChild('f') loginForm: NgForm;

    constructor(private router: Router,
        private route: ActivatedRoute, private Auth: AuthService, private user: UserService) {
        console.log('test')
        
        this.user.getSomeData().subscribe(data =>{
            if (data.success) {
            this.router.navigate(['dashboard/dashboard1'])
            }else{
                this.router.navigate(['pages/login'])
            }
        })
    }

    ngOnInit() { }   
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
        // console.log(username, password);

        this.Auth.getuserDetails(username, password).subscribe(data =>{
        if (data['success']) {
            localStorage.setItem('currentUserContext', JSON.stringify(myObj));
            //redirect the person to admin
            this.router.navigate(['dashboard/dashboard1'])
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