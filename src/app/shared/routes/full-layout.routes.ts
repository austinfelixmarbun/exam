import { Routes, RouterModule } from '@angular/router';
import { PathConstant } from '../PathConstant';

//Route for content layout with sidebar, navbar and footer.

export const Full_ROUTES: Routes = [
  {
    path: PathConstant.LR_DASHBOARD,
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  },
   {
    path: PathConstant.LR_FORMS,
    loadChildren: './forms/forms.module#FormModule'
  },
  {
    path: PathConstant.LR_COMPNT,
    loadChildren: './components/ui-components.module#UIComponentsModule'
  },
  {
    path: PathConstant.LR_OFFICE,
    loadChildren: './office/office.module#OfficeModule'
  },
  {
    path: PathConstant.LR_EMP,
    loadChildren: './employee/employee.module#EmployeeModule'
  },
  {
    path : PathConstant.LR_ORG,
    loadChildren: './organization/organization.module#OrganizationModule'
  },
  {
    path: PathConstant.LR_CUST,
    loadChildren: './customer/customer.module#CustomerModule'
  },
  {
    path: PathConstant.LR_SYSTEM_SETTING,
    loadChildren: './system-setting/system-setting.module#SystemSettingModule'
  },
  {
    path: PathConstant.LR_COY,
    loadChildren: './company/company.module#CompanyModule'
  },
  {
    path: PathConstant.LR_COMMON_SETTING,
    loadChildren: './common-setting/common-setting.module#CommonSettingModule'
  },
  {
    path: PathConstant.LR_NOTIF,
    loadChildren: './notification/notification.module#NotificationModule'
  },
  {
    path: PathConstant.LR_PAGES,
    loadChildren: './pages/full-pages/full-pages.module#FullPagesModule'
  },
  {
    path: PathConstant.LR_UPLOAD,
    loadChildren: './upload/upload.module#UploadModule'
  },
  {
    path: PathConstant.LR_ASSET,
    loadChildren: './asset/asset.module#AssetModule'
  }, 
  {
    path: PathConstant.LR_VENDOR,
    loadChildren: './vendor/vendor.module#VendorModule'
  },
  {
    path: PathConstant.LR_VERIF,
    loadChildren: './verification/verification.module#VerificationModule'
  },
  {
    path: PathConstant.LR_PRODUCT,
    loadChildren: './product/product.module#ProductModule'
  },
  {
    path: PathConstant.LR_APPRV_SCRN,
    loadChildren: './approval-screen/approval-screen.module#ApprovalScreenModule'
  },
  {
    path: PathConstant.LR_ERROR,
    loadChildren: './error-page/error-page.module#ErrorPageModule'
  },
  {
    path: PathConstant.LR_SRVY,
    loadChildren: './survey/survey.module#SurveyModule'
  },
  {
    path: PathConstant.LR_INTEGRATION,
    loadChildren: './integration/integration.module#IntegrationModule'
  },
  {
    path: PathConstant.LR_DOC_MNGMNT,
    loadChildren: './document-management/document-management.module#DocumentManagementModule'
  },
  {
    path: PathConstant.LR_JOURNAL,
    loadChildren: './journal/journal.module#JournalModule'
  },
  {
    path: PathConstant.LR_FEE,
    loadChildren: './fee/fee.module#FeeModule'
  }
];
