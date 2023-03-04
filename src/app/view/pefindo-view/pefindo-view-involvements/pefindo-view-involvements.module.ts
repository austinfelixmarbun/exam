import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PefindoViewInvolvementsRoutingModule } from './pefindo-view-involvements-routing.module';
import { PefindoViewInvolvementsComponent } from './pefindo-view-involvements.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharingModule } from 'app/shared/sharing.module';
import { UcSubsectionModule } from '@adins/uc-subsection';
import { AdInsSharedModule } from 'app/components/adins-module/adins-shared.module';

@NgModule({
  declarations: [PefindoViewInvolvementsComponent],
  imports: [
    CommonModule,
    PefindoViewInvolvementsRoutingModule,
    NgbModule,
    AdInsSharedModule,
    SharingModule,
    UcSubsectionModule
  ],
  exports: [
    PefindoViewInvolvementsComponent
  ]
})
export class PefindoViewInvolvementsModule { }
