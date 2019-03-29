import { RoleUserComponent } from 'app/system-setting/role/role-user/role-user.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserPagingComponent } from 'app/system-setting/user/user-paging/user-paging.component';
import { UserAddEditComponent } from 'app/system-setting/user/user-add-edit/user-add-edit.component';
import { RoleAddEditComponent } from 'app/system-setting/role/role-add-edit/role-add-edit.component';
import { RolePagingComponent } from 'app/system-setting/role/role-paging/role-paging.component';
import { UserRoleComponent } from 'app/system-setting/user/user-role/user-role.component';
import { UserRoleDetailComponent } from 'app/system-setting/user/user-role-detail/user-role-detail.component';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'refUser',
        component: UserPagingComponent,
        data: {
          title: 'User Maintenance Paging'
        },
      },
      {
        path: 'refUser/detail',
        component: UserAddEditComponent,
        data: {
          title: 'User Maintenance Add Edit'
        },
      },
      {
        path: 'role',
        component: RolePagingComponent,
        data: {
          title: 'User Maintenance Paging'
        },
      },
      {
        path: 'role/detail',
        component: RoleAddEditComponent,
        data: {
          title: 'User Maintenance Add Edit'
        },
      },
      {
        path: 'userRole',
        component: UserRoleComponent,
        data: {
          title: 'Assign User to Role'
        },
      },
      {
        path: 'userRole/detail',
        component: UserRoleDetailComponent,
        data: {
          title: 'Assign User to Role'
        },
      },
      {
        path: 'roleUser',
        component: RoleUserComponent,
        data: {
          title: 'Assign Role to User'
        },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SystemSettingRoutingModule { }
