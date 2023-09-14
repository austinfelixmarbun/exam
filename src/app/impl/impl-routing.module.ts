import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      // {
      //   path: PathConstantX.REQ_PAGING_X,
      //   component: TransferReleaseRequestPagingXComponent,
      //   data: {
      //     title: 'Transfer Release Request'
      //   }
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImplRoutingModule { 

}
