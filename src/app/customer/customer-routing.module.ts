import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { CustomerComponent } from 'app/customer/customer.component';
import { NegativeCustomerComponent } from './negative-customer/negative-customer.component';
import { NegativeCustomerDetailComponent } from './negative-customer/negative-customer-detail/negative-customer-detail.component';
import { CustomerPagingComponent } from './customer-paging/customer-paging.component';
import { CustomerPersonalMainInfoComponent } from './customer-personal/customer-personal-main-info/customer-personal-main-info.component';

const routes: Routes = [
  {
    path: '',
    children: [

      {
        path: 'Paging',
        component: CustomerPagingComponent,
        data: {
          title: 'Customer Paging'
        }
      },
      {
        path: 'CustomerPersonal/MainInfo',
        component: CustomerPersonalMainInfoComponent,
        data: {
          title: 'Customer Personal Detail  '
        }
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule { }
