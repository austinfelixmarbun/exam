import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { SharingComponentModule } from 'app/shared/sharingcomponent.module';
import { UCSearchModule } from '@adins/ucsearch';
import { UcgridfooterModule } from '@adins/ucgridfooter';
import { UcpagingModule } from '@adins/ucpaging';
import { UcSubsectionModule } from '@adins/uc-subsection';
import { VendorRoutingModule } from './vendor-routing.module';
import { VendorHoldingPagingComponent } from './vendor-holding-paging/vendor-holding-paging.component';
import { VendorHoldingAddEditComponent } from './vendor-holding-add-edit/vendor-holding-add-edit.component';
import { BankInfoComponent } from './component/bank-info/bank-info.component';
import { VendorGroupComponent } from './vendor-group/vendor-group.component';
import { VendorGroupPagingComponent } from './vendor-group/vendor-group-paging/vendor-group-paging.component';
import { VendorGroupViewComponent } from './vendor-group/vendor-group-view/vendor-group-view.component';
import { UcviewgenericModule, UcviewgenericComponent } from '@adins/ucviewgeneric';
import { VendorGroupmemberComponent } from './vendor-groupmember/vendor-groupmember.component';
import { VendorSchemeAddEditComponent } from './vendor-scheme/vendor-scheme-add-edit/vendor-scheme-add-edit.component';
import { VendorSchemePagingComponent } from './vendor-scheme/vendor-scheme-paging/vendor-scheme-paging.component';
import { VendorSchemeMemberPagingComponent } from './vendor-scheme/vendor-scheme-member/vendor-scheme-member-paging/vendor-scheme-member-paging.component';
import { VendorSchemeMemberAddComponent } from './vendor-scheme/vendor-scheme-member/vendor-scheme-member-add/vendor-scheme-member-add.component';
import { VendorHoAddEditComponent } from './vendor-ho/vendor-ho-add-edit/vendor-ho-add-edit.component';
import { VendorHoPagingComponent } from './vendor-ho/vendor-ho-paging/vendor-ho-paging.component';
import { VendorBranchPagingComponent } from './vendor-branch/vendor-branch-paging/vendor-branch-paging.component';
import { ContactPersonListComponent } from './component/contact-person-list/contact-person-list.component';
import { ContactPersonAddEditComponent } from './component/contact-person-add-edit/contact-person-add-edit.component';
import { VendorBranchAddEditComponent } from './vendor-branch/vendor-branch-add-edit/vendor-branch-add-edit.component';
import { UclookupgenericModule } from '@adins/uclookupgeneric';
import { AddressComponent } from './component/address/address.component';
import { ArchwizardModule } from 'angular-archwizard';
import { VendorHoRegistrationComponent } from './vendor-ho/vendor-ho-registration/vendor-ho-registration.component';
import { VendorService } from './vendor.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MainInfoViewComponent } from './component/main-info-view/main-info-view.component';
import { VendorBranchEmployeePagingComponent } from './vendor-branch/vendor-branch-employee-paging/vendor-branch-employee-paging.component';
import { VendorBranchEmployeeAddEditComponent } from './vendor-branch/vendor-branch-employee-add-edit/vendor-branch-employee-add-edit.component';
import { VendorEmployeeComponent } from './component/vendor-employee/vendor-employee.component';
import { UcShowErrorsModule } from '@adins/uc-show-errors';
import { UcaddressModule } from '@adins/ucaddress';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { VendorHoldingRegistrationComponent } from './vendor-holding-registration/vendor-holding-registration.component';
import { VendorBranchRegistrationComponent } from './vendor-branch/vendor-branch-registration/vendor-branch-registration.component';
import { VendorBranchOfficeMemberAddComponent } from './vendor-branch/vendor-branch-office-member-add/vendor-branch-office-member-add.component';
import { VendorBranchOfficeMemberComponent } from './vendor-branch/vendor-branch-office-member/vendor-branch-office-member.component';
import { UcaddtotempModule } from '@adins/ucaddtotemp';
import { VendorPagingComponent } from './component/vendor/vendor-paging/vendor-paging.component';
import { VendorATPMAddEditComponent } from './vendor-ATPM/vendor-atpm-add-edit/vendor-atpm-add-edit.component';
import { VendorATPMRegistrationComponent } from './vendor-ATPM/vendor-atpm-registration/vendor-atpm-registration.component';
import { CurrencyMaskInputMode, NgxCurrencyModule } from 'ngx-currency';
import { VendorAtpmSelectComponent } from './vendor-ATPM/vendor-atpm-select/vendor-atpm-select.component';
import { VendorGradingRequestPagingComponent } from './vendor-grading/vendor-grading-request/vendor-grading-request-paging/vendor-grading-request-paging.component';
import { VendorGradingRequestDetailComponent } from './vendor-grading/vendor-grading-request/vendor-grading-request-detail/vendor-grading-request-detail.component';
import { VendorGradingApprovalPagingComponent } from './vendor-grading/vendor-grading-approval/vendor-grading-approval-paging/vendor-grading-approval-paging.component';
import { VendorGradingApprovalDetailComponent } from './vendor-grading/vendor-grading-approval/vendor-grading-approval-detail/vendor-grading-approval-detail.component';
import { VendorGradingInquiryPagingComponent } from './vendor-grading/vendor-grading-inquiry-paging/vendor-grading-inquiry-paging.component';
import { UcapprovalModule } from '@adins/ucapproval';
import { UcapprovalcreateModule } from '@adins/ucapprovalcreate';
import { UcapprovalR3Module } from '@adins/ucapproval-r3';
import { UcapprovalHistoryModule } from "@adins/ucapproval-history";
import { UcapprovalgeneralinfoModule } from "@adins/ucapprovalgeneralinfo";
import { AdInsModule } from 'app/components/adins-module/adins.module';
import { AdInsSharedModule } from 'app/components/adins-module/adins-shared.module';
import { VendorCollCompanyRegistrationComponent } from './vendor-coll-company/vendor-coll-company-registration/vendor-coll-company-registration.component';
import { VendorCollCompanyAddEditComponent } from './vendor-coll-company/vendor-coll-company-add-edit/vendor-coll-company-add-edit.component';
import { VendorCollCompanyEmployeeAddEditComponent } from './vendor-coll-company/vendor-coll-company-employee-add-edit/vendor-coll-company-employee-add-edit.component';
import { VendorCollCompanyEmployeePagingComponent } from './vendor-coll-company/vendor-coll-company-employee-paging/vendor-coll-company-employee-paging.component';
import { VendorCollCompanyOfficeMemberComponent } from './vendor-coll-company/vendor-coll-company-office-member/vendor-coll-company-office-member.component';
import { VendorCollCompanyOfficeMemberAddComponent } from './vendor-coll-company/vendor-coll-company-office-member-add/vendor-coll-company-office-member-add.component';
import { FundingCompanyAddEditComponent } from './funding-company/funding-company-add-edit/funding-company-add-edit.component';
import { FundingCompanyContactPersonComponent } from './funding-company/funding-company-contact-person/funding-company-contact-person.component';
import { FundingCompanyPagingComponent } from './funding-company/funding-company-paging/funding-company-paging.component';
import { FundingCompanyDetailComponent } from '../view/vendor/vendor-funding-company-view/funding-company-detail.component';
import { MatRadioModule } from '@angular/material/radio';

import { SelfCustomVendorPagingComponent } from './component/vendor/self-custom-vendor-paging/self-custom-vendor-paging.component';
import { SelfCustomVendorHoAddEditComponent } from './vendor-ho/self-custom-vendor-ho-add-edit/self-custom-vendor-ho-add-edit.component';
import { SelfCustomVendorHoldingAddEditComponent } from './self-custom-vendor-holding-add-edit/self-custom-vendor-holding-add-edit.component';
import { UcTemplateModule } from '@adins/uctemplate';
import { SelfCustomVendorBranchAddEditComponent } from './vendor-branch/self-custom-vendor-branch-add-edit/self-custom-vendor-branch-add-edit.component';
import { SelfCustomVendorSchemeAddEditComponent } from './vendor-scheme/self-custom-vendor-scheme-add-edit/self-custom-vendor-scheme-add-edit.component';
import { SelfCustomVendorSchemeMemberPagingComponent } from './vendor-scheme/vendor-scheme-member/self-custom-vendor-scheme-member-paging/self-custom-vendor-scheme-member-paging.component';
import { SelfCustomVendorSchemeMemberAddComponent } from './vendor-scheme/vendor-scheme-member/self-custom-vendor-scheme-member-add/self-custom-vendor-scheme-member-add.component';
import { SelfCustomVendorGroupComponent } from './vendor-group/self-custom-vendor-group/self-custom-vendor-group.component';
import { SelfCustomVendorGroupViewComponent } from './vendor-group/self-custom-vendor-group-view/self-custom-vendor-group-view.component';
import { SelfCustomVendorGroupMemberAddComponent } from './vendor-group/self-custom-vendor-group-member-add/self-custom-vendor-group-member-add.component';
import { RegexService } from 'app/customer/regex.service';
import { VendorCreditInsurancePagingComponent } from './vendor-credit-insurance/vendor-credit-insurance-paging/vendor-credit-insurance-paging.component';
import { VendorCreditInsuranceBranchPagingComponent } from './vendor-credit-insurance/vendor-credit-insurance-branch-paging/vendor-credit-insurance-branch-paging.component';
import { VendorCreditInsuranceAddEditComponent} from './vendor-credit-insurance/vendor-credit-insurance-add-edit/vendor-credit-insurance-add-edit.component';
import { VendorCreditInsuranceBranchAddEditComponent } from './vendor-credit-insurance/vendor-credit-insurance-branch-add-edit/vendor-credit-insurance-branch-add-edit.component';
import { VendorCreditInsuranceGroupPagingComponent } from './vendor-credit-insurance/vendor-credit-insurance-group-paging/vendor-credit-insurance-group-paging.component';
import { VendorCreditInsuranceGroupAddEditComponent } from './vendor-credit-insurance/vendor-credit-insurance-group-add-edit/vendor-credit-insurance-group-add-edit.component';
import { SelfCustomVendorHoldingRegistrationComponent } from './self-custom-vendor-holding-registration/self-custom-vendor-holding-registration.component';
import { SelfCustomVendorATPMAddEditComponent } from './vendor-ATPM/self-custom-vendor-atpm-add-edit/self-custom-vendor-atpm-add-edit.component';
import { SelfCustomVendorDetailComponent } from './component/vendor/self-custom-vendor-detail/self-custom-vendor-detail.component';
import { SelfCustomContainerVendorHoInfoComponent } from './vendor-ho/self-custom-container-vendor-ho-info/self-custom-container-vendor-ho-info.component';
import { SelfCustomContainerVendorBranchInfoComponent } from './vendor-branch/self-custom-container-vendor-branch-info/self-custom-container-vendor-branch-info.component';
import { SelfCustomContainerOcrVendorComponent } from './self-custom-container-npwp-vendor/self-custom-container-ocr-vendor.component';
import { CustomFundingCompanyAddEditComponent } from './funding-company/custom-funding-company-add-edit/custom-funding-company-add-edit.component';
import { SelfCustomVendorAtpmSelectComponent } from './vendor-ATPM/self-custom-vendor-atpm-select/self-custom-vendor-atpm-select.component';
import { UiSwitchModule } from 'ngx-ui-switch';

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
    imports: [
        AdInsModule,
        AdInsSharedModule,
        VendorRoutingModule,
        CommonModule,
        FormsModule,
        NgbModule,
        SharingComponentModule,
        UCSearchModule,
        UcgridfooterModule,
        UcpagingModule,
        UcSubsectionModule,
        UclookupgenericModule,
        ReactiveFormsModule,
        UcviewgenericModule,
        NgbDropdownModule,
        ArchwizardModule,
        MatTabsModule,
        UcShowErrorsModule,
        UcaddressModule,
        UcaddtotempModule,
        UcapprovalModule,
        MatRadioModule,
        NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
        UcapprovalcreateModule,
        UcapprovalR3Module,
        UcapprovalHistoryModule,
        UcapprovalgeneralinfoModule,
        UcTemplateModule,
        UiSwitchModule,
    ],
    declarations: [
        VendorHoldingPagingComponent,
        VendorHoldingAddEditComponent,
        BankInfoComponent,
        VendorGroupComponent,
        VendorGroupPagingComponent,
        VendorGroupViewComponent,
        VendorGroupmemberComponent,
        VendorSchemeAddEditComponent,
        VendorSchemePagingComponent,
        VendorSchemeMemberAddComponent,
        VendorSchemeMemberPagingComponent,
        VendorHoAddEditComponent,
        VendorHoPagingComponent,
        VendorBranchPagingComponent,
        VendorBranchAddEditComponent,
        ContactPersonListComponent,
        ContactPersonAddEditComponent,
        AddressComponent,
        VendorHoRegistrationComponent,
        MainInfoViewComponent,
        VendorBranchEmployeePagingComponent,
        VendorBranchEmployeeAddEditComponent,
        VendorEmployeeComponent,
        VendorHoldingRegistrationComponent,
        VendorBranchRegistrationComponent,
        VendorBranchOfficeMemberAddComponent,
        VendorBranchOfficeMemberComponent,
        VendorPagingComponent,
        VendorATPMAddEditComponent,
        VendorATPMRegistrationComponent,
        VendorAtpmSelectComponent,
        VendorGradingRequestPagingComponent,
        VendorGradingRequestDetailComponent,
        VendorGradingApprovalPagingComponent,
        VendorGradingApprovalDetailComponent,
        VendorGradingInquiryPagingComponent,
        VendorCollCompanyRegistrationComponent,
        VendorCollCompanyAddEditComponent,
        VendorCollCompanyEmployeeAddEditComponent,
        VendorCollCompanyEmployeePagingComponent,
        VendorCollCompanyOfficeMemberComponent,
        VendorCollCompanyOfficeMemberAddComponent,
        FundingCompanyAddEditComponent,
        FundingCompanyContactPersonComponent,
        FundingCompanyPagingComponent,
        SelfCustomVendorPagingComponent,
        SelfCustomVendorHoAddEditComponent,
        SelfCustomVendorHoldingAddEditComponent,
        SelfCustomVendorBranchAddEditComponent,
        SelfCustomVendorSchemeAddEditComponent,
        SelfCustomVendorSchemeMemberPagingComponent,
        SelfCustomVendorSchemeMemberAddComponent,
        SelfCustomVendorGroupComponent,
        SelfCustomVendorGroupViewComponent,
        SelfCustomVendorGroupMemberAddComponent,
        VendorCreditInsurancePagingComponent,
        VendorCreditInsuranceBranchPagingComponent,
        VendorCreditInsuranceAddEditComponent,
        VendorCreditInsuranceBranchAddEditComponent,
        VendorCreditInsuranceGroupPagingComponent,
        VendorCreditInsuranceGroupAddEditComponent,
        SelfCustomVendorHoldingRegistrationComponent,
        SelfCustomVendorATPMAddEditComponent,
        SelfCustomVendorDetailComponent,
        SelfCustomContainerVendorHoInfoComponent,
        SelfCustomContainerVendorBranchInfoComponent,
        SelfCustomContainerOcrVendorComponent,
        CustomFundingCompanyAddEditComponent,
        SelfCustomVendorAtpmSelectComponent
    ],
    providers: [
        VendorService,
        NGXToastrService,
        RegexService
    ]
})
export class VendorModule { }
