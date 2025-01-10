import { Routes } from '@angular/router';
import { PathConstant } from '../PathConstant';
import { UcTemplateComponent } from '@adins/uctemplate';

//Route for content layout with sidebar, navbar and footer.
export const Full_ROUTES: Routes = [
  {
    path: 'BREAD/:page',
    component: UcTemplateComponent
  },
  {
    path: PathConstant.LR_DASHBOARD,
    loadChildren: () => import('app/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  // {
  //   path: PathConstant.LR_FORMS,
  //   loadChildren: () => import('app/forms/forms.module').then(m => m.FormModule)
  // },
  {
    path: PathConstant.LR_COMPNT,
    loadChildren: () => import('app/components/ui-components.module').then(m => m.UIComponentsModule)
  },
  
  {
    path: PathConstant.LR_PAGES,
    loadChildren: () => import('app/pages/full-pages/full-pages.module').then(m => m.FullPagesModule)
  },
  {
    path: PathConstant.LR_ERROR,
    loadChildren: () => import('app/error-page/error-page.module').then(m => m.ErrorPageModule)
  },
  {
    path: PathConstant.LR_INTEGRATION,
    loadChildren: () => import('app/integration/integration.module').then(m => m.IntegrationModule)
  },
  

  // dynamic import remote module

];
