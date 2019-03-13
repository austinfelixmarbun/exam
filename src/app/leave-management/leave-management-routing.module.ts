import { InquiryComponent } from './inquiry/inquiry.component';
import { VerfPagingComponent } from './verification/verf-paging/verf-paging.component';
import { VerfDetailComponent } from './verification/verf-detail/verf-detail.component';
import { RequestComponent } from './request/request.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'request',
        component: RequestComponent,
        data: {
          title: 'Leave Management Request'
        },
      },
      {
        path: 'verification',
        component: VerfPagingComponent,
        data: {
          title: 'Leave Management Verification'
        },
      },
      {
        path: 'verification/detail',
        component: VerfDetailComponent,
        data: {
          title: 'Leave Management Verification Detail'
        },
      },
      {
        path: 'inquiry',
        component: InquiryComponent,
        data: {
          title: 'Leave Management Inquiry'
        },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeaveManagementRoutingModule { }
