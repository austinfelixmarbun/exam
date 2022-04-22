import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotifEngineRoutingModule } from './notif-engine-routing.module';
import { AdInsModule } from 'app/components/adins-module/adins.module';
import { AdInsSharedModule } from 'app/components/adins-module/adins-shared.module';
import { NotifTemplatePagingComponent } from './notif-template-paging/notif-template-paging.component';
import { NotifTemplateFormComponent } from './notif-template-form/notif-template-form.component';
import { NotifBroadcastMessagePagingComponent } from './notif-broadcast-message-paging/notif-broadcast-message-paging.component';
import { NotifBroadcastMessageFormComponent } from './notif-broadcast-message-form/notif-broadcast-message-form.component';
import { BroadcastMessageNotificationComponent } from './shared-component/broadcast-message-notification/broadcast-message-notification.component';
import { BroadcastMessageEmailComponent } from './shared-component/broadcast-message-email/broadcast-message-email.component';
import { BroadcastMessageWhatsappComponent } from './shared-component/broadcast-message-whatsapp/broadcast-message-whatsapp.component';
import { BroadcastMessageSmsComponent } from './shared-component/broadcast-message-sms/broadcast-message-sms.component';
import { BodyMessageTosendComponent } from './shared-component/body-message-tosend/body-message-tosend.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { QuillModule } from 'ngx-quill';
import { TagInputModule } from 'ngx-chips';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;
@NgModule({
    imports: [
        AdInsModule,
        NotifEngineRoutingModule,
        CommonModule,
        FormsModule,
        NgbModule,
        AdInsSharedModule,
        ReactiveFormsModule,
        NgxMaskModule.forRoot(),
        QuillModule.forRoot({
          modules: {
            syntax: false,
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
              ['blockquote'],
          
              // [{ 'header': 1 }, { 'header': 2 }],               // custom button values
              [{ 'list': 'ordered'}, { 'list': 'bullet' }],
              [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
              [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
              [{ 'direction': 'rtl' }],                         // text direction
          
              [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
              [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          
              [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
              [{ 'font': [] }],
              [{ 'align': [] }],
          
              ['clean'],                                         // remove formatting button
          
              ['image', 'video']                         // link and image, video
            ],
            theme: 'bubble'
          }
        }),
        TagInputModule,
        NgxIntlTelInputModule
    ],
    declarations: [
        NotifTemplatePagingComponent,
        NotifTemplateFormComponent,
        NotifBroadcastMessagePagingComponent,
        NotifBroadcastMessageFormComponent,
        BroadcastMessageNotificationComponent,
        BroadcastMessageEmailComponent,
        BroadcastMessageWhatsappComponent,
        BroadcastMessageSmsComponent,
        BodyMessageTosendComponent
    ],
    providers: [
    ]
})
export class NotifEngineModule { }