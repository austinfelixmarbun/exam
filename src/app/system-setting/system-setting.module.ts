import { UserPagingComponent } from 'app/system-setting/user/user-paging/user-paging.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SystemSettingRoutingModule } from 'app/system-setting/system-setting-routing.module';
import { RoleAddEditComponent } from 'app/system-setting/role/role-add-edit/role-add-edit.component';
import { RolePagingComponent } from 'app/system-setting/role/role-paging/role-paging.component';
import { UserRoleComponent } from 'app/system-setting/user/user-role/user-role.component';
import { RoleUserComponent } from 'app/system-setting/role/role-user/role-user.component';
import { RoleFormComponent } from 'app/system-setting/role/role-form/role-form.component';
import { UserChangePasswordComponent } from 'app/system-setting/user/user-change-password/user-change-password.component';
import { TreeViewModule } from '@progress/kendo-angular-treeview';
import { SharingComponentModule } from 'app/shared/sharingcomponent.module';
import { UCSearchModule } from '@adins/ucsearch';
import { UcgridfooterModule } from '@adins/ucgridfooter';
import { UcpagingModule } from '@adins/ucpaging';
import { UcSubsectionModule } from '@adins/uc-subsection'; 
import { NotificationPagingComponent } from 'app/system-setting/notification/notification-paging/notification-paging.component';
import { NotificationAddEditComponent } from 'app/system-setting/notification/notification-add-edit/notification-add-edit.component';
import { NotificationApprovalPagingComponent } from 'app/system-setting/notification/notification-approval-paging/notification-approval-paging.component';
import { NotificationApprovalDetailComponent } from 'app/system-setting/notification/notification-approval-detail/notification-approval-detail.component';
import { UcviewgenericModule, UcviewgenericComponent } from '@adins/ucviewgeneric';
import { UcgridviewModule} from '@adins/ucgridview'
import { UclookupgenericModule } from '@adins/uclookupgeneric';
import { UcShowErrorsModule } from '@adins/uc-show-errors';
import { RefFormPagingComponent } from './ref-form/ref-form-paging/ref-form-paging.component';
import { RefFormDetailComponent } from './ref-form/ref-form-detail/ref-form-detail.component';
import { RefFormRoleMappingComponent } from './ref-form/ref-form-role-mapping/ref-form-role-mapping.component';
import { RefFormRolePagingComponent } from './ref-form/ref-form-role-paging/ref-form-role-paging.component';
import { RoleFormPagingComponent } from './role/role-form-paging/role-form-paging.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { UcaddtotempModule } from '@adins/ucaddtotemp'; 
import { AttributeComponent } from './attribute/attribute.component';
import { AttributeDetailComponent } from './attribute/attribute-detail/attribute-detail.component';


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
    ReactiveFormsModule,
    TreeViewModule,
    NgMultiSelectDropDownModule,
    UcviewgenericModule,
    UcgridviewModule,
    UclookupgenericModule,
    UcShowErrorsModule,
    UcaddtotempModule
  ],
  declarations: [
    UserPagingComponent,
    RoleAddEditComponent,
    RolePagingComponent,
    UserRoleComponent,
    RoleUserComponent,
    RoleFormComponent,
    UserChangePasswordComponent,
    NotificationPagingComponent,
    NotificationAddEditComponent,
    NotificationApprovalPagingComponent,
    NotificationApprovalDetailComponent,
    RefFormPagingComponent,
    RefFormDetailComponent,
    RefFormRoleMappingComponent,
    RefFormRolePagingComponent,
    RoleFormPagingComponent,
    AttributeComponent,
    AttributeDetailComponent
  ],
  entryComponents : [UcviewgenericComponent],
  providers: [
    NGXToastrService
  ]
})
export class SystemSettingModule { }
