import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { SearchComponent } from 'app/shared/search/search.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { UCGridFooterComponent } from 'app/shared/UserControl/ucgrid-footer/ucgrid-footer.component';
import { UcAddressComponent } from 'app/shared/UserControl/ucAddress/ucAddress.component';
import { UcContactInfoComponent } from 'app/shared/UserControl/ucContactInfo/ucContactInfo.component';
import { UcInfoComponent } from './UserControl/uc-info/uc-info.component';
import { UCSearchModule } from '@adins/ucsearch';
import { UcgridfooterModule } from '@adins/ucgridfooter';
import { FormEngineComponent } from './form-engine/form-engine.component';
import { FormEngineModule } from '@adins/form-engine';
import { LookupparentformModule } from '@adins/lookupparentform';
import { LookupemployeeModule } from '@adins/lookupemployee';
import { LookupdistrictModule} from '@adins/lookupdistrict';
import { LookuproleModule } from '@adins/lookuprole';
import { LookuporgmdlstrucModule } from '@adins/lookuporgmdlstruc';
import { LookupzipcodeModule } from '@adins/lookupzipcode';
import { LookuprefbankModule } from '@adins/lookuprefbank';
import { LookuprefjobtitleModule } from '@adins/lookuprefjobtitle';
import { LookuporgjobtitleModule } from '@adins/lookuporgjobtitle';
import { LookupbizunitModule } from '@adins/lookupbizunit';
import { LookupRefBankComponent } from './lookup/lookup-ref-bank/lookup-ref-bank.component';
import { LookupSupervisorComponent } from './lookup/lookup-supervisor/lookup-supervisor.component';
import { LookupDistrictComponent }from './lookup/lookup-district/lookup-district.component';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { LookupzipcodeComponent } from './lookup/lookupzipcode/lookupzipcode.component';

@NgModule({
    exports: [
        CommonModule,
        SearchComponent,
        LookupemployeeModule,
        LookupzipcodeModule,
        NgbModule,
        LookuprefbankModule,
        LookuproleModule,
        LookupdistrictModule,
        LookupparentformModule,
        FormEngineComponent,
        UcAddressComponent,
        UCGridFooterComponent,
        UcContactInfoComponent,
        UcInfoComponent,
        TranslateModule,
        LookupbizunitModule,
        LookuporgmdlstrucModule,
        LookuporgjobtitleModule,
        LookuprefjobtitleModule,
        UCSearchModule,
        UcgridfooterModule,
        FormEngineModule,
        LookupRefBankComponent,
        LookupSupervisorComponent,
        LookupDistrictComponent,
        LookupzipcodeComponent,
        AngularFileUploaderModule
    ],
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        HttpModule,
        UCSearchModule,
        UcgridfooterModule,
        TranslateModule,
        LookupzipcodeModule
    ],
    declarations: [
        SearchComponent,
        UcAddressComponent,
        FormEngineComponent,
        UCGridFooterComponent,
        UcContactInfoComponent,
        UcInfoComponent,
        LookupRefBankComponent,
        LookupSupervisorComponent,
        LookupDistrictComponent,
        LookupzipcodeComponent
    ]
})

export class SharingModule { }
