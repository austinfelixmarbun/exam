import { Routes } from '@angular/router';
import { PathConstant } from '../PathConstant';
//Route for content layout without sidebar, navbar and footer for pages like Login, Registration etc...

export const CONTENT_ROUTES: Routes = [
  {
    path: PathConstant.CR_PAGES,
    loadChildren: () => import('app/pages/content-pages/content-pages.module').then(m => m.ContentPagesModule)
  },
];