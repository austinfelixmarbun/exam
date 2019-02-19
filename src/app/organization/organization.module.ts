import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationRoutingModule } from './organization-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SharingModule } from 'app/shared/sharing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RefJobTitleComponent } from './ref-job-title/ref-job-title.component';
<<<<<<< HEAD
import { BusinessUnitComponent } from './business-unit/business-unit.component';
import { AddBusinessUnitComponent } from './business-unit/add/add-business-unit.component';

=======
import { RefJobTitleAddComponent } from './ref-job-title/ref-job-title-add/ref-job-title-add.component';
import { OrganizationComponent } from './organization.component';
>>>>>>> 1aca9ded3280d44ad7d6803252896bbf140ff93e

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
<<<<<<< HEAD
    BusinessUnitComponent,
    AddBusinessUnitComponent
=======
    RefJobTitleAddComponent,
    OrganizationComponent
>>>>>>> 1aca9ded3280d44ad7d6803252896bbf140ff93e
  ]
})
export class OrganizationModule { }
