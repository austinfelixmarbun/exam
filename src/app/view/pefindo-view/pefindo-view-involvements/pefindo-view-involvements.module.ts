import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PefindoViewInvolvementsRoutingModule } from './pefindo-view-involvements-routing.module';
import { PefindoViewInvolvementsComponent } from './pefindo-view-involvements.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharingModule } from 'app/shared/sharing.module';
import { UcSubsectionModule } from '@adins/uc-subsection';

@NgModule({
  declarations: [PefindoViewInvolvementsComponent],
  imports: [
    CommonModule,
    PefindoViewInvolvementsRoutingModule,
    NgbModule,
    SharingModule,
    UcSubsectionModule
  ]
})
export class PefindoViewInvolvementsModule { }
