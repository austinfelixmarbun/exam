import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerViewPersonalJobDataNonProfComponent } from './customer-view-personal-job-data-non-prof.component';
import { CustomerViewPersonalJobDataNonProfXComponent } from 'app/impl/view/customer-view/customer-view-personal-job-data-non-prof/customer-view-personal-job-data-non-prof-x.component';
const routes: Routes = [
    {
        path: '',
        component: CustomerViewPersonalJobDataNonProfComponent,
    },
    {
        path: 'X',
        component: CustomerViewPersonalJobDataNonProfXComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CustomerViewPersonalJobDataNonProfRoutingModule { }


