import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerComponent } from 'app/customer/customer.component';

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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule { }
