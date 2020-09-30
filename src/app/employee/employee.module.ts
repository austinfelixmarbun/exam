import { AdInsModule } from "app/components/adins-module/adins.module";
import { EmployeeRoutingModule } from 'app/employee/employee-routing.module';
import { EmployeeAddComponent } from 'app/employee/employee-add/employee-add.component';
import { EmployeeComponent } from 'app/employee/employee.component';
import { EmployeePositionComponent } from 'app/employee/employee-position/employee-position.component';
import { EmployeePositionAddComponent } from 'app/employee/employee-position/employee-position-add/employee-position-add.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LeaveMaintenanceComponent } from './leave-maintenance/leave-maintenance/leave-maintenance.component';
import { LeaveMaintenanceAddEditComponent } from './leave-maintenance/leave-maintenance-add-edit/leave-maintenance-add-edit.component';
import { SharingComponentModule } from 'app/shared/sharingcomponent.module';
import { EmployeeBusinessunitAddComponent } from './employee-businessunit-add/employee-businessunit-add.component';
import { EmployeeBusinessunitPagingComponent } from './employee-businessunit-paging/employee-businessunit-paging.component';

@NgModule({
  imports: [
    EmployeeRoutingModule,
    CommonModule,
    FormsModule,
    HttpModule,
    NgbModule,
    SharingComponentModule,
    AdInsModule
  ],
  declarations: [
    EmployeePositionAddComponent,
    EmployeePositionComponent,
    EmployeeComponent,
    EmployeeBusinessunitAddComponent,
    EmployeeBusinessunitPagingComponent,
    EmployeeAddComponent,
    LeaveMaintenanceComponent,
    LeaveMaintenanceAddEditComponent,
    EmployeeBusinessunitAddComponent,
    EmployeeBusinessunitPagingComponent
  ],

})
export class EmployeeModule { }
