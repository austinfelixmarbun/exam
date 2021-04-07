import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PathConstant } from 'app/shared/PathConstant';
import { FeeAddEditComponent } from './fee-add-edit/fee-add-edit.component';
import { FeePagingComponent } from './fee-paging/fee-paging.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: PathConstant.PAGING,
        component: FeePagingComponent,
        data: {
          title: 'Fee'
        }
      },
      {
        path: PathConstant.ADD,
        component: FeeAddEditComponent,
        data: {
          title: 'Add Fee'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeeRoutingModule { }
