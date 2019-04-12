import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharingModule } from 'app/shared/sharing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotificationComponent } from './notification.component';
import { NotificationRoutingModule } from './notification-routing.module';


@NgModule({
  imports: [
    NotificationRoutingModule,
    CommonModule,
    FormsModule,
    NgbModule,
    SharingModule
  ],
  declarations: [
    NotificationComponent
  ]
})
export class NotificationModule { }
 