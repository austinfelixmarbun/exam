import { ProspectVerifComponent } from './prospect-verif.component';
import { ProspectVerifDetailComponent } from './prospect-verif-detail/prospect-verif-detail.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ProspectVerifComponent,
        data: {
          title: 'Prospect Verification'
        },
      },
      {
        path: 'detail',
        component: ProspectVerifDetailComponent,
        data: {
          title: 'Prospect Verification Detail'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProspectVerifRoutingModule { }
