import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PefindoViewContractsRoutingModule } from './pefindo-view-contracts-routing.module';
import { PefindoViewContractsComponent } from './pefindo-view-contracts.component';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharingModule } from 'app/shared/sharing.module';
import { ArchwizardModule } from 'angular-archwizard';
import { UcSubsectionModule } from '@adins/uc-subsection';

@NgModule({
  declarations: [PefindoViewContractsComponent],
  imports: [
    CommonModule,
    PefindoViewContractsRoutingModule,
    HttpModule,
    NgbModule,
    SharingModule,
    ArchwizardModule,
    UcSubsectionModule
  ]
})
export class PefindoViewContractsModule { }
