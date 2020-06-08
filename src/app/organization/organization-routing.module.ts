import { OrgJobTitleDetailComponent } from 'app/organization/org-mdl-struc/org-job-title-detail/org-job-title-detail.component';
import { OrgJobTitlePagingComponent } from 'app/organization/org-mdl-struc/org-job-title-paging/org-job-title-paging.component';
import { OrgMdlStrucPagingComponent } from 'app/organization/org-mdl-struc/org-mdl-struc-paging/org-mdl-struc-paging.component';
import { OrgAddEditComponent } from 'app/organization/organization-add-edit/org-add-edit/org-add-edit.component';
import { OrganizationComponent } from 'app/organization/organization.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RefJobTitleComponent } from 'app/organization/ref-job-title/ref-job-title.component';
import { BusinessUnitComponent } from 'app/organization/business-unit/business-unit.component';
import { AddBusinessUnitComponent } from 'app/organization/business-unit/add-business-unit/add-business-unit.component';
import { RefJobTitleAddComponent } from 'app/organization/ref-job-title/ref-job-title-add/ref-job-title-add.component';
import { AuthGuard } from 'app/shared/auth/auth-guard.service';
import { MemberBusinessUnitComponent } from 'app/organization/business-unit/member-business-unit/member-business-unit.component';


const routes: Routes = [
  {
    path: '',canActivate: [AuthGuard] ,
    children: [
      {
        path: 'JobTitle',
        component: RefJobTitleComponent,
        data: {
          title: 'Job Title'
        },
      },
      {
        path: 'JobTitle/Detail',
        component: RefJobTitleAddComponent,
        data: {
          title: 'Job Title add'
        },
      },
      {
        path: 'BusinessUnit',
        component: BusinessUnitComponent,
        data: {
          title: 'Business Unit'
        },
      },
      {
        path: 'BusinessUnit/Detail',
        component: AddBusinessUnitComponent,
        data: {
          title: 'Add Business Unit'
        },
      },
      {
        path: 'businessunit/edit',
        component: AddBusinessUnitComponent,
        data: {
          title: 'Edit Business Unit'
        },
      },
      {
        path: 'BusinessUnit/member',
        component: MemberBusinessUnitComponent,
        data: {
          title: 'Business Unit Member'
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
