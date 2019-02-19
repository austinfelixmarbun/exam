import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationRoutingModule } from './organization-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SharingModule } from 'app/shared/sharing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RefJobTitleComponent } from './ref-job-title/ref-job-title.component';
import { OrganizationComponent } from './organization.component';
import { OrgAddEditComponent } from './organization-add-edit/org-add-edit/org-add-edit.component';

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
    OrgAddEditComponent
  ]
})
export class OrganizationModule { }
