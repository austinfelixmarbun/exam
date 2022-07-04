import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerViewPersonalFinancialDataXComponent } from 'app/impl/view/customer-view/customer-view-personal-financial-data/customer-view-personal-financial-data-x.component';
import { CustomerViewPersonalFinancialDataComponent } from './customer-view-personal-financial-data.component';
const routes: Routes = [
    {
        path: '',
        component: CustomerViewPersonalFinancialDataComponent,
    },
    {
        path: 'X',
        component: CustomerViewPersonalFinancialDataXComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CustomerViewPersonalFinancialDataRoutingModule { }


