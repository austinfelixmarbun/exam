import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RefIndustryTypeComponent } from './ref-industry-type.component';
import { RefIndustryTypeDetailComponent } from './ref-industry-type-detail/ref-industry-type-detail.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: RefIndustryTypeComponent,
        data: {
          title: 'Industry Type Paging'
        },
      },
      {
        path: 'detail',
        component: RefIndustryTypeDetailComponent,
        data: {
          title: 'Industry Type Detail'
        },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RefIndustryTypeRoutingModule { }
