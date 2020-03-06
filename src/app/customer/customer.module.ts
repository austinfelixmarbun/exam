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
@NgModule({
  exports: [ 
  ],
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
    UcSubsectionModule
    // ArchwizardModule
  ],
  declarations: [ 
    CustomerPagingComponent, 
    CustomerPersonalMainInfoComponent, CustomerPersonalDuplicateCheckComponent, CustomerCompanyDuplicateCheckComponent, CustomerCompanyMainInfoComponent
  ]
})
export class CustomerModule { 
  constructor(){
    
  }
}
 