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
import { CustGroupTabComponent } from './cust-group-tab/cust-group-tab.component';
import { CustGroupTabDetailComponent } from './cust-group-tab/cust-group-tab-detail/cust-group-tab-detail.component';
import { CustomerPersonalAddressComponent } from './customer-personal/customer-personal-address/customer-personal-address.component';
import { CustomerPersonalAddressAddComponent } from './customer-personal/customer-personal-address/customer-personal-address-add/customer-personal-address-add.component';
import { UcaddressModule } from '@adins/ucaddress';
import { CustomerCompanyAddressComponent } from './customer-company/customer-company-address/customer-company-address.component';
import { CustomerCompanyAddressAddComponent } from './customer-company/customer-company-address/customer-company-address-add/customer-company-address-add.component';
import { CustomerPersonalJobDataComponent } from './customer-personal/customer-personal-job-data/customer-personal-job-data.component';
import { JobDataNonProfessionalComponent } from './customer-personal/customer-personal-job-data/job-data-non-professional/job-data-non-professional.component';
import { JobDataProfessionalComponent } from './customer-personal/customer-personal-job-data/job-data-professional/job-data-professional.component';
import { JobDataEmployeeComponent } from './customer-personal/customer-personal-job-data/job-data-employee/job-data-employee.component';
import { JobDataSmeComponent } from './customer-personal/customer-personal-job-data/job-data-small-medium-enterprise/job-data-small-medium-enterprise.component';

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
    CustGroupTabComponent,
    CustGroupTabDetailComponent,
    CustomerPersonalAddressComponent,
    CustomerPersonalAddressAddComponent,
    CustomerCompanyAddressComponent,
    CustomerCompanyAddressAddComponent,
    CustomerPersonalJobDataComponent,
    JobDataNonProfessionalComponent,
    JobDataProfessionalComponent,
    JobDataEmployeeComponent,
    JobDataSmeComponent
  ],
  entryComponents: [CustGroupTabDetailComponent]
})
export class CustomerModule { 
  constructor(){
    
  }
}
 