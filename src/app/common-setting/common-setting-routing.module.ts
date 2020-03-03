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
import { WorkingHourHDetailComponent } from './working-hour-scheme/working-hour-h-detail/working-hour-h-detail.component';
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
import { WorkingHourDDetailComponent } from './working-hour-scheme/working-hour-d-detail/working-hour-d-detail.component';
import { RefStatusPagingComponent } from './ref-status/ref-status-paging/ref-status-paging.component';
import { ProfessionComponent } from './profession/profession-paging/profession.component';
import { ProfessionAddEditComponent } from './profession/profession-add-edit/profession-add-edit.component';
import { RefIndustryTypeComponent } from './ref-industry-type/ref-industry-type.component';
import { RefIndustryTypeDetailComponent } from './ref-industry-type/ref-industry-type-detail/ref-industry-type-detail.component';
import { BankComponent } from 'app/bank/bank.component';
import { BankAddComponent } from 'app/bank/add/add-bank.component';
import { ZipcodeComponent } from 'app/zipcode/zipcode.component';
import { ZipcodeAddComponent } from 'app/zipcode/add/add-zipcode.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'MasterType',
        component: MasterTypePagingComponent,
        data: {
          title: 'Master Type Maintenance Paging'
        },
      },
      {
        path: 'MasterType/detail',
        component: MasterTypeAddEditComponent,
        data: {
          title: 'Master Type Maintenance Add Edit'
        },
      },
      {
        path: 'Master',
        component: MasterPagingComponent,
        data: {
          title: 'Master Maintenance Paging'
        },
      },
      {
        path: 'Master/detail',
        component: MasterAddEditComponent,
        data: {
          title: 'Master Maintenance Add Edit'
        },
      },
      {
        path: 'GeneralSetting',
        component: GeneralSettingPagingComponent,
        data: {
          title: 'General Setting Maintenance Paging'
        },
      },
      {
        path: 'GeneralSetting/detail',
        component: GeneralSettingAddEditComponent,
        data: {
          title: 'General Setting Maintenance Add Edit'
        },
      },
      {
        path: 'Currency/paging',
        component: CurrencyComponent,
        data: {
          title: 'Currency'
        },
      },
      {
        path: 'Currency/add',
        component: CurrencyAddComponent,
        data: {
          title: 'Currency add'
        },
      },
      {
        path: 'WorkingHour',
        component: WorkingHourPagingComponent,
        data: {
          title: 'Working Hour'
        },
      },
      {
        path: 'WorkingHour/add',
        component: WorkingHourHDetailComponent,
        data: {
          title: 'Working Hour Add Edit'
        },
      },
      {
        path: 'WorkingHour/detail',
        component: WorkingHourDDetailComponent,
        data: {
          title: 'Working Hour Detail'
        },
      },
      {
        path: 'Holiday',
        component: HolidayPagingComponent,
        data: {
          title: 'Holiday'
        },
      },
      {
        path: 'Holiday/add',
        component: HolidayAddComponent,
        data: {
          title: 'Holiday Add'
        },
      },
      {
        path: 'Holiday/edit',
        component: HolidayAddComponent,
        data: {
          title: 'Holiday Edit'
        },
      },
      {
        path: 'Holiday/detail',
        component: HolidayDetailComponent,
        data: {
          title: 'Holiday Detail'
        },
      },
      {
        path: 'Holiday/detail/add',
        component: HolidayDetailAddComponent,
        data: {
          title: 'Holiday Detail Add'
        },
      },
      {
        path: 'Holiday/detail/edit',
        component: HolidayDetailAddComponent,
        data: {
          title: 'Holiday Detail Edit'
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
        path: 'EconomicSector/paging',
        component: EconomicSectorComponent,
        data: {
          title: 'Economic Sector Paging'
        },
      },
      {
        path: 'EconomicSector/detail',
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
      {
        path: 'RefStatus/paging',
        component: RefStatusPagingComponent,
        data: {
          title: 'Ref Status Paging'
        }
      },
      {
        path: 'Profession/paging',
        component: ProfessionComponent,
        data: {
          title: 'Profession Paging'
        },
      },
      {
        path: 'Profession/detail',
        component: ProfessionAddEditComponent,
        data: {
          title: 'Profession Add Edit'
        },
      },
      {
        path: 'IndustryType/paging',
        component: RefIndustryTypeComponent,
        data: {
          title: 'Industry Type Paging'
        },
      },
      {
        path: 'IndustryType/detail',
        component: RefIndustryTypeDetailComponent,
        data: {
          title: 'Industry Type Detail'
        },
      },
      {
        path: 'Bank/paging',
        component: BankComponent,
        data: {
          title: 'Bank Paging'
        },
      },
      {
        path: 'Bank/detail',
        component: BankAddComponent,
        data: {
          title: 'Bank Detail'
        },
      },
      {
        path: 'Zipcode/paging',
        component: ZipcodeComponent,
        data: {
          title: 'Zipcode Paging'
        },
      },
      {
        path: 'Zipcode/detail',
        component: ZipcodeAddComponent,
        data: {
          title: 'Zipcode Detail'
        },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommonSettingRoutingModule { }
