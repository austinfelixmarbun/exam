import { EmployeeRoutingModule } from 'app/employee/employee-routing.module';
import { EmployeeAddComponent } from 'app/employee/employee-add/employee-add.component';
import { EmployeeComponent } from 'app/employee/employee.component';
import { EmployeePositionComponent } from 'app/employee/employee-position/employee-position.component';
import { EmployeePositionAddComponent } from 'app/employee/employee-position/employee-position-add/employee-position-add.component';
import { NgModule, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LeaveMaintenanceComponent } from './leave-maintenance/leave-maintenance/leave-maintenance.component';
import { LeaveMaintenanceAddEditComponent } from './leave-maintenance/leave-maintenance-add-edit/leave-maintenance-add-edit.component';
import { SharingComponentModule } from 'app/shared/sharingcomponent.module';
import { LookupsupervisorModule } from '@adins/lookupsupervisor';
import { UCSearchModule } from '@adins/ucsearch';
import { UcgridfooterModule } from '@adins/ucgridfooter';
import { LookuprefbankModule } from '@adins/lookuprefbank';
import { LookupemployeeModule } from '@adins/lookupemployee';
import { UcpagingModule } from '@adins/ucpaging';
import { UclookupgenericModule } from '@adins/uclookupgeneric';
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
    LookupsupervisorModule,
    UCSearchModule,
    UclookupgenericModule,
    UcgridfooterModule,
    LookuprefbankModule,
    LookupemployeeModule,
    ReactiveFormsModule,
    EmployeeBusinessunitAddComponent,
    EmployeeBusinessunitPagingComponent,
    UcpagingModule,
    UclookupgenericModule
  ],
  declarations: [
    EmployeePositionAddComponent,
    EmployeePositionComponent,
    EmployeeComponent,
    EmployeeAddComponent,
    LeaveMaintenanceComponent,
    LeaveMaintenanceAddEditComponent
  ],

})
export class EmployeeModule { }
