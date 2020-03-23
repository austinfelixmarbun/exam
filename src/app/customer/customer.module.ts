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
import { CustomerContactPersonComponent } from './customer-personal/customer-contact-person/customer-contact-person.component';
import { CustomerContactAddComponent } from './customer-personal/customer-contact-person/customer-contact-add/customer-contact-add.component';
import { CustomerContactCheckComponent } from './customer-personal/customer-contact-person/customer-contact-check/customer-contact-check.component';
import { UcaddressModule } from '@adins/ucaddress';
import { CustomerViewPersonalDetailComponent } from './customer-view/customer-view-personal-detail/customer-view-personal-detail.component';
import { CustomerViewPersonalAddressComponent } from './customer-view/customer-view-personal-address/customer-view-personal-address.component';
import { CustomerViewPersonalJobDataComponent } from './customer-view/customer-view-personal-job-data/customer-view-personal-job-data.component';
import { CustGroupTabComponent } from './cust-group-tab/cust-group-tab.component';
import { CustGroupTabDetailComponent } from './cust-group-tab/cust-group-tab-detail/cust-group-tab-detail.component';
import { CustomerViewPersonalContactPersonComponent } from './customer-view/customer-view-personal-contact-person/customer-view-personal-contact-person.component';
import { CustomerViewPersonalFinancialDataComponent } from './customer-view/customer-view-personal-financial-data/customer-view-personal-financial-data.component';
import { CustomerViewPersonalCustomerGroupComponent } from './customer-view/customer-view-personal-customer-group/customer-view-personal-customer-group.component';
import { CustomerCompanyPageComponent } from './customer-company/customer-company-page/customer-company-page.component';
import { CustomerCompanyDetailComponent } from './customer-company/customer-company-detail/customer-company-detail.component';
import { CustomerCompanyContactInformationComponent } from './customer-company/customer-company-contact-information/customer-company-contact-information.component';
import { CustomerCompanyManagementShareholderComponent } from './customer-company/customer-company-management-shareholder/customer-company-management-shareholder.component';
import { CustomerCompanyManagementShareholderCheckComponent } from './customer-company/customer-company-management-shareholder/customer-company-management-shareholder-check/customer-company-management-shareholder-check.component';
import { CustomerCompanyManagementShareholderPersonalComponent } from './customer-company/customer-company-management-shareholder/customer-company-management-shareholder-personal/customer-company-management-shareholder-personal.component';
import { CustomerCompanyManagementShareholderCompanyComponent } from './customer-company/customer-company-management-shareholder/customer-company-management-shareholder-company/customer-company-management-shareholder-company.component';
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
     UcviewgenericModule,
     UcaddressModule  
  ],
  declarations: [ 
    CustomerPagingComponent, 
    CustomerPersonalMainInfoComponent, CustomerPersonalDuplicateCheckComponent, CustomerCompanyDuplicateCheckComponent, CustomerCompanyMainInfoComponent, CustomerPersonalPageComponent, CustomerPersonalDetailComponent, CustomerViewPersonalComponent,
    NegativeCustomerComponent,
    NegativeCustomerDetailComponent,
    NegativeCustomerViewComponent,
    CustomerContactPersonComponent, 
    CustomerContactAddComponent,
    CustomerContactCheckComponent,
    CustomerViewPersonalDetailComponent,
    CustomerViewPersonalAddressComponent,
    CustomerViewPersonalJobDataComponent,
    CustGroupTabComponent,
    CustGroupTabDetailComponent,
    CustomerViewPersonalContactPersonComponent,
    CustomerViewPersonalCustomerGroupComponent,
    CustomerViewPersonalFinancialDataComponent,
    CustomerCompanyPageComponent,
    CustomerCompanyDetailComponent,
    CustomerCompanyContactInformationComponent,
    CustomerCompanyManagementShareholderComponent, 
    CustomerCompanyManagementShareholderCheckComponent,
    CustomerCompanyManagementShareholderPersonalComponent,
    CustomerCompanyManagementShareholderCompanyComponent
  ],
  entryComponents: [CustGroupTabDetailComponent]
})
export class CustomerModule { 
  constructor(){
    
  }
}
 