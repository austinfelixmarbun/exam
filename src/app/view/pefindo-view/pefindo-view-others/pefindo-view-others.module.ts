import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PefindoViewOthersRoutingModule } from './pefindo-view-others-routing.module';
import { PefindoViewOthersComponent } from './pefindo-view-others.component';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharingModule } from 'app/shared/sharing.module';
import { ArchwizardModule } from 'angular-archwizard';
import { UcSubsectionModule } from '@adins/uc-subsection';
import { AdInsSharedModule } from 'app/components/adins-module/adins-shared.module';
import { PefindoViewPefindoAlertQuestModule } from '../pefindo-view-pefindo-alert-quest/pefindo-view-pefindo-alert-quest.module';
import { PefindoViewDisputesModule } from '../pefindo-view-disputes/pefindo-view-disputes.module';
import { PefindoViewSecuritiesModule } from '../pefindo-view-securities/pefindo-view-securities.module';
import { PefindoViewOtherLiabilitiesModule } from '../pefindo-view-other-liabilities/pefindo-view-other-liabilities.module';
import { PefindoViewInvolvementsModule } from '../pefindo-view-involvements/pefindo-view-involvements.module';
import { PefindoViewRelationsModule } from '../pefindo-view-relations/pefindo-view-relations.module';

@NgModule({
  declarations: [PefindoViewOthersComponent],
  imports: [
    CommonModule,
    PefindoViewOthersRoutingModule,
    HttpModule,
    NgbModule,
    AdInsSharedModule,
    SharingModule,
    ArchwizardModule,
    UcSubsectionModule,
    PefindoViewPefindoAlertQuestModule,
    PefindoViewDisputesModule,
    PefindoViewSecuritiesModule,
    PefindoViewOtherLiabilitiesModule,
    PefindoViewInvolvementsModule,
    PefindoViewRelationsModule
  ]
})
export class PefindoViewOthersModule { }
