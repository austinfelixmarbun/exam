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

@NgModule({
    imports: [
        AdInsModule,
        NotifEngineRoutingModule,
        CommonModule,
        FormsModule,
        NgbModule,
        AdInsSharedModule,
        ReactiveFormsModule,
    ],
    declarations: [
        NotifTemplatePagingComponent,
        NotifTemplateFormComponent,
        NotifBroadcastMessagePagingComponent,
        NotifBroadcastMessageFormComponent,
        BroadcastMessageNotificationComponent,
        BroadcastMessageEmailComponent,
        BroadcastMessageWhatsappComponent,
        BroadcastMessageSmsComponent
    ],
    providers: [
    ]
})
export class NotifEngineModule { }