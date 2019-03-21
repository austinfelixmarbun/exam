import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee.component';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { EmployeePositionComponent } from './employee-position/employee-position.component';
import { EmployeePositionAddComponent } from './employee-position/employee-position-add/employee-position-add.component';

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
      {
        path: 'employeePosition',
        component: EmployeePositionComponent,
        data: {
          title: 'Employee Position'
        }
      },
      {
        path: 'employeePositionAddEdit',
        component: EmployeePositionAddComponent,
        data: {
          title: 'Employee Position Add Edit'
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
