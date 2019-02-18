import { OrganizationComponent } from './organization.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RefJobTitleComponent } from './ref-job-title/ref-job-title.component';



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
