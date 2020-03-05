import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SharingModule } from 'app/shared/sharing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomerComponent } from 'app/customer/customer.component';
import { CustomerRoutingModule } from 'app/customer/customer-routing.module';
// import { ArchwizardModule } from 'angular-archwizard';
import { SharingComponentModule } from 'app/shared/sharingcomponent.module';
import { UCSearchModule } from '@adins/ucsearch';
import { UcgridfooterModule } from '@adins/ucgridfooter';
import { NegativeCustomerComponent } from './negative-customer/negative-customer.component';
import { NegativeCustomerDetailComponent } from './negative-customer/negative-customer-detail/negative-customer-detail.component';
import { UcpagingModule } from '@adins/ucpaging';
import { UclookupgenericModule } from '@adins/uclookupgeneric';

@NgModule({
  exports: [
    CustomerComponent
  ],
  imports: [
    CustomerRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    NgbModule,
    SharingComponentModule,
    UCSearchModule,
    UcgridfooterModule,
    UcpagingModule,
    ReactiveFormsModule,
    UclookupgenericModule
    // ArchwizardModule
  ],
  declarations: [
    CustomerComponent,
    NegativeCustomerComponent,
    NegativeCustomerDetailComponent
  ]
})
export class CustomerModule { 
  constructor(){
    
  }
}
 