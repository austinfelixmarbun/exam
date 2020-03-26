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
 
const routes: Routes = [
  {
    path: '',
    children: [

      {
        path: 'Paging',
        component: CustomerPagingComponent,
        data: {
          title: 'Customer Paging'
        }
      }, {
        path: 'CustomerPersonal/MainInfo',
        component: CustomerPersonalMainInfoComponent,
        data: {
          title: 'Customer Personal Main Info'
        }
      }, 
      {
        path: 'CustomerPersonal/DuplicateCheck',
        component: CustomerPersonalDuplicateCheckComponent,
        data: {
          title: 'Customer Personal Duplicate Check'
        }
      },
      {
        path: 'CustomerCompany/MainInfo',
        component: CustomerCompanyMainInfoComponent,
        data: {
          title: 'Customer Company Main Info'
        }
      },
      {
        path: 'CustomerCompany/DuplicateCheck',
        component: CustomerCompanyDuplicateCheckComponent,
        data: {
          title: 'Customer Company DuplicateCheck  '
        }
      },
      {
        path: 'NegativeCustomer/Paging',
        component: NegativeCustomerComponent,
        data: {
          title: 'Negative Customer Paging'
        }
      },
      {
        path: 'NegativeCustomer/Detail',
        component: NegativeCustomerDetailComponent,
        data: {
          title: 'Negative Customer Detail'
        }
      },
      {
        path: 'NegativeCustomer/View',
        component: NegativeCustomerViewComponent,
        data: {
          title: 'Negative Customer View'
        }
      },
      {
        path: 'CustomerPersonal/Page',
        component: CustomerPersonalPageComponent,
        data: {
          title: 'Customer Personal DuplicateCheck  '
        }
      },
      {
        path: 'CustomerView/Page',
        component: CustomerViewComponent,
        data: {
          title: 'Customer View Component'
        }
      },
      {
        path: 'CustomerPersonal/Address',
        component: CustomerPersonalAddressComponent,
        data: {
          title: 'Customer Personal Address'
        }
      },
      {
        path: 'CustomerPersonal/Address/Form',
        component: CustomerPersonalAddressAddComponent,
        data: {
          title: 'Customer Personal Address Add Edit'
        }
      },
      {
        path: 'CustomerCompany/Address',
        component: CustomerCompanyAddressComponent,
        data: {
          title: 'Customer Company Address'
        }
      },
      {
        path: 'CustomerCompany/Address/Form',
        component: CustomerCompanyAddressAddComponent,
        data: {
          title: 'Customer Company Address Add Edit'
        }
      },
      {
        path: 'CustomerPersonal/JobData',
        component: CustomerPersonalJobDataComponent,
        data: {
          title: 'Customer Personal Job Data'
        }
      },
      {
        path: 'CustomerPersonal/JobData/NonPro',
        component: JobDataNonProfessionalComponent,
        data: {
          title: 'Customer Personal Job Data'
        }
      },
      {
        path: 'CustomerCompany/Page',
        component: CustomerCompanyPageComponent,
        data: {
          title: 'Customer Company Page'
        }
      },  
      {
        path: 'EditMainData/Paging',
        component: EditMainDataPagingComponent,
        data: {
          title: 'Edit Main Data Page'
        }
      },   
      {
        path: 'EditMainData/Personal',
        component: EditMainDataPersonalComponent,
        data: {
          title: 'Edit Main Data Personal Page'
        }
      },  
      {
        path: 'EditMainData/Company',
        component: EditMainDataCompanyComponent,
        data: {
          title: 'Edit Main Data Company Page'
        }
      }, 
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule { }
