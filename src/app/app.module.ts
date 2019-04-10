
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from 'app/app-routing.module';
import { SharedModule } from "app/shared/shared.module";
import { ToastrModule } from 'ngx-toastr';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { StoreModule } from '@ngrx/store';
import { DragulaModule } from 'ng2-dragula';

import { AppComponent } from 'app/app.component';
import { ContentLayoutComponent } from "app/layouts/content/content-layout.component";
import { FullLayoutComponent } from "app/layouts/full/full-layout.component";

import { AuthService } from 'app/shared/auth/auth.service';
import { AuthGuard } from 'app/shared/auth/auth-guard.service';
import { StorageServiceModule } from 'angular-webstorage-service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatDialogModule } from '@angular/material';

import * as $ from 'jquery';
import { UserMaintenanceComponent } from 'app/user/user-maintenance/user-maintenance.component';
import { HttpModule } from '@angular/http';
import { HttpConfigInterceptor } from 'app/interceptor/httpconfig.interceptor';
import { ErrorDialogService } from 'app/error-dialog/error-dialog.service';
import { ErrorDialogComponent } from 'app/error-dialog/error-dialog.component';
import { RolepickComponent } from 'app/shared/rolepick/rolepick.component';
import { RolePickService } from 'app/shared/rolepick/rolepick.service';
import { environment } from 'environments/environment.prod';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { subscribeOn } from 'rxjs/operators';
import { DatePipe, formatDate } from '@angular/common';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { GrowlModule } from 'primeng/primeng';


export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        FullLayoutComponent,
        ContentLayoutComponent,
        UserMaintenanceComponent,
        ErrorDialogComponent,
        RolepickComponent
    ],
    imports: [
        HttpModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({}),
        AppRoutingModule,
        NgxSpinnerModule,
        SharedModule,
        DragulaModule.forRoot(),
        HttpClientModule,
        ToastrModule.forRoot(),
        NgbModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyBr5_picK8YJK7fFR2CPzTVMj6GG1TtRGo'
        }),
        StorageServiceModule,
        MatDialogModule,
        BrowserAnimationsModule,
        GrowlModule
    ],
    providers: [
        AuthService,
        AuthGuard,
        ErrorDialogService,
        RolePickService,
        { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
    ],
    bootstrap: [AppComponent],
    entryComponents: [ErrorDialogComponent, RolepickComponent]
})
export class AppModule {
    constructor(private http: HttpClient,
        private errorDialogService: ErrorDialogService) {

        // localStorage.setItem("LocalIp", window.location.origin);
        // console.log(window.location.origin); // 192.168.0.122

        var url = environment.coreUrl + AdInsConstant.GetBusinessDt;
        this.http.post(url, null).subscribe(
            (response) => {
                var datePipe = new DatePipe("en-US");
                var value = datePipe.transform(response["returnObject"], 'dd-MM-yyyy');
                localStorage.setItem("BusinessDate", value);
            },
            (error) => {

            }
        )
    }
}
