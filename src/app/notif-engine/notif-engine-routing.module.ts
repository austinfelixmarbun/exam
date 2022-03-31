import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PathConstant } from 'app/shared/PathConstant';
import { NotifBroadcastMessageFormComponent } from './notif-broadcast-message-form/notif-broadcast-message-form.component';
import { NotifBroadcastMessagePagingComponent } from './notif-broadcast-message-paging/notif-broadcast-message-paging.component';
import { NotifTemplateFormComponent } from './notif-template-form/notif-template-form.component';
import { NotifTemplatePagingComponent } from './notif-template-paging/notif-template-paging.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: PathConstant.NOTIF_TEMPLATE,
        children: [
          {
            path: PathConstant.PAGING,
            component: NotifTemplatePagingComponent,
            data: {
              title: 'Notif Template Paging'
            },
          },
          {
            path: PathConstant.ADD_EDIT,
            component: NotifTemplateFormComponent,
            data: {
              title: 'Notif Template Form'
            },
          }
        ]
      },
      {
        path: PathConstant.NOTIF_BROADCAST,
        children: [
          {
            path: PathConstant.PAGING,
            component: NotifBroadcastMessagePagingComponent,
            data: {
              title: 'Notif Broadcast Message Paging'
            },
          },
          {
            path: PathConstant.ADD_EDIT,
            component: NotifBroadcastMessageFormComponent,
            data: {
              title: 'Notif Broadcast Message Form'
            },
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotifEngineRoutingModule { }
