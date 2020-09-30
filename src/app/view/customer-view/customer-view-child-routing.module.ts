import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    {
        path: '',
        children: [
          {
            path: 'PersonalDetail',
            loadChildren : './customer-view-personal-detail/customer-view-personal-detail.module#CustomerViewPersonalDetailModule'
          },
          {
            path: 'PersonalContactPerson',
            loadChildren : './customer-view-personal-contact-person/customer-view-personal-contact-person.module#CustomerViewPersonalContactPersonModule'
          },
          {
            path: 'PersonalJobData',
            loadChildren : './customer-view-personal-job-data/customer-view-personal-job-data.module#CustomerViewPersonalJobDataModule'
          },
          {
            path: 'PersonalJobDataNonProf',
            loadChildren: './customer-view-personal-job-data-non-prof/customer-view-personal-job-data-non-prof.module#CustomerViewPersonalJobDataNonProfModule'
          },
          {
            path: 'PersonalJobDataEmp',
            loadChildren: './customer-view-personal-job-data-emp/customer-view-personal-job-data-emp.module#CustomerViewPersonalJobDataEmpModule'
          },
          {
            path: 'PersonalJobDataSme',
            loadChildren:  './customer-view-personal-job-data-sme/customer-view-personal-job-data-sme.module#CustomerViewPersonalJobDataSmeModule'
          },
          {
            path: 'PersonalFinancialData',
            loadChildren: './customer-view-personal-financial-data/customer-view-personal-financial-data.module#CustomerViewPersonalFinancialDataModule'
          },
          {
            path: 'CoyOther',
            loadChildren: './customer-view-coy-other/customer-view-coy-other.module#CustomerViewCoyOtherModule'
          },
          {
            path: 'PersonalAppListing',
            loadChildren: './customer-view-personal-app-listing/customer-view-personal-app-listing.module#CustomerViewPersonalAppListingModule'

          },
          ///Cust Type Company
          {
            path: 'CoyDetail',
            loadChildren: './customer-view-coy-detail/customer-view-coy-detail.module#CustomerViewCoyDetailModule'
          },
          {
                path: 'Address',
                loadChildren: './customer-view-address/customer-view-address.module#CustomerViewAddressModule'
          },
          {
            path: 'CoyManagement',
            loadChildren: './customer-view-coy-management/customer-view-coy-management.module#CustomerViewCoyManagementModule'
          },
          {
            path: 'CoyContact',
            loadChildren: './customer-view-coy-contact/customer-view-coy-contact.module#CustomerViewCoyContactModule'
          },
          {
            path: 'CoyFinancial',
            loadChildren: './customer-view-coy-financial/customer-view-coy-financial.module#CustomerViewCoyFinancialModule'
          },
          {
            path: 'CoyLegal',
            loadChildren: './customer-view-coy-legal/customer-view-coy-legal.module#CustomerViewCoyLegalModule'
          },
          //CustGroup
          {
            path: 'CustomerGroup',
            loadChildren: './customer-view-customer-group/customer-view-customer-group.module#CustomerViewGroupModule'
          }
        ]
      }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CustomerViewChildRoutingModule { }
