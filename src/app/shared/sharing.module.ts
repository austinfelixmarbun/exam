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
import { lookupbizunitmodule } from '@adins/lookupbizunit';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { UcSubsectionModule } from '@adins/uc-subsection';
import { LookupsupervisorModule } from '@adins/lookupsupervisor';
import { MatStepperModule, MatIconModule, MatExpansionModule, MatTabsModule } from '@angular/material';
import { SearchV2Component } from './search-v2/search-v2.component';
import { UcgridviewComponent } from './UserControl/ucgridview/ucgridview.component';
import { RouterModule } from '@angular/router';
import { UcpagingComponent } from './UserControl/ucpaging/ucpaging.component';
import { LookupSupervisorComponent } from './lookup/lookup-supervisor/lookup-supervisor.component';
import { UcgridviewModule } from '@adins/ucgridview';
import { UcpagingModule } from '@adins/ucpaging';
import { UclookupgenericModule } from '@adins/uclookupgeneric';
import { LookupgenericComponent } from './UserControl/lookupgeneric/lookupgeneric.component';


@NgModule({
    exports: [
        CommonModule,
        SearchComponent,
        SearchV2Component,
        LookupemployeeModule,
        LookupzipcodeModule,
        NgbModule,
        LookuprefbankModule,
        LookuproleModule,
        LookupdistrictModule,
        LookupparentformModule,
        UcAddressComponent,
        UCGridFooterComponent,
        UcContactInfoComponent,
        UcInfoComponent,
        UcgridviewComponent,
        UcpagingComponent,
        LookupgenericComponent,
        LookupSupervisorComponent,
        TranslateModule,
        lookupbizunitmodule,
        LookuporgmdlstrucModule,
        LookuporgjobtitleModule,
        LookuprefjobtitleModule,
        UCSearchModule,
        UcgridfooterModule,
        UcpagingModule,
        UclookupgenericModule,
        FormEngineModule,
        AngularFileUploaderModule,
        UcSubsectionModule,
        AngularFileUploaderModule,
        LookupsupervisorModule,
        MatStepperModule,
        MatIconModule,
        MatExpansionModule,
        MatTabsModule,
    ],
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        HttpModule,
        RouterModule,
        UCSearchModule,
        UcgridfooterModule,
        TranslateModule,
        LookupzipcodeModule,
        UcSubsectionModule,
        UcgridviewModule,
        UcpagingModule,
        UclookupgenericModule
    ],
    declarations: [
        SearchComponent,
        SearchV2Component,
        UcAddressComponent,
        UCGridFooterComponent,
        UcContactInfoComponent,
        UcInfoComponent,
        UcgridviewComponent,
        UcpagingComponent,
        LookupgenericComponent,
        LookupSupervisorComponent
    ]
})

export class SharingModule { }
