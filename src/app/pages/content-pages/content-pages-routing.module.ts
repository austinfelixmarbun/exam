import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComingSoonPageComponent } from "app/pages/content-pages/coming-soon/coming-soon-page.component";
import { ErrorPageComponent } from "app/pages/content-pages/error/error-page.component";
import { ForgotPasswordPageComponent } from "app/pages/content-pages/forgot-password/forgot-password-page.component";
import { LockScreenPageComponent } from "app/pages/content-pages/lock-screen/lock-screen-page.component";
import { LoginPageComponent } from "app/pages/content-pages/login/login-page.component";
import { MaintenancePageComponent } from "app/pages/content-pages/maintenance/maintenance-page.component";
import { RegisterPageComponent } from "app/pages/content-pages/register/register-page.component";


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'comingsoon',
        component: ComingSoonPageComponent,
        data: {
          title: 'Coming Soon page'
        }
      },
      {
        path: 'error',
        component: ErrorPageComponent,
        data: {
          title: 'Error Page'
        }
      },
      {
        path: 'forgotpassword',
        component: ForgotPasswordPageComponent,
        data: {
          title: 'Forgot Password Page'
        }
      },   
      
      {
        path: 'lockscreen',
        component: LockScreenPageComponent,
        data: {
          title: 'Lock Screen page'
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
        path: 'maintenance',
        component: MaintenancePageComponent,
        data: {
          title: 'Maintenance Page'
        }
      },
      {
        path: 'register',
        component: RegisterPageComponent,
        data: {
          title: 'Register Page'
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
