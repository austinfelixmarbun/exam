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
import { HolidayDetailEditComponent } from './holiday-scheme/holiday-detail-edit/holiday-detail-edit.component';
import { ScoreCategoryPagingComponent } from './score-category/score-category-paging/score-category-paging';
import { ScoreCategoryTypeComponent } from './score-category/score-category-type/score-category-type.component';
import { ScoreCategoryScoringComponent } from './score-category/score-category-scoring/score-category-scoring.component';
import { ReasonComponent } from './reason/reason-paging/reason.component';
import { ReasonAddEditComponent } from './reason/reason-add-edit/reason-add-edit.component';
import { AppSourcePagingComponent } from './app-source/app-source-paging/app-source-paging.component';
import { AppSourceAddEditComponent } from './app-source/app-source-add-edit/app-source-add-edit.component';
import { AppSourceOfficeMemberPagingComponent } from './app-source/app-source-office-member/app-source-office-member-paging/app-source-office-member-paging.component';
import { AppSourceOfficeMemberAddComponent } from './app-source/app-source-office-member/app-source-office-member-add/app-source-office-member-add.component';
import { PaymentAllocPagingComponent } from './payment-alloc/payment-alloc-paging/payment-alloc-paging.component';
import { PaymentAllocDetailComponent } from './payment-alloc/payment-alloc-detail/payment-alloc-detail.component';
import { PaymentAllocGroupPagingComponent } from './payment-alloc-group/payment-alloc-group-paging/payment-alloc-group-paging.component';
import { PaymentAllocGroupDetailComponent } from './payment-alloc-group/payment-alloc-group-detail/payment-alloc-group-detail.component';
import { CoaPagingComponent } from './coa/coa-paging/coa-paging.component';
import { CoaDetailComponent } from './coa/coa-detail/coa-detail.component';
import { CoaEditDetailComponent } from './coa/coa-edit-detail/coa-edit-detail.component';
import { CoaSchemePagingComponent } from './coa-scheme/coa-scheme-paging/coa-scheme-paging.component';
import { CoaSchemeDetailComponent } from './coa-scheme/coa-scheme-detail/coa-scheme-detail.component';
import { CoaSchemeViewComponent } from './coa-scheme/coa-scheme-view/coa-scheme-view.component';

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
        path: 'MasterType/Detail',
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
        path: 'Master/Detail',
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
        path: 'GeneralSetting/Detail',
        component: GeneralSettingAddEditComponent,
        data: {
          title: 'General Setting Maintenance Add Edit'
        },
      },
      {
        path: 'Currency/Paging',
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
        path: 'WorkingHour/Detail',
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
        path: 'Holiday/Add',
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
        path: 'Holiday/Detail',
        component: HolidayDetailComponent,
        data: {
          title: 'Holiday Detail'
        },
      },
      {
        path: 'Holiday/Detail/Add',
        component: HolidayDetailAddComponent,
        data: {
          title: 'Holiday Detail Add'
        },
      },
      {
        path: 'Holiday/Detail/Edit',
        component: HolidayDetailEditComponent,
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
        path: 'officeZipcodeMember/Paging',
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
        path: 'EconomicSector/Paging',
        component: EconomicSectorComponent,
        data: {
          title: 'Economic Sector Paging'
        },
      },
      {
        path: 'EconomicSector/Detail',
        component: EconomicSectorAddEditComponent,
        data: {
          title: 'Economic Sector Add Edit'
        },
      },
      {
        path: 'RefProvince/Paging',
        component: ProvinceComponent,
        data: {
          title: 'Province Paging'
        },
      },
      {
        path: 'RefProvince/Detail',
        component: ProvinceAddEditComponent,
        data: {
          title: 'Province Add Edit'
        },
      },
      {
        path: 'District/Paging',
        component: DistrictComponent,
        data: {
          title: 'District Paging'
        },
      },
      {
        path: 'District/Detail',
        component: DistrictAddEditComponent,
        data: {
          title: 'District Add Edit'
        },
      },
      {
        path: 'RefStatus/Paging',
        component: RefStatusPagingComponent,
        data: {
          title: 'Ref Status Paging'
        }
      },
      {
        path: 'Profession/Paging',
        component: ProfessionComponent,
        data: {
          title: 'Profession Paging'
        },
      },
      {
        path: 'Profession/Detail',
        component: ProfessionAddEditComponent,
        data: {
          title: 'Profession Add Edit'
        },
      },
      {
        path: 'IndustryType/Paging',
        component: RefIndustryTypeComponent,
        data: {
          title: 'Industry Type Paging'
        },
      },
      {
        path: 'IndustryType/Detail',
        component: RefIndustryTypeDetailComponent,
        data: {
          title: 'Industry Type Detail'
        },
      },
      {
        path: 'Bank/Paging',
        component: BankComponent,
        data: {
          title: 'Bank Paging'
        },
      },
      {
        path: 'Bank/Detail',
        component: BankAddComponent,
        data: {
          title: 'Bank Detail'
        },
      },
      {
        path: 'Zipcode/Paging',
        component: ZipcodeComponent,
        data: {
          title: 'Zipcode Paging'
        },
      },
      {
        path: 'Zipcode/Detail',
        component: ZipcodeAddComponent,
        data: {
          title: 'Zipcode Detail'
        },
      },
      {
        path: 'ScoreCategory/Paging',
        component: ScoreCategoryPagingComponent,
        data: {
          title: 'Score Category Paging'
        },
      },
      {
        path: 'ScoreCategory/Type',
        component: ScoreCategoryTypeComponent,
        data: {
          title: 'Score Category Type'
        },
      },
      {
        path: 'ScoreCategory/Score',
        component: ScoreCategoryScoringComponent,
        data: {
          title: 'Score Category Scoring'
        },
      },
      {
        path: 'Reason/Paging',
        component: ReasonComponent,
        data: {
          title: 'Reason Paging'
        },
      },
      {
        path: 'Reason/Detail',
        component: ReasonAddEditComponent,
        data: {
          title: 'Reason Paging'
        },
      },
      {
        path: 'AppSource/Paging',
        component: AppSourcePagingComponent,
        data: {
          title: 'Application Source Paging'
        },
      },
      {
        path: 'AppSource/Detail',
        component: AppSourceAddEditComponent,
        data: {
          title: 'Application Source Add Edit'
        },
      },
      {
        path: 'AppSource/OfficeMember/Paging',
        component: AppSourceOfficeMemberPagingComponent,
        data: {
          title: 'Application Source Office Member Paging'
        },
      },
      {
        path: 'AppSource/OfficeMember/Add',
        component: AppSourceOfficeMemberAddComponent,
        data: {
          title: 'Application Source Office Member Add'
        },
      },
      
      // PAYMENT ALLOCATION
      {
        path: 'paymentalloc/paging',
        component: PaymentAllocPagingComponent,
        data: {
          title: 'Payment Allocation'
        },
      },
      {
        path: 'paymentalloc/detail',
        component: PaymentAllocDetailComponent,
        data: {
          title: 'Payment Allocation'
        },
      },

      // PAYMENT ALLOCATION GROUP
      {
        path: 'paymentallocgrp/paging',
        component: PaymentAllocGroupPagingComponent,
        data: {
          title: 'Payment Allocation Group'
        },
      },
      {
        path: 'paymentallocgrp/detail',
        component: PaymentAllocGroupDetailComponent,
        data: {
          title: 'Payment Allocation Group'
        },
      },

      // COA
      {
        path: 'coa/paging',
        component: CoaPagingComponent,
        data: {
          title: 'COA'
        },
      },
      {
        path: 'coa/detail',
        component: CoaDetailComponent,
        data: {
          title: 'COA'
        },
      },
      {
        path: 'coa/detail/edit',
        component: CoaEditDetailComponent,
        data: {
          title: 'COA'
        },
      },
      
      //COA Scheme
      {
        path: 'coascheme/paging',
        component: CoaSchemePagingComponent,
        data: {
          title: 'COA Scheme'
        },
      },
      {
        path: 'coascheme/detail',
        component: CoaSchemeDetailComponent,
        data: {
          title: 'COA Scheme'
        },
      },
      {
        path: 'coascheme/view',
        component: CoaSchemeViewComponent,
        data: {
          title: 'COA Scheme'
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
