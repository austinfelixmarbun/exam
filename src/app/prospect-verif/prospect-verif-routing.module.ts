import { ProspectVerifComponent } from './prospect-verif.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: ProspectVerifComponent,
    data: {
      title: 'ProspectVerif'
    },

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProspectVerifRoutingModule { }
