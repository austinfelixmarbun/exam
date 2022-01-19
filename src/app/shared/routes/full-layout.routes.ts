import { Routes, RouterModule } from '@angular/router';
import { PathConstant } from '../PathConstant';

//Route for content layout with sidebar, navbar and footer.

export const Full_ROUTES: Routes = [
  {
    path: PathConstant.LR_DASHBOARD,
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
   {
    path: PathConstant.LR_FORMS,
    loadChildren: () => import('./forms/forms.module').then(m => m.FormModule)
  },
  {
    path: PathConstant.LR_COMPNT,
    loadChildren: () => import('./components/ui-components.module').then(m => m.UIComponentsModule)
  },
  {
    path: PathConstant.LR_OFFICE,
    loadChildren: () => import('./office/office.module').then(m => m.OfficeModule)
  },
  {
    path: PathConstant.LR_EMP,
    loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule)
  },
  {
    path : PathConstant.LR_ORG,
    loadChildren: () => import('./organization/organization.module').then(m => m.OrganizationModule)
  },
  {
    path: PathConstant.LR_CUST,
    loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule)
  },
  {
    path: PathConstant.LR_SYSTEM_SETTING,
    loadChildren: () => import('./system-setting/system-setting.module').then(m => m.SystemSettingModule)
  },
  {
    path: PathConstant.LR_COY,
    loadChildren: () => import('./company/company.module').then(m => m.CompanyModule)
  },
  {
    path: PathConstant.LR_COMMON_SETTING,
    loadChildren: () => import('./common-setting/common-setting.module').then(m => m.CommonSettingModule)
  },
  {
    path: PathConstant.LR_NOTIF,
    loadChildren: () => import('./notification/notification.module').then(m => m.NotificationModule)
  },
  {
    path: PathConstant.LR_PAGES,
    loadChildren: () => import('./pages/full-pages/full-pages.module').then(m => m.FullPagesModule)
  },
  {
    path: PathConstant.LR_UPLOAD,
    loadChildren: () => import('./upload/upload.module').then(m => m.UploadModule)
  },
  {
    path: PathConstant.LR_ASSET,
    loadChildren: () => import('./asset/asset.module').then(m => m.AssetModule)
  }, 
  {
    path: PathConstant.LR_VENDOR,
    loadChildren: () => import('./vendor/vendor.module').then(m => m.VendorModule)
  },
  {
    path: PathConstant.LR_VERIF,
    loadChildren: () => import('./verification/verification.module').then(m => m.VerificationModule)
  },
  {
    path: PathConstant.LR_APPRV_SCRN,
    loadChildren: () => import('./approval-screen/approval-screen.module').then(m => m.ApprovalScreenModule)
  },
  {
    path: PathConstant.LR_ERROR,
    loadChildren: () => import('./error-page/error-page.module').then(m => m.ErrorPageModule)
  },
  {
    path: PathConstant.LR_SRVY,
    loadChildren: () => import('./survey/survey.module').then(m => m.SurveyModule)
  },
  {
    path: PathConstant.LR_INTEGRATION,
    loadChildren: () => import('./integration/integration.module').then(m => m.IntegrationModule)
  },
  {
    path: PathConstant.LR_DOC_MNGMNT,
    loadChildren: () => import('./document-management/document-management.module').then(m => m.DocumentManagementModule)
  },
  {
    path: PathConstant.LR_JOURNAL,
    loadChildren: () => import('./journal/journal.module').then(m => m.JournalModule)
  },
  {
    path: PathConstant.LR_FEE,
    loadChildren: () => import('./fee/fee.module').then(m => m.FeeModule)
  },
  {
    path: PathConstant.LR_LICENSE,
    loadChildren: () => import('./license/license.module').then(m => m.LicenseModule)
  },
  {
    path: PathConstant.LR_SYS_USER,
    loadChildren: () => import('./system-user/./system-user.module').then(m => m.SystemUserModule)
  }
];
