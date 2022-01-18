import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerViewPersonalJobDataEmpComponent } from './customer-view-personal-job-data-emp.component';
import { CustomerViewPersonalJobDataEmpXComponent } from 'app/impl/view/customer-view/customer-view-personal-job-data-emp/customer-view-personal-job-data-emp-x.component';
const routes: Routes = [
    {
        path: '',
        component: CustomerViewPersonalJobDataEmpComponent,
    },
    {
        path: 'X',
        component: CustomerViewPersonalJobDataEmpXComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CustomerViewPersonalJobDataEmpRoutingModule { }


