import { MasterTypeAddEditComponent } from 'app/common-setting/master-type/master-type-add-edit/master-type-add-edit.component';
import { MasterPagingComponent } from 'app/common-setting/master/master-paging/master-paging.component';
import { MasterAddEditComponent } from 'app/common-setting/master/master-add-edit/master-add-edit.component';
import { CommonSettingRoutingModule } from 'app/common-setting/common-setting-routing.module';
import { MasterTypePagingComponent } from 'app/common-setting/master-type/master-type-paging/master-type-paging.component';
import { NgModule, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SharingModule } from 'app/shared/sharing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LookupEmployeeComponent } from 'app/shared/lookup/lookup-employee/lookup-employee.component';
import { GeneralSettingAddEditComponent } from 'app/common-setting/general-setting/general-setting-add-edit/general-setting-add-edit.component';
import { GeneralSettingPagingComponent } from 'app/common-setting/general-setting/general-setting-paging/general-setting-paging.component';
import { CurrencyComponent } from 'app/common-setting/currency/currency.component';
import { CurrencyAddComponent } from 'app/common-setting/currency/currency-add/currency-add.component';
import { WorkingHourPagingComponent } from './working-hour-scheme/working-hour-paging/working-hour-paging.component';
import { WorkingHourDetailComponent } from './working-hour-scheme/working-hour-detail/working-hour-detail.component';
import { HolidayPagingComponent } from './holiday-scheme/holiday-paging/holiday-paging.component';
import { HolidayDetailComponent } from './holiday-scheme/holiday-detail/holiday-detail.component';

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
    MasterTypeAddEditComponent,
    GeneralSettingAddEditComponent,
    GeneralSettingPagingComponent,
    CurrencyComponent,
    CurrencyAddComponent,
    WorkingHourPagingComponent,
    WorkingHourDetailComponent,
    HolidayPagingComponent,
    HolidayDetailComponent
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
