import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee.component';
import { EmployeeAddComponent } from './employee-add/employee-add.component';

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
      {
        path: 'add',
        component: EmployeeAddComponent,
        data: {
          title: 'Add Employee'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule { }
