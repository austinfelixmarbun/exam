import { Routes, RouterModule } from '@angular/router';
import { PathConstant } from '../PathConstant';

//Route for content layout without sidebar, navbar and footer for pages like Login, Registration etc...

export const CONTENT_ROUTES: Routes = [
    {
        path: PathConstant.CR_PAGES,
        loadChildren: './pages/content-pages/content-pages.module#ContentPagesModule'
    },
    {
        path: PathConstant.CR_VIEW,
        loadChildren: './view/view.module#ViewModule'
    },
    {
        path: PathConstant.CR_DOC_MNGMNT_VIEW,
        loadChildren: './document-management/document-management.module#DocumentManagementModule'
    }
];