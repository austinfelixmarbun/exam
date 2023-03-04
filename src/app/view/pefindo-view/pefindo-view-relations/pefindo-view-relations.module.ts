import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PefindoViewRelationsRoutingModule } from './pefindo-view-relations-routing.module';
import { PefindoViewRelationsComponent } from './pefindo-view-relations.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharingModule } from 'app/shared/sharing.module';
import { ArchwizardModule } from 'angular-archwizard';
import { UcSubsectionModule } from '@adins/uc-subsection';
import { AdInsSharedModule } from 'app/components/adins-module/adins-shared.module';

@NgModule({
  declarations: [PefindoViewRelationsComponent],
  imports: [
    CommonModule,
    PefindoViewRelationsRoutingModule,
    NgbModule,
    AdInsSharedModule,
    SharingModule,
    ArchwizardModule,
    UcSubsectionModule
  ],
  exports: [
    PefindoViewRelationsComponent
  ]
})
export class PefindoViewRelationsModule { }
