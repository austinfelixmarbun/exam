import { NgModule, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UCSearchModule } from '@adins/ucsearch';
import { UcgridfooterModule } from '@adins/ucgridfooter';
import { SharingComponentModule } from 'app/shared/sharingcomponent.module';
import { UclookupgenericModule } from '@adins/uclookupgeneric';
import { UcpagingModule } from '@adins/ucpaging';
import { UcSubsectionModule } from '@adins/uc-subsection';

import { RefIndustryTypeRoutingModule } from './ref-industry-type-routing.module';
import { RefIndustryTypeComponent } from './ref-industry-type.component';
import { RefIndustryTypeDetailComponent } from './ref-industry-type-detail/ref-industry-type-detail.component';

@NgModule({
  declarations: [RefIndustryTypeComponent, RefIndustryTypeDetailComponent],
  imports: [
    CommonModule,
    RefIndustryTypeRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpModule,
    NgbModule,
    UCSearchModule,
    UcgridfooterModule,
    SharingComponentModule,
    UclookupgenericModule,
    UcpagingModule,
    UcSubsectionModule
  ]
})
export class RefIndustryTypeModule { }
