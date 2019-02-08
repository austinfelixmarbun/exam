import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OfficeComponent } from './office.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: OfficeComponent,
        data: {
          title: 'Office'
        },
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfficeRoutingModule { }
