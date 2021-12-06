import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PathConstant } from 'app/shared/PathConstant';
import { SystemUserComponent } from './system-user.component';
import { SystemUserAddComponent } from './system-user-add/system-user-add.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: PathConstant.PAGING,
        component: SystemUserComponent,
        data: {
          title: 'System User'
        }
      },
      {
        path: PathConstant.DETAIL,
        component: SystemUserAddComponent,
        data: {
          title: 'System User Detail'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemUserRoutingModule { }
