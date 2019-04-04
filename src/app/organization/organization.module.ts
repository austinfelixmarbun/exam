import { OrgJobTitlePagingComponent } from './org-mdl-struc/org-job-title-paging/org-job-title-paging.component';
import { OrgJobTitleDetailComponent } from './org-mdl-struc/org-job-title-detail/org-job-title-detail.component';
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
import { OrganizationModelPagingComponent } from 'app/organization/organization-model/organization-model-paging/organization-model-paging.component';
import { OrganizationModelDetailComponent } from 'app/organization/organization-model/organization-model-detail/organization-model-detail.component';
import { OrgMdlStrucDetailComponent } from 'app/organization/org-mdl-struc/org-mdl-struc-detail/org-mdl-struc-detail.component';
import { OrgMdlStrucPagingComponent } from 'app/organization/org-mdl-struc/org-mdl-struc-paging/org-mdl-struc-paging.component';


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
