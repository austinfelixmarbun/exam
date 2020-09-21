import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { UCSearchModule } from "@adins/ucsearch";
import { UcpagingModule } from "@adins/ucpaging";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SharingModule } from 'app/shared/sharing.module';
import { ArchwizardModule } from 'angular-archwizard';
import { UcSubsectionModule } from "@adins/uc-subsection";
import { SharingComponentModule } from 'app/shared/sharingcomponent.module';
import { UcgridfooterModule } from "@adins/ucgridfooter";
import { UclookupgenericComponent, UclookupgenericModule } from "@adins/uclookupgeneric";
import { UcviewgenericComponent, UcviewgenericModule } from "@adins/ucviewgeneric";
import { UcgridviewModule, UcgridviewComponent } from "@adins/ucgridview";
import { UcapprovalhistModule, UcapprovalhistComponent } from "@adins/ucapprovalhist";

import { UcShowErrorsModule } from "@adins/uc-show-errors";
import { CustomerViewComponent } from "./customer-view.component";
import { CustomerViewPersonalContactPersonComponent } from "./customer-view-personal-contact-person/customer-view-personal-contact-person.component";
import { CustomerViewPersonalFinancialDataComponent } from "./customer-view-personal-financial-data/customer-view-personal-financial-data.component";
import { CustomerViewPersonalJobDataNonProfComponent } from "./customer-view-personal-job-data-non-prof/customer-view-personal-job-data-non-prof.component";
import { CustomerViewPersonalJobDataEmpComponent } from "./customer-view-personal-job-data-emp/customer-view-personal-job-data-emp.component";
import { CustomerViewPersonalJobDataSmeComponent } from "./customer-view-personal-job-data-sme/customer-view-personal-job-data-sme.component";
import { CustomerViewPersonalOtherAttrComponent } from "./customer-view-personal-other-attr/customer-view-personal-other-attr.component";
import { CustomerViewPersonalAppListingComponent } from "./customer-view-personal-app-listing/customer-view-personal-app-listing.component";
import { CustomerViewCoyManagementComponent } from "./customer-view-coy-management/customer-view-coy-management.component";
import { CustomerViewCoyContactComponent } from "./customer-view-coy-contact/customer-view-coy-contact.component";
import { CustomerViewCoyFinancialComponent } from "./customer-view-coy-financial/customer-view-coy-financial.component";
import { CustomerViewCoyLegalComponent } from "./customer-view-coy-legal/customer-view-coy-legal.component";
import { CustomerViewCoyOtherComponent } from "./customer-view-coy-other/customer-view-coy-other.component";
import { CustomerViewCoyAppListingComponent } from "./customer-view-coy-app-listing/customer-view-coy-app-listing.component";
import { CustomerViewCoyExposureComponent } from "./customer-view-coy-exposure/customer-view-coy-exposure.component";
import { CustomerViewCoyCustScoreComponent } from "./customer-view-coy-cust-score/customer-view-coy-cust-score.component";
import { CustomerViewCoyCustAddColateralComponent } from "./customer-view-coy-cust-add-colateral/customer-view-coy-cust-add-colateral.component";
import { CustomerViewCoyDetailComponent } from "./customer-view-coy-detail/customer-view-coy-detail.component";
import { CustomerViewHeaderPersonalComponent } from "./customer-view-header-personal/customer-view-header-personal.component";
import { CustomerViewHeaderCompanyComponent } from "./customer-view-header-company/customer-view-header-company.component";
import { CustomerViewPersonalFinancialSectionComponent } from "./customer-view-personal-financial-section/customer-view-personal-financial-section.component";
import { CustomerViewCustomerGroupComponent } from "./customer-view-customer-group/customer-view-customer-group.component";
import { CustomerViewAddressComponent } from "./customer-view-address/customer-view-address.component";
import { CustomerViewPersonalDetailComponent } from "./customer-view-personal-detail/customer-view-personal-detail.component";
import { CustomerViewPersonalJobDataComponent } from "./customer-view-personal-job-data/customer-view-personal-job-data.component";
import { CustomerViewChildRoutingModule } from "./customer-view-child-routing.module";
import { CustomerViewPersonalAddressComponent } from "./customer-view-personal-address/customer-view-personal-address.component";
import { CustomerViewPersonalCustomerGroupComponent } from "./customer-view-personal-customer-group/customer-view-personal-customer-group.component";
import { CustomerViewCoyAddressComponent } from "./customer-view-coy-address/customer-view-coy-address.component";


@NgModule({
  imports: [
    CustomerViewChildRoutingModule,
    CommonModule,
    FormsModule,
    HttpModule,
    UCSearchModule,
    UcgridfooterModule,
    UcpagingModule,
    UclookupgenericModule,
    UcviewgenericModule,
    UcgridviewModule,
    NgbModule,
    SharingModule,
    ArchwizardModule,
    ReactiveFormsModule,
    UcSubsectionModule,
    SharingComponentModule,
    UcapprovalhistModule,
    UcShowErrorsModule,
    
  ],
  declarations: [
    // CustomerViewPersonalDetailComponent,
    // CustomerViewPersonalContactPersonComponent,
    // CustomerViewPersonalFinancialDataComponent,
    // CustomerViewPersonalJobDataNonProfComponent,
    // CustomerViewPersonalJobDataEmpComponent,
    // CustomerViewPersonalJobDataSmeComponent,
    CustomerViewPersonalOtherAttrComponent,
    // CustomerViewPersonalAppListingComponent,
    // CustomerViewCoyManagementComponent,
    // CustomerViewCoyContactComponent,
    // CustomerViewCoyFinancialComponent,
    // CustomerViewCoyLegalComponent,
    // CustomerViewCoyOtherComponent,
    CustomerViewCoyAppListingComponent,
    CustomerViewCoyExposureComponent,
    CustomerViewCoyCustScoreComponent,
    CustomerViewCoyCustAddColateralComponent,
    // CustomerViewCoyDetailComponent,
    // CustomerViewPersonalFinancialSectionComponent,
    // CustomerViewCustomerGroupComponent,
    // CustomerViewAddressComponent,
    // CustomerViewPersonalJobDataComponent,
    CustomerViewPersonalAddressComponent,
    CustomerViewCoyAddressComponent,
    CustomerViewPersonalCustomerGroupComponent
  ],
  entryComponents: [
    UcviewgenericComponent,
    UcgridviewComponent,
    UcapprovalhistComponent
  ]

})
export class CustomerViewChildModule { }