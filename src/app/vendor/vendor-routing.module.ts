import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VendorComponent } from './vendor.component';
import { BranchComponent } from './branch/branch.component';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'Branch/Paging',
        component: BranchComponent,
        data: {
          title: 'Vendor Branch Paging'
        },
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorRoutingModule { }
