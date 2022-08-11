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
import { BroadcastMessageSmsWaComponent } from './shared-component/broadcast-message-sms-wa/broadcast-message-sms-wa.component';
import { BodyMessageTosendComponent } from './shared-component/body-message-tosend/body-message-tosend.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { QuillModule } from 'ngx-quill';
import { TagInputModule } from 'ngx-chips';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { NotifBroadcastMessageInquiryComponent } from './notif-broadcast-message-inquiry/notif-broadcast-message-inquiry.component';
import { MatRadioModule } from '@angular/material/radio';
import { NotifTemplateAttrPagingComponent } from './notif-template-attr-paging/notif-template-attr-paging.component';
import { NotifTemplateAttrFormComponent } from './notif-template-attr-form/notif-template-attr-form.component';
import { CurrencyMaskInputMode, NgxCurrencyModule } from "ngx-currency";
import { MatIconModule } from '@angular/material/icon';
import { NotifTemplateAttrMappingSourceComponent } from './notif-template-attr-mapping-source/notif-template-attr-mapping-source.component';
import { NotifTemplateAttrMappingSourceDetailComponent } from './notif-template-attr-mapping-source-detail/notif-template-attr-mapping-source-detail.component';
import { NotifSourceFormComponent } from './notif-source-form/notif-source-form.component';
import { NotifSourcePagingComponent } from './notif-source-paging/notif-source-paging.component';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;
export const customCurrencyMaskConfig = {     
  align: "right",     
  allowNegative: true,     
  allowZero: true,     
  decimal: ".",        
  precision: 0,
  prefix: "",     
  suffix: "",     
  thousands: ",",     
  nullable: false,
  inputMode: CurrencyMaskInputMode.NATURAL
};

@NgModule({
    imports: [
        AdInsModule,
        NotifEngineRoutingModule,
        CommonModule,
        FormsModule,
        NgbModule,
        MatRadioModule,
        AdInsSharedModule,
        ReactiveFormsModule,
        MatIconModule,
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
        NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
        TagInputModule,
        NgxIntlTelInputModule
    ],
    declarations: [
        NotifTemplatePagingComponent,
        NotifTemplateFormComponent,
        NotifTemplateAttrPagingComponent,
        NotifTemplateAttrFormComponent,
        NotifBroadcastMessagePagingComponent,
        NotifBroadcastMessageFormComponent,
        BroadcastMessageNotificationComponent,
        BroadcastMessageEmailComponent,
        BroadcastMessageSmsWaComponent,
        BodyMessageTosendComponent,
        NotifBroadcastMessageInquiryComponent,
        NotifTemplateAttrMappingSourceComponent,
        NotifTemplateAttrMappingSourceDetailComponent,
        NotifSourceFormComponent,
        NotifSourcePagingComponent
    ],
    providers: [
    ]
})
export class NotifEngineModule { }