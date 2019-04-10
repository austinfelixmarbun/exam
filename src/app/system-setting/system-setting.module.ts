import { UserPagingComponent } from 'app/system-setting/user/user-paging/user-paging.component';
import { UserAddEditComponent } from 'app/system-setting/user/user-add-edit/user-add-edit.component';
import { NgModule, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SharingModule } from 'app/shared/sharing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SystemSettingRoutingModule } from 'app/system-setting/system-setting-routing.module';
import { RoleAddEditComponent } from 'app/system-setting/role/role-add-edit/role-add-edit.component';
import { RolePagingComponent } from 'app/system-setting/role/role-paging/role-paging.component';
import { LookupEmployeeComponent } from 'app/shared/lookup/lookup-employee/lookup-employee.component';
import { UserRoleComponent } from 'app/system-setting/user/user-role/user-role.component';
import { UserRoleDetailComponent } from 'app/system-setting/user/user-role-detail/user-role-detail.component';
import { RoleUserComponent } from 'app/system-setting/role/role-user/role-user.component';
import { RoleFormComponent } from 'app/system-setting/role/role-form/role-form.component';
import { RoleFormFeatureComponent } from 'app/system-setting/role/role-form-feature/role-form-feature.component';
import { UserChangePasswordComponent } from 'app/system-setting/user/user-change-password/user-change-password.component';

@NgModule({
  imports: [
    SystemSettingRoutingModule,
    CommonModule,
    FormsModule,
    HttpModule,
    NgbModule,
    SharingModule,
    ReactiveFormsModule
  ],
  declarations: [
    UserPagingComponent,
    UserAddEditComponent,
    RoleAddEditComponent,
    RolePagingComponent,
    UserRoleComponent,
    UserRoleDetailComponent,
    RoleUserComponent,
    RoleFormComponent,
    RoleFormFeatureComponent,
    UserChangePasswordComponent
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LookupEmployeeComponent),
      multi: true
    }
  ]
})
export class SystemSettingModule { }
