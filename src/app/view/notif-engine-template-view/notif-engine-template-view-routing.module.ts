import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PathConstant } from 'app/shared/PathConstant';
import { NotifEngineTemplateViewHistoryComponent } from './notif-engine-template-view-history/notif-engine-template-view-history.component';
import { NotifEngineTemplateViewMainComponent } from './notif-engine-template-view-main/notif-engine-template-view-main.component';
import { NotifEngineTemplateViewComponent } from './notif-engine-template-view.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: NotifEngineTemplateViewComponent,
        children: [
          {
            path: PathConstant.MAIN,
            component: NotifEngineTemplateViewMainComponent
          },
          {
            path: PathConstant.HISTORY,
            component: NotifEngineTemplateViewHistoryComponent
          }
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotifEngineTemplateViewRoutingModule { }
