import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerViewPersonalJobDataSmeComponent } from './customer-view-personal-job-data-sme.component';
import { CustomerViewPersonalJobDataSmeXComponent } from 'app/impl/view/customer-view/customer-view-personal-job-data-sme/customer-view-personal-job-data-sme-x.component';
const routes: Routes = [
    {
        path: '',
        component: CustomerViewPersonalJobDataSmeComponent,
    },
    {
        path: 'X',
        component: CustomerViewPersonalJobDataSmeXComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CustomerViewPersonalJobDataSmeRoutingModule { }


