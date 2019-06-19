import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BankComponent } from 'app/bank/bank.component';
import { BankAddComponent } from 'app/bank/add/add-bank.component';
import { AuthGuard } from 'app/shared/auth/auth-guard.service';
import { DummyComponent } from './dummy/dummy.component';
import { DummyAddComponent } from './dummy/dummy-add/dummy-add.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'paging',
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
      {
        path: 'dummy',
        component: DummyComponent,
        data: {
          title: 'Dummy'
        }
      },
      {
        path: 'dummy/add',
        component: DummyAddComponent,
        data: {
          title: 'Dummy'
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
