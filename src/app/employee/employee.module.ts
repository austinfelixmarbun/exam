import { EmployeeRoutingModule } from 'app/employee/employee-routing.module';
import { EmployeeAddComponent } from 'app/employee/employee-add/employee-add.component';
import { EmployeeComponent } from 'app/employee/employee.component';
import { EmployeePositionComponent } from 'app/employee/employee-position/employee-position.component';
import { EmployeePositionAddComponent } from 'app/employee/employee-position/employee-position-add/employee-position-add.component';
import { NgModule, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SharingModule } from 'app/shared/sharing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';





@NgModule({
  imports: [
    EmployeeRoutingModule,
    CommonModule,
    FormsModule,
    HttpModule,
    NgbModule,
    SharingModule,
    ReactiveFormsModule
  ],
  declarations: [
    EmployeePositionAddComponent,
    EmployeePositionComponent,
    EmployeeComponent,
    EmployeeAddComponent
  ],

})
export class EmployeeModule { }
