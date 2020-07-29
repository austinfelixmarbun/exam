import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from "app/pages/content-pages/login/login-page.component";
import { ChangePasswordComponent } from './change-password/change-password.component';
import { PagesComponent } from './pages/pages.component';
import { RequestNewPasswordComponent } from './request-new-password/request-new-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'content',
        component: PagesComponent,
        data: {
          title: 'Pages'
        }
      },
      {
        path: 'login',
        component: LoginPageComponent,
        data: {
          title: 'Login Page'
        }
      },
      {
        path: 'ChangePassword',
        component: ChangePasswordComponent,
        data: {
          title: 'Change Password Page'
        }
      },
      {
        path: 'RequestPassword',
        component: RequestNewPasswordComponent,
        data: {
          title: 'Request New Password Page'
        }
      },
      {
        path: 'ResetPassword/:code',
        component: ResetPasswordComponent,
        data: {
          title: 'Reset Password Page'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContentPagesRoutingModule { }
