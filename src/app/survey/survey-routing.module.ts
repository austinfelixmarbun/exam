import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SurveyOrderComponent } from './survey-order/survey-order.component';
import { SurveyOrderTaskComponent } from './survey-order-task/survey-order-task.component';
import { SurveyOrderViewComponent } from './survey-order-view/survey-order-view.component';
import { SurveyTaskViewComponent } from './survey-task-view/survey-task-view.component';
import { SurveyOrderTaskWfComponent } from './survey-order-task-wf/survey-order-task-wf.component';
import { PathConstant } from 'app/shared/PathConstant';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: PathConstant.SRVY_VIEW_TASK,
        component: SurveyTaskViewComponent,
        data: {
          title: 'Survey Task View'
        },
      },
      {
        path: PathConstant.PAGING,
        component: SurveyOrderComponent,
        data: {
          title: 'Survey Order'
        },
      },
      {
        path: PathConstant.SRVY_TASK,
        component: SurveyOrderTaskComponent,
        data: {
          title: 'Survey Order Task'
        },
      },
      {
        path: PathConstant.VIEW_ORDER_EXT,
        component: SurveyOrderTaskWfComponent,
        data: {
          title: 'Survey Order Task'
        },
      },
      {
        path: PathConstant.VIEW,
        component: SurveyOrderViewComponent,
        data: {
          title: 'Survey Order View'
        },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SurveyRoutingModule { }
