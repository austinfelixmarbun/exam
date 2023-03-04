import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PefindoViewDisputesRoutingModule } from './pefindo-view-disputes-routing.module';
import { PefindoViewDisputesComponent } from './pefindo-view-disputes.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharingModule } from 'app/shared/sharing.module';
import { UcSubsectionModule } from '@adins/uc-subsection';
import { AdInsSharedModule } from 'app/components/adins-module/adins-shared.module';

@NgModule({
  declarations: [PefindoViewDisputesComponent],
  imports: [
    CommonModule,
    PefindoViewDisputesRoutingModule,
    NgbModule,
    AdInsSharedModule,
    SharingModule,
    UcSubsectionModule
  ],
  exports: [
    PefindoViewDisputesComponent
  ]
})
export class PefindoViewDisputesModule { }
