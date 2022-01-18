import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerViewComponent } from '../customer-view.component';
import { CustomerViewPersonalJobDataComponent } from './customer-view-personal-job-data.component';
import { CustomerViewPersonalJobDataXComponent } from 'app/impl/view/customer-view/customer-view-personal-job-data/customer-view-personal-job-data-x.component';
const routes: Routes = [
    {
        path: '',
        component: CustomerViewPersonalJobDataComponent,
    },
    {
        path: 'X',
        component: CustomerViewPersonalJobDataXComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CustomerViewPersonalJobDataRoutingModule { }


