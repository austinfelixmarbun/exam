import { RoleUserComponent } from 'app/system-setting/role/role-user/role-user.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotificationPagingComponent } from 'app/system-setting/notification/notification-paging/notification-paging.component';
import { NotificationAddEditComponent } from 'app/system-setting/notification/notification-add-edit/notification-add-edit.component';
import { NotificationApprovalPagingComponent } from 'app/system-setting/notification/notification-approval-paging/notification-approval-paging.component';
import { NotificationApprovalDetailComponent } from 'app/system-setting/notification/notification-approval-detail/notification-approval-detail.component';
import { UserPagingComponent } from 'app/system-setting/user/user-paging/user-paging.component';
import { RoleAddEditComponent } from 'app/system-setting/role/role-add-edit/role-add-edit.component';
import { RolePagingComponent } from 'app/system-setting/role/role-paging/role-paging.component';
import { UserRoleComponent } from 'app/system-setting/user/user-role/user-role.component';
import { RoleFormComponent } from 'app/system-setting/role/role-form/role-form.component';
import { UserChangePasswordComponent } from 'app/system-setting/user/user-change-password/user-change-password.component';
import { RefFormPagingComponent } from './ref-form/ref-form-paging/ref-form-paging.component';
import { RefFormDetailComponent } from './ref-form/ref-form-detail/ref-form-detail.component';
import { RefFormRoleMappingComponent } from './ref-form/ref-form-role-mapping/ref-form-role-mapping.component';
import { RefFormRolePagingComponent } from './ref-form/ref-form-role-paging/ref-form-role-paging.component';
import { RoleFormPagingComponent } from './role/role-form-paging/role-form-paging.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'Notification',
        component: NotificationPagingComponent,
        data: {
          title: 'Notification Paging'
        }
      },
      {
        path: 'Notification/Detail',
        component: NotificationAddEditComponent,
        data: {
          title: 'Notification Add Edit'
        }
      },
      {
        path: 'NotificationApproval',
        component: NotificationApprovalPagingComponent,
        data: {
          title: 'Notification Approval Paging'
        }
      },
      {
        path: 'NotificationApproval/Detail',
        component: NotificationApprovalDetailComponent,
        data: {
          title: 'Notification Add Edit'
        }
      },
      {
        path: 'RefUser',
        component: UserPagingComponent,
        data: {
          title: 'User Maintenance Paging'
        },
      },
      {
        path: 'Role',
        component: RolePagingComponent,
        data: {
          title: 'User Maintenance Paging'
        },
      },
      {
        path: 'Role/Detail',
        component: RoleAddEditComponent,
        data: {
          title: 'User Maintenance Add Edit'
        },
      },
      {
        path: 'UserRole',
        component: UserRoleComponent,
        data: {
          title: 'Assign User to Role'
        },
      },
      {
        path: 'RoleUser',
        component: RoleUserComponent,
        data: {
          title: 'Assign Role to User'
        },
      },
      {
        path: 'RoleForm',
        component: RoleFormPagingComponent,
        data: {
          title: 'Assign Form to Role Paging'
        },
      },
      {
        path: 'RoleForm/Add',
        component: RoleFormComponent,
        data: {
          title: 'Assign Form to Role Add'
        },
      },
      {
        path: 'ChangePassword',
        component: UserChangePasswordComponent,
        data: {
          title: 'Change Password Maintenance'
        },
      },
      {
        path: 'RefForm/Paging',
        component: RefFormPagingComponent,
        data: {
          title: 'Ref Form Paging'
        },
      },
      {
        path: 'RefForm/Detail',
        component: RefFormDetailComponent,
        data: {
          title: 'Ref Form Detail'
        },
      },
      {
        path: 'RefForm/RoleMapping',
        component: RefFormRolePagingComponent,
        data: {
          title: 'Ref Form Role Mapping Paging'
        },
      },
      {
        path: 'RefForm/RoleMapping/Add',
        component: RefFormRoleMappingComponent,
        data: {
          title: 'Ref Form Role Mapping Add'
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
