import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfficeComponent } from './office.component';
import { OfficeRoutingModule } from './office-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SharingModule } from 'app/shared/sharing.module';

@NgModule({
  imports: [
    OfficeRoutingModule,
    CommonModule,
    FormsModule,
    HttpModule,
    SharingModule
  ],
  declarations: [
    OfficeComponent,
  ]
})
export class OfficeModule { }
 