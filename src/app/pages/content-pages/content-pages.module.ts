import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from '@angular/forms';

import { ContentPagesRoutingModule } from "app/pages/content-pages/content-pages-routing.module";
import { LoginPageComponent } from "app/pages/content-pages/login/login-page.component";
import { ChangePasswordComponent } from './change-password/change-password.component';
import { PagesComponent } from './pages/pages.component';


@NgModule({
    imports: [
        CommonModule,
        ContentPagesRoutingModule,
        FormsModule        
    ],
    declarations: [
        LoginPageComponent,
        ChangePasswordComponent,
        PagesComponent
    ]
})
export class ContentPagesModule { }
