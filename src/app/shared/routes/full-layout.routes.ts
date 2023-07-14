import { Routes, RouterModule } from '@angular/router';
import { PathConstant } from '../PathConstant';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { environment } from 'environments/environment';
import e from 'express';
import { AdInsConstant } from '../AdInstConstant';
import * as _environment from "../../../assets/config/enviConfig.json";
import { UcTemplateComponent } from '@adins/uctemplate';

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
        remoteEntry: envi.arR3Web + '/remoteEntry.js',
        exposedModule: './AgrmntModule'
      })
        .then(m => m.AgreementModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'lmsscheme',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: envi.arR3Web + '/remoteEntry.js',
        exposedModule: './LmsSchmModule'
      })
        .then(m => m.LmsSchemeModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'golive',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: envi.arR3Web + '/remoteEntry.js',
        exposedModule: './GoLiveModule'
      })
        .then(m => m.GoLiveModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'chargereceivable',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: envi.arR3Web + '/remoteEntry.js',
        exposedModule: './ChargeReceivableModule'
      })
        .then(m => m.ChargeReceivableModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'report',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: envi.arR3Web + '/remoteEntry.js',
        exposedModule: './ReportModule'
      })
        .then(m => m.ReportModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  //#endregion
 
  //#region ARMNT
  {
    path: 'nonaccrual',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: envi.armntR3Web + '/remoteEntry.js',
        exposedModule: './NonAccModule'
      })
        .then(m => m.NonAccrualModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'writeoff',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: envi.armntR3Web + '/remoteEntry.js',
        exposedModule: './WriteOffModule'
      })
        .then(m => m.WriteOffModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'waived',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: envi.armntR3Web + '/remoteEntry.js',
        exposedModule: './WaivedModule'
      })
        .then(m => m.WaivedModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'report',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: envi.armntR3Web + '/remoteEntry.js',
        exposedModule: './ReportModule'
      })
        .then(m => m.ReportModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'prepaidtransfer',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: envi.armntR3Web + '/remoteEntry.js',
        exposedModule: './PrepaidTransferModule'
      })
        .then(m => m.PrepaidTransferModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },

  {
    path: 'refund',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: envi.armntR3Web + '/remoteEntry.js',
        exposedModule: './RefundModule'
      })
        .then(m => m.RefundModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  //#endregion

  //#region Payment
  {
    path: 'payment-channel',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: envi.paymentR3Web + '/remoteEntry.js',
        exposedModule: './PaymentChannel'
      })
        .then(m => m.PaymentChannelModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'payment-channel-receive',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: envi.paymentR3Web + '/remoteEntry.js',
        exposedModule: './PaymentChannel'
      })
        .then(m => m.PaymentChannelModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'payment',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: envi.paymentR3Web + '/remoteEntry.js',
        exposedModule: './PaymentPriority'
      })
        .then(m => m.PaymentPriorityModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'payment-receive',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: envi.paymentR3Web + '/remoteEntry.js',
        exposedModule: './PaymentReceive'
      })
        .then(m => m.PaymentReceiveModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'payment-reversal',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: envi.paymentR3Web + '/remoteEntry.js',
        exposedModule: './PaymentReversal'
      })
        .then(m => m.PaymentReversalModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'receiptform',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: envi.paymentR3Web + '/remoteEntry.js',
        exposedModule: './ReceiptForm'
      })
        .then(m => m.ReceiptFormModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'changewop',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: envi.paymentR3Web + '/remoteEntry.js',
        exposedModule: './ChangeWop'
      })
        .then(m => m.ChangeWopModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'report',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: envi.paymentR3Web + '/remoteEntry.js',
        exposedModule: './Report'
      })
        .then(m => m.ReportModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'prepaid-alloc',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: envi.paymentR3Web + '/remoteEntry.js',
        exposedModule: './PrepaidAlloc'
      })
        .then(m => m.PrepaidAllocModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },

  //#region Amendment
  {
    path: 'amendment',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: envi.amendmentR3Web + '/remoteEntry.js',
        exposedModule: './AmendmentModule'
      })
        .then(m => m.AmendmentModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'prepayment',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: envi.amendmentR3Web + '/remoteEntry.js',
        exposedModule: './PrepaymentModule'
      })
        .then(m => m.PrepaymentModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'changeduedate',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: envi.amendmentR3Web + '/remoteEntry.js',
        exposedModule: './ChangeDueDateModule'
      })
        .then(m => m.ChangeDueDateModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'report',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: envi.amendmentR3Web + '/remoteEntry.js',
        exposedModule: './ReportModule'
      })
        .then(m => m.ReportModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  //#endregion

  //#region Cashbank
  {
    path: 'cashier',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: envi.cashbankR3Web + '/remoteEntry.js',
        exposedModule: './CashierTransactionModule'
      })
        .then(m => m.CashierTransactionModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  //#endregion
  // #region LBPP & SLIK
  {
    path: 'lbpp',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: envi.gvrmntrgltionR3Web + '/remoteEntry.js',
        exposedModule: './LbppModule'
      })
        .then(m => m.LbppModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  // #endregion

  //#regin AP
  {
    path: 'disbursement',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: envi.apR3Web + '/remoteEntry.js',
        exposedModule: './DisbursementModule'
      })
        .then(m => m.DisbursementModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  //#endregion

  //#region FINOPS
  {
    path: 'othtrx',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: envi.finopsR3Web + '/remoteEntry.js',
        exposedModule: './OthTrxModule'
      })
        .then(m => m.OthTrxModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  //#endregion

  //#region PDC
  {
    path: 'clearing',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: envi.pdcR3Web + '/remoteEntry.js',
        exposedModule: './ClearingModule'
      })
        .then(m => m.ClearingModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'pdcreceive',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: envi.pdcR3Web + '/remoteEntry.js',
        exposedModule: './PdcReceiveModule'
      })
        .then(m => m.PdcReceiveModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  } ,
  {
    path: 'pdccancel',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: envi.pdcR3Web + '/remoteEntry.js',
        exposedModule: './PdcCancelModule'
      })
        .then(m => m.PdcCancelModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'bounce',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: envi.pdcR3Web + '/remoteEntry.js',
        exposedModule: './BounceModule'
      })
        .then(m => m.BounceModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'deposit',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: envi.pdcR3Web + '/remoteEntry.js',
        exposedModule: './DepositModule'
      })
        .then(m => m.DepositModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'pdctransit',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: envi.pdcR3Web + '/remoteEntry.js',
        exposedModule: './PdcTransitModule'
      })
        .then(m => m.PdcTransitModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'custody',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: envi.pdcR3Web + '/remoteEntry.js',
        exposedModule: './PdcCustodyModule'
      })
        .then(m => m.PdcCustodyModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  //#endregion

  //#region INTEGRATION
  {
    path: 'integration',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: envi.integrationR3Web + '/remoteEntry.js',
        exposedModule: './IntegrationModule'
      })
        .then(m => m.IntegrationModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  } ,
  {
    path: 'integration-mapping',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: envi.integrationR3Web + '/remoteEntry.js',
        exposedModule: './IntegrationMappingModule'
      })
        .then(m => m.IntegrationMappingModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'advancepayment',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: envi.finopsR3Web + '/remoteEntry.js',
        exposedModule: './advancepayment'
      })
        .then(m => m.AdvancePaymentModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'pdc',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: envi.pdcR3Web + '/remoteEntry.js',
        exposedModule: './PdcModule'
      })
        .then(m => m.PdcModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  //#endregion

  //#region AMS

  {
    path: 'assetdocument',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: envi.assetdocR3Web + '/remoteEntry.js',
        exposedModule: './AssetDocModule'
      })
        .then(m => m.AssetDocumentModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  }

  //#endregion

];
