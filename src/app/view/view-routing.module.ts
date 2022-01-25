import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PathConstant } from 'app/shared/PathConstant';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: PathConstant.VIEW_CUST,
        loadChildren: () => import('./customer-view/customer-view.module').then(m => m.CustomerViewModule)
      },
      {
        path: PathConstant.VIEW_VENDOR,
        loadChildren: () => import('./vendor/vendor-view.module').then(m => m.VendorViewModule)
      },
      {
        path: PathConstant.VIEW_NEG_CUST,
        loadChildren: () => import('./negative-customer-view/negative-customer-view.module').then(m => m.NegativeCustomerViewModule)
      },
      {
        path: PathConstant.VIEW_SRVY,
        loadChildren: () => import('./survey-order/survey-order-view.module').then(m => m.SurveyOrderViewModule)
      },
      {
        path: PathConstant.VIEW_CUST_EXPSR,
        loadChildren: () => import('./cust-exposure-view/cust-exposure-view.module').then(m => m.CustExposureViewModule)
      },
      {
        path: PathConstant.VIEW_SRVY_TASK,
        loadChildren: () => import('./survey-task-view/survey-task-view.module').then(m => m.SurveyTaskViewModule)
      },
      {
        path: PathConstant.VIEW_PEFINDO,
        loadChildren: () => import('./pefindo-view/pefindo-view.module').then(m => m.PefindoViewModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewRoutingModule { }
