import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from 'app/employee/employee.component';
import { EmployeeAddComponent } from 'app/employee/employee-add/employee-add.component';
import { EmployeePositionComponent } from 'app/employee/employee-position/employee-position.component';
import { EmployeePositionAddComponent } from 'app/employee/employee-position/employee-position-add/employee-position-add.component';
import { LeaveMaintenanceComponent } from './leave-maintenance/leave-maintenance/leave-maintenance.component';
import { LeaveMaintenanceAddEditComponent } from './leave-maintenance/leave-maintenance-add-edit/leave-maintenance-add-edit.component';
import { EmployeeBusinessunitAddComponent } from './employee-businessunit-add/employee-businessunit-add.component';
import { EmployeeBusinessunitPagingComponent } from './employee-businessunit-paging/employee-businessunit-paging.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'Paging',
        component: EmployeeComponent,
        data: {
          title: 'Employee'
        },
      },
      // {
      //   path: 'add',
      //   component: EmployeeAddComponent,
      //   data: {
      //     title: 'Add Employee'
      //   }
      // },
      // {
      //   path: 'edit',
      //   component: EmployeeAddComponent,
      //   data: {
      //     title: 'Edit Employee'
      //   }
      // },
      {
        path: 'Detail',
        component: EmployeeAddComponent,
        data: {
          title: 'Employee Detail'
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
        path: 'EmployeePositionAddEdit',
        component: EmployeePositionAddComponent,
        data: {
          title: 'Employee Position Add Edit'
        }
      },
      {
        path: 'Leave/Paging',
        component: LeaveMaintenanceComponent,
        data: {
          title: 'Leave Maintenance'
        }
      },
      {
        path: 'Leave/Add',
        component: LeaveMaintenanceAddEditComponent,
        data: {
          title: 'Leave Maintenance Add'
        }
      },
      {
        path: 'Leave/Edit',
        component: LeaveMaintenanceAddEditComponent,
        data: {
          title: 'Leave Maintenance Edit'
        }
      },
      {
        path: 'EmployeeBusinessUnit/Add',
        component: EmployeeBusinessunitAddComponent,
        data: {
          title: 'Employee Business Unit Add'
        }
      },
      {
        path: 'EmployeeBusinessUnit/Paging',
        component: EmployeeBusinessunitPagingComponent,
        data: {
          title: 'Employee Business Unit Paging'
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
