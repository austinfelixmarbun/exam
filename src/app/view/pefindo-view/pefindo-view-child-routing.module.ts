import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PathConstant } from 'app/shared/PathConstant';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: PathConstant.VIEW_SUBJECT_INFO_PERSONAL,
        loadChildren: './pefindo-view-subject-info-personal/pefindo-view-subject-info-personal.module#PefindoViewSubjectInfoPersonalModule'
      },
      {
        path: PathConstant.VIEW_SUBJECT_INFO_COMPANY,
        loadChildren: './pefindo-view-subject-info-company/pefindo-view-subject-info-company.module#PefindoViewSubjectInfoCompanyModule'
      },
      {
        path: PathConstant.VIEW_MO_SUMMARY,
        loadChildren: './pefindo-view-mo-summary/pefindo-view-mo-summary.module#PefindoViewMoSummaryModule'
      },
      {
        path: PathConstant.VIEW_PEFINDO_SCORE,
        loadChildren: './pefindo-view-pefindo-score/pefindo-view-pefindo-score.module#PefindoViewPefindoScoreModule'
      },
      {
        path: PathConstant.VIEW_CONTRACTS,
        loadChildren: './pefindo-view-contracts/pefindo-view-contracts.module#PefindoViewContractsModule'
      },
      {
        path: PathConstant.VIEW_PEFINDO_ALERT_QUEST,
        loadChildren: './pefindo-view-pefindo-alert-quest/pefindo-view-pefindo-alert-quest.module#PefindoViewPefindoAlertQuestModule'
      },
      {
        path: PathConstant.VIEW_SECURITIES,
        loadChildren: './pefindo-view-securities/pefindo-view-securities.module#PefindoViewSecuritiesModule'
      },
      {
        path: PathConstant.VIEW_OTHER_LIABILITIES,
        loadChildren: './pefindo-view-other-liabilities/pefindo-view-other-liabilities.module#PefindoViewOtherLiabilitiesModule'
      },
      {
        path: PathConstant.VIEW_INVOLVEMENTS,
        loadChildren: './pefindo-view-involvements/pefindo-view-involvements.module#PefindoViewInvolvementsModule'
      },
      {
        path: PathConstant.VIEW_RELATIONS,
        loadChildren: './pefindo-view-relations/pefindo-view-relations.module#PefindoViewRelationsModule'
      },
      {
        path: PathConstant.VIEW_INQUIRIES,
        loadChildren: './pefindo-view-inquiries/pefindo-view-inquiries.module#PefindoViewInquiriesModule'
      },
      {
        path: PathConstant.VIEW_DISPUTES,
        loadChildren: './pefindo-view-disputes/pefindo-view-disputes.module#PefindoViewDisputesModule'
      },
      {
        path: PathConstant.VIEW_FINANCIAL_STATEMENTS,
        loadChildren: './pefindo-view-financial-statements/pefindo-view-financial-statements.module#PefindoViewFinancialStatementsModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PefindoViewChildRoutingModule { }
