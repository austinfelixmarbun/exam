import { MasterTypeAddEditComponent } from './master-type/master-type-add-edit/master-type-add-edit.component';
import { MasterPagingComponent } from './master/master-paging/master-paging.component';
import { MasterAddEditComponent } from './master/master-add-edit/master-add-edit.component';
import { CommonSettingRoutingModule } from './common-setting-routing.module';
import { MasterTypePagingComponent } from './master-type/master-type-paging/master-type-paging.component';
import { NgModule, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SharingModule } from 'app/shared/sharing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LookupEmployeeComponent } from 'app/shared/lookup/lookup-employee/lookup-employee.component';





@NgModule({
  imports: [
    CommonSettingRoutingModule,
    CommonModule,
    FormsModule,
    HttpModule,
    NgbModule,
    SharingModule,
    ReactiveFormsModule
  ],
  declarations: [
    MasterPagingComponent,
    MasterAddEditComponent,
    MasterTypePagingComponent,
    MasterTypeAddEditComponent
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LookupEmployeeComponent),
      multi: true
    }
  ]
})
export class CommonSettingModule { }
