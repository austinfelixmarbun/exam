import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SurveyOrderComponent } from './survey-order/survey-order.component';
import { SurveyOrderTaskComponent } from './survey-order-task/survey-order-task.component';

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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SurveyRoutingModule { }
