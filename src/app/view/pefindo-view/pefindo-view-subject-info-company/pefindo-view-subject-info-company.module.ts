import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PefindoViewSubjectInfoCompanyRoutingModule } from './pefindo-view-subject-info-company-routing.module';
import { PefindoViewSubjectInfoCompanyComponent } from './pefindo-view-subject-info-company.component';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharingModule } from 'app/shared/sharing.module';
import { ArchwizardModule } from 'angular-archwizard';
import { UcSubsectionModule } from '@adins/uc-subsection';

@NgModule({
  declarations: [PefindoViewSubjectInfoCompanyComponent],
  imports: [
    CommonModule,
    PefindoViewSubjectInfoCompanyRoutingModule,
    HttpModule,
    NgbModule,
    SharingModule,
    ArchwizardModule,
    UcSubsectionModule
  ]
})
export class PefindoViewSubjectInfoCompanyModule { }
