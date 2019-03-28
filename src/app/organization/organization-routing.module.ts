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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationRoutingModule { }
