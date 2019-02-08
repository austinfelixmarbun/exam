import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeComponent } from './employee.component';
import { EmployeeRoutingModule } from './employee-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
    EmployeeRoutingModule,
    CommonModule,
    FormsModule,
    HttpModule,
  ],
  declarations: [
    EmployeeComponent
  ]
})
export class EmployeeModule { }
