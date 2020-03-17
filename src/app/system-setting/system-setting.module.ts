import { UserPagingComponent } from 'app/system-setting/user/user-paging/user-paging.component';
import { UserAddEditComponent } from 'app/system-setting/user/user-add-edit/user-add-edit.component';
import { NgModule, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SystemSettingRoutingModule } from 'app/system-setting/system-setting-routing.module';
import { RoleAddEditComponent } from 'app/system-setting/role/role-add-edit/role-add-edit.component';
import { RolePagingComponent } from 'app/system-setting/role/role-paging/role-paging.component';
import { UserRoleComponent } from 'app/system-setting/user/user-role/user-role.component';
import { UserRoleDetailComponent } from 'app/system-setting/user/user-role-detail/user-role-detail.component';
import { RoleUserComponent } from 'app/system-setting/role/role-user/role-user.component';
import { RoleFormComponent } from 'app/system-setting/role/role-form/role-form.component';
import { UserChangePasswordComponent } from 'app/system-setting/user/user-change-password/user-change-password.component';
import { TreeViewModule } from '@progress/kendo-angular-treeview';
import { LookupemployeeComponent, LookupemployeeModule } from '@adins/lookupemployee';
import { SharingComponentModule } from 'app/shared/sharingcomponent.module';
import { UCSearchModule } from '@adins/ucsearch';
import { UcgridfooterModule } from '@adins/ucgridfooter';
import { LookuproleModule } from '@adins/lookuprole';
import { UcpagingModule } from '@adins/ucpaging';
import { UcSubsectionModule } from '@adins/uc-subsection';


@NgModule({
  imports: [
    SystemSettingRoutingModule,
    CommonModule,
    FormsModule,
    HttpModule,
    NgbModule,
    SharingComponentModule,
    UCSearchModule,
    UcgridfooterModule,
    UcpagingModule,
    UcSubsectionModule,
    LookupemployeeModule,
    LookuproleModule,
    ReactiveFormsModule,
    TreeViewModule
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
    UserChangePasswordComponent
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() =>LookupemployeeComponent),
      multi: true
    }
  ]
})
export class SystemSettingModule { }
