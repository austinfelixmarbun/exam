import { OrgAddEditComponent } from './organization-add-edit/org-add-edit/org-add-edit.component';
import { OrganizationComponent } from './organization.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RefJobTitleComponent } from './ref-job-title/ref-job-title.component';
import { BusinessUnitComponent } from './business-unit/business-unit.component';
import { AddBusinessUnitComponent } from './business-unit/add/add-business-unit.component';
import { RefJobTitleAddComponent } from './ref-job-title/ref-job-title-add/ref-job-title-add.component';



const routes: Routes = [
  {
    path: '',
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
        path: 'addedit',
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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationRoutingModule { }
