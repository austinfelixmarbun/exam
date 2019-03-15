import { UserPagingComponent } from './user/user-paging/user-paging.component';
import { UserAddEditComponent } from './user/user-add-edit/user-add-edit.component';
import { NgModule, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SharingModule } from 'app/shared/sharing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SystemSettingRoutingModule } from './system-setting-routing.module';
import { RoleAddEditComponent } from './role/role-add-edit/role-add-edit.component';
import { RolePagingComponent } from './role/role-paging/role-paging.component';
import { LookupEmployeeComponent } from 'app/shared/lookup/lookup-employee/lookup-employee.component';




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
    RolePagingComponent
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
