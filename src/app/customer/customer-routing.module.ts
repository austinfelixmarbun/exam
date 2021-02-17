import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { CustomerComponent } from 'app/customer/customer.component';
import { NegativeCustomerComponent } from './negative-customer/negative-customer.component';
import { NegativeCustomerDetailComponent } from './negative-customer/negative-customer-detail/negative-customer-detail.component';
import { CustomerPagingComponent } from './customer-paging/customer-paging.component';
import { CustomerPersonalMainInfoComponent } from './customer-personal/customer-personal-main-info/customer-personal-main-info.component';
import { CustomerPersonalDuplicateCheckComponent } from './customer-personal/customer-personal-duplicate-check/customer-personal-duplicate-check.component';
import { CustomerCompanyMainInfoComponent } from './customer-company/customer-company-main-info/customer-company-main-info.component';
import { CustomerCompanyDuplicateCheckComponent } from './customer-company/customer-company-duplicate-check/customer-company-duplicate-check.component';
import { CustomerPersonalPageComponent } from './customer-personal/customer-personal-page/customer-personal-page.component';
import { NegativeCustomerViewComponent } from './negative-customer/negative-customer-view/negative-customer-view.component';
import { CustomerPersonalAddressComponent } from './customer-personal/customer-personal-address/customer-personal-address.component';
import { CustomerPersonalAddressAddComponent } from './customer-personal/customer-personal-address/customer-personal-address-add/customer-personal-address-add.component';
import { CustomerCompanyAddressComponent } from './customer-company/customer-company-address/customer-company-address.component';
import { CustomerCompanyAddressAddComponent } from './customer-company/customer-company-address/customer-company-address-add/customer-company-address-add.component';
import { CustomerPersonalJobDataComponent } from './customer-personal/customer-personal-job-data/customer-personal-job-data.component';
import { JobDataNonProfessionalComponent } from './customer-personal/customer-personal-job-data/job-data-non-professional/job-data-non-professional.component';
import { CustomerViewComponent } from './customer-view/customer-view.component';
import { CustomerCompanyPageComponent } from './customer-company/customer-company-page/customer-company-page.component';
import { EditMainDataPagingComponent } from './edit-main-data/edit-main-data-paging/edit-main-data-paging.component';
import { EditMainDataPersonalComponent } from './edit-main-data/edit-main-data-personal/edit-main-data-personal.component';
import { EditMainDataCompanyComponent } from './edit-main-data/edit-main-data-company/edit-main-data-company.component';
import { UploadNegativeCustomerComponent } from './negative-customer/upload-negative-customer/upload-negative-customer.component';
import { ReviewUploadNegativeCustomerPagingComponent } from './negative-customer/review-upload-negative-customer/review-upload-negative-customer-paging/review-upload-negative-customer-paging.component';
import { ReviewUploadNegativeCustomerDetailComponent } from './negative-customer/review-upload-negative-customer/review-upload-negative-customer-detail/review-upload-negative-customer-detail.component';
import { CustomerFamilyMenuComponent } from './customer-family-menu/customer-family-menu.component';
import { CustomerShareholderMenuComponent } from './customer-shareholder-menu/customer-shareholder-menu.component';
import { CustomerGuarantorMenuComponent } from './customer-guarantor-menu/customer-guarantor-menu.component';
import { CustomerUpdateMasterComponent } from './customer-update-master/customer-update-master.component';
import { CustomerUpdateMasterDetailComponent } from './customer-update-master/customer-update-master-detail/customer-update-master-detail.component';
import { PathConstant } from 'app/shared/PathConstant';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: PathConstant.PAGING,
        component: CustomerPagingComponent,
        data: {
          title: 'Customer Paging'
        }
      }, {
        path: PathConstant.CUST_PERSONAL_MAIN_INFO,
        component: CustomerPersonalMainInfoComponent,
        data: {
          title: 'Customer Personal Main Info'
        }
      },
      {
        path: PathConstant.CUST_PERSONAL_DUP_CHECK,
        component: CustomerPersonalDuplicateCheckComponent,
        data: {
          title: 'Customer Personal Duplicate Check'
        }
      },
      {
        path: PathConstant.CUST_COY_MAIN_INFO,
        component: CustomerCompanyMainInfoComponent,
        data: {
          title: 'Customer Company Main Info'
        }
      },
      {
        path: PathConstant.CUST_COY_DUP_CHECK,
        component: CustomerCompanyDuplicateCheckComponent,
        data: {
          title: 'Customer Company DuplicateCheck  '
        }
      },
      {
        path: PathConstant.CUST_NEG_PAGING,
        component: NegativeCustomerComponent,
        data: {
          title: 'Negative Customer Paging'
        }
      },
      {
        path: PathConstant.CUST_NEG_DETAIL,
        component: NegativeCustomerDetailComponent,
        data: {
          title: 'Negative Customer Detail'
        }
      },
      {
        path: PathConstant.CUST_NEG_VIEW,
        component: NegativeCustomerViewComponent,
        data: {
          title: 'Negative Customer View'
        }
      },
      {
        path: PathConstant.CUST_NEG_UPLOAD,
        component: UploadNegativeCustomerComponent,
        data: {
          title: 'Upload Negative Customer'
        }
      },
      {
        path: PathConstant.CUST_NEG_RVW_UPLOAD_PAGING,
        component: ReviewUploadNegativeCustomerPagingComponent,
        data: {
          title: 'Review Upload Negative Customer Paging'
        }
      },
      {
        path: PathConstant.CUST_NEG_RVW_UPLOAD_DETAIL,
        component: ReviewUploadNegativeCustomerDetailComponent,
        data: {
          title: 'Review Upload Negative Customer Detail'
        }
      },

      {
        path: PathConstant.CUST_PERSONAL_PAGE,
        component: CustomerPersonalPageComponent,
        data: {
          title: 'Customer Personal DuplicateCheck  '
        }
      },
      {
        path: PathConstant.CUST_VIEW_PAGE,
        component: CustomerViewComponent,
        data: {
          title: 'Customer View Component'
        }
      },
      {
        path: PathConstant.CUST_PERSONAL_ADDR,
        component: CustomerPersonalAddressComponent,
        data: {
          title: 'Customer Personal Address'
        }
      },
      {
        path: PathConstant.CUST_PERSONAL_ADDR_FORM,
        component: CustomerPersonalAddressAddComponent,
        data: {
          title: 'Customer Personal Address Add Edit'
        }
      },
      {
        path: PathConstant.CUST_COY_ADDR,
        component: CustomerCompanyAddressComponent,
        data: {
          title: 'Customer Company Address'
        }
      },
      {
        path: PathConstant.CUST_COY_ADDR_FORM,
        component: CustomerCompanyAddressAddComponent,
        data: {
          title: 'Customer Company Address Add Edit'
        }
      },
      {
        path: PathConstant.CUST_PERSONAL_JOB_DATA,
        component: CustomerPersonalJobDataComponent,
        data: {
          title: 'Customer Personal Job Data'
        }
      },
      {
        path: PathConstant.CUST_PERSONAL_JOB_DATA_NON_PRO,
        component: JobDataNonProfessionalComponent,
        data: {
          title: 'Customer Personal Job Data'
        }
      },
      {
        path: PathConstant.CUST_COY_PAGE,
        component: CustomerCompanyPageComponent,
        data: {
          title: 'Customer Company Page'
        }
      },
      {
        path: PathConstant.CUST_EDIT_MAIN_DATA_PAGING,
        component: EditMainDataPagingComponent,
        data: {
          title: 'Edit Main Data Page'
        }
      },
      {
        path: PathConstant.CUST_EDIT_MAIN_DATA_PERSONAL,
        component: EditMainDataPersonalComponent,
        data: {
          title: 'Edit Main Data Personal Page'
        }
      },
      {
        path: PathConstant.CUST_EDIT_MAIN_DATA_COY,
        component: EditMainDataCompanyComponent,
        data: {
          title: 'Edit Main Data Company Page'
        }
      },
      {
        path: PathConstant.CUST_FAMILY_PAGING,
        component: CustomerFamilyMenuComponent,
        data: {
          title: 'Customer Family'
        }
      },
      {
        path: PathConstant.CUST_SHRHLDR_PAGING,
        component: CustomerShareholderMenuComponent,
        data: {
          title: 'Customer Shareholder'
        }
      },
      {
        path: PathConstant.CUST_GUARANTOR_PAGING,
        component: CustomerGuarantorMenuComponent,
        data: {
          title: 'CustomerGuarantor'
        }
      },
      {
        path: PathConstant.CUST_UPDATE_DATA_PAGING,
        component: CustomerUpdateMasterComponent,
        data: {
          title: 'Update Data Customer'
        }
      },
      {
        path: PathConstant.CUST_UPDATE_DATA_DETAIL,
        component: CustomerUpdateMasterDetailComponent,
        data: {
          title: 'Update Data Customer Detail'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule { }
