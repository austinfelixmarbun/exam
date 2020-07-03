import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { SearchComponent } from 'app/shared/search/search.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { UCSearchModule } from '@adins/ucsearch';
import { UcgridfooterModule } from '@adins/ucgridfooter';
import { FormEngineModule } from '@adins/form-engine';
import { LookupparentformModule } from '@adins/lookupparentform';
import { LookupemployeeModule } from '@adins/lookupemployee';
import { LookupdistrictModule } from '@adins/lookupdistrict';
import { LookuproleModule } from '@adins/lookuprole';
import { LookuporgmdlstrucModule } from '@adins/lookuporgmdlstruc';
import { LookupzipcodeModule } from '@adins/lookupzipcode';
import { LookuprefbankModule } from '@adins/lookuprefbank';
import { LookuprefjobtitleModule } from '@adins/lookuprefjobtitle';
import { LookuporgjobtitleModule } from '@adins/lookuporgjobtitle';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { UcSubsectionModule } from '@adins/uc-subsection';
import { LookupsupervisorModule } from '@adins/lookupsupervisor';
import { MatStepperModule, MatIconModule, MatExpansionModule, MatTabsModule } from '@angular/material';
import { SearchV2Component } from './search-v2/search-v2.component';
import { RouterModule } from '@angular/router';
import { LookupSupervisorComponent } from './lookup/lookup-supervisor/lookup-supervisor.component';
import { lookupbizunitmodule } from '@adins/lookupbizunit';
import { UcpagingModule } from '@adins/ucpaging';
import { UclookupgenericModule } from '@adins/uclookupgeneric';
import { UcgridviewModule } from '@adins/ucgridview';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  exports: [
    CommonModule,
    LookupemployeeModule,
    LookupzipcodeModule,
    NgbModule,
    LookuprefbankModule,
    LookuproleModule,
    LookupdistrictModule,
    LookupparentformModule,
    TranslateModule,
    lookupbizunitmodule,
    LookuporgmdlstrucModule,
    LookuporgjobtitleModule,
    LookuprefjobtitleModule,
    UCSearchModule,
    UcgridfooterModule,
    FormEngineModule,
    UcSubsectionModule,
    AngularFileUploaderModule,
    LookupsupervisorModule,
    MatStepperModule,
    MatIconModule,
    MatExpansionModule,
    MatTabsModule,
    LookupSupervisorComponent,
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
    NgMultiSelectDropDownModule
  ],
  declarations: [
    SearchV2Component,
    LookupSupervisorComponent
  ]
})

export class SharingModule { }
