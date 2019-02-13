import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OfficeComponent } from './office.component';
import { OfficeAddComponent } from './office-add/office-add.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: OfficeComponent,
        data: {
          title: 'Office'
        },
      },
      {
        path: 'add',
        component: OfficeAddComponent,
        data: {
          title: 'Add Office'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfficeRoutingModule { }
