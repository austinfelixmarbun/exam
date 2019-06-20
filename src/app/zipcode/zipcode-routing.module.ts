import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ZipcodeComponent } from 'app/zipcode/zipcode.component';
import { ZipcodeAddComponent } from 'app/zipcode/add/add-zipcode.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'paging',
        component: ZipcodeComponent,
        data: {
          title: 'Zipcode'
        },
      },
      {
        path: 'add',
        component: ZipcodeAddComponent,
        data: {
          title: 'Add / Edit Zipcode'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ZipcodeRoutingComponent { }
