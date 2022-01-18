import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerViewComponent } from '../customer-view.component';
import { CustomerViewCoyDetailComponent } from './customer-view-coy-detail.component';
import { CustomerViewCoyDetailXComponent } from 'app/impl/view/customer-view/customer-view-coy-detail/customer-view-coy-detail-x.component';
const routes: Routes = [
    {
        path: '',
        component: CustomerViewCoyDetailComponent,
    },
    {
        path: 'X',
        component: CustomerViewCoyDetailXComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CustomerViewCoyDetailRoutingModule { }


