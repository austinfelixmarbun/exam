import { LookupOrgMdlStrucComponent } from './lookup/lookup-org-mdl-struc/lookup-org-mdl-struc.component';
import { LookupRoleComponent } from './lookup/lookup-role/lookup-role.component';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { SearchComponent } from './search/search.component';
import {LookupComponent} from './lookup/lookup.component';
import {LookupEmployeeComponent} from './lookup/lookup-employee/lookup-employee.component';
import { TranslateModule } from '@ngx-translate/core';
import { LookupzipcodeComponent } from './lookup/lookupzipcode/lookupzipcode.component';
import { LookupDistrictComponent } from './lookup/lookup-district/lookup-district.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { LookupRefBankComponent } from './lookup/lookup-ref-bank/lookup-ref-bank.component';
import { UCGridFooterComponent } from '../shared/UserControl/ucgrid-footer/ucgrid-footer.component';
import { UcAddressComponent } from './UserControl/ucAddress/ucAddress.component';
import { UcContactInfoComponent } from './UserControl/ucContactInfo/ucContactInfo.component';
import { LookupParentFormComponent } from './lookup/lookup-parent-form/lookup-parent-form.component';
import { LookupBizUnitComponent } from './lookup/lookup-biz-unit/lookup-biz-unit.component';
import { LookupOrgJobTitleComponent } from './lookup/lookup-org-job-title/lookup-org-job-title.component';
import { LookupRefJobTitleComponent } from './lookup/lookup-ref-job-title/lookup-ref-job-title.component';

@NgModule({
    exports: [
        CommonModule,
        SearchComponent,
        LookupComponent,
        LookupEmployeeComponent,
        LookupzipcodeComponent,
        NgbModule,
        LookupRefBankComponent,
        LookupRoleComponent,
        LookupDistrictComponent,
        LookupParentFormComponent,
        UcAddressComponent,
        UCGridFooterComponent,
        UcContactInfoComponent,
        TranslateModule,
        LookupBizUnitComponent,
        LookupOrgMdlStrucComponent,
        LookupOrgJobTitleComponent,
        LookupRefJobTitleComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        HttpModule,
        TranslateModule
    ],
    declarations: [
        SearchComponent,
        LookupComponent,
        LookupEmployeeComponent,
        LookupzipcodeComponent,
        LookupRefBankComponent,
        LookupRoleComponent,
        LookupDistrictComponent,
        LookupParentFormComponent,
        UcAddressComponent,
        UCGridFooterComponent,
        UcContactInfoComponent,
        LookupBizUnitComponent,
        LookupOrgMdlStrucComponent,
        LookupOrgJobTitleComponent,
        LookupRefJobTitleComponent
    ]
})

export class SharingModule { }
