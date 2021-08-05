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
        CustPersonalJobDataComponent,
        JobAddrSectionComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        MatRadioModule,
        NgbModule,
        SharingComponentModule,
        SharedModule,
        ArchwizardModule,
        MatTabsModule,
        AdInsModule,        
        NgMultiSelectDropDownModule,
        NgxCurrencyModule.forRoot(customCurrencyMaskConfig),

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
        CustPersonalJobDataComponent,
        JobAddrSectionComponent,
    ],

    providers: [
        NGXToastrService,
        RegexService
    ],
    entryComponents: []
})
export class NewCustomerSharingModule {
    constructor() {

    }
}
