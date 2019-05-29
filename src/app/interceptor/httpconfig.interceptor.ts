import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse,
    HttpHeaders
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError, finalize } from 'rxjs/operators';
import { HttpRequestObj } from 'app/shared/model/HttpRequestObj.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { formatDate } from '@angular/common';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { format } from 'util';
import { environment } from 'environments/environment.prod';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { AdInsErrorMessage } from 'app/shared/AdInsErrorMessage';
import { ErrorDialogService } from 'app/error-dialog/error-dialog.service';
import { Router } from '@angular/router';


@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
    count = 0;
    constructor(public errorDialogService: ErrorDialogService, private spinner: NgxSpinnerService, private router: Router) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(request);
        if (request.method == "POST" && (request.body == null || request.body.isLoading == true)) {
            this.spinner.show();
        }
        this.count++;
        var httpRequest = new HttpRequestObj();
        console.log("HTTP Interceptor");
        //console.log(request);
        var currentUserContext = JSON.parse(localStorage.getItem("UserContext"));
        var userAcc = JSON.parse(localStorage.getItem("UserAccess"));
        var token: string = "";
        var myObj;
        let today = new Date();
        var businessDt = formatDate(today, 'yyyy-MM-dd', 'en-US');

        var checkSession = AdInsHelper.CheckSessionTimeout();
        if (checkSession == "1") {
            // this.errorDialogService.openDialog(AdInsErrorMessage.SessionTimeout);
            this.spinner.hide();
            this.router.navigate(["/pages/login"]);
        }

        if (request.url.includes("Add") || request.url.includes("Edit") || request.url.includes("Delete")) {
            var n = request.url.lastIndexOf("/");
            var oldPath = request.url.substring(n+1);
        } else {
            var oldPath = "-";
        }

        //Ini kalau buat Login belom punya Current User Contexts
        if (request.url == "http://r3app-server/foundation/UserManagement/HTML5Login") {
            if (currentUserContext != null) {
                token = localStorage.getItem("Token");
                myObj = {
                    UserName: localStorage.getItem("Username"),
                    Role: currentUserContext.Role,
                    Office: currentUserContext.Office,
                    SendDateTime: businessDt,
                    Ip: localStorage.getItem("LocalIp"),
                    RequestObject: request.body,
                    UserLog: JSON.parse(localStorage.getItem("PageAccess")),
                    Token: token,
                    Method: oldPath
                };
            }
            else {
                myObj = {
                    Role: null,
                    Office: null,
                    SendDateTime: businessDt,
                    UserName: localStorage.getItem("Username"),
                    Ip: localStorage.getItem("LocalIp"),
                    RequestObject: request.body,
                    UserLog: JSON.parse(localStorage.getItem("PageAccess"))
                };
            }
        } else {
            if (currentUserContext != null) {
                token = localStorage.getItem("Token");
                myObj = {
                    UserName: currentUserContext.UserName,
                    Role: currentUserContext.Role,
                    Office: currentUserContext.Office,
                    SendDateTime: businessDt,
                    Ip: localStorage.getItem("LocalIp"),
                    RequestObject: request.body,
                    UserLog: JSON.parse(localStorage.getItem("PageAccess")),
                    Token: token
                };
            }
            else {
                myObj = {
                    Role: null,
                    Office: null,
                    SendDateTime: businessDt,
                    UserName: localStorage.getItem("Username"),
                    Ip: localStorage.getItem("LocalIp"),
                    RequestObject: request.body,
                    UserLog: JSON.parse(localStorage.getItem("PageAccess"))
                };
            }
        }


        if (token != "") {
            request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
        }

        if (!request.headers.has('Content-Type')) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }
        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
        request = request.clone({ headers: request.headers.set('Authentication', 'my-authentication') });
        request = request.clone({ headers: request.headers.set('Access-Control-Allow-Origin', '*') });
        request = request.clone({ headers: request.headers.set('Access-Control-Allow-Credentials', 'true') });
        request = request.clone({ headers: request.headers.set('Access-Control-Allow-Methods', 'POST') });
        request = request.clone({ headers: request.headers.set('Access-Control-Allow-Headers', 'Content-Type,Accept,Authorization') });
        request = request.clone({ body: myObj });
        AdInsHelper.InsertLog(request.url, "API", request.body);
        console.log(JSON.stringify(request.body));
        if (request.url.includes("Add") || request.url.includes("Edit") || request.url.includes("Delete")) {
            var q = "AddQueue";
            var url = request.url;
            var n = url.lastIndexOf("/");
            var envi = url.substring(0,n+1);
            var newUrl = envi.concat(q);

            var req = request.clone({url: newUrl});
        } else {
            var req = request;
        }
        return next.handle(req).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    if (event.body.isError == true) {
                        let data = {};
                        data = {
                            reason: event.body.message ? event.body.message : '',
                            status: event.body.statusCode
                        };
                        this.errorDialogService.openDialog(data);
                        //Kalau balikan dari Server error, lgsg return aja, biar g lanjut lagi
                        return;
                    }
                    else {
                        //Kalau pake Http Get yang bukan ke Backend sendiri g punya token, jadi g boleh asal di replace
                        if (event.body.token == undefined) {
                            localStorage.setItem("Token", localStorage.getItem("Token"));
                        }
                        else {
                            localStorage.setItem("Token", event.body.token);
                        }

                    }
                    // this.errorDialogService.openDialog(event);
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                let data = {};
                data = {
                    reason: error && error.error.Message ? error.error.Message : '',
                    status: error.status
                };
                this.errorDialogService.openDialog(data);
                console.log(JSON.stringify(request.body));
                return throwError(error);
            }), finalize(() => {
                this.count--;

                if (this.count == 0) {
                    if (request.method == "POST") {
                        AdInsHelper.ClearPageAccessLog();
                        this.spinner.hide();
                    }
                }
            })
        );
    }
}