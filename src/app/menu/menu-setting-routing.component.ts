import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuSettingComponent } from './menu-setting.component';
import { AddMenuSettingComponent } from './add/add-menu.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: MenuSettingComponent,
        data: {
          title: 'Menu Setting'
        },
      },
      {
        path: 'add',
        component: AddMenuSettingComponent,
        data: {
          title: 'Add / Edit Menu'
        },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuSettingRoutingComponent { }
