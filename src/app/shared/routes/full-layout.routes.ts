import { Routes, RouterModule } from '@angular/router';
import { PathConstant } from '../PathConstant';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { environment } from 'environments/environment';
import e from 'express';
import { AdInsConstant } from '../AdInstConstant';
import * as _environment from "../../../assets/config/enviConfig.json";
import {UcTemplateComponent} from '@adins/uctemplate';

//Route for content layout with sidebar, navbar and footer.
const envi = _environment;
export const Full_ROUTES: Routes = [
  {
    path: 'BREAD/:page',
    component: UcTemplateComponent
  },
  {
    path: PathConstant.LR_DASHBOARD,
    loadChildren: () => import('app/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: PathConstant.LR_FORMS,
    loadChildren: () => import('app/forms/forms.module').then(m => m.FormModule)
  },
  {
    path: PathConstant.LR_COMPNT,
    loadChildren: () => import('app/components/ui-components.module').then(m => m.UIComponentsModule)
  },
  {
    path: PathConstant.LR_OFFICE,
    loadChildren: () => import('app/office/office.module').then(m => m.OfficeModule)
  },
  {
    path: PathConstant.LR_EMP,
    loadChildren: () => import('app/employee/employee.module').then(m => m.EmployeeModule)
  },
  {
    path: PathConstant.LR_ORG,
    loadChildren: () => import('app/organization/organization.module').then(m => m.OrganizationModule)
  },
  {
    path: PathConstant.LR_CUST,
    loadChildren: () => import('app/customer/customer.module').then(m => m.CustomerModule)
  },
  {
    path: PathConstant.LR_SYSTEM_SETTING,
    loadChildren: () => import('app/system-setting/system-setting.module').then(m => m.SystemSettingModule)
  },
  {
    path: PathConstant.LR_COMMON_SETTING,
    loadChildren: () => import('app/common-setting/common-setting.module').then(m => m.CommonSettingModule)
  },
  {
    path: PathConstant.LR_PAGES,
    loadChildren: () => import('app/pages/full-pages/full-pages.module').then(m => m.FullPagesModule)
  },
  {
    path: PathConstant.LR_UPLOAD,
    loadChildren: () => import('app/upload/upload.module').then(m => m.UploadModule)
  },
  {
    path: PathConstant.LR_ASSET,
    loadChildren: () => import('app/asset/asset.module').then(m => m.AssetModule)
  },
  {
    path: PathConstant.LR_VENDOR,
    loadChildren: () => import('app/vendor/vendor.module').then(m => m.VendorModule)
  },
  {
    path: PathConstant.LR_VERIF,
    loadChildren: () => import('app/verification/verification.module').then(m => m.VerificationModule)
  },
  {
    path: PathConstant.LR_ERROR,
    loadChildren: () => import('app/error-page/error-page.module').then(m => m.ErrorPageModule)
  },
  {
    path: PathConstant.LR_SRVY,
    loadChildren: () => import('app/survey/survey.module').then(m => m.SurveyModule)
  },
  {
    path: PathConstant.LR_INTEGRATION,
    loadChildren: () => import('app/integration/integration.module').then(m => m.IntegrationModule)
  },
  {
    path: PathConstant.LR_DOC_MNGMNT,
    loadChildren: () => import('app/document-management/document-management.module').then(m => m.DocumentManagementModule)
  },
  {
    path: PathConstant.LR_JOURNAL,
    loadChildren: () => import('app/journal/journal.module').then(m => m.JournalModule)
  },
  {
    path: PathConstant.LR_LICENSE,
    loadChildren: () => import('app/license/license.module').then(m => m.LicenseModule)
  },
  {
    path: PathConstant.LR_SYS_USER,
    loadChildren: () => import('app/system-user/system-user.module').then(m => m.SystemUserModule)
  },

  // dynamic import remote module
  //#region AR Module
  {
    path: 'agrmnt',
    loadChildren: () => {
      return loadRemoteModule({
          type: 'module',
          remoteEntry:  envi.arR3Web+'/remoteEntry.js',
          exposedModule: './AgrmntModule'
        })
        .then(m => m.AgreementModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  }
  //#endregion
];
