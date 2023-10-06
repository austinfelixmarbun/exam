import { loadRemoteModule } from '@angular-architects/module-federation';
import { Routes, RouterModule } from '@angular/router';
import { PathConstant } from '../PathConstant';
import * as _environment from "../../../assets/config/enviConfig.json";
//Route for content layout without sidebar, navbar and footer for pages like Login, Registration etc...

const envi = _environment;

export const CONTENT_ROUTES: Routes = [
  {
    path: PathConstant.CR_PAGES,
    loadChildren: () => import('app/pages/content-pages/content-pages.module').then(m => m.ContentPagesModule)
  },
  {
    path: PathConstant.CR_VIEW,
    loadChildren: () => import('app/view/view.module').then(m => m.ViewModule)
  },
  {
    path: PathConstant.CR_DOC_MNGMNT_VIEW,
    loadChildren: () => import('app/document-management/document-management.module').then(m => m.DocumentManagementModule)
  },
  {
    path: PathConstant.JOURNAL_RESULT_VIEW,
    loadChildren: () => import('app/journal/journal.module').then(m => m.JournalModule)
  },
  {
    path: 'agrmntview',
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
    path: 'lmsschemeview',
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
    path: 'payment-reversal-view',
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
    path: 'prepaid-alloc-view',
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
    path: 'payment-receive-view',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: envi.cashbankR3Web + '/remoteEntry.js',
        exposedModule: './PrepaidAlloc'
      })
        .then(m => m.PrepaidAllocModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'receiptformview',
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
    path: 'amendmentview',
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
    path: 'agreementtransferinfo',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: envi.amendmentR3Web + '/remoteEntry.js',
        exposedModule: './AgrTransferModule'
      })
        .then(m => m.AgrTransferModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'writeoffview',
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
    path: 'nonaccrualview',
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
    path: 'cashierview',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: envi.cashbankR3Web + '/remoteEntry.js',
        exposedModule: './CashierTransactionModule'
      })
        .then(m => m.CashierTransactionModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    },
  },
  {
    path: 'nonaccrualview',
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
    path: PathConstant.CR_DOC_MNGMNT_VIEW,
    loadChildren: () => import('app/document-management/document-management.module').then(m => m.DocumentManagementModule)
  },
  {
    path: 'agrmntview',
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
    path: 'paymenthistoryview',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: envi.arR3Web + '/remoteEntry.js',
        exposedModule: './PaymentHistoryModule'
      })
        .then(m => m.PaymentHistoryModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'lmsschemeview',
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
    path: 'prepaid-alloc-view',
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
    path: 'receiptformview',
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
    path: 'amendmentview',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: envi.amendmentR3Web + './remoteEntry.js',
        exposedModule: './AmendmentModule'
      })
        .then(m => m.AmendmentModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'writeoffview',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: envi.armntR3Web + './remoteEntry.js',
        exposedModule: './WriteOffModule'
      })
        .then(m => m.WriteOffModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'nonaccrualview',
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
    path: 'waivedview',
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
    path: 'prepaidtransferview',
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
    path: 'refundview',
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
  {
    path: 'disbursementview',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: envi.apR3Web + '/remoteEntry.js',
        exposedModule: './PayVoucherModule'
      })
        .then(m => m.PayVoucherModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'integrationview',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: envi.integrationR3Web + '/remoteEntry.js',
        exposedModule: './IntegrationModule'
      })
        .then(m => m.IntegrationModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'chargereceivableview',
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
    path: 'pdccancelview',
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
    path: 'changeduedateview',
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
    path: 'pdcview',
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
  {
    path: 'pdcreceiveview',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: envi.pdcR3Web + '/remoteEntry.js',
        exposedModule: './PdcReceiveModule'
      })
        .then(m => m.PdcReceiveModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'pdctransitview',
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

  //#region AMS
  {
    path: 'assetdocumentview',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: envi.assetdocR3Web + '/remoteEntry.js',
        exposedModule: './AssetDocModule'
      })
        .then(m => m.AssetDocumentModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'insuranceview',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: envi.insuranceR3Web + '/remoteEntry.js',
        exposedModule: './InsuranceModule'
      })
        .then(m => m.InsuranceModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'filingmanagementview',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: envi.filingR3Web + '/remoteEntry.js',
        exposedModule: './FilingModule'
      })
        .then(m => m.FilingManagementModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'view',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: envi.assetR3Web + '/remoteEntry.js',
        exposedModule: './AssetViewModule'
      })
        .then(m => m.ViewModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'assetmanagementview',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: envi.assetR3Web + '/remoteEntry.js',
        exposedModule: './AssetModule'
      })
        .then(m => m.AssetManagementModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'assetdisposalview',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: envi.storageR3Web + '/remoteEntry.js',
        exposedModule: './StorageModule'
      })
        .then(m => m.AssetDisposalModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  //#endregion

  //#region TMS
  {
    path: 'View',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: envi.facilityMntR3Web + '/remoteEntry.js',
        exposedModule: './ViewSettingModule'
      })
        .then(m => m.ViewSettingModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'PaymentOut',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: envi.PayOutR3Web + '/remoteEntry.js',
        exposedModule: './PayoutModule'
      })
        .then(m => m.PayoutModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'Termination',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: envi.PayOutR3Web + '/remoteEntry.js',
        exposedModule: './TerminationModule'
      })
        .then(m => m.TerminationModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'reschedulingview',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: envi.amendmentR3Web + '/remoteEntry.js',
        exposedModule: './RescheduleModule'
      })
        .then(m => m.RescheduleModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'partialprepaymentview',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: envi.amendmentR3Web + '/remoteEntry.js',
        exposedModule: './PartialPrepaymentModule'
      })
        .then(m => m.PartialPrepaymentModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'collateralreplacementview',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: envi.amendmentR3Web + '/remoteEntry.js',
        exposedModule: './CollateralReplacementModule'
      })
        .then(m => m.CollateralReplacementModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'suspendview',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: envi.paymentR3Web + '/remoteEntry.js',
        exposedModule: './SuspdTrxModule'
      })
        .then(m => m.SuspdTrxModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'suspendreverseview',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: envi.paymentR3Web + '/remoteEntry.js',
        exposedModule: './SuspdRvsTrxModule'
      })
        .then(m => m.SuspdRvsTrxModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'autodebitview',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: envi.arR3Web + '/remoteEntry.js',
        exposedModule: './AutoDebitModule'
      })
        .then(m => m.AutoDebitModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'autodebitpayview',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: envi.arR3Web + '/remoteEntry.js',
        exposedModule: './AutoDebitPayModule'
      })
        .then(m => m.AutoDebitPayModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'reimburse/view',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: envi.finopsR3Web + '/remoteEntry.js',
        exposedModule: './Reimbursement'
      })
        .then(m => m.ReimbursementModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  },
  {
    path: 'advancepaymentview',
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
    path: 'paymentrequestview',
    loadChildren: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: envi.finopsR3Web + '/remoteEntry.js',
        exposedModule: './PaymentRequestModule'
      })
        .then(m => m.PaymentRequestModule)
        .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
    }
  }
  //#endregion
];