import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerViewCoyFinancialComponent } from './customer-view-coy-financial.component';
import {
  CustomerViewCoyFinancialXComponent
} from 'app/impl/view/customer-view/customer-view-coy-financial/customer-view-coy-financial-x.component';
const routes: Routes = [
    {
        path: '',
        component: CustomerViewCoyFinancialComponent,
    },
    {
      path: 'x',
      component: CustomerViewCoyFinancialXComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CustomerViewCoyFinancialRoutingModule { }


