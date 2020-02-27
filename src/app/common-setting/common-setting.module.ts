import { MasterTypeAddEditComponent } from 'app/common-setting/master-type/master-type-add-edit/master-type-add-edit.component';
import { MasterPagingComponent } from 'app/common-setting/master/master-paging/master-paging.component';
import { MasterAddEditComponent } from 'app/common-setting/master/master-add-edit/master-add-edit.component';
import { CommonSettingRoutingModule } from 'app/common-setting/common-setting-routing.module';
import { MasterTypePagingComponent } from 'app/common-setting/master-type/master-type-paging/master-type-paging.component';
import { NgModule, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GeneralSettingAddEditComponent } from 'app/common-setting/general-setting/general-setting-add-edit/general-setting-add-edit.component';
import { GeneralSettingPagingComponent } from 'app/common-setting/general-setting/general-setting-paging/general-setting-paging.component';
import { CurrencyComponent } from 'app/common-setting/currency/currency.component';
import { CurrencyAddComponent } from 'app/common-setting/currency/currency-add/currency-add.component';
import { WorkingHourPagingComponent } from './working-hour-scheme/working-hour-paging/working-hour-paging.component';
import { WorkingHourDetailComponent } from './working-hour-scheme/working-hour-detail/working-hour-detail.component';
import { HolidayPagingComponent } from './holiday-scheme/holiday-paging/holiday-paging.component';
import { HolidayDetailComponent } from './holiday-scheme/holiday-detail/holiday-detail.component';
import { HolidayDetailAddComponent } from './holiday-scheme/holiday-detail-add/holiday-detail-add.component';
import { OfficeZipcodeMemberComponent } from './office-zipcode-member/office-zipcode-member.component';
import { OfficeZipcodeMemberAddComponent } from './office-zipcode-member/office-zipcode-member-add/office-zipcode-member-add.component';
import { OfficeZipcodeMemberPagingComponent } from './office-zipcode-member/office-zipcode-member-paging/office-zipcode-member-paging.component';
import { LookupemployeeComponent } from '@adins/lookupemployee';
import { UCSearchModule } from '@adins/ucsearch';
import { UcgridfooterModule } from '@adins/ucgridfooter';
import { SharingComponentModule } from 'app/shared/sharingcomponent.module';
import { UclookupgenericModule } from '@adins/uclookupgeneric';
import { UcpagingModule } from '@adins/ucpaging';
import { HolidayAddComponent } from './holiday-scheme/holiday-add/holiday-add.component';
import { CopyHolidaySchemeComponent } from './holiday-scheme/copy-holiday-scheme/copy-holiday-scheme.component';
import { EconomicSectorComponent } from './economic-sector/economic-sector-paging/economic-sector.component';
import { EconomicSectorAddEditComponent } from './economic-sector/economic-sector-add-edit/economic-sector-add-edit.component';
import { ProvinceComponent } from './prov-district/province-paging/province.component';
import { ProvinceAddEditComponent } from './prov-district/province-add-edit/province-add-edit.component';
import { DistrictComponent } from './prov-district/district-paging/district.component';
import { DistrictAddEditComponent } from './prov-district/district-add-edit/district-add-edit.component';
import { UcSubsectionModule } from '@adins/uc-subsection';
import { RefStatusPagingComponent } from './ref-status/ref-status-paging/ref-status-paging.component';
import { ProfessionComponent } from './profession/profession-paging/profession.component';
import { ProfessionAddEditComponent } from './profession/profession-add-edit/profession-add-edit.component';

@NgModule({
  imports: [
    CommonSettingRoutingModule,
    CommonModule,
    FormsModule,
    HttpModule,
    NgbModule,
    UCSearchModule,
    UcgridfooterModule,
    SharingComponentModule,
    ReactiveFormsModule,
    UcpagingModule,
    UclookupgenericModule,
    UcSubsectionModule
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
    HolidayDetailComponent,
    HolidayDetailAddComponent,
    OfficeZipcodeMemberComponent,
    OfficeZipcodeMemberAddComponent,
    OfficeZipcodeMemberPagingComponent,
    HolidayAddComponent,
    CopyHolidaySchemeComponent,
    EconomicSectorComponent,
    EconomicSectorAddEditComponent,
    ProvinceComponent,
    ProvinceAddEditComponent,
    DistrictComponent,
    DistrictAddEditComponent,
    RefStatusPagingComponent,
    ProfessionComponent,
    ProfessionAddEditComponent
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LookupemployeeComponent),
      multi: true
    }
  ]
})
export class CommonSettingModule { }
