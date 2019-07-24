import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BankComponent } from 'app/bank/bank.component';
import { BankAddComponent } from 'app/bank/add/add-bank.component';
import { AuthGuard } from 'app/shared/auth/auth-guard.service';
import { DummyComponent } from './dummy/dummy.component';
import { DummyAddComponent } from './dummy/dummy-add/dummy-add.component';
import { Dummy2Component } from './dummy2/dummy2.component';
import { Dummy3Component } from './dummy3/dummy3.component';

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
          title: 'Add Bank'
        }, canActivate: [AuthGuard] 
      },
      {
        path: 'edit',
        component: BankAddComponent,
        data: {
          title: 'Edit Bank'
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
      {
        path: 'dummy2',
        component: Dummy2Component,
        data: {
          title: 'Dummy2'
        }
      },
      {
        path: 'dummy3',
        component: Dummy3Component,
        data: {
          title: 'Dummy3'
        }
      },
    ],
    runGuardsAndResolvers: 'always',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BankRoutingComponent { }
