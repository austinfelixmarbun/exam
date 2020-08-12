import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UcShowErrorsModule } from '@adins/uc-show-errors';
import { ContentPagesRoutingModule } from "app/pages/content-pages/content-pages-routing.module";
import { LoginPageComponent } from "app/pages/content-pages/login/login-page.component";
import { ChangePasswordComponent } from './change-password/change-password.component';
import { PagesComponent } from './pages/pages.component';
import { RequestNewPasswordComponent } from './request-new-password/request-new-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


@NgModule({
    imports: [
        CommonModule,
        ContentPagesRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        UcShowErrorsModule
    ],
    declarations: [
        LoginPageComponent,
        ChangePasswordComponent,
        PagesComponent,
        RequestNewPasswordComponent,
        ResetPasswordComponent
    ]
})
export class ContentPagesModule { }
