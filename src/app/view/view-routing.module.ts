import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerViewComponent } from './customer-view/customer-view.component';
import { ProductOfferingViewComponent } from './prod-offering-view/product-offering-view.component';
import { VendorBranchViewComponent } from './vendor-branch-view/vendor-branch-view.component';
import { VendorHoldingViewComponent } from './vendor-holding-view/vendor-holding-view.component';
import { VendorHoInfoComponent } from './vendor-ho-info/vendor-ho-info.component';
import { NegativeCustomerViewComponent } from './negative-customer-view/negative-customer-view.component';
import { ProductHOViewComponent } from './product-ho-view/product-ho-view.component';
import { SurveyOrderViewComponent } from './survey-order-view/survey-order-view.component';
import { SurveyTaskViewComponent } from './survey-task-view/survey-task-view.component';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'Dummy',
        // component: DocSignerComponent,
        data: {
          title: 'Document'
        }
      },
      {
        path: 'Customer',
        component: CustomerViewComponent,
        data: {
          title: 'Customer View'
        }
      },
      {
        path: 'Offering',
        component: ProductOfferingViewComponent,
        data: {
          title: 'Offering View'
        }
      },
      {
        path: 'VendorBranch',
        component: VendorBranchViewComponent,
        data: {
          title: 'Vendor Branch View'
        }
      },
      {
        path: 'VendorHolding',
        component: VendorHoldingViewComponent,
        data: {
          title: 'Vendor Holding View'
        }
      },
      {
        path: 'VendorHO',
        component: VendorHoInfoComponent,
        data: {
          title: 'Vendor HO View'
        }
      },  
      {
        path: 'NegativeCustomer',
        component: NegativeCustomerViewComponent,
        data: {
          title: 'Negative Customer View'
        }
      },
      {
        path: 'ProductHO',
        component: ProductHOViewComponent,
        data: {
          title: 'Product HO View'
        }
      },
      {
        path: 'SurveyOrder',
        component: SurveyOrderViewComponent,
        data: {
          title: 'Survey Order View'
        }
      },
      {
        path: 'SurveyTask',
        component: SurveyTaskViewComponent,
        data: {
          title: 'Survey Task View'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewRoutingModule { }
