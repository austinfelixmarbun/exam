import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BankComponent } from './bank.component';
import { BankAddComponent } from './add/add-bank.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: BankComponent,
        data: {
          title: 'Bank'
        },
      },
      {
        path: 'add',
        component: BankAddComponent,
        data: {
          title: 'Add / Edit Bank'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BankRoutingComponent { }
