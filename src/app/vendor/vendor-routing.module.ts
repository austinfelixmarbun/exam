import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VendorSchemeAddEditComponent } from './vendor-scheme/vendor-scheme-add-edit/vendor-scheme-add-edit.component';
import { VendorSchemePagingComponent } from './vendor-scheme/vendor-scheme-paging/vendor-scheme-paging.component';
import { VendorSchemeMemberAddComponent } from './vendor-scheme/vendor-scheme-member/vendor-scheme-member-add/vendor-scheme-member-add.component';
import { VendorSchemeMemberPagingComponent } from './vendor-scheme/vendor-scheme-member/vendor-scheme-member-paging/vendor-scheme-member-paging.component';
import { VendorHoAddEditComponent } from './vendor-ho/vendor-ho-add-edit/vendor-ho-add-edit.component';
import { VendorHoPagingComponent } from './vendor-ho/vendor-ho-paging/vendor-ho-paging.component';
import { VendorHoldingViewComponent } from './vendor-holding-view/vendor-holding-view.component';
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
import { ContactPersonListComponent } from './component/contact-person-list/contact-person-list.component';
import { VendorHoInfoComponent } from './vendor-ho/vendor-ho-info/vendor-ho-info.component';
import { VendorBranchEmployeePagingComponent } from './vendor-branch/vendor-branch-employee-paging/vendor-branch-employee-paging.component';
import { VendorBranchEmployeeAddEditComponent } from './vendor-branch/vendor-branch-employee-add-edit/vendor-branch-employee-add-edit.component';
import { VendorHoldingRegistrationComponent } from './vendor-holding-registration/vendor-holding-registration.component';
import { VendorBranchRegistrationComponent } from './vendor-branch/vendor-branch-registration/vendor-branch-registration.component';
import { VendorBranchOfficeMemberComponent } from './vendor-branch/vendor-branch-office-member/vendor-branch-office-member.component';
import { VendorBranchOfficeMemberAddComponent } from './vendor-branch/vendor-branch-office-member-add/vendor-branch-office-member-add.component';
import { VendorBranchViewComponent } from './vendor-branch/vendor-branch-view/vendor-branch-view.component';
import { VendorPagingComponent } from './component/vendor/vendor-paging/vendor-paging.component';
import { VendorATPMAddEditComponent } from './vendor-ATPM/vendor-atpm-add-edit/vendor-atpm-add-edit.component';
import { VendorATPMRegistrationComponent } from './vendor-ATPM/vendor-atpm-registration/vendor-atpm-registration.component';
import { AuctionCompanyPagingComponent } from './auction-company/auction-company-paging/auction-company-paging.component';
import { AuctionCompanyAddeditComponent } from './auction-company/auction-company-addedit/auction-company-addedit.component';
import { PathConstant } from 'app/shared/PathConstant';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: PathConstant.VENDOR_BRANCH_PAGING,
        component: VendorBranchPagingComponent,
        data: {
          title: 'Vendor Branch Paging'
        },
      },
      {
        path: PathConstant.VENDOR_BRANCH_ADD,
        component: VendorBranchAddEditComponent,
        data: {
          title: 'Vendor Branch Add'
        },
      },
      {
        path: PathConstant.VENDOR_BRANCH_REG,
        component: VendorBranchRegistrationComponent,
        data: {
          title: 'Vendor Branch Registration'
        },
      },
      {
        path: PathConstant.VENDOR_BRANCH_VIEW,
        component: VendorBranchViewComponent,
        data: {
          title: 'Vendor Branch View'
        },
      },
      {
        path: PathConstant.VENDOR_CONTACT_PERSON_ADD,
        component: ContactPersonAddEditComponent,
        data: {
          title: 'Contact Person Branch Add/Edit'
        },
      },
      {
        path: PathConstant.VENDOR_CONTACT_PERSON_EDIT,
        component: ContactPersonAddEditComponent,
        data: {
          title: 'Contact Person Add/Edit'
        },
      },
      {
        path: PathConstant.VENDOR_CONTACT_PERSON_LIST,
        component: ContactPersonListComponent,
        data: {
          title: 'Contact Person List'
        },
      },
      {
        path: PathConstant.VENDOR_HOLDING_PAGING,
        component: VendorHoldingPagingComponent,
        data: {
          title: 'Vendor Holding Paging'
        },
      },
      {
        path: PathConstant.VENDOR_HOLDING_DETAIL,
        component: VendorHoldingAddEditComponent,
        data: {
          title: 'Vendor Holding Add Edit'
        },
      },
      {
        path: PathConstant.VENDOR_HOLDING_REG,
        component: VendorHoldingRegistrationComponent,
        data: {
          title: 'Vendor Registration'
        },
      },
      {
        path: PathConstant.VENDOR_GRP_ADD,
        component: VendorGroupComponent,
        data: {
          title: 'Vendor Group Add'
        },
      },
      {
        path: PathConstant.VENDOR_GRP_PAGING,
        component: VendorGroupPagingComponent,
        data: {
          title: 'Vendor Group Paging'
        },
      },
      {
        path: PathConstant.VENDOR_GRP_VIEW,
        component: VendorGroupViewComponent,
        data: {
          title: 'Vendor Group View'
        },
      },
      {
        path: PathConstant.VENDOR_GRP_MBR_ADD,
        component: VendorGroupmemberComponent,
        data: {
          title: 'Vendor Group Member View'
        },
      },
      {
        path: PathConstant.VENDOR_SCHM_DETAIL,
        component: VendorSchemeAddEditComponent,
        data: {
          title: 'Vendor Scheme Detail'
        },
      },
      {
        path: PathConstant.VENDOR_SCHM_PAGING,
        component: VendorSchemePagingComponent,
        data: {
          title: 'Vendor Scheme Paging'
        },
      },
      {
        path: PathConstant.PAGING,
        component: VendorPagingComponent,
        data: {
          title: 'Vendor Paging'
        },
      },
      {
        path: PathConstant.VENDOR_SCHM_MBR_ADD,
        component: VendorSchemeMemberAddComponent,
        data: {
          title: 'Vendor Scheme Member Add'
        },
      },
      {
        path: PathConstant.VENDOR_SCHM_MBR,
        component: VendorSchemeMemberPagingComponent,
        data: {
          title: 'Vendor Scheme Member'
        },
      },
      {
        path: PathConstant.VENDOR_HO_DETAIL,
        component: VendorHoAddEditComponent,
        data: {
          title: 'Vendor HO Detail'
        },
      },
      {
        path: PathConstant.VENDOR_HO_PAGING,
        component: VendorHoPagingComponent,
        data: {
          title: 'Vendor HO Paging'
        },
      },
      {
        path: PathConstant.VENDOR_HOLDING_VIEW,
        component: VendorHoldingViewComponent,
        data: {
          title: 'Vendor Holding View'
        },
      },

      {
        path: PathConstant.VENDOR_HO_REG,
        component: VendorHoRegistrationComponent,
        data: {
          title: 'Vendor HO Registration'
        },
      },
      {
        path: PathConstant.VENDOR_VIEW_HO,
        component: VendorHoInfoComponent,
        data: {
          title: 'Vendor HO View'
        },
      },
      {
        path: PathConstant.VENDOR_BRANCH_EMP_PAGING,
        component: VendorBranchEmployeePagingComponent,
        data: {
          title: 'Vendor Branch Employee Paging'
        },
      },
      {
        path: PathConstant.VENDOR_BRANCH_EMP_DETAIL,
        component: VendorBranchEmployeeAddEditComponent,
        data: {
          title: 'Vendor Branch Employee Detail'
        },
      },
      {
        path: PathConstant.VENDOR_BRANCH_MBR_PAGING,
        component: VendorBranchOfficeMemberComponent,
        data: {
          title: 'Vendor Branch Member Paging'
        },
      },
      {
        path: PathConstant.VENDOR_BRANCH_MBR_ADD,
        component: VendorBranchOfficeMemberAddComponent,
        data: {
          title: 'Vendor Branch Member Add'
        },
      },
      {
        path: PathConstant.VENDOR_ATPM_DETAIL,
        component: VendorATPMAddEditComponent,
        data: {
          title: 'Vendor ATPM Detail'
        },
      },
      {
        path: PathConstant.VENDOR_ATPM_REG,
        component: VendorATPMRegistrationComponent,
        data: {
          title: 'Vendor ATPM Registration'
        },
      },
      
      // Auction Company
      {
        path: PathConstant.VENDOR_AUCTION_COY_PAGING,
        component: AuctionCompanyPagingComponent,
        data: {
          title: 'Auction Company Paging'
        },
      },
      {
        path: PathConstant.VENDOR_AUCTION_COY_ADD_EDIT,
        component: AuctionCompanyAddeditComponent,
        data: {
          title: 'Auction Company Addedit'
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
