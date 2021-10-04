import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PefindoViewFinancialStatementsRoutingModule } from './pefindo-view-financial-statements-routing.module';
import { PefindoViewFinancialStatementsComponent } from './pefindo-view-financial-statements.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharingModule } from 'app/shared/sharing.module';
import { UcSubsectionModule } from '@adins/uc-subsection';
import { AdInsSharedModule } from 'app/components/adins-module/adins-shared.module';

@NgModule({
  declarations: [PefindoViewFinancialStatementsComponent],
  imports: [
    CommonModule,
    PefindoViewFinancialStatementsRoutingModule,
    NgbModule,
    AdInsSharedModule,
    SharingModule,
    UcSubsectionModule
  ]
})
export class PefindoViewFinancialStatementsModule { }
