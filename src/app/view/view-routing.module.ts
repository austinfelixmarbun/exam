import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PathConstant } from 'app/shared/PathConstant';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: PathConstant.VIEW_CUST,
        loadChildren: './customer-view/customer-view.module#CustomerViewModule'
      },
      {
        path: PathConstant.VIEW_OFFERING,
        loadChildren: './prod-offering-view/prod-offering-view.module#ProdOfferingViewModule'
      },
      {
        path: PathConstant.VIEW_VENDOR,
        loadChildren: './vendor/vendor-view.module#VendorViewModule'
      },
      {
        path: PathConstant.VIEW_NEG_CUST,
        loadChildren: './negative-customer-view/negative-customer-view.module#NegativeCustomerViewModule'
      },
      {
        path: PathConstant.VIEW_PRODUCT_HO,
        loadChildren: './product-ho-view/product-ho-view.module#ProductHOViewModule'
      },
      {
        path: PathConstant.VIEW_SRVY,
        loadChildren: './survey-order/survey-order-view.module#SurveyOrderViewModule'
      },
      {
        path: PathConstant.VIEW_CUST_EXPSR,
        loadChildren: './cust-exposure-view/cust-exposure-view.module#CustExposureViewModule'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewRoutingModule { }
