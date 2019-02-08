import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: EmployeeComponent,
        data: {
          title: 'Employee'
        },
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule { }
