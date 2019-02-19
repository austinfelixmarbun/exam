import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationRoutingModule } from './organization-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SharingModule } from 'app/shared/sharing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RefJobTitleComponent } from './ref-job-title/ref-job-title.component';
import { BusinessUnitComponent } from './business-unit/business-unit.component';
import { AddBusinessUnitComponent } from './business-unit/add/add-business-unit.component';


@NgModule({
  imports: [
    OrganizationRoutingModule,
    CommonModule,
    FormsModule,
    HttpModule,
    NgbModule,
    SharingModule
  ],
  declarations: [
    RefJobTitleComponent,
    BusinessUnitComponent,
    AddBusinessUnitComponent
  ]
})
export class OrganizationModule { }
