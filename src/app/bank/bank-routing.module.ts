import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BankComponent } from 'app/bank/bank.component';
import { BankAddComponent } from 'app/bank/add/add-bank.component';
import { AuthGuard } from 'app/shared/auth/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: BankComponent,
        data: {
          title: 'Bank'
        }, canActivate: [AuthGuard] 
      },
      {
        path: 'add',
        component: BankAddComponent,
        data: {
          title: 'Add / Edit Bank'
        }, canActivate: [AuthGuard] 
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BankRoutingComponent { }
