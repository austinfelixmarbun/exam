import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationRoutingModule } from 'app/organization/organization-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SharingModule } from 'app/shared/sharing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RefJobTitleComponent } from 'app/organization/ref-job-title/ref-job-title.component';
import { BusinessUnitComponent } from 'app/organization/business-unit/business-unit.component';
import { AddBusinessUnitComponent } from 'app/organization/business-unit/add/add-business-unit.component';
import { RefJobTitleAddComponent } from 'app/organization/ref-job-title/ref-job-title-add/ref-job-title-add.component';
import { OrganizationComponent } from 'app/organization/organization.component';
import { OrgAddEditComponent } from 'app/organization/organization-add-edit/org-add-edit/org-add-edit.component';


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
    OrganizationComponent,
    OrgAddEditComponent,
    BusinessUnitComponent,
    AddBusinessUnitComponent,
    RefJobTitleAddComponent,
    OrganizationComponent

  ]
})
export class OrganizationModule { }
