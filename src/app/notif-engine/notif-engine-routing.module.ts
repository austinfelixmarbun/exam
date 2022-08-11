import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PathConstant } from 'app/shared/PathConstant';
import { NotifBroadcastMessageFormComponent } from './notif-broadcast-message-form/notif-broadcast-message-form.component';
import { NotifBroadcastMessageInquiryComponent } from './notif-broadcast-message-inquiry/notif-broadcast-message-inquiry.component';
import { NotifBroadcastMessagePagingComponent } from './notif-broadcast-message-paging/notif-broadcast-message-paging.component';
import { NotifSourceFormComponent } from './notif-source-form/notif-source-form.component';
import { NotifSourcePagingComponent } from './notif-source-paging/notif-source-paging.component';
import { NotifTemplateAttrFormComponent } from './notif-template-attr-form/notif-template-attr-form.component';
import { NotifTemplateAttrMappingSourceDetailComponent } from './notif-template-attr-mapping-source-detail/notif-template-attr-mapping-source-detail.component';
import { NotifTemplateAttrMappingSourceComponent } from './notif-template-attr-mapping-source/notif-template-attr-mapping-source.component';
import { NotifTemplateAttrPagingComponent } from './notif-template-attr-paging/notif-template-attr-paging.component';
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
          },
          {
            path: PathConstant.INQUIRY,
            component: NotifBroadcastMessageInquiryComponent,
            data: {
              title: 'Notif Broadcast Message Inquiry'
            },
          }
        ]
      },
      {
        path: PathConstant.NOTIF_ATTR_TEMPLATE,
        children: [
          {
            path: PathConstant.PAGING,
            component: NotifTemplateAttrPagingComponent,
            data: {
              title: 'Notif Attribute Template Paging'
            },
          },
          {
            path: PathConstant.ADD_EDIT,
            component: NotifTemplateAttrFormComponent,
            data: {
              title: 'Notif Attribute Template Form'
            },
          }
        ]
      },
      {
        path: PathConstant.NOTIF_SOURCE,
        children: [
          {
            path: PathConstant.PAGING,
            component: NotifSourcePagingComponent,
            data: {
              title: 'Notif Source Paging'
            },
          },
          {
            path: PathConstant.ADD_EDIT,
            component: NotifSourceFormComponent,
            data: {
              title: 'Notif Source Form'
            },
          },
          {
            path: PathConstant.NOTIF_ATTR_TEMPLATE_MAPPING,
            component: NotifTemplateAttrMappingSourceComponent,
            data: {
              title: 'Notif Attribute Template Mapping Source'
            }
          },
          {
            path: PathConstant.NOTIF_ATTR_TEMPLATE_MAPPING + "/" + PathConstant.ADD_DETAIL,
            component: NotifTemplateAttrMappingSourceDetailComponent,
            data: {
              title: 'Notif Attribute Template Mapping Source Detail'
            },
          }
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotifEngineRoutingModule { }
