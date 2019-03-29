import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewApplicationComponent } from 'app/los/CreditProcess/new-application/new-application.component';
import { ProspectApplDataComponent } from 'app/los/CreditProcess/prospect-appl-data/prospect-appl-data.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'CreditProcess/CustomerData',
        component: NewApplicationComponent,
        data: {
          title: 'Customer Data'
        }
      },
      {
        path: 'CreditProcess/ApplicationData',
        component: ProspectApplDataComponent,
        data: {
          title: 'Application Data'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LosRoutingModule { }
