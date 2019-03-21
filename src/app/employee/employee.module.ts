import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeComponent } from './employee.component';
import { EmployeeRoutingModule } from './employee-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SharingModule } from 'app/shared/sharing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { EmployeePositionComponent } from './employee-position/employee-position.component';
import { EmployeePositionAddComponent } from './employee-position/employee-position-add/employee-position-add.component';

@NgModule({
  imports: [
    EmployeeRoutingModule,
    CommonModule,
    FormsModule,
    HttpModule,
    NgbModule,
    SharingModule
  ],
  declarations: [
    EmployeeComponent,
    EmployeeAddComponent,
    EmployeePositionComponent,
    EmployeePositionAddComponent
  ]
})
export class EmployeeModule { }
 