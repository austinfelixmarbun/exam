import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';

import { ContentPagesRoutingModule } from "app/pages/content-pages/content-pages-routing.module";

import { ComingSoonPageComponent } from "app/pages/content-pages/coming-soon/coming-soon-page.component";
import { ErrorPageComponent } from "app/pages/content-pages/error/error-page.component";
import { ForgotPasswordPageComponent } from "app/pages/content-pages/forgot-password/forgot-password-page.component";
import { LockScreenPageComponent } from "app/pages/content-pages/lock-screen/lock-screen-page.component";
import { LoginPageComponent } from "app/pages/content-pages/login/login-page.component";
import { MaintenancePageComponent } from "app/pages/content-pages/maintenance/maintenance-page.component";
import { RegisterPageComponent } from "app/pages/content-pages/register/register-page.component";


@NgModule({
    imports: [
        CommonModule,
        ContentPagesRoutingModule,
        FormsModule        
    ],
    declarations: [
        ComingSoonPageComponent,
        ErrorPageComponent,
        ForgotPasswordPageComponent,
        LockScreenPageComponent,
        LoginPageComponent,
        MaintenancePageComponent,
        RegisterPageComponent
    ]
})
export class ContentPagesModule { }
