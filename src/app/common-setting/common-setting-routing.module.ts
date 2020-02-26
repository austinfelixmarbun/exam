import { MasterTypeAddEditComponent } from 'app/common-setting/master-type/master-type-add-edit/master-type-add-edit.component';
import { MasterPagingComponent } from 'app/common-setting/master/master-paging/master-paging.component';
import { MasterAddEditComponent } from 'app/common-setting/master/master-add-edit/master-add-edit.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterTypePagingComponent } from 'app/common-setting/master-type/master-type-paging/master-type-paging.component';
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
import { HolidayAddComponent } from './holiday-scheme/holiday-add/holiday-add.component';
import { CopyHolidaySchemeComponent } from './holiday-scheme/copy-holiday-scheme/copy-holiday-scheme.component';
import { EconomicSectorComponent } from './economic-sector/economic-sector-paging/economic-sector.component';
import { EconomicSectorAddEditComponent } from './economic-sector/economic-sector-add-edit/economic-sector-add-edit.component';
import { ProvinceComponent } from './prov-district/province-paging/province.component';
import { ProvinceAddEditComponent } from './prov-district/province-add-edit/province-add-edit.component';
import { DistrictComponent } from './prov-district/district-paging/district.component';
import { DistrictAddEditComponent } from './prov-district/district-add-edit/district-add-edit.component';

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
      },
      {
        path: 'currency/paging',
        component: CurrencyComponent,
        data: {
          title: 'Currency'
        },
      },
      {
        path: 'currency/add',
        component: CurrencyAddComponent,
        data: {
          title: 'Currency add'
        },
      },
      {
        path: 'workingHour',
        component: WorkingHourPagingComponent,
        data: {
          title: 'Working Hour'
        },
      },
      {
        path: 'workingHour/add',
        component: WorkingHourDetailComponent,
        data: {
          title: 'Working Hour Add Edit'
        },
      },
      {
        path: 'holiday',
        component: HolidayPagingComponent,
        data: {
          title: 'Holiday'
        },
      },
      {
        path: 'holiday/add',
        component: HolidayDetailComponent,
        data: {
          title: 'Holiday Add Edit'
        },
      },
      {
        path: 'holiday-scheme/add',
        component: HolidayAddComponent,
        data: {
          title: 'Holiday Scehme Add Edit'
        },
      },
      {
        path: 'holiday-scheme/copy',
        component: CopyHolidaySchemeComponent,
        data: {
          title: 'Holiday Scehme Copy Add Edit'
        },
      },
      {
        path: 'holiday/detail',
        component: HolidayDetailAddComponent,
        data: {
          title: 'Holiday Detail Add Edit'
        },
      },
      {
        path: 'officeZipcodeMember',
        component: OfficeZipcodeMemberComponent,
        data: {
          title: 'office Zipcode Member'
        },
      },
      {
        path: 'officeZipcodeMember/paging',
        component: OfficeZipcodeMemberPagingComponent,
        data: {
          title: 'office Zipcode Member Paging'
        },
      },
      {
        path: 'officeZipcodeMember/add',
        component: OfficeZipcodeMemberAddComponent,
        data: {
          title: 'office Zipcode Member Add'
        },
      },
      {
        path: 'economicSector/paging',
        component: EconomicSectorComponent,
        data: {
          title: 'Economic Sector Paging'
        },
      },
      {
        path: 'economicSector/detail',
        component: EconomicSectorAddEditComponent,
        data: {
          title: 'Economic Sector Add Edit'
        },
      },
      {
        path: 'province/paging',
        component: ProvinceComponent,
        data: {
          title: 'Province Paging'
        },
      },
      {
        path: 'province/detail',
        component: ProvinceAddEditComponent,
        data: {
          title: 'Province Add Edit'
        },
      },
      {
        path: 'district/paging',
        component: DistrictComponent,
        data: {
          title: 'District Paging'
        },
      },
      {
        path: 'district/detail',
        component: DistrictAddEditComponent,
        data: {
          title: 'District Add Edit'
        },
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommonSettingRoutingModule { }
