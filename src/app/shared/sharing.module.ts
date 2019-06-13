import { LookupOrgMdlStrucComponent } from './lookup/lookup-org-mdl-struc/lookup-org-mdl-struc.component';
import { LookupRoleComponent } from 'app/shared/lookup/lookup-role/lookup-role.component';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { SearchComponent } from 'app/shared/search/search.component';
import { TranslateModule } from '@ngx-translate/core';
import { LookupzipcodeComponent } from 'app/shared/lookup/lookupzipcode/lookupzipcode.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { LookupBizUnitComponent } from 'app/shared/lookup/lookup-biz-unit/lookup-biz-unit.component';
import { LookupOrgJobTitleComponent } from 'app/shared/lookup/lookup-org-job-title/lookup-org-job-title.component';
import { LookupRefJobTitleComponent } from 'app/shared/lookup/lookup-ref-job-title/lookup-ref-job-title.component';
import { LookupRefBankComponent } from 'app/shared/lookup/lookup-ref-bank/lookup-ref-bank.component';
import { UCGridFooterComponent } from 'app/shared/UserControl/ucgrid-footer/ucgrid-footer.component';
import { UcAddressComponent } from 'app/shared/UserControl/ucAddress/ucAddress.component';
import { UcContactInfoComponent } from 'app/shared/UserControl/ucContactInfo/ucContactInfo.component';
import { LookupparentformModule } from '@adins/lookupparentform';
import { UCSearchModule } from '@adins/ucsearch';
import { UcgridfooterModule } from '@adins/ucgridfooter';
import { FormEngineComponent } from './form-engine/form-engine.component';
import { FormEngineModule } from '@adins/form-engine';
import { LookupemployeeModule } from '@adins/lookupemployee';
import { LookupdistrictModule } from '@adins/lookupdistrict';

@NgModule({
    exports: [
        CommonModule,
        SearchComponent,
        LookupemployeeModule,
        LookupzipcodeComponent,
        NgbModule,
        LookupRefBankComponent,
        LookupRoleComponent,
        LookupdistrictModule,
        LookupparentformModule,
        FormEngineComponent,
        UcAddressComponent,
        UCGridFooterComponent,
        UcContactInfoComponent,
        TranslateModule,
        LookupBizUnitComponent,
        LookupOrgMdlStrucComponent,
        LookupOrgJobTitleComponent,
        LookupRefJobTitleComponent,
        UCSearchModule,
        UcgridfooterModule,
        FormEngineModule
    ],
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        HttpModule,
        UCSearchModule,
        UcgridfooterModule,
        TranslateModule
    ],
    declarations: [
        SearchComponent,
        LookupzipcodeComponent,
        LookupRefBankComponent,
        LookupRoleComponent,
        UcAddressComponent,
        FormEngineComponent,
        UCGridFooterComponent,
        UcContactInfoComponent,
        LookupBizUnitComponent,
        LookupOrgMdlStrucComponent,
        LookupOrgJobTitleComponent,
        LookupRefJobTitleComponent
    ]
})

export class SharingModule { }
