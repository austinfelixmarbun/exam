import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApprovalScreenComponent } from './approval-screen.component';

const routes: Routes = [{
  path: '',
  children: [
      {
          path: 'sample',
          component: ApprovalScreenComponent,
          data: {
              title: 'Asset Configuration Paging'
          },
      },]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApprovalScreenRoutingModule { }
