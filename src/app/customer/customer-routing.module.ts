import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerComponent } from 'app/customer/customer.component';
import { NegativeCustomerComponent } from './negative-customer/negative-customer.component';
import { NegativeCustomerDetailComponent } from './negative-customer/negative-customer-detail/negative-customer-detail.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: CustomerComponent,
        data: {
          title: 'Customer'
        },
      },
      {
        path: 'NegativeCustomer/Paging',
        component: NegativeCustomerComponent,
        data: {
          title: 'Negative Customer'
        },
      },
      {
        path: 'NegativeCustomer/Detail',
        component: NegativeCustomerDetailComponent,
        data: {
          title: 'Negative Customer Detail'
        },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule { }
