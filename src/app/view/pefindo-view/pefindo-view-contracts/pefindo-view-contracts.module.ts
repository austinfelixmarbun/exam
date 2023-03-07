import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PefindoViewContractsRoutingModule } from './pefindo-view-contracts-routing.module';
import { PefindoViewContractsComponent } from './pefindo-view-contracts.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharingModule } from 'app/shared/sharing.module';
import { ArchwizardModule } from 'angular-archwizard';
import { UcSubsectionModule } from '@adins/uc-subsection';
import { AdInsSharedModule } from 'app/components/adins-module/adins-shared.module';
import { NgxChartsModule } from '@swimlane/ngx-charts'

@NgModule({
  declarations: [PefindoViewContractsComponent],
  imports: [
    CommonModule,
    PefindoViewContractsRoutingModule,
    NgbModule,
    AdInsSharedModule,
    SharingModule,
    ArchwizardModule,
    UcSubsectionModule,
    NgxChartsModule
  ]
})
export class PefindoViewContractsModule { }
