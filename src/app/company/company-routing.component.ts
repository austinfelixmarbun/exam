import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyComponent } from './company.component';
import { BODComponent } from './bod/bod.component';
import { BodAddComponent } from './bod/add/add-bod.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: CompanyComponent,
        data: {
          title: 'Company'
        },
      },
      {
        path: 'bod',
        component: BODComponent,
        data: {
          title: 'BOD Information'
        }
      },
      {
        path: 'bod/add',
        component: BodAddComponent,
        data: {
          title: 'BOD Information'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyRoutingComponent { }
