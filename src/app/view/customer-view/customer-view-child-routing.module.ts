import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PathConstant } from 'app/shared/PathConstant';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: PathConstant.VIEW_CUST_PERSONAL_DETAIL,
        loadChildren: './customer-view-personal-detail/customer-view-personal-detail.module#CustomerViewPersonalDetailModule'
      },
      {
        path: PathConstant.VIEW_CUST_PERSONAL_CONTACT_PERSON,
        loadChildren: './customer-view-personal-contact-person/customer-view-personal-contact-person.module#CustomerViewPersonalContactPersonModule'
      },
      {
        path: PathConstant.VIEW_CUST_PERSONAL_JOB_DATA,
        loadChildren: './customer-view-personal-job-data/customer-view-personal-job-data.module#CustomerViewPersonalJobDataModule'
      },
      {
        path: PathConstant.VIEW_CUST_PERSONAL_JOB_DATA_NON_PROF,
        loadChildren: './customer-view-personal-job-data-non-prof/customer-view-personal-job-data-non-prof.module#CustomerViewPersonalJobDataNonProfModule'
      },
      {
        path: PathConstant.VIEW_CUST_PERSONAL_JOB_DATA_EMP,
        loadChildren: './customer-view-personal-job-data-emp/customer-view-personal-job-data-emp.module#CustomerViewPersonalJobDataEmpModule'
      },
      {
        path: PathConstant.VIEW_CUST_PERSONAL_JOB_DATA_SME,
        loadChildren: './customer-view-personal-job-data-sme/customer-view-personal-job-data-sme.module#CustomerViewPersonalJobDataSmeModule'
      },
      {
        path: PathConstant.VIEW_CUST_PERSONAL_FINANCIAL_DATA,
        loadChildren: './customer-view-personal-financial-data/customer-view-personal-financial-data.module#CustomerViewPersonalFinancialDataModule'
      },
      {
        path: PathConstant.VIEW_CUST_COY_OTHER,
        loadChildren: './customer-view-coy-other/customer-view-coy-other.module#CustomerViewCoyOtherModule'
      },
      {
        path: PathConstant.VIEW_CUST_PERSONAL_APP_LISTING,
        loadChildren: './customer-view-personal-app-listing/customer-view-personal-app-listing.module#CustomerViewPersonalAppListingModule'

      },
      ///Cust Type Company
      {
        path: PathConstant.VIEW_CUST_COY_DETAIL,
        loadChildren: './customer-view-coy-detail/customer-view-coy-detail.module#CustomerViewCoyDetailModule'
      },
      {
        path: PathConstant.VIEW_CUST_ADDR,
        loadChildren: './customer-view-address/customer-view-address.module#CustomerViewAddressModule'
      },
      {
        path: PathConstant.VIEW_CUST_COY_MNGMNT,
        loadChildren: './customer-view-coy-management/customer-view-coy-management.module#CustomerViewCoyManagementModule'
      },
      {
        path: PathConstant.VIEW_CUST_COY_CONTACT,
        loadChildren: './customer-view-coy-contact/customer-view-coy-contact.module#CustomerViewCoyContactModule'
      },
      {
        path: PathConstant.VIEW_CUST_COY_FINANCIAL,
        loadChildren: './customer-view-coy-financial/customer-view-coy-financial.module#CustomerViewCoyFinancialModule'
      },
      {
        path: PathConstant.VIEW_CUST_COY_LEGAL,
        loadChildren: './customer-view-coy-legal/customer-view-coy-legal.module#CustomerViewCoyLegalModule'
      },
      //CustGroup
      {
        path: PathConstant.VIEW_CUST_GRP,
        loadChildren: './customer-view-customer-group/customer-view-customer-group.module#CustomerViewGroupModule'
      },
      //View Document
      {
        path: PathConstant.VIEW_CUST_DOC,
        loadChildren: './customer-view-document/customer-view-document.module#CustomerViewDocumentModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerViewChildRoutingModule { }
