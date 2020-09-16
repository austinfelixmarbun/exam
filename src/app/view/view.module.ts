import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SharingModule } from 'app/shared/sharing.module';
import { ArchwizardModule } from 'angular-archwizard';
import { UcSubsectionModule } from "@adins/uc-subsection";
import { SharingComponentModule } from 'app/shared/sharingcomponent.module';
import { ViewRoutingModule } from "./view-routing.module";
import { UcgridviewComponent } from "@adins/ucgridview";
import { UcviewgenericModule } from "@adins/ucviewgeneric";
import { UcapprovalhistModule, UcapprovalhistComponent } from "@adins/ucapprovalhist";

import { CustomerViewComponent } from "./customer-view/customer-view.component";
import { CustomerViewPersonalContactPersonComponent } from "./customer-view/customer-view-personal-contact-person/customer-view-personal-contact-person.component";
import { CustomerViewPersonalFinancialDataComponent } from "./customer-view/customer-view-personal-financial-data/customer-view-personal-financial-data.component";
import { CustomerViewPersonalJobDataNonProfComponent } from "./customer-view/customer-view-personal-job-data-non-prof/customer-view-personal-job-data-non-prof.component";
import { CustomerViewPersonalJobDataEmpComponent } from "./customer-view/customer-view-personal-job-data-emp/customer-view-personal-job-data-emp.component";
import { CustomerViewPersonalJobDataSmeComponent } from "./customer-view/customer-view-personal-job-data-sme/customer-view-personal-job-data-sme.component";
import { CustomerViewPersonalOtherAttrComponent } from "./customer-view/customer-view-personal-other-attr/customer-view-personal-other-attr.component";
import { CustomerViewPersonalAppListingComponent } from "./customer-view/customer-view-personal-app-listing/customer-view-personal-app-listing.component";
import { CustomerViewCoyManagementComponent } from "./customer-view/customer-view-coy-management/customer-view-coy-management.component";
import { CustomerViewCoyContactComponent } from "./customer-view/customer-view-coy-contact/customer-view-coy-contact.component";
import { CustomerViewCoyFinancialComponent } from "./customer-view/customer-view-coy-financial/customer-view-coy-financial.component";
import { CustomerViewCoyLegalComponent } from "./customer-view/customer-view-coy-legal/customer-view-coy-legal.component";
import { CustomerViewCoyOtherComponent } from "./customer-view/customer-view-coy-other/customer-view-coy-other.component";
import { CustomerViewCoyAppListingComponent } from "./customer-view/customer-view-coy-app-listing/customer-view-coy-app-listing.component";
import { CustomerViewCoyExposureComponent } from "./customer-view/customer-view-coy-exposure/customer-view-coy-exposure.component";
import { CustomerViewCoyCustScoreComponent } from "./customer-view/customer-view-coy-cust-score/customer-view-coy-cust-score.component";
import { CustomerViewCoyCustAddColateralComponent } from "./customer-view/customer-view-coy-cust-add-colateral/customer-view-coy-cust-add-colateral.component";
import { CustomerViewCoyDetailComponent } from "./customer-view/customer-view-coy-detail/customer-view-coy-detail.component";
import { CustomerViewHeaderPersonalComponent } from "./customer-view/customer-view-header-personal/customer-view-header-personal.component";
import { CustomerViewHeaderCompanyComponent } from "./customer-view/customer-view-header-company/customer-view-header-company.component";
import { CustomerViewPersonalFinancialSectionComponent } from "./customer-view/customer-view-personal-financial-section/customer-view-personal-financial-section.component";
import { CustomerViewCustomerGroupComponent } from "./customer-view/customer-view-customer-group/customer-view-customer-group.component";
import { CustomerViewAddressComponent } from "./customer-view/customer-view-address/customer-view-address.component";
import { CustomerViewPersonalDetailComponent } from "./customer-view/customer-view-personal-detail/customer-view-personal-detail.component";
import { CustomerViewPersonalJobDataComponent } from "./customer-view/customer-view-personal-job-data/customer-view-personal-job-data.component";
import { ProductOfferingViewComponent } from "./prod-offering-view/product-offering-view.component";
import { VendorBranchViewComponent } from "./vendor-branch-view/vendor-branch-view.component";
import { VendorHoldingViewComponent } from "./vendor-holding-view/vendor-holding-view.component";
import { VendorHoInfoComponent } from "./vendor-ho-info/vendor-ho-info.component";
import { HoAddressInfoComponent } from "./vendor-ho-info/ho-address-info/ho-address-info.component";
import { HoBankInfoComponent } from "./vendor-ho-info/ho-bank-info/ho-bank-info.component";
import { HoBranchInfoComponent } from "./vendor-ho-info/ho-branch-info/ho-branch-info.component";
import { HoContactPersonInfoComponent } from "./vendor-ho-info/ho-contact-person-info/ho-contact-person-info.component";
import { HoGroupInfoComponent } from "./vendor-ho-info/ho-group-info/ho-group-info.component";
import { HoInfoComponent } from "./vendor-ho-info/ho-info/ho-info.component";
import { HoTaxInfoComponent } from "./vendor-ho-info/ho-tax-info/ho-tax-info.component";
import { MainHoInfoComponent } from "./vendor-ho-info/main-ho-info/main-ho-info.component";
import { MainInfoViewComponent } from "./vendor-ho-info/main-info-view/main-info-view.component";
import { NegativeCustomerViewComponent } from "./negative-customer-view/negative-customer-view.component";
import { ProductHOViewComponent } from "./product-ho-view/product-ho-view.component";
import { SurveyOrderViewComponent } from "./survey-order-view/survey-order-view.component";
import { SurveyTaskViewComponent } from "./survey-task-view/survey-task-view.component";
import { CustomerViewCoyAddressComponent } from "./customer-view/customer-view-coy-address/customer-view-coy-address.component";
import { CustomerViewPersonalAddressComponent } from "./customer-view/customer-view-personal-address/customer-view-personal-address.component";
import { CustomerViewPersonalCustomerGroupComponent } from "./customer-view/customer-view-personal-customer-group/customer-view-personal-customer-group.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
    ViewRoutingModule,
    CommonModule,
    HttpModule,
    UcviewgenericModule,
    NgbModule,
    SharingModule,
    ArchwizardModule,
    UcSubsectionModule,
    SharingComponentModule,
    UcapprovalhistModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ///customer
   CustomerViewComponent,
   CustomerViewPersonalContactPersonComponent,
   CustomerViewPersonalFinancialDataComponent,
   CustomerViewPersonalJobDataNonProfComponent,
   CustomerViewPersonalJobDataEmpComponent,
   CustomerViewPersonalJobDataSmeComponent,
   CustomerViewPersonalOtherAttrComponent,
   CustomerViewPersonalAppListingComponent,
   CustomerViewCoyManagementComponent,
   CustomerViewCoyContactComponent,
   CustomerViewCoyFinancialComponent,
   CustomerViewCoyLegalComponent,
   CustomerViewCoyOtherComponent,
   CustomerViewCoyAppListingComponent,
   CustomerViewCoyExposureComponent,
   CustomerViewCoyCustScoreComponent,
   CustomerViewCoyCustAddColateralComponent,
   CustomerViewCoyDetailComponent,
   CustomerViewHeaderPersonalComponent, 
   CustomerViewHeaderCompanyComponent,
   CustomerViewPersonalFinancialSectionComponent,
   CustomerViewCustomerGroupComponent,
   CustomerViewAddressComponent,
   CustomerViewPersonalDetailComponent,
   CustomerViewPersonalJobDataComponent,
   ///product offering view
   ProductOfferingViewComponent,
   ///vendor branch view
    VendorBranchViewComponent,
    ///vendor holding view
    VendorHoldingViewComponent,
    ///vendor ho
    VendorHoInfoComponent,
    HoAddressInfoComponent,
    HoBankInfoComponent,
    HoBranchInfoComponent,
    HoContactPersonInfoComponent,
    HoGroupInfoComponent,
    HoInfoComponent,
    HoTaxInfoComponent,
    MainHoInfoComponent,
    MainInfoViewComponent,
    ///Negative Customer
    NegativeCustomerViewComponent,
    //Product HO
    ProductHOViewComponent,
    // Survey Order
    SurveyOrderViewComponent,
    SurveyTaskViewComponent,
    CustomerViewCoyAddressComponent,
    CustomerViewPersonalAddressComponent,
    CustomerViewPersonalCustomerGroupComponent

  ],
  entryComponents: [
    UcgridviewComponent,
    UcapprovalhistComponent
  ]

})
export class ViewModule { }