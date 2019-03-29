import { RequestComponent } from 'app/leave-management/request/request.component';
import { LeaveManagementRoutingModule } from 'app/leave-management/leave-management-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SharingModule } from 'app/shared/sharing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { VerfPagingComponent } from 'app/leave-management/verification/verf-paging/verf-paging.component';
import { VerfDetailComponent } from 'app/leave-management/verification/verf-detail/verf-detail.component';
import { InquiryComponent } from 'app/leave-management/inquiry/inquiry.component';

@NgModule({
  imports: [
    LeaveManagementRoutingModule,
    CommonModule,
    FormsModule,
    HttpModule,
    NgbModule,
    SharingModule
  ],
  declarations: [
  RequestComponent,
  VerfPagingComponent,
  VerfDetailComponent,
  InquiryComponent]
})
export class LeaveManagementModule { }
