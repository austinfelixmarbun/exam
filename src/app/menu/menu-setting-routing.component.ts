import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuSettingComponent } from './menu-setting.component';
import { AddMenuSettingComponent } from './add/add-menu.component';
import { CurrencyComponent } from './currency/currency.component';
import { CurrencyAddComponent } from './currency/currency-add/currency-add.component';

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
      },
      {
        path: 'currency',
        component: CurrencyComponent,
        data: {
          title: 'Currency'
        },
      },
      {
        path: 'currency/add',
        component: CurrencyAddComponent,
        data: {
          title: 'Currency add'
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
