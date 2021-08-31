import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PefindoViewSecuritiesRoutingModule } from './pefindo-view-securities-routing.module';
import { PefindoViewSecuritiesComponent } from './pefindo-view-securities.component';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharingModule } from 'app/shared/sharing.module';
import { ArchwizardModule } from 'angular-archwizard';
import { UcSubsectionModule } from '@adins/uc-subsection';

@NgModule({
  declarations: [PefindoViewSecuritiesComponent],
  imports: [
    CommonModule,
    PefindoViewSecuritiesRoutingModule,
    HttpModule,
    NgbModule,
    SharingModule,
    ArchwizardModule,
    UcSubsectionModule
  ]
})
export class PefindoViewSecuritiesModule { }
