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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PefindoViewChildRoutingModule { }
