import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharingComponentModule } from 'app/shared/sharingcomponent.module';
import { ArchwizardModule } from 'angular-archwizard';
import { MatRadioModule, MatTabsModule } from '@angular/material';
import { CurrencyMaskInputMode, NgxCurrencyModule } from "ngx-currency";
import { SharedModule } from 'app/shared/shared.module';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { NewCustPersonalMainDataComponent } from './new-cust-component/new-cust-personal-main-data/new-cust-personal-main-data.component';
import { NewCustCompanyMainDataComponent } from './new-cust-component/new-cust-company-main-data/new-cust-company-main-data.component';
import { RegexService } from 'app/customer/regex.service';
import { AdInsModule } from 'app/components/adins-module/adins.module';
import { NewCustHeaderComponent } from './new-cust-header/new-cust-header.component';
import { CustDupCheckPersonalComponent } from './cust-dup-check/cust-dup-check-personal/cust-dup-check-personal.component';
import { CustDupCheckCompanyComponent } from './cust-dup-check/cust-dup-check-company/cust-dup-check-company.component';
import { CustDupCheckHeaderComponent } from './cust-dup-check/cust-dup-check-header/cust-dup-check-header.component';
import { ShareholderListingComponent } from './shareholder-listing/shareholder-listing.component';
import { FamilyListingComponent } from './family-listing/family-listing.component';
import { NewCustPublicComponent } from './new-cust-component/new-cust-public/new-cust-public.component';
import { ShareholderFormComponent } from './new-cust-component/component/shareholder-form/shareholder-form.component';
import { CustAttrFormComponent } from './new-cust-component/component/cust-attr-form/cust-attr-form.component';
import { FamilyFormComponent } from './new-cust-component/component/family-form/family-form.component';
import { CustPersonalJobDataComponent } from './cust-personal-job-data/cust-personal-job-data.component';
import { JobAddrSectionComponent } from './cust-personal-job-data/job-addr-section/job-addr-section.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { TrustingSocialReqHeaderComponent } from './new-cust-component/component/third-party-form/trusting-social/request/trusting-social-req-header.component';
import { TrustingSocialReqConsentComponent } from './new-cust-component/component/third-party-form/trusting-social/request/consent/trusting-social-req-consent.component';
import { TrustingSocialReqDetailComponent } from './new-cust-component/component/third-party-form/trusting-social/request/detail/trusting-social-req-detail.component';
import { TrustingSocialViewHeaderComponent } from './new-cust-component/component/third-party-form/trusting-social/view/trusting-social-view-header.component';
import { CustomerViewTrustingSocialModule } from 'app/view/customer-view/customer-view-trusting-social/customer-view-trusting-social.module';
import { PefindoReqComponent } from './new-cust-component/component/third-party-form/pefindo/request/pefindo-req.component';
import { ThirdPartyFormComponent } from './new-cust-component/component/third-party-form/third-party-form.component';
import { ThirdPartyUploadService } from './new-cust-component/component/third-party-form/services/ThirdPartyUpload.Service';
import { AdInsSharedModule } from 'app/components/adins-module/adins-shared.module';
import { NewCustSetData } from './new-cust-component/NewCustSetData.Service';
import { NewCustHeaderXComponent } from 'app/impl/customer/sharing-component/new-cust-header/new-cust-header-x.component';
import { FamilyListingXComponent } from 'app/impl/customer/sharing-component/family-listing/family-listing-x.component';
import { NewCustPersonalMainDataXComponent } from 'app/impl/customer/sharing-component/new-cust-component/new-cust-personal-main-data/new-cust-personal-main-data-x.component';
import { ShareholderListingXComponent } from 'app/impl/customer/sharing-component/shareholder-listing-x/shareholder-listing-x.component';
import { FamilyFormXComponent } from 'app/impl/customer/sharing-component/new-cust-component/component/family-form/family-form-x.component';
import { NewCustCompanyMainDataXComponent } from 'app/impl/customer/sharing-component/new-cust-component/new-cust-company-main-data/new-cust-company-main-data-x.component';
import { ShareholderFormXComponent } from 'app/impl/customer/sharing-component/new-cust-component/component/shareholder-form/shareholder-form-x.component';

export const customCurrencyMaskConfig = {
    align: "right",
    allowNegative: true,
    allowZero: true,
    decimal: ".",
    precision: 2,
    prefix: "",
    suffix: "",
    thousands: ",",
    nullable: false,
    inputMode: CurrencyMaskInputMode.NATURAL
};

@NgModule({
    exports: [
        NewCustPersonalMainDataComponent,
        NewCustCompanyMainDataComponent,
        NewCustHeaderComponent,
        CustDupCheckPersonalComponent,
        CustDupCheckCompanyComponent,
        CustDupCheckHeaderComponent,
        FamilyListingComponent,
        ShareholderListingComponent,
        NewCustPublicComponent,
        ShareholderFormComponent,
        CustAttrFormComponent,
        FamilyFormComponent,
        FamilyFormXComponent,
        CustPersonalJobDataComponent,
        JobAddrSectionComponent,
        FamilyListingXComponent,
        NewCustHeaderXComponent,
        ShareholderListingXComponent,
        // NewCustPersonalMainDataXComponent,
        TrustingSocialReqHeaderComponent,
        TrustingSocialReqConsentComponent,
        TrustingSocialReqDetailComponent,
        TrustingSocialViewHeaderComponent,
        PefindoReqComponent,
        NewCustCompanyMainDataXComponent,
        ShareholderFormXComponent,
        ThirdPartyFormComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        MatRadioModule,
        NgbModule,
        SharingComponentModule,
        SharedModule,
        AdInsSharedModule,
        ArchwizardModule,
        MatTabsModule,
        AdInsModule,
        NgMultiSelectDropDownModule,
        NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
        CustomerViewTrustingSocialModule
    ],
    declarations: [
        NewCustPersonalMainDataComponent,
        NewCustCompanyMainDataComponent,
        NewCustHeaderComponent,
        CustDupCheckPersonalComponent,
        CustDupCheckCompanyComponent,
        CustDupCheckHeaderComponent,
        FamilyListingComponent,
        ShareholderListingComponent,
        NewCustPublicComponent,
        ShareholderFormComponent,
        CustAttrFormComponent,
        FamilyFormComponent,
        FamilyFormXComponent,
        CustPersonalJobDataComponent,
        JobAddrSectionComponent,
        FamilyListingXComponent,
        ShareholderListingXComponent,
        NewCustHeaderXComponent,
        NewCustPersonalMainDataXComponent,
        TrustingSocialReqHeaderComponent,
        TrustingSocialReqConsentComponent,
        TrustingSocialReqDetailComponent,
        TrustingSocialViewHeaderComponent,
        PefindoReqComponent,
        NewCustCompanyMainDataXComponent,
        ShareholderFormXComponent,
        ThirdPartyFormComponent
    ],

    providers: [
        NGXToastrService,
        RegexService,
        NewCustSetData,
        ThirdPartyUploadService
    ],
    entryComponents: [TrustingSocialReqHeaderComponent, TrustingSocialViewHeaderComponent, PefindoReqComponent]
})
export class NewCustomerSharingModule {
    constructor() {

    }
}
