import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomerRoutingModule } from 'app/customer/customer-routing.module';
import { SharingComponentModule } from 'app/shared/sharingcomponent.module';
import { UCSearchModule } from '@adins/ucsearch';
import { UcgridfooterModule } from '@adins/ucgridfooter';
import { CustomerPagingComponent } from './customer-paging/customer-paging.component';
import { UcpagingModule } from '@adins/ucpaging';
import { UclookupgenericModule } from '@adins/uclookupgeneric';
import { UcSubsectionModule } from '@adins/uc-subsection';
import { CustomerPersonalPageComponent } from './customer-personal/customer-personal-page/customer-personal-page.component';
import { ArchwizardModule } from 'angular-archwizard';
import { CustomerPersonalDetailComponent } from './customer-personal/customer-personal-detail/customer-personal-detail.component';
import { UcviewgenericModule } from '@adins/ucviewgeneric';
import { NegativeCustomerDetailComponent } from './negative-customer/negative-customer-detail/negative-customer-detail.component';
import { NegativeCustomerComponent } from './negative-customer/negative-customer.component';
import { NegativeCustomerViewComponent } from './negative-customer/negative-customer-view/negative-customer-view.component';
import { UcaddressModule } from '@adins/ucaddress';
import { CustomerViewPersonalDetailComponent } from './customer-view/customer-view-personal-detail/customer-view-personal-detail.component';
import { CustomerViewPersonalJobDataComponent } from './customer-view/customer-view-personal-job-data/customer-view-personal-job-data.component';
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
import { CustomerViewCoyManagementComponent } from './customer-view/customer-view-coy-management/customer-view-coy-management.component';
import { CustomerViewCoyContactComponent } from './customer-view/customer-view-coy-contact/customer-view-coy-contact.component';
import { CustomerViewCoyFinancialComponent } from './customer-view/customer-view-coy-financial/customer-view-coy-financial.component';
import { CustomerViewCoyLegalComponent } from './customer-view/customer-view-coy-legal/customer-view-coy-legal.component';
import { CustomerViewCoyOtherComponent } from './customer-view/customer-view-coy-other/customer-view-coy-other.component';
import { CustomerViewComponent } from './customer-view/customer-view.component';
import { CustomerViewCoyDetailComponent } from './customer-view/customer-view-coy-detail/customer-view-coy-detail.component';
import { CustomerCompanyPageComponent } from './customer-company/customer-company-page/customer-company-page.component';
import { CustomerCompanyDetailComponent } from './customer-company/customer-company-detail/customer-company-detail.component';
import { CustomerCompanyContactInformationComponent } from './customer-company/customer-company-contact-information/customer-company-contact-information.component';
import { EditMainDataPagingComponent } from './edit-main-data/edit-main-data-paging/edit-main-data-paging.component';
import { CustomerCompanyAddressCheckComponent } from './customer-company/customer-company-address/customer-company-address-check/customer-company-address-check.component';
import { CustomerPersonalAddressCheckComponent } from './customer-personal/customer-personal-address/customer-personal-address-check/customer-personal-address-check.component';
import { CustomerViewHeaderPersonalComponent } from './customer-view/customer-view-header-personal/customer-view-header-personal.component';
import { CustomerViewHeaderCompanyComponent } from './customer-view/customer-view-header-company/customer-view-header-company.component';
import { CustomerViewPersonalFinancialSectionComponent } from './customer-view/customer-view-personal-financial-section/customer-view-personal-financial-section.component';
import { UcShowErrorsModule } from '@adins/uc-show-errors';
import { CustomerViewCustomerGroupComponent } from './customer-view/customer-view-customer-group/customer-view-customer-group.component';
import { CustomerViewAddressComponent } from './customer-view/customer-view-address/customer-view-address.component';
import { MatTabsModule } from '@angular/material/tabs';
import { CurrencyMaskInputMode, NgxCurrencyModule } from "ngx-currency";
import { UploadNegativeCustomerComponent } from './negative-customer/upload-negative-customer/upload-negative-customer.component';
import { ReviewUploadNegativeCustomerDetailComponent } from './negative-customer/review-upload-negative-customer/review-upload-negative-customer-detail/review-upload-negative-customer-detail.component';
import { ReviewUploadNegativeCustomerPagingComponent } from './negative-customer/review-upload-negative-customer/review-upload-negative-customer-paging/review-upload-negative-customer-paging.component';
import { UcuploadModule } from '@adins/ucupload';
import { CustAttrSectionComponent } from './cust-attr-section/cust-attr-section.component';
import { CustomerViewPersonalAddressComponent } from './customer-view/customer-view-personal-address/customer-view-personal-address.component';
import { CustomerViewPersonalCustomerGroupComponent } from './customer-view/customer-view-personal-customer-group/customer-view-personal-customer-group.component';
import { CustAttrListComponent } from './cust-attr-list/cust-attr-list.component';
import { CustomerEmergencyContactComponent } from './customer-personal/customer-contact-person/customer-emergency-contact/customer-emergency-contact.component';
import { CustomerFamilyMenuComponent } from './customer-family-menu/customer-family-menu.component';
import { CustomerShareholderMenuComponent } from './customer-shareholder-menu/customer-shareholder-menu.component';
import { CustomerGuarantorMenuComponent } from './customer-guarantor-menu/customer-guarantor-menu.component';
import { CustomerUpdateMasterComponent } from './customer-update-master/customer-update-master.component';
import { CustomerUpdateMasterDetailComponent } from './customer-update-master/customer-update-master-detail/customer-update-master-detail.component';
import { UpdateCustomerPersonalDetailComponent } from './customer-update-master/customer-update-master-detail/personal/update-customer-personal-detail/update-customer-personal-detail.component';
import { UpdateCustomerAddressComponent } from './customer-update-master/customer-update-master-detail/personal/update-customer-address/update-customer-address.component';
import { UpdateCustomerFamilyComponent } from './customer-update-master/customer-update-master-detail/personal/update-customer-family/update-customer-family.component';
import { UpdateCustomerJobDataComponent } from './customer-update-master/customer-update-master-detail/personal/update-customer-job-data/update-customer-job-data.component';
import { UpdateCustomerEmergencyDetailComponent } from './customer-update-master/customer-update-master-detail/personal/update-customer-emergency/update-customer-emergency-detail/update-customer-emergency-detail.component';
import { UpdateCustomerFinDataComponent } from './customer-update-master/customer-update-master-detail/personal/update-customer-fin-data/update-customer-fin-data.component';
import { UpdateCustomerCompanyDetailComponent } from './customer-update-master/customer-update-master-detail/company/update-customer-company-detail/update-customer-company-detail.component';
import { UpdateCustomerMgmntShareholderComponent } from './customer-update-master/customer-update-master-detail/company/update-customer-mgmnt-shareholder/update-customer-mgmnt-shareholder.component';
import { UpdateCustomerContactInfoComponent } from './customer-update-master/customer-update-master-detail/company/update-customer-contact-info/update-customer-contact-info.component';
import { UpdateCustomerCompanyFinDataComponent } from './customer-update-master/customer-update-master-detail/company/update-customer-company-fin-data/update-customer-company-fin-data.component';
import { UpdateCustomerCompanyLegalDocComponent } from './customer-update-master/customer-update-master-detail/company/update-customer-company-legal-doc/update-customer-company-legal-doc.component';
import { RegexService } from './regex.service';
import { CustAssetComponent } from './cust-asset/cust-asset.component';
import { CustAssetDetailComponent } from './cust-asset/cust-asset-detail/cust-asset-detail.component';
import { SharedModule } from 'app/shared/shared.module';
import { CustBankAccComponent } from './cust-bank-acc/cust-bank-acc.component';
import { CustomerViewCustomerAssetComponent } from './customer-view/customer-view-customer-asset/customer-view-customer-asset.component';
import { NewCustomerSharingModule } from './sharing-component/new-cust-sharing.model';
import { UcdropdownlistModule } from '@adins/ucdropdownlist';
import { AdInsModule } from 'app/components/adins-module/adins.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AdInsSharedModule } from 'app/components/adins-module/adins-shared.module';

export const customCurrencyMaskConfig = {     
  align: "right",     
  allowNegative: true,     
  allowZero: true,     
  decimal: ".",        
  precision: 0,
  prefix: "",     
  suffix: "",     
  thousands: ",",     
  nullable: false,
  inputMode: CurrencyMaskInputMode.NATURAL
};

 @NgModule({
  exports: [],
  imports: [
    AdInsModule,
    CustomerRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule, 
    UcpagingModule,
    SharingComponentModule,
    SharedModule,
    AdInsSharedModule,
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
    NgMultiSelectDropDownModule,
    NewCustomerSharingModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    UcdropdownlistModule
  ],
  declarations: [
    CustomerPagingComponent, CustAssetDetailComponent, 
    CustomerPersonalPageComponent, CustomerPersonalDetailComponent,
    NegativeCustomerComponent,
    NegativeCustomerDetailComponent,
    NegativeCustomerViewComponent,
    CustomerViewPersonalDetailComponent,
    CustomerViewPersonalJobDataComponent,
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
    CustomerViewCoyManagementComponent,
    CustomerViewCoyContactComponent,
    CustomerViewCoyFinancialComponent,
    CustomerViewCoyLegalComponent,
    CustomerViewCoyOtherComponent,
    CustomerViewComponent,
    CustomerViewCoyDetailComponent,
    CustomerCompanyPageComponent,
    CustomerCompanyDetailComponent,
    CustomerCompanyContactInformationComponent,
    EditMainDataPagingComponent,
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
    CustomerViewPersonalAddressComponent,
    CustomerViewPersonalCustomerGroupComponent,
    CustAttrListComponent,
    CustomerEmergencyContactComponent,
    CustomerFamilyMenuComponent,
    CustomerShareholderMenuComponent,
    CustomerGuarantorMenuComponent,
    CustomerUpdateMasterComponent,
    CustomerUpdateMasterDetailComponent,
    UpdateCustomerPersonalDetailComponent,
    UpdateCustomerAddressComponent,
    UpdateCustomerFamilyComponent,
    UpdateCustomerJobDataComponent,
    UpdateCustomerEmergencyDetailComponent,
    UpdateCustomerFinDataComponent,
    UpdateCustomerCompanyDetailComponent,
    UpdateCustomerMgmntShareholderComponent,
    UpdateCustomerContactInfoComponent,
    UpdateCustomerCompanyFinDataComponent,
    UpdateCustomerCompanyLegalDocComponent,
    CustBankAccComponent,
    CustAssetComponent,
    CustomerViewCustomerAssetComponent
  ],
  providers: [
    CustAssetComponent,
    CustAssetDetailComponent,
    CustomerPersonalJobDataComponent,
    RegexService
  ],
  entryComponents: [CustBankAccDetailSectionFindataComponent, CustLegalDocDetailComponent, CustAssetDetailComponent]
})
export class CustomerModule {
  constructor() {

  }
}
