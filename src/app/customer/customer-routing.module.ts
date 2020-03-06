import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { CustomerComponent } from 'app/customer/customer.component';
import { NegativeCustomerComponent } from './negative-customer/negative-customer.component';
import { NegativeCustomerDetailComponent } from './negative-customer/negative-customer-detail/negative-customer-detail.component';
import { CustomerPagingComponent } from './customer-paging/customer-paging.component';
import { CustomerPersonalMainInfoComponent } from './customer-personal/customer-personal-main-info/customer-personal-main-info.component';
import { CustomerPersonalDuplicateCheckComponent } from './customer-personal/customer-personal-duplicate-check/customer-personal-duplicate-check.component';
import { CustomerCompanyMainInfoComponent } from './customer-company/customer-company-main-info/customer-company-main-info.component';
import { CustomerCompanyDuplicateCheckComponent } from './customer-company/customer-company-duplicate-check/customer-company-duplicate-check.component';

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
      }, {
        path: 'CustomerPersonal/MainInfo',
        component: CustomerPersonalMainInfoComponent,
        data: {
          title: 'Customer Personal Main Info'
        }
      },
      {
        path: 'CustomerPersonal/DuplicateCheck',
        component: CustomerPersonalDuplicateCheckComponent,
        data: {
          title: 'Customer Personal Duplicate Check  '
        }
      },
      {
        path: 'CustomerCompany/MainInfo',
        component: CustomerCompanyMainInfoComponent,
        data: {
          title: 'Customer Company  Main Info  '
        }
      },
      {
        path: 'CustomerCompany/DuplicateCheck',
        component: CustomerCompanyDuplicateCheckComponent,
        data: {
          title: 'Customer Company DuplicateCheck  '
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
