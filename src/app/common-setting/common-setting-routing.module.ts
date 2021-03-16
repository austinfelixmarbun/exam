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
import { PathConstant } from 'app/shared/PathConstant';
import { OfficeBankAccountAccDetailComponent } from './office-bank-account/office-bank-account-acc-detail/office-bank-account-acc-detail.component';
import { OfficeBankAccountDetailComponent } from './office-bank-account/office-bank-account-detail/office-bank-account-detail.component';
import { OfficeBankAccountPagingComponent } from './office-bank-account/office-bank-account-paging/office-bank-account-paging.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: PathConstant.CS_MASTER_TYPE,
        component: MasterTypePagingComponent,
        data: {
          title: 'Master Type Maintenance Paging'
        },
      },
      {
        path: PathConstant.CS_MASTER_TYPE_DETAIL,
        component: MasterTypeAddEditComponent,
        data: {
          title: 'Master Type Maintenance Add Edit'
        },
      },
      {
        path: PathConstant.CS_MASTER,
        component: MasterPagingComponent,
        data: {
          title: 'Master Maintenance Paging'
        },
      },
      {
        path: PathConstant.CS_MASTER_DETAIL,
        component: MasterAddEditComponent,
        data: {
          title: 'Master Maintenance Add Edit'
        },
      },
      {
        path: PathConstant.CS_GEN_SETTING,
        component: GeneralSettingPagingComponent,
        data: {
          title: 'General Setting Maintenance Paging'
        },
      },
      {
        path: PathConstant.CS_GEN_SETTING_DETAIL,
        component: GeneralSettingAddEditComponent,
        data: {
          title: 'General Setting Maintenance Add Edit'
        },
      },
      {
        path: PathConstant.CS_CURRENCY_PAGING,
        component: CurrencyComponent,
        data: {
          title: 'Currency'
        },
      },
      {
        path: PathConstant.CS_CURRENCY_ADD,
        component: CurrencyAddComponent,
        data: {
          title: 'Currency add'
        },
      },
      {
        path: PathConstant.CS_WORKING_HOUR,
        component: WorkingHourPagingComponent,
        data: {
          title: 'Working Hour'
        },
      },
      {
        path: PathConstant.CS_WORKING_HOUR_ADD,
        component: WorkingHourHDetailComponent,
        data: {
          title: 'Working Hour Add Edit'
        },
      },
      {
        path: PathConstant.CS_WORKING_HOUR_DETAIL,
        component: WorkingHourDDetailComponent,
        data: {
          title: 'Working Hour Detail'
        },
      },
      {
        path: PathConstant.CS_HOLIDAY,
        component: HolidayPagingComponent,
        data: {
          title: 'Holiday'
        },
      },
      {
        path: PathConstant.CS_HOLIDAY_ADD,
        component: HolidayAddComponent,
        data: {
          title: 'Holiday Add'
        },
      },
      {
        path: PathConstant.CS_HOLIDAY_EDIT,
        component: HolidayAddComponent,
        data: {
          title: 'Holiday Edit'
        },
      },
      {
        path: PathConstant.CS_HOLIDAY_DETAIL,
        component: HolidayDetailComponent,
        data: {
          title: 'Holiday Detail'
        },
      },
      {
        path: PathConstant.CS_HOLIDAY_DETAIL_ADD,
        component: HolidayDetailAddComponent,
        data: {
          title: 'Holiday Detail Add'
        },
      },
      {
        path: PathConstant.CS_HOLIDAY_DETAIL_EDIT,
        component: HolidayDetailEditComponent,
        data: {
          title: 'Holiday Detail Edit'
        },
      },
      {
        path: PathConstant.CS_OFFICE_ZIPCODE_MBR,
        component: OfficeZipcodeMemberComponent,
        data: {
          title: 'office Zipcode Member'
        },
      },
      {
        path: PathConstant.CS_OFFICE_ZIPCODE_MBR_PAGING,
        component: OfficeZipcodeMemberPagingComponent,
        data: {
          title: 'office Zipcode Member Paging'
        },
      },
      {
        path: PathConstant.CS_OFFICE_ZIPCODE_MBR_ADD,
        component: OfficeZipcodeMemberAddComponent,
        data: {
          title: 'office Zipcode Member Add'
        },
      },
      {
        path: PathConstant.CS_ECONOMIC_SECTOR_PAGING,
        component: EconomicSectorComponent,
        data: {
          title: 'Economic Sector Paging'
        },
      },
      {
        path: PathConstant.CS_ECONOMIC_SECTOR_DETAIL,
        component: EconomicSectorAddEditComponent,
        data: {
          title: 'Economic Sector Add Edit'
        },
      },
      {
        path: PathConstant.CS_REF_PROVINCE_PAGING,
        component: ProvinceComponent,
        data: {
          title: 'Province Paging'
        },
      },
      {
        path: PathConstant.CS_REF_PROVINCE_DETAIL,
        component: ProvinceAddEditComponent,
        data: {
          title: 'Province Add Edit'
        },
      },
      {
        path: PathConstant.CS_DISTRICT_PAGING,
        component: DistrictComponent,
        data: {
          title: 'District Paging'
        },
      },
      {
        path: PathConstant.CS_DISTRICT_DETAIL,
        component: DistrictAddEditComponent,
        data: {
          title: 'District Add Edit'
        },
      },
      {
        path: PathConstant.CS_REF_STATUS_PAGING,
        component: RefStatusPagingComponent,
        data: {
          title: 'Ref Status Paging'
        }
      },
      {
        path: PathConstant.CS_PROFESSION_PAGING,
        component: ProfessionComponent,
        data: {
          title: 'Profession Paging'
        },
      },
      {
        path: PathConstant.CS_PROFESSION_DETAIL,
        component: ProfessionAddEditComponent,
        data: {
          title: 'Profession Add Edit'
        },
      },
      {
        path: PathConstant.CS_INDUSTRY_TYPE_PAGING,
        component: RefIndustryTypeComponent,
        data: {
          title: 'Industry Type Paging'
        },
      },
      {
        path: PathConstant.CS_INDUSTRY_TYPE_DETAIL,
        component: RefIndustryTypeDetailComponent,
        data: {
          title: 'Industry Type Detail'
        },
      },
      {
        path: PathConstant.CS_BANK_PAGING,
        component: BankComponent,
        data: {
          title: 'Bank Paging'
        },
      },
      {
        path: PathConstant.CS_BANK_DETAIL,
        component: BankAddComponent,
        data: {
          title: 'Bank Detail'
        },
      },
      {
        path: PathConstant.CS_ZIPCODE_PAGING,
        component: ZipcodeComponent,
        data: {
          title: 'Zipcode Paging'
        },
      },
      {
        path: PathConstant.CS_ZIPCODE_DETAIL,
        component: ZipcodeAddComponent,
        data: {
          title: 'Zipcode Detail'
        },
      },
      {
        path: PathConstant.CS_SCORE_CATEGORY_PAGING,
        component: ScoreCategoryPagingComponent,
        data: {
          title: 'Score Category Paging'
        },
      },
      {
        path: PathConstant.CS_SCORE_CATEGORY_TYPE,
        component: ScoreCategoryTypeComponent,
        data: {
          title: 'Score Category Type'
        },
      },
      {
        path: PathConstant.CS_SCORE_CATEGORY_SCORE,
        component: ScoreCategoryScoringComponent,
        data: {
          title: 'Score Category Scoring'
        },
      },
      {
        path: PathConstant.CS_REASON_PAGING,
        component: ReasonComponent,
        data: {
          title: 'Reason Paging'
        },
      },
      {
        path: PathConstant.CS_REASON_DETAIL,
        component: ReasonAddEditComponent,
        data: {
          title: 'Reason Paging'
        },
      },
      
      // Office Bank Account
      { path: 'officebankacc/paging', component: OfficeBankAccountPagingComponent, data: { title: 'OFFICE BANK ACCOUNT' } },
      { path: 'officebankacc/detail', component: OfficeBankAccountDetailComponent, data: { title: 'OFFICE BANK ACCOUNT' } },
      { path: 'officebankacc/accdetail', component: OfficeBankAccountAccDetailComponent, data: { title: 'OFFICE BANK ACCOUNT' } },

      // PAYMENT ALLOCATION
      {
        path: PathConstant.CS_PAYMENT_ALLOC_PAGING,
        component: PaymentAllocPagingComponent,
        data: {
          title: 'Payment Allocation'
        },
      },
      {
        path: PathConstant.CS_PAYMENT_ALLOC_DETAIL,
        component: PaymentAllocDetailComponent,
        data: {
          title: 'Payment Allocation'
        },
      },

      // PAYMENT ALLOCATION GROUP
      {
        path: PathConstant.CS_PAYMENT_ALLOC_GRP_PAGING,
        component: PaymentAllocGroupPagingComponent,
        data: {
          title: 'Payment Allocation Group'
        },
      },
      {
        path: PathConstant.CS_PAYMENT_ALLOC_GRP_DETAIL,
        component: PaymentAllocGroupDetailComponent,
        data: {
          title: 'Payment Allocation Group'
        },
      },

      // COA
      {
        path: PathConstant.CS_COA_PAGING,
        component: CoaPagingComponent,
        data: {
          title: 'COA'
        },
      },
      {
        path: PathConstant.CS_COA_DETAIL,
        component: CoaDetailComponent,
        data: {
          title: 'COA'
        },
      },
      {
        path: PathConstant.CS_COA_DETAIL_EDIT,
        component: CoaEditDetailComponent,
        data: {
          title: 'COA'
        },
      },
      
      //COA Scheme
      {
        path: PathConstant.CS_COA_SCHM_PAGING,
        component: CoaSchemePagingComponent,
        data: {
          title: 'COA Scheme'
        },
      },
      {
        path: PathConstant.CS_COA_SCHM_DETAIL,
        component: CoaSchemeDetailComponent,
        data: {
          title: 'COA Scheme'
        },
      },
      {
        path: PathConstant.CS_COA_SCHM_VIEW,
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
