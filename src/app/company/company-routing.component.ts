import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyComponent } from './company.component';
import { BODComponent } from './bod/bod.component';
import { BodAddComponent } from './bod/add/add-bod.component';
import { CommissionerComponent } from './Commissioner/commissioner.component';
import { CommissionerAddComponent } from './Commissioner/add/add-commissioner.component';
import { EditCompanyComponent } from './edit/edit-company.component';

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
      },
      {
        path: 'commissioner',
        component: CommissionerComponent,
        data: {
          title: 'Commisioner Information'
        }
      },
      {
        path: 'commissioner/add',
        component: CommissionerAddComponent,
        data: {
          title: 'Commisioner Information'
        }
      },
      {
        path: 'edit',
        component: EditCompanyComponent,
        data: {
          title: 'Edit Company'
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
