import { Injectable } from '@angular/core';
import { ErrorDialogService } from '../error-dialog/error-dialog.service';
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


@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
    count = 0;
    constructor(public errorDialogService: ErrorDialogService,private spinner: NgxSpinnerService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("Interceptor In");
        if(request.method=="POST")
        {
            this.spinner.show();
        }
        this.count++;
        var httpRequest = new HttpRequestObj();
        console.log("Request Interceptor");
        console.log(request);
        var currentUserContext = JSON.parse(localStorage.getItem("UserContext"));
        var token : string = "";
        var myObj;
        let today = new Date();
        var businessDt = formatDate(today, 'yyyy-MM-dd', 'en-US');
        //Ini kalau buat Login belom punya Current User Contexts
        if(currentUserContext != null)
        {
            token = localStorage.getItem("Token");
            myObj = {
                UserName: currentUserContext.UserName,
                Role: currentUserContext.Role,
                Office: currentUserContext.Office,
                SendDateTime: currentUserContext.BusinessDate,
                Ip:localStorage.getItem("IP"),
                RequestObject: request.body
              };
        }
        else{
            myObj = {
                SendDateTime:businessDt,
                Ip:localStorage.getItem("IP"),
                RequestObject: request.body
            };
        }
        
      
        if (token != "") {
            request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
        }

        if (!request.headers.has('Content-Type')) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }
        console.log("Request Object Interceptor: " );
        console.log(JSON.stringify(myObj))
        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
        request = request.clone({ headers: request.headers.set('Authentication', 'my-authentication') });
        request = request.clone({ headers: request.headers.set('Access-Control-Allow-Origin', '*') });
        request = request.clone({ headers: request.headers.set('Access-Control-Allow-Credentials', 'true') });
        request = request.clone({ headers: request.headers.set('Access-Control-Allow-Methods', 'POST') });
        request = request.clone({ headers: request.headers.set('Access-Control-Allow-Headers', 'Content-Type,Accept,Authorization') });
        request = request.clone({body: myObj});
        console.log(request)
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    if (event.body.isError == true) {
                        let data = {};
                        data = {
                            reason: event.body.message ? event.body.message : '',
                            status: event.body.statusCode
                        };
                        this.errorDialogService.openDialog(data);
                    }
                    else{
                        if(event.body.token==undefined)
                        {
                            localStorage.setItem("Token",localStorage.getItem("Token"));
                        }
                        else{
                            localStorage.setItem("Token",event.body.token); 
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
                console.log(error);
                return throwError(error);
            }),finalize(() => {
                this.count--;
                if ( this.count == 0 ) {
                    if(request.method=="POST")
                    {
                        this.spinner.hide ();
                    }
                }
            })
            );
    }
}