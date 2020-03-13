import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VendorSchemeAddEditComponent } from './vendor-scheme/vendor-scheme-add-edit/vendor-scheme-add-edit.component';
import { VendorSchemePagingComponent } from './vendor-scheme/vendor-scheme-paging/vendor-scheme-paging.component';
import { VendorSchemeMemberAddComponent } from './vendor-scheme/vendor-scheme-member/vendor-scheme-member-add/vendor-scheme-member-add.component';
import { VendorSchemeMemberPagingComponent } from './vendor-scheme/vendor-scheme-member/vendor-scheme-member-paging/vendor-scheme-member-paging.component';
import { VendorHoAddEditComponent } from './vendor-ho/vendor-ho-add-edit/vendor-ho-add-edit.component';
import { VendorHoPagingComponent } from './vendor-ho/vendor-ho-paging/vendor-ho-paging.component';
import { VendorBranchPagingComponent } from './vendor-branch/vendor-branch-paging/vendor-branch-paging.component';
import { VendorBranchAddEditComponent } from './vendor-branch/vendor-branch-add-edit/vendor-branch-add-edit.component';
import { VendorBranchAddEditContactPersonComponent } from './vendor-branch/vendor-branch-add-edit-contact-person/vendor-branch-add-edit-contact-person.component';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'Branch',
        component: VendorBranchPagingComponent,
        data: {
          title: 'Vendor Branch Paging'
        },
      },
      {
        path: 'Branch/Add',
        component: VendorBranchAddEditComponent,
        data: {
          title: 'Vendor Branch Add/Edit'
        },
      },
      {
        path: 'Branch/Edit',
        component: VendorBranchAddEditContactPersonComponent,
        data: {
          title: 'Vendor Branch Add/Edit'
        },
      },
      {
        path: 'VendorScheme/Detail',
        component: VendorSchemeAddEditComponent,
        data: {
          title: 'Vendor Scheme Detail'
        },
      },
      {
        path: 'VendorScheme/Paging',
        component: VendorSchemePagingComponent,
        data: {
          title: 'Vendor Scheme Paging'
        },
      },
      {
        path: 'VendorScheme/Member/Add',
        component: VendorSchemeMemberAddComponent,
        data: {
          title: 'Vendor Scheme Member Add'
        },
      },
      {
        path: 'VendorScheme/Member',
        component: VendorSchemeMemberPagingComponent,
        data: {
          title: 'Vendor Scheme Member'
        },
      },
      {
        path: 'HO/Detail',
        component: VendorHoAddEditComponent,
        data: {
          title: 'Vendor HO Detail'
        },
      },
      {
        path: 'HO/Member',
        component: VendorHoPagingComponent,
        data: {
          title: 'Vendor HO Member'
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
