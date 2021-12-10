import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerViewCoyManagementXComponent } from 'app/impl/view/customer-view/customer-view-coy-management/customer-view-coy-management-x.component';
import { CustomerViewCoyManagementComponent } from './customer-view-coy-management.component';
const routes: Routes = [
    {
        path: 'X',
        component: CustomerViewCoyManagementXComponent,
    },
    {
        path: '',
        component: CustomerViewCoyManagementComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class  CustomerViewCoyManagementRoutingModule { }


