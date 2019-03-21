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
import { UcAddressComponent } from './ucAddress/ucAddress.component';
import { UCGridFooterComponent } from '../shared/UserControl/ucgrid-footer/ucgrid-footer.component';

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
        UcAddressComponent,
        UCGridFooterComponent
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
        UcAddressComponent,
        UCGridFooterComponent
    ]
})

export class SharingModule { }
