import { OrganizationComponent } from './organization.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RefJobTitleComponent } from './ref-job-title/ref-job-title.component';
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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationRoutingModule { }
