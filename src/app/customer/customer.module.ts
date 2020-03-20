import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SharingModule } from 'app/shared/sharing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 
import { CustomerRoutingModule } from 'app/customer/customer-routing.module';
// import { ArchwizardModule } from 'angular-archwizard';
import { SharingComponentModule } from 'app/shared/sharingcomponent.module';
import { UCSearchModule } from '@adins/ucsearch';
import { UcgridfooterModule } from '@adins/ucgridfooter';
import { CustomerPagingComponent } from './customer-paging/customer-paging.component';
import { UcpagingModule } from '@adins/ucpaging';
import { UclookupgenericModule } from '@adins/uclookupgeneric';
import { CustomerPersonalMainInfoComponent } from './customer-personal/customer-personal-main-info/customer-personal-main-info.component';
import { CustomerPersonalDuplicateCheckComponent } from './customer-personal/customer-personal-duplicate-check/customer-personal-duplicate-check.component';
import { UcSubsectionModule } from '@adins/uc-subsection';
import { CustomerCompanyDuplicateCheckComponent } from './customer-company/customer-company-duplicate-check/customer-company-duplicate-check.component';
import { CustomerCompanyMainInfoComponent } from './customer-company/customer-company-main-info/customer-company-main-info.component';
import { CustomerPersonalPageComponent } from './customer-personal/customer-personal-page/customer-personal-page.component';
import { ArchwizardModule } from 'angular-archwizard';
import { CustomerPersonalDetailComponent } from './customer-personal/customer-personal-detail/customer-personal-detail.component';
import { CustomerViewPersonalComponent } from './customer-view/customer-view-personal/customer-view-personal.component';
import { UcviewgenericModule } from '@adins/ucviewgeneric';
import { NegativeCustomerDetailComponent } from './negative-customer/negative-customer-detail/negative-customer-detail.component';
import { NegativeCustomerComponent } from './negative-customer/negative-customer.component';
import { NegativeCustomerViewComponent } from './negative-customer/negative-customer-view/negative-customer-view.component';
import { CustomerViewPersonalDetailComponent } from './customer-view/customer-view-personal-detail/customer-view-personal-detail.component';
import { CustomerViewPersonalAddressComponent } from './customer-view/customer-view-personal-address/customer-view-personal-address.component';
import { CustomerViewPersonalJobDataComponent } from './customer-view/customer-view-personal-job-data/customer-view-personal-job-data.component';
import { CustGroupTabComponent } from './cust-group-tab/cust-group-tab.component';
import { CustGroupTabDetailComponent } from './cust-group-tab/cust-group-tab-detail/cust-group-tab-detail.component';
import { CustomerViewPersonalContactPersonComponent } from './customer-view/customer-view-personal-contact-person/customer-view-personal-contact-person.component';
import { CustomerViewPersonalCustomerGroupComponent } from './customer-view/customer-view-personal-customer-group/customer-view-personal-customer-group.component';
import { CustomerViewPersonalFinancialDataComponent } from './customer-view/customer-view-personal-financial-data/customer-view-personal-financial-data.component';
import { CustomerViewPersonalJobDataNonProfComponent } from './customer-view/customer-view-personal-job-data-non-prof/customer-view-personal-job-data-non-prof.component';
import { CustomerViewPersonalJobDataEmpComponent } from './customer-view/customer-view-personal-job-data-emp/customer-view-personal-job-data-emp.component';
import { CustomerViewPersonalJobDataSmeComponent } from './customer-view/customer-view-personal-job-data-sme/customer-view-personal-job-data-sme.component';
import { CustomerViewPersonalOtherAttrComponent } from './customer-view/customer-view-personal-other-attr/customer-view-personal-other-attr.component';
import { CustomerViewPersonalAppListingComponent } from './customer-view/customer-view-personal-app-listing/customer-view-personal-app-listing.component';
import { CustomerViewCoyAddressComponent } from './customer-view/customer-view-coy-address/customer-view-coy-address.component';
import { CustomerViewCoyManagementComponent } from './customer-view/customer-view-coy-management/customer-view-coy-management.component';
import { CustomerViewCoyContactComponent } from './customer-view/customer-view-coy-contact/customer-view-coy-contact.component';
import { CustomerViewCoyFinancialComponent } from './customer-view/customer-view-coy-financial/customer-view-coy-financial.component';
import { CustomerViewCoyLegalComponent } from './customer-view/customer-view-coy-legal/customer-view-coy-legal.component';
import { CustomerViewCoyOtherComponent } from './customer-view/customer-view-coy-other/customer-view-coy-other.component';
import { CustomerViewCoyAppListingComponent } from './customer-view/customer-view-coy-app-listing/customer-view-coy-app-listing.component';
import { CustomerViewCoyExposureComponent } from './customer-view/customer-view-coy-exposure/customer-view-coy-exposure.component';
import { CustomerViewCoyCustScoreComponent } from './customer-view/customer-view-coy-cust-score/customer-view-coy-cust-score.component';
import { CustomerViewCoyCustAddColateralComponent } from './customer-view/customer-view-coy-cust-add-colateral/customer-view-coy-cust-add-colateral.component';
import { CustomerViewComponent } from './customer-view/customer-view.component';
@NgModule({
  exports: [],
  imports: [
    CustomerRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    NgbModule,
    UcpagingModule,
    SharingComponentModule,
    UCSearchModule,
    UcgridfooterModule,
    UcpagingModule,
    ReactiveFormsModule,
    UclookupgenericModule,
    UcSubsectionModule, 
     ArchwizardModule,
     UcviewgenericModule
  ],
  declarations: [ 
    CustomerPagingComponent, 
    CustomerPersonalMainInfoComponent, CustomerPersonalDuplicateCheckComponent, CustomerCompanyDuplicateCheckComponent, CustomerCompanyMainInfoComponent, CustomerPersonalPageComponent, CustomerPersonalDetailComponent, CustomerViewPersonalComponent,
    NegativeCustomerComponent,
    NegativeCustomerDetailComponent,
    NegativeCustomerViewComponent,
    CustomerViewPersonalDetailComponent,
    CustomerViewPersonalAddressComponent,
    CustomerViewPersonalJobDataComponent,
    CustGroupTabComponent,
    CustGroupTabDetailComponent,
    CustomerViewPersonalContactPersonComponent,
    CustomerViewPersonalCustomerGroupComponent,
    CustomerViewPersonalFinancialDataComponent,
    CustomerViewPersonalJobDataNonProfComponent,
    CustomerViewPersonalJobDataEmpComponent,
    CustomerViewPersonalJobDataSmeComponent,
    CustomerViewPersonalOtherAttrComponent,
    CustomerViewPersonalAppListingComponent,
    CustomerViewCoyAddressComponent,
    CustomerViewCoyManagementComponent,
    CustomerViewCoyContactComponent,
    CustomerViewCoyFinancialComponent,
    CustomerViewCoyLegalComponent,
    CustomerViewCoyOtherComponent,
    CustomerViewCoyAppListingComponent,
    CustomerViewCoyExposureComponent,
    CustomerViewCoyCustScoreComponent,
    CustomerViewCoyCustAddColateralComponent,
    CustomerViewComponent
  ],
  entryComponents: [CustGroupTabDetailComponent]
})
export class CustomerModule { 
  constructor(){
    
  }
}
 