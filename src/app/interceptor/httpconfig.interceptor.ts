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


@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
    count = 0;
    constructor(public errorDialogService: ErrorDialogService,private spinner: NgxSpinnerService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // if (request.body == null || request.body.isLoading == null || request.body.isLoading == true) {
        //     this.spinner.show();
        // }
        this.spinner.show();
        this.count++;
        var httpRequest = new HttpRequestObj();
        var currentUserContext = JSON.parse(localStorage.getItem("UserContext"));
        const token: string = currentUserContext.TokenId;
          httpRequest.UserName = currentUserContext.UserName;
          httpRequest.Role = currentUserContext.Role;
          httpRequest.Office = currentUserContext.Office;
          httpRequest.SendDateTime = currentUserContext.BusinessDate;
      
        if (token) {
            request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
        }

        if (!request.headers.has('Content-Type')) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }

        var myObj = {
            UserName: currentUserContext.UserName,
            Role: currentUserContext.Role,
            Office: currentUserContext.Office,
            SendDateTime: currentUserContext.BusinessDate,
            RequestObject: request.body
          }
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
                    console.log('event--->>>', event);
                    // this.errorDialogService.openDialog(event);
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                let data = {};
                data = {
                    reason: error && error.error.reason ? error.error.reason : '',
                    status: error.status
                };
                this.errorDialogService.openDialog(data);
                return throwError(error);
            }),finalize(() => {
                this.count--;
                if ( this.count == 0 ) this.spinner.hide ()
            })
            );
    }
}