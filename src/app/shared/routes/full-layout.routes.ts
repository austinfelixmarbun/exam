import { Routes, RouterModule } from '@angular/router';

//Route for content layout with sidebar, navbar and footer.

export const Full_ROUTES: Routes = [
  {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  },
   {
    path: 'forms',
    loadChildren: './forms/forms.module#FormModule'
  },
  {
    path: 'components',
    loadChildren: './components/ui-components.module#UIComponentsModule'
  },
  {
    path: 'Office',
    loadChildren: './office/office.module#OfficeModule'
  },
  {
    path: 'Employee',
    loadChildren: './employee/employee.module#EmployeeModule'
  },
  {
    path : 'Organization',
    loadChildren: './organization/organization.module#OrganizationModule'
  },
  {
    path: 'Customer',
    loadChildren: './customer/customer.module#CustomerModule'
  },
  {
    path: 'zipcode',
    loadChildren: './zipcode/zipcode.module#ZipcodeModule'
  },
  {
    path: 'SystemSetting',
    loadChildren: './system-setting/system-setting.module#SystemSettingModule'
  },
  {
    path: 'company',
    loadChildren: './company/company.module#CompanyModule'
  },
  {
    path: 'CommonSetting',
    loadChildren: './common-setting/common-setting.module#CommonSettingModule'
  },
  {
    path: 'menuSetting',
    loadChildren: './menu/menu-setting.module#MenuSettingModule'
  },
  {
    path: 'notification',
    loadChildren: './notification/notification.module#NotificationModule'
  },
  {
    path: 'pages',
    loadChildren: './pages/full-pages/full-pages.module#FullPagesModule'
  },
  {
    path: 'upload',
    loadChildren: './upload/upload.module#UploadModule'
  },
  {
    path: 'test',
    loadChildren: './test/test.module#TestModule'
  },
  {
    path: 'testNew',
    loadChildren: './test-new/testNew.module#TestNewModule'
  }, 
  {
    path: 'Asset',
    loadChildren: './asset/asset.module#AssetModule'
  },
  {
    path: 'Product',
    loadChildren: './product/product.module#ProductModule'
  }
  
];
