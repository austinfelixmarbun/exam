import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PathConstant } from 'app/shared/PathConstant';
import { SurveyOrderViewComponent } from './survey-order-view/survey-order-view.component';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: PathConstant.VIEW_SRVY_ORDER,
        component: SurveyOrderViewComponent,
        data: {
          title: 'Survey Order View'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SurveyOrderViewRoutingModule { }
