import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RefJobTitleComponent } from './ref-job-title/ref-job-title.component';
import { BusinessUnitComponent } from './business-unit/business-unit.component';
import { AddBusinessUnitComponent } from './business-unit/add/add-business-unit.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'refjobtitle',
        component: RefJobTitleComponent,
        data: {
          title: 'Ref Job Title'
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
