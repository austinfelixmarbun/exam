import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SurveyOrderComponent } from './survey-order/survey-order.component';

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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SurveyRoutingModule { }
