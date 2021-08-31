import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PefindoViewFinancialStatementsRoutingModule } from './pefindo-view-financial-statements-routing.module';
import { PefindoViewFinancialStatementsComponent } from './pefindo-view-financial-statements.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharingModule } from 'app/shared/sharing.module';
import { UcSubsectionModule } from '@adins/uc-subsection';

@NgModule({
  declarations: [PefindoViewFinancialStatementsComponent],
  imports: [
    CommonModule,
    PefindoViewFinancialStatementsRoutingModule,
    NgbModule,
    SharingModule,
    UcSubsectionModule
  ]
})
export class PefindoViewFinancialStatementsModule { }
