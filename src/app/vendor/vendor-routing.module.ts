import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VendorSchemeAddEditComponent } from './vendor-scheme/vendor-scheme-add-edit/vendor-scheme-add-edit.component';
import { VendorSchemePagingComponent } from './vendor-scheme/vendor-scheme-paging/vendor-scheme-paging.component';
import { VendorSchemeMemberAddComponent } from './vendor-scheme/vendor-scheme-member/vendor-scheme-member-add/vendor-scheme-member-add.component';
import { VendorSchemeMemberPagingComponent } from './vendor-scheme/vendor-scheme-member/vendor-scheme-member-paging/vendor-scheme-member-paging.component';
import { VendorHoAddEditComponent } from './vendor-ho/vendor-ho-add-edit/vendor-ho-add-edit.component';
import { VendorHoPagingComponent } from './vendor-ho/vendor-ho-paging/vendor-ho-paging.component';
import { VendorBranchPagingComponent } from './vendor-branch/vendor-branch-paging/vendor-branch-paging.component';
import { VendorHoldingPagingComponent } from './vendor-holding-paging/vendor-holding-paging.component';
import { VendorHoldingAddEditComponent } from './vendor-holding-add-edit/vendor-holding-add-edit.component';
import { VendorGroupComponent } from './vendor-group/vendor-group.component';
import { VendorGroupPagingComponent } from './vendor-group/vendor-group-paging/vendor-group-paging.component';
import { VendorGroupViewComponent } from './vendor-group/vendor-group-view/vendor-group-view.component';
import { VendorGroupmemberComponent } from './vendor-groupmember/vendor-groupmember.component';
import { ContactPersonAddEditComponent } from './component/contact-person-add-edit/contact-person-add-edit.component';
import { VendorBranchAddEditComponent } from './vendor-branch/vendor-branch-add-edit/vendor-branch-add-edit.component';
import { VendorHoRegistrationComponent } from './vendor-ho/vendor-ho-registration/vendor-ho-registration.component';
import { BankInfoComponent } from './component/bank-info/bank-info.component';
import { AddressComponent } from './component/address/address.component';
import { VendorHoInfoComponent } from './vendor-ho/vendor-ho-info/vendor-ho-info.component';
import { VendorBranchEmployeePagingComponent } from './vendor-branch/vendor-branch-employee-paging/vendor-branch-employee-paging.component';
import { VendorBranchEmployeeAddEditComponent } from './vendor-branch/vendor-branch-employee-add-edit/vendor-branch-employee-add-edit.component';
import { VendorEmployeeComponent } from './component/vendor-employee/vendor-employee.component';

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
          title: 'Vendor Branch Add'
        },
      },
      {
        path: 'ContactPerson/Add',
        component: ContactPersonAddEditComponent,
        data: {
          title: 'Contact Person Branch Add/Edit'
        },
      },
      {
        path: 'ContactPerson/Edit',
        component: ContactPersonAddEditComponent,
        data: {
          title: 'Contact Person Add/Edit'
        },
      },
      {
        path: 'HoldingPaging',
        component: VendorHoldingPagingComponent,
        data: {
          title: 'Vendor Holding Paging'
        },
      },
      {
        path: 'HoldingAddEdit',
        component: VendorHoldingAddEditComponent,
        data: {
          title: 'Vendor Holding Add Edit'
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
        path: 'HO/Paging',
        component: VendorHoPagingComponent,
        data: {
          title: 'Vendor HO Paging'
        },
      },
      {
        path: 'HO/Registration',
        component: VendorHoRegistrationComponent,
        data: {
          title: 'Vendor HO Registration'
        },
      },
      {
        path: 'HO/View',
        component: VendorHoInfoComponent,
        data: {
          title: 'Vendor HO View'
        },
      },
      {
        path: 'Branch/Employee/Paging',
        component: VendorBranchEmployeePagingComponent,
        data: {
          title: 'Vendor Branch Employee Paging'
        },
      },
      {
        path: 'Branch/Employee/Detail',
        component: VendorBranchEmployeeAddEditComponent,
        data: {
          title: 'Vendor Branch Employee Detail'
        },
      },
      {
        path: 'Branch/Employee/EmpInfo',
        component: VendorEmployeeComponent,
        data: {
          title: 'Vendor Employee Info'
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
