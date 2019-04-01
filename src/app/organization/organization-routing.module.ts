import { OrgJobTitleDetailComponent } from './org-mdl-struc/org-job-title-detail/org-job-title-detail.component';
import { OrgJobTitlePagingComponent } from './org-mdl-struc/org-job-title-paging/org-job-title-paging.component';
import { OrgMdlStrucPagingComponent } from './org-mdl-struc/org-mdl-struc-paging/org-mdl-struc-paging.component';
import { OrgAddEditComponent } from './organization-add-edit/org-add-edit/org-add-edit.component';
import { OrganizationComponent } from './organization.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RefJobTitleComponent } from './ref-job-title/ref-job-title.component';
import { BusinessUnitComponent } from './business-unit/business-unit.component';
import { AddBusinessUnitComponent } from './business-unit/add/add-business-unit.component';
import { RefJobTitleAddComponent } from './ref-job-title/ref-job-title-add/ref-job-title-add.component';
import { AuthGuard } from 'app/shared/auth/auth-guard.service';
import { OrganizationModelPagingComponent } from './organization-model/organization-model-paging/organization-model-paging.component';
import { OrganizationModelDetailComponent } from './organization-model/organization-model-detail/organization-model-detail.component';
import { OrgMdlStrucDetailComponent } from './org-mdl-struc/org-mdl-struc-detail/org-mdl-struc-detail.component';

const routes: Routes = [
  {
    path: '',canActivate: [AuthGuard] ,
    children: [
      {
        path: 'refjobtitle',
        component: RefJobTitleComponent,
        data: {
          title: 'Job Title'
        },
      },
      {
        path: 'refjobtitle/add',
        component: RefJobTitleAddComponent,
        data: {
          title: 'Job Title add'
        },
      },
      {
        path: 'organization',
        component: OrganizationComponent,
        data: {
          title: 'Organization'
        },
      },
      {
        path: 'organization/add',
        component: OrgAddEditComponent,
        data: {
          title: 'Organization Add Edit'
        },
      },
      {
        path: 'businessunit',
        component: BusinessUnitComponent,
        data: {
          title: 'Business Unit'
        },
      },
      {
        path: 'businessunit/add',
        component: AddBusinessUnitComponent,
        data: {
          title: 'Add Business Unit'
        },
      },
      {
        path: 'model',
        component: OrganizationModelPagingComponent,
        data: {
          title: 'Organization Model'
        },
      },
      {
        path: 'model/detail',
        component: OrganizationModelDetailComponent,
        data: {
          title: 'Organization Model Detail'
        },
      },
      {
        path: 'struc',
        component: OrgMdlStrucPagingComponent,
        data: {
          title: 'Organization Model Structure'
        },
      },
      {
        path: 'struc/detail',
        component: OrgMdlStrucDetailComponent,
        data: {
          title: 'Organization Model Structure Detail'
        },
      },
      {
        path: 'orgJob',
        component: OrgJobTitlePagingComponent,
        data: {
          title: 'Organization Job Title'
        },
      },
      {
        path: 'orgJob/detail',
        component: OrgJobTitleDetailComponent,
        data: {
          title: 'Organization Job Title Detai'
        },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationRoutingModule { }
