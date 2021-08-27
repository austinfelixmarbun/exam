import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PefindoViewPefindoScoreRoutingModule } from './pefindo-view-pefindo-score-routing.module';
import { PefindoViewPefindoScoreComponent } from './pefindo-view-pefindo-score.component';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharingModule } from 'app/shared/sharing.module';
import { ArchwizardModule } from 'angular-archwizard';
import { UcSubsectionModule } from '@adins/uc-subsection';

@NgModule({
  declarations: [PefindoViewPefindoScoreComponent],
  imports: [
    CommonModule,
    PefindoViewPefindoScoreRoutingModule,
    HttpModule,
    NgbModule,
    SharingModule,
    ArchwizardModule,
    UcSubsectionModule
  ]
})
export class PefindoViewPefindoScoreModule { }
