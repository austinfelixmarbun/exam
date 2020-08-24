import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'Customer',
        loadChildren: './customer-view/customer-view.module#CustomerViewModule'
      },
      {
        path: 'Offering',
        loadChildren: './prod-offering-view/prod-offering-view.module#ProdOfferingViewModule'
      },
      {
        path: 'Vendor',
        loadChildren: './vendor/vendor-view.module#VendorViewModule'
      },
      {
        path: 'NegativeCustomer',
        loadChildren: './negative-customer-view/negative-customer-view.module#NegativeCustomerViewModule'
      },
      {
        path: 'ProductHO',
        loadChildren: './product-ho-view/product-ho-view.module#ProductHOViewModule'
      },
      {
        path: 'Survey',
        loadChildren: './survey-order/survey-order-view.module#SurveyOrderViewModule'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewRoutingModule { }
