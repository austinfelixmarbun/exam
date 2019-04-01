import { ProspectComponent } from 'app/prospect/prospect.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: ProspectComponent,
    data: {
      title: 'Prospect'
    },

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProspectRoutingModule { }
