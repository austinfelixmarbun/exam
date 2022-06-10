import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerViewXComponent } from 'app/impl/view/customer-view/customer-view-x.component';
import { CustomerViewComponent } from './customer-view.component';
const routes: Routes = [
    {
        path: '',
        component: CustomerViewComponent,
        children: [
            {
                path: '',
                loadChildren: './customer-view-child.module#CustomerViewChildModule'
            }
        ]
    },
    {
        path: 'X',
        component: CustomerViewXComponent,
        children: [
            {
                path: '',
                loadChildren: './customer-view-child.module#CustomerViewChildModule'
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CustomerViewRoutingModule { }


