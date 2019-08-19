import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BankComponent } from 'app/bank/bank.component';
import { BankAddComponent } from 'app/bank/add/add-bank.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'paging',
        component: BankComponent,
        data: {
          title: 'Bank'
        }
      },
      {
        path: 'add',
        component: BankAddComponent,
        data: {
          title: 'Add Bank'
        }
      },
      {
        path: 'edit',
        component: BankAddComponent,
        data: {
          title: 'Edit Bank'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BankRoutingComponent { }
