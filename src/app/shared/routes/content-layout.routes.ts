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
        path: 'cashierview',
        loadChildren: () => {
          return loadRemoteModule({
              type: 'module',
              remoteEntry: envi.paymentR3Web + '/remoteEntry.js',
              exposedModule: './CashierTransaction'
            })
            .then(m => m.CashierTransactionModule)
            .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
        }
      },
      {
        path: 'amendmentview',
        loadChildren: () => {
          return loadRemoteModule({
              type: 'module',
              remoteEntry: 'http://localhost:4204/remoteEntry.js',
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
              remoteEntry: 'http://localhost:4204/remoteEntry.js',
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
              remoteEntry: 'http://localhost:4204/remoteEntry.js',
              exposedModule: './NonAccModule'
            })
            .then(m => m.NonAccrualModule)
            .catch(e => import('app/error-page/error-page.module').then(m => m.ErrorPageModule))
        }
      },
];