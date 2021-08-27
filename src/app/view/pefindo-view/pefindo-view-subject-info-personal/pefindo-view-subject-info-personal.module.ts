import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PefindoViewSubjectInfoPersonalRoutingModule } from './pefindo-view-subject-info-personal-routing.module';
import { PefindoViewSubjectInfoPersonalComponent } from './pefindo-view-subject-info-personal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { UcgridfooterModule } from '@adins/ucgridfooter';
import { UcpagingModule } from '@adins/ucpaging';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharingModule } from 'app/shared/sharing.module';
import { ArchwizardModule } from 'angular-archwizard';
import { UcSubsectionModule } from '@adins/uc-subsection';
import { SharingComponentModule } from 'app/shared/sharingcomponent.module';
import { UcShowErrorsModule } from '@adins/uc-show-errors';

@NgModule({
  declarations: [PefindoViewSubjectInfoPersonalComponent],
  imports: [
    CommonModule,
    PefindoViewSubjectInfoPersonalRoutingModule,
    FormsModule,
    HttpModule,
    UcgridfooterModule,
    UcpagingModule,
    NgbModule,
    SharingModule,
    ArchwizardModule,
    ReactiveFormsModule,
    UcSubsectionModule,
    SharingComponentModule,
    UcShowErrorsModule,
  ]
})
export class PefindoViewSubjectInfoPersonalModule { }
