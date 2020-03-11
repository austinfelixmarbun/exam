import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VendorComponent } from './vendor.component';
import { BranchComponent } from './branch/branch.component';
import { VendorGroupComponent } from './vendor-group/vendor-group.component';
import { VendorGroupPagingComponent } from './vendor-group/vendor-group-paging/vendor-group-paging.component';
import { VendorGroupViewComponent } from './vendor-group/vendor-group-view/vendor-group-view.component';
import { VendorGroupmemberComponent } from './vendor-groupmember/vendor-groupmember.component';
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
      {
        path: 'Group/Add',
        component: VendorGroupComponent,
        data: {
          title: 'Vendor Group Add'
        },
      },
      {
        path: 'Group/Paging',
        component: VendorGroupPagingComponent,
        data: {
          title: 'Vendor Group Paging'
        },
      },
      {
        path: 'Group/View',
        component: VendorGroupViewComponent,
        data: {
          title: 'Vendor Group View'
        },
      },
      {
        path: 'GroupMbr/Add',
        component: VendorGroupmemberComponent,
        data: {
          title: 'Vendor Group Member View'
        },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorRoutingModule { }
