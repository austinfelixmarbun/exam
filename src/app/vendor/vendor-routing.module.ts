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

import { VendorGradingRequestPagingComponent } from "./vendor-grading/vendor-grading-request/vendor-grading-request-paging/vendor-grading-request-paging.component";
import { VendorGradingRequestDetailComponent } from "./vendor-grading/vendor-grading-request/vendor-grading-request-detail/vendor-grading-request-detail.component";
import { VendorGradingApprovalPagingComponent } from "./vendor-grading/vendor-grading-approval/vendor-grading-approval-paging/vendor-grading-approval-paging.component";
import { VendorGradingApprovalDetailComponent } from "./vendor-grading/vendor-grading-approval/vendor-grading-approval-detail/vendor-grading-approval-detail.component";
import { VendorGradingInquiryPagingComponent } from "./vendor-grading/vendor-grading-inquiry-paging/vendor-grading-inquiry-paging.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'Branch/Paging',
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
        path: 'Branch/Registration',
        component: VendorBranchRegistrationComponent,
        data: {
          title: 'Vendor Branch Registration'
        },
      },
      {
        path: 'Branch/View',
        component: VendorBranchViewComponent,
        data: {
          title: 'Vendor Branch View'
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
        path: 'ContactPerson/List',
        component: ContactPersonListComponent,
        data: {
          title: 'Contact Person List'
        },
      },
      {
        path: 'Holding/Paging',
        component: VendorHoldingPagingComponent,
        data: {
          title: 'Vendor Holding Paging'
        },
      },
      {
        path: 'Holding/Detail',
        component: VendorHoldingAddEditComponent,
        data: {
          title: 'Vendor Holding Add Edit'
        },
      },
      {
        path: 'Holding/Registration',
        component: VendorHoldingRegistrationComponent,
        data: {
          title: 'Vendor Registration'
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
        path: 'Paging',
        component: VendorPagingComponent,
        data: {
          title: 'Vendor Paging'
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
        path: 'Holding/View',
        component: VendorHoldingViewComponent,
        data: {
          title: 'Vendor Holding View'
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
        path: 'View/VendorHO',
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
        path: 'Branch/Member/Paging',
        component: VendorBranchOfficeMemberComponent,
        data: {
          title: 'Vendor Branch Member Paging'
        },
      },
      {
        path: 'Branch/Member/Add',
        component: VendorBranchOfficeMemberAddComponent,
        data: {
          title: 'Vendor Branch Member Add'
        },
      },
      {
        path: 'ATPM/Detail',
        component: VendorATPMAddEditComponent,
        data: {
          title: 'Vendor ATPM Detail'
        },
      },
      {
        path: 'ATPM/Registration',
        component: VendorATPMRegistrationComponent,
        data: {
          title: 'Vendor ATPM Registration'
        },
      },
      {
        path: "VendorGrading/Request/Paging",
        component: VendorGradingRequestPagingComponent,
        data: {
          title: "Vendor Grading Request Paging",
        },
      },
      {
        path: "VendorGrading/Request/Detail",
        component: VendorGradingRequestDetailComponent,
        data: {
          title: "Vendor Grading Request Detail",
        },
      },
      {
        path: "VendorGrading/Approval/Paging",
        component: VendorGradingApprovalPagingComponent,
        data: {
          title: "Vendor Grading Approval Paging",
        },
      },
      {
        path: "VendorGrading/Approval/Detail",
        component: VendorGradingApprovalDetailComponent,
        data: {
          title: "Vendor Grading Approval Detail",
        },
      },
      {
        path: "VendorGrading/Inquiry",
        component: VendorGradingInquiryPagingComponent,
        data: {
          title: "Vendor Grading Inquiry", 
        }
      },
      {
        path: 'auctioncompany/paging',
        component: AuctionCompanyPagingComponent,
        data: {
          title: 'Auction Company Paging'
        },
      },
      {
        path: 'auctioncompany/addedit',
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
