import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NegativeCustomerViewComponent } from './negative-customer-view.component';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: NegativeCustomerViewComponent,
        data: {
          title: 'Negative Customer View'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NegativeCustomerViewRoutingModule { }
