import { MasterTypeAddEditComponent } from 'app/common-setting/master-type/master-type-add-edit/master-type-add-edit.component';
import { MasterPagingComponent } from 'app/common-setting/master/master-paging/master-paging.component';
import { MasterAddEditComponent } from 'app/common-setting/master/master-add-edit/master-add-edit.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterTypePagingComponent } from 'app/common-setting/master-type/master-type-paging/master-type-paging.component';
import { GeneralSettingAddEditComponent } from 'app/common-setting/general-setting/general-setting-add-edit/general-setting-add-edit.component';
import { GeneralSettingPagingComponent } from 'app/common-setting/general-setting/general-setting-paging/general-setting-paging.component';

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
      },
      {
        path: 'generalSetting',
        component: GeneralSettingPagingComponent,
        data: {
          title: 'General Setting Maintenance Paging'
        },
      },
      {
        path: 'generalSetting/detail',
        component: GeneralSettingAddEditComponent,
        data: {
          title: 'General Setting Maintenance Add Edit'
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
