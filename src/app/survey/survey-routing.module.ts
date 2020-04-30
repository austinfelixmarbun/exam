import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SurveyOrderComponent } from './survey-order/survey-order.component';
import { SurveyOrderTaskComponent } from './survey-order-task/survey-order-task.component';
import { SurveyOrderViewComponent } from './survey-order-view/survey-order-view.component';
import { SurveyTaskViewComponent } from './survey-task-view/survey-task-view.component';
import { SurveyOrderTaskWfComponent } from './survey-order-task-wf/survey-order-task-wf.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'Paging',
        component: SurveyOrderComponent,
        data: {
          title: 'Survey Order'
        },
      },
      {
        path: 'Task',
        component: SurveyOrderTaskComponent,
        data: {
          title: 'Survey Order Task'
        },
      },
      {
        path: 'TaskWF',
        component: SurveyOrderTaskWfComponent,
        data: {
          title: 'Survey Order Task'
        },
      },
      {
        path: 'View',
        component: SurveyOrderViewComponent,
        data: {
          title: 'Survey Order View'
        },
      },
      {
        path: 'View/Task',
        component: SurveyTaskViewComponent,
        data: {
          title: 'Survey Task View'
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
