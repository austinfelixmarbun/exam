
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from 'app/app-routing.module';
import { SharedModule } from "app/shared/shared.module";
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from 'app/app.component';
import { ContentLayoutComponent } from "app/layouts/content/content-layout.component";
import { FullLayoutComponent } from "app/layouts/full/full-layout.component";
import { AuthService } from 'app/shared/auth/auth.service';
import { AuthGuard } from 'app/shared/auth/auth-guard.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatDialogModule } from '@angular/material/dialog';

import * as $ from 'jquery';
import { HttpConfigInterceptor } from 'app/interceptor/httpconfig.interceptor';
import { ErrorDialogService } from 'app/error-dialog/error-dialog.service';
import { ErrorDialogComponent } from 'app/error-dialog/error-dialog.component';
import { RolepickComponent } from 'app/shared/rolepick/rolepick.component';
import { RolePickService } from 'app/shared/rolepick/rolepick.service';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CookieModule } from 'ngx-cookie';
import { StorageService } from './shared/services/StorageService';
import { NGXToastrService } from './components/extra/toastr/toastr.service';
import { ClaimTaskService } from './shared/claimTask.service';
import { AdInsSharedModule } from './components/adins-module/adins-shared.module';
import { EnviConfigService } from './shared/services/enviConfig.service';
import { UrlConstantService } from './shared/services/urlConstant.service';
import { UrlConstantNew } from './shared/constant/URLConstantNew';
import { ClipboardModule } from 'ngx-clipboard'
import { ApprovalTaskService } from './shared/services/ApprovalTask.service';
import { AddressService } from './shared/services/custAddr.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UcdropdownsearchModule } from '@adins/ucdropdownsearch';
import { RolePickNewService } from './shared/rolepick/rolepick-new.service';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const enviConfig = (config: EnviConfigService) => {
    return () => {
        return config.loadConfig();
    }
}

const urlConstantConfig = (urlConfig: UrlConstantService) => {
    return () => {
        return urlConfig.loadConfig();
    }
}


@NgModule({
    declarations: [
        AppComponent,
        FullLayoutComponent,
        ContentLayoutComponent,
        ErrorDialogComponent,
        RolepickComponent,
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule.withServerTransition({ appId: 'serverApp' }),
        AppRoutingModule,
        NgxSpinnerModule,
        SharedModule,
        AdInsSharedModule,
        HttpClientModule,
        ToastrModule.forRoot(),
        NgbModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
        CookieModule.forRoot(),
        MatDialogModule,
        BrowserAnimationsModule,
        ClipboardModule,
        FormsModule,
        ReactiveFormsModule,
        UcdropdownsearchModule,
        NgMultiSelectDropDownModule.forRoot()
    ],
    providers: [
        AuthService,
        AuthGuard,
        ErrorDialogService,
        RolePickService,
        RolePickNewService,
        StorageService,
        NGXToastrService,
        ClaimTaskService,
        ApprovalTaskService,
        AddressService,
        // UrlConstantNew,
        // EnviConfigService,
        // {
        //     provide: APP_INITIALIZER, useFactory: appConfig, multi: true, deps: [EnviConfigService]
        // },
        // UrlConstantService,
        // {
        //     provide: APP_INITIALIZER, useFactory: urlConstantConfig, multi: true, deps: [UrlConstantService]
        // },
        { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor() {
    }
}
