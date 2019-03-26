import { MasterTypeAddEditComponent } from './master-type/master-type-add-edit/master-type-add-edit.component';
import { MasterPagingComponent } from './master/master-paging/master-paging.component';
import { MasterAddEditComponent } from './master/master-add-edit/master-add-edit.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterTypePagingComponent } from './master-type/master-type-paging/master-type-paging.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'masterType',
        component: MasterTypePagingComponent,
        data: {
          title: 'Master Type Maintenance Paging'
        },
      },
      {
        path: 'masterType/detail',
        component: MasterTypeAddEditComponent,
        data: {
          title: 'Master Type Maintenance Add Edit'
        },
      },
      {
        path: 'master',
        component: MasterPagingComponent,
        data: {
          title: 'Master Maintenance Paging'
        },
      },
      {
        path: 'master/detail',
        component: MasterAddEditComponent,
        data: {
          title: 'Master Maintenance Add Edit'
        },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommonSettingRoutingModule { }
