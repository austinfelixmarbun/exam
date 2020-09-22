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
import { UCSearchModule } from '@adins/ucsearch';
import { UcgridfooterModule } from '@adins/ucgridfooter';
import { UcpagingModule } from '@adins/ucpaging';
import { UclookupgenericModule } from '@adins/uclookupgeneric';
import { UcSubsectionModule } from '@adins/uc-subsection';
import { EmployeeBusinessunitAddComponent } from './employee-businessunit-add/employee-businessunit-add.component';
import { EmployeeBusinessunitPagingComponent } from './employee-businessunit-paging/employee-businessunit-paging.component';
import { UcviewgenericModule } from '@adins/ucviewgeneric';
import { UcShowErrorsModule } from '@adins/uc-show-errors';

@NgModule({
  imports: [
    EmployeeRoutingModule,
    CommonModule,
    FormsModule,
    HttpModule,
    NgbModule,
    SharingComponentModule,
    UCSearchModule,
    UclookupgenericModule,
    UcgridfooterModule,
    UcviewgenericModule,
    ReactiveFormsModule,
    UcSubsectionModule,
    UcpagingModule,
    UcSubsectionModule,
    UcShowErrorsModule
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
