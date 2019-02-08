import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfficeComponent } from './office.component';
import { OfficeRoutingModule } from './office-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
    OfficeRoutingModule,
    CommonModule,
    FormsModule,
    HttpModule,
  ],
  declarations: [
    OfficeComponent
  ]
})
export class OfficeModule { }
