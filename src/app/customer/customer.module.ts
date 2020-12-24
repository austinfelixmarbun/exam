import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomerRoutingModule } from 'app/customer/customer-routing.module';
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
import { UcviewgenericModule } from '@adins/ucviewgeneric';
import { NegativeCustomerDetailComponent } from './negative-customer/negative-customer-detail/negative-customer-detail.component';
import { NegativeCustomerComponent } from './negative-customer/negative-customer.component';
import { NegativeCustomerViewComponent } from './negative-customer/negative-customer-view/negative-customer-view.component';
import { CustomerContactPersonComponent } from './customer-personal/customer-contact-person/customer-contact-person.component';
import { CustomerContactAddComponent } from './customer-personal/customer-contact-person/customer-contact-add/customer-contact-add.component';
import { CustomerContactCheckComponent } from './customer-personal/customer-contact-person/customer-contact-check/customer-contact-check.component';
import { UcaddressModule } from '@adins/ucaddress';
import { CustomerViewPersonalDetailComponent } from './customer-view/customer-view-personal-detail/customer-view-personal-detail.component';
import { CustomerViewPersonalJobDataComponent } from './customer-view/customer-view-personal-job-data/customer-view-personal-job-data.component';
import { CustGroupTabComponent } from './cust-group-tab/cust-group-tab.component';
import { CustGroupTabDetailComponent } from './cust-group-tab/cust-group-tab-detail/cust-group-tab-detail.component';
import { CustomerPersonalAddressComponent } from './customer-personal/customer-personal-address/customer-personal-address.component';
import { CustomerPersonalAddressAddComponent } from './customer-personal/customer-personal-address/customer-personal-address-add/customer-personal-address-add.component';
import { CustomerCompanyAddressComponent } from './customer-company/customer-company-address/customer-company-address.component';
import { CustomerCompanyAddressAddComponent } from './customer-company/customer-company-address/customer-company-address-add/customer-company-address-add.component';
import { CustomerPersonalJobDataComponent } from './customer-personal/customer-personal-job-data/customer-personal-job-data.component';
import { JobDataNonProfessionalComponent } from './customer-personal/customer-personal-job-data/job-data-non-professional/job-data-non-professional.component';
import { JobDataProfessionalComponent } from './customer-personal/customer-personal-job-data/job-data-professional/job-data-professional.component';
import { JobDataEmployeeComponent } from './customer-personal/customer-personal-job-data/job-data-employee/job-data-employee.component';
import { JobDataSmeComponent } from './customer-personal/customer-personal-job-data/job-data-small-medium-enterprise/job-data-small-medium-enterprise.component';
import { CustFinDataTabComponent } from './cust-fin-data-tab/cust-fin-data-tab.component';
import { CustBankAccSectionFindataComponent } from './cust-bank-acc-section-findata/cust-bank-acc-section-findata.component';
import { CustBankAccDetailSectionFindataComponent } from './cust-bank-acc-detail-section-findata/cust-bank-acc-detail-section-findata.component';
import { CustLegalDocComponent } from './cust-legal-doc/cust-legal-doc.component';
import { CustLegalDocDetailComponent } from './cust-legal-doc/cust-legal-doc-detail/cust-legal-doc-detail.component';
import { CustomerViewPersonalContactPersonComponent } from './customer-view/customer-view-personal-contact-person/customer-view-personal-contact-person.component';
import { CustomerViewPersonalFinancialDataComponent } from './customer-view/customer-view-personal-financial-data/customer-view-personal-financial-data.component';
import { CustomerViewPersonalJobDataNonProfComponent } from './customer-view/customer-view-personal-job-data-non-prof/customer-view-personal-job-data-non-prof.component';
import { CustomerViewPersonalJobDataEmpComponent } from './customer-view/customer-view-personal-job-data-emp/customer-view-personal-job-data-emp.component';
import { CustomerViewPersonalJobDataSmeComponent } from './customer-view/customer-view-personal-job-data-sme/customer-view-personal-job-data-sme.component';
import { CustomerViewPersonalOtherAttrComponent } from './customer-view/customer-view-personal-other-attr/customer-view-personal-other-attr.component';
import { CustomerViewPersonalAppListingComponent } from './customer-view/customer-view-personal-app-listing/customer-view-personal-app-listing.component';
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
import { CustomerViewCoyDetailComponent } from './customer-view/customer-view-coy-detail/customer-view-coy-detail.component';
import { CustomerCompanyPageComponent } from './customer-company/customer-company-page/customer-company-page.component';
import { CustomerCompanyDetailComponent } from './customer-company/customer-company-detail/customer-company-detail.component';
import { CustomerCompanyContactInformationComponent } from './customer-company/customer-company-contact-information/customer-company-contact-information.component';
import { CustomerCompanyManagementShareholderComponent } from './customer-company/customer-company-management-shareholder/customer-company-management-shareholder.component';
import { CustomerCompanyManagementShareholderCheckComponent } from './customer-company/customer-company-management-shareholder/customer-company-management-shareholder-check/customer-company-management-shareholder-check.component';
import { CustomerCompanyManagementShareholderPersonalComponent } from './customer-company/customer-company-management-shareholder/customer-company-management-shareholder-personal/customer-company-management-shareholder-personal.component';
import { CustomerCompanyManagementShareholderCompanyComponent } from './customer-company/customer-company-management-shareholder/customer-company-management-shareholder-company/customer-company-management-shareholder-company.component';
import { EditMainDataPagingComponent } from './edit-main-data/edit-main-data-paging/edit-main-data-paging.component';
import { EditMainDataCompanyComponent } from './edit-main-data/edit-main-data-company/edit-main-data-company.component';
import { EditMainDataPersonalComponent } from './edit-main-data/edit-main-data-personal/edit-main-data-personal.component';
import { CustomerCompanyAddressCheckComponent } from './customer-company/customer-company-address/customer-company-address-check/customer-company-address-check.component';
import { CustomerPersonalAddressCheckComponent } from './customer-personal/customer-personal-address/customer-personal-address-check/customer-personal-address-check.component';
import { CustomerViewHeaderPersonalComponent } from './customer-view/customer-view-header-personal/customer-view-header-personal.component';
import { CustomerViewHeaderCompanyComponent } from './customer-view/customer-view-header-company/customer-view-header-company.component';
import { CustomerViewPersonalFinancialSectionComponent } from './customer-view/customer-view-personal-financial-section/customer-view-personal-financial-section.component';
import { UcShowErrorsModule } from '@adins/uc-show-errors';
import { CustomerViewCustomerGroupComponent } from './customer-view/customer-view-customer-group/customer-view-customer-group.component';
import { CustomerViewAddressComponent } from './customer-view/customer-view-address/customer-view-address.component';
import { MatTabsModule } from '@angular/material';
import { NgxCurrencyModule } from "ngx-currency";
import { UploadNegativeCustomerComponent } from './negative-customer/upload-negative-customer/upload-negative-customer.component';
import { ReviewUploadNegativeCustomerDetailComponent } from './negative-customer/review-upload-negative-customer/review-upload-negative-customer-detail/review-upload-negative-customer-detail.component';
import { ReviewUploadNegativeCustomerPagingComponent } from './negative-customer/review-upload-negative-customer/review-upload-negative-customer-paging/review-upload-negative-customer-paging.component';
import { UcuploadModule } from '@adins/ucupload';
import { CustAttrSectionComponent } from './cust-attr-section/cust-attr-section.component';
import { CustomerViewCoyAddressComponent } from './customer-view/customer-view-coy-address/customer-view-coy-address.component';
import { CustomerViewPersonalAddressComponent } from './customer-view/customer-view-personal-address/customer-view-personal-address.component';
import { CustomerViewPersonalCustomerGroupComponent } from './customer-view/customer-view-personal-customer-group/customer-view-personal-customer-group.component';
import { CustAttrListComponent } from './cust-attr-list/cust-attr-list.component';
import { CustomerEmergencyContactComponent } from './customer-personal/customer-contact-person/customer-emergency-contact/customer-emergency-contact.component';
import { CustomerFamilyComponent } from './customer-personal/customer-family/customer-family.component';
import { CustomerFamilyDetailComponent } from './customer-personal/customer-family/customer-family-detail/customer-family-detail.component';
import { CustomerFamilyPagingComponent } from './customer-personal/customer-family/customer-family-paging/customer-family-paging.component';
import { CustomerFamilyMenuComponent } from './customer-family-menu/customer-family-menu.component';
import { CustomerShareholderMenuComponent } from './customer-shareholder-menu/customer-shareholder-menu.component';
import { CustomerGuarantorMenuComponent } from './customer-guarantor-menu/customer-guarantor-menu.component';
import { CustomerUpdateMasterComponent } from './customer-update-master/customer-update-master.component';
import { CustomerUpdateMasterDetailComponent } from './customer-update-master/customer-update-master-detail/customer-update-master-detail.component';
import { UpdateCustomerPersonalDetailComponent } from './customer-update-master/customer-update-master-detail/personal/update-customer-personal-detail/update-customer-personal-detail.component';
import { UpdateCustomerAddressComponent } from './customer-update-master/customer-update-master-detail/personal/update-customer-address/update-customer-address.component';
import { UpdateCustomerFamilyComponent } from './customer-update-master/customer-update-master-detail/personal/update-customer-family/update-customer-family.component';
import { UpdateCustomerJobDataComponent } from './customer-update-master/customer-update-master-detail/personal/update-customer-job-data/update-customer-job-data.component';
import { UpdateCustomerFinancialDataComponent } from './customer-update-master/customer-update-master-detail/personal/update-customer-financial-data/update-customer-financial-data.component';
import { UpdateCustomerEmergencyDetailComponent } from './customer-update-master/customer-update-master-detail/personal/update-customer-emergency/update-customer-emergency-detail/update-customer-emergency-detail.component';
import { UpdateCustomerEmergencyMainCompComponent } from './customer-personal/customer-update-master/update-customer-emergency/update-customer-emergency-main-comp/update-customer-emergency-main-comp.component';
import { UpdateCustomerFinDataComponent } from './customer-update-master/customer-update-master-detail/personal/update-customer-fin-data/update-customer-fin-data.component';
import { UpdateCustomerCompanyDetailComponent } from './customer-update-master/customer-update-master-detail/company/update-customer-company-detail/update-customer-company-detail.component';
import { UpdateCustomerMgmntShareholderComponent } from './customer-update-master/customer-update-master-detail/company/update-customer-mgmnt-shareholder/update-customer-mgmnt-shareholder.component';
import { UpdateCustomerContactInfoComponent } from './customer-update-master/customer-update-master-detail/company/update-customer-contact-info/update-customer-contact-info.component';
import { UpdateCustomerCompanyFinDataComponent } from './customer-update-master/customer-update-master-detail/company/update-customer-company-fin-data/update-customer-company-fin-data.component';
import { UpdateCustomerCompanyLegalDocComponent } from './customer-update-master/customer-update-master-detail/company/update-customer-company-legal-doc/update-customer-company-legal-doc.component';
import { RegexService } from './regex.service';

export const customCurrencyMaskConfig = {     
  align: "left",     
  allowNegative: true,     
  allowZero: true,     
  decimal: ".",     
  precision: 2,     
  prefix: "",     
  suffix: "",     
  thousands: ",",     
  nullable: false 
};

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
    UcaddressModule,
    UcShowErrorsModule,
    MatTabsModule,
    UcuploadModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig)
  ],
  declarations: [
    CustomerPagingComponent,
    CustomerPersonalMainInfoComponent, CustomerPersonalDuplicateCheckComponent, CustomerCompanyDuplicateCheckComponent, CustomerCompanyMainInfoComponent, CustomerPersonalPageComponent, CustomerPersonalDetailComponent,
    NegativeCustomerComponent,
    NegativeCustomerDetailComponent,
    NegativeCustomerViewComponent,
    CustomerContactPersonComponent,
    CustomerContactAddComponent,
    CustomerContactCheckComponent,
    CustomerViewPersonalDetailComponent,
    CustomerViewPersonalJobDataComponent,
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
    JobDataSmeComponent,
    CustFinDataTabComponent,
    CustBankAccSectionFindataComponent,
    CustBankAccDetailSectionFindataComponent,
    CustLegalDocComponent,
    CustLegalDocDetailComponent,
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
    CustomerViewComponent,
    CustomerViewCoyDetailComponent,
    CustomerCompanyPageComponent,
    CustomerCompanyDetailComponent,
    CustomerCompanyContactInformationComponent,
    CustomerCompanyManagementShareholderComponent,
    CustomerCompanyManagementShareholderCheckComponent,
    CustomerCompanyManagementShareholderPersonalComponent,
    CustomerCompanyManagementShareholderCompanyComponent,
    EditMainDataPagingComponent,
    EditMainDataCompanyComponent,
    EditMainDataPersonalComponent,
    CustomerCompanyAddressCheckComponent,  
    CustomerPersonalAddressCheckComponent, 
    CustomerViewHeaderPersonalComponent, 
    CustomerViewHeaderCompanyComponent,
    CustomerViewPersonalFinancialSectionComponent,
    CustomerViewCustomerGroupComponent,
    CustomerViewAddressComponent,
    UploadNegativeCustomerComponent,
    ReviewUploadNegativeCustomerDetailComponent,
    ReviewUploadNegativeCustomerPagingComponent,
    CustAttrSectionComponent,
    CustomerViewCoyAddressComponent,
    CustomerViewPersonalAddressComponent,
    CustomerViewPersonalCustomerGroupComponent,
    CustAttrListComponent,
    CustomerEmergencyContactComponent,
    CustomerFamilyComponent,
    CustomerFamilyDetailComponent,
    CustomerFamilyPagingComponent,
    CustomerFamilyMenuComponent,
    CustomerShareholderMenuComponent,
    CustomerGuarantorMenuComponent,
    CustomerUpdateMasterComponent,
    CustomerUpdateMasterDetailComponent,
    UpdateCustomerPersonalDetailComponent,
    UpdateCustomerAddressComponent,
    UpdateCustomerFamilyComponent,
    UpdateCustomerJobDataComponent,
    UpdateCustomerFinancialDataComponent,
    UpdateCustomerEmergencyDetailComponent,
    UpdateCustomerEmergencyMainCompComponent,
    UpdateCustomerFinDataComponent,
    UpdateCustomerCompanyDetailComponent,
    UpdateCustomerMgmntShareholderComponent,
    UpdateCustomerContactInfoComponent,
    UpdateCustomerCompanyFinDataComponent,
    UpdateCustomerCompanyLegalDocComponent
  ],
  entryComponents: [CustGroupTabDetailComponent, CustBankAccDetailSectionFindataComponent, CustLegalDocDetailComponent]
  ,
  providers: [
    RegexService
  ]
})
export class CustomerModule {
  constructor() {

  }
}
