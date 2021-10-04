import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PefindoViewMoSummaryRoutingModule } from './pefindo-view-mo-summary-routing.module';
import { PefindoViewMoSummaryComponent } from './pefindo-view-mo-summary.component';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharingModule } from 'app/shared/sharing.module';
import { ArchwizardModule } from 'angular-archwizard';
import { UcSubsectionModule } from '@adins/uc-subsection';
import { AdInsSharedModule } from 'app/components/adins-module/adins-shared.module';

@NgModule({
  declarations: [PefindoViewMoSummaryComponent],
  imports: [
    CommonModule,
    PefindoViewMoSummaryRoutingModule,
    HttpModule,
    NgbModule,
    AdInsSharedModule,
    SharingModule,
    ArchwizardModule,
    UcSubsectionModule
  ]
})
export class PefindoViewMoSummaryModule { }
