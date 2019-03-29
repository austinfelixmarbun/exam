import { LookupRoleComponent } from 'app/shared/lookup/lookup-role/lookup-role.component';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { SearchComponent } from 'app/shared/search/search.component';
import {LookupComponent} from 'app/shared/lookup/lookup.component';
import {LookupEmployeeComponent} from 'app/shared/lookup/lookup-employee/lookup-employee.component';
import { TranslateModule } from '@ngx-translate/core';
import { LookupzipcodeComponent } from 'app/shared/lookup/lookupzipcode/lookupzipcode.component';
import { LookupDistrictComponent } from 'app/shared/lookup/lookup-district/lookup-district.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { LookupRefBankComponent } from 'app/shared/lookup/lookup-ref-bank/lookup-ref-bank.component';
import { UCGridFooterComponent } from 'app/shared/UserControl/ucgrid-footer/ucgrid-footer.component';
import { UcAddressComponent } from 'app/shared/UserControl/ucAddress/ucAddress.component';
import { UcContactInfoComponent } from 'app/shared/UserControl/ucContactInfo/ucContactInfo.component';
import { LookupParentFormComponent } from 'app/shared/lookup/lookup-parent-form/lookup-parent-form.component';

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
        TranslateModule
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
    ]
})

export class SharingModule { }
