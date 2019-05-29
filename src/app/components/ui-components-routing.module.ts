import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ToastrComponent } from "./extra/toastr/toastr.component";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'toastr',
        component: ToastrComponent,
        data: {
          title: 'Toastr'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UIComponentsRoutingModule { }