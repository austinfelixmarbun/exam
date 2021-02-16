import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyComponent } from 'app/company/company.component';
import { BODComponent } from 'app/company/bod/bod.component';
import { BodAddComponent } from 'app/company/bod/add/add-bod.component';
import { CommissionerComponent } from 'app/company/Commissioner/commissioner.component';
import { CommissionerAddComponent } from 'app/company/Commissioner/add/add-commissioner.component';
import { EditCompanyComponent } from 'app/company/edit/edit-company.component';
import { PathConstant } from 'app/shared/PathConstant';

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
        path: PathConstant.COY_BOD,
        component: BODComponent,
        data: {
          title: 'BOD Information'
        }
      },
      {
        path: PathConstant.COY_BOD_ADD,
        component: BodAddComponent,
        data: {
          title: 'BOD Information'
        }
      },
      {
        path: PathConstant.COY_COMMISSIONER,
        component: CommissionerComponent,
        data: {
          title: 'Commisioner Information'
        }
      },
      {
        path: PathConstant.COY_COMMISSIONER_ADD,
        component: CommissionerAddComponent,
        data: {
          title: 'Commisioner Information'
        }
      },
      {
        path: PathConstant.EDIT,
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
