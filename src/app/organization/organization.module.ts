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
import { RefJobTitleAddComponent } from './ref-job-title/ref-job-title-add/ref-job-title-add.component';
import { OrganizationComponent } from './organization.component';
import { OrgAddEditComponent } from './organization-add-edit/org-add-edit/org-add-edit.component';
import { OrganizationModelPagingComponent } from './organization-model/organization-model-paging/organization-model-paging.component';
import { OrganizationModelDetailComponent } from './organization-model/organization-model-detail/organization-model-detail.component';
import { OrgMdlStrucPagingComponent } from './org-mdl-struc/org-mdl-struc-paging/org-mdl-struc-paging.component';
import { OrgMdlStrucDetailComponent } from './org-mdl-struc/org-mdl-struc-detail/org-mdl-struc-detail.component';
import { OrgJobTitleDetailComponent } from './org-mdl-struc/org-job-title-detail/org-job-title-detail.component';
import { OrgJobTitlePagingComponent } from './org-mdl-struc/org-job-title-paging/org-job-title-paging.component';


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
    OrganizationComponent,
    OrganizationModelPagingComponent,
    OrganizationModelDetailComponent,
    OrgMdlStrucPagingComponent,
    OrgMdlStrucDetailComponent,
    OrgJobTitleDetailComponent,
    OrgJobTitlePagingComponent

  ]
})
export class OrganizationModule { }
