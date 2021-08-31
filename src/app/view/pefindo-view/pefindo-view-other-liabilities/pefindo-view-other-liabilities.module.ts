import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PefindoViewOtherLiabilitiesRoutingModule } from './pefindo-view-other-liabilities-routing.module';
import { PefindoViewOtherLiabilitiesComponent } from './pefindo-view-other-liabilities.component';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharingModule } from 'app/shared/sharing.module';
import { ArchwizardModule } from 'angular-archwizard';
import { UcSubsectionModule } from '@adins/uc-subsection';

@NgModule({
  declarations: [PefindoViewOtherLiabilitiesComponent],
  imports: [
    CommonModule,
    PefindoViewOtherLiabilitiesRoutingModule,
    HttpModule,
    NgbModule,
    SharingModule,
    ArchwizardModule,
    UcSubsectionModule
  ]
})
export class PefindoViewOtherLiabilitiesModule { }
