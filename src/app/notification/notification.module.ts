import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharingModule } from 'app/shared/sharing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotificationComponent } from './notification.component';
import { NotificationRoutingModule } from './notification-routing.module';
import { SharingComponentModule } from 'app/shared/sharingcomponent.module';
import { UCGridFooterComponent } from 'app/shared/UserControl/ucgrid-footer/ucgrid-footer.component';
import { UCSearchComponent } from '@adins/ucsearch';


@NgModule({
  imports: [
    NotificationRoutingModule,
    CommonModule,
    FormsModule,
    NgbModule,
    SharingComponentModule
  ],
  declarations: [
    NotificationComponent
  ]
})
export class NotificationModule { }
 