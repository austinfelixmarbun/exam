import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApprovalScreenRoutingModule } from './approval-screen-routing.module';
import { ApprovalScreenComponent } from './approval-screen.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { UcProdCompComponent } from './uc-prod-component/uc-prod-comp.component';
import { SharingComponentModule } from 'app/shared/sharingcomponent.module';
import { TestComponent } from './test/test.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LookupTestComponent } from './lookup-test/lookup-test.component';
import { UcShowErrorsModule } from '@adins/uc-show-errors';
import { UcapprovalModule } from '@adins/ucapproval'

@NgModule({
  declarations: [ApprovalScreenComponent,UcProdCompComponent, TestComponent, LookupTestComponent],
  imports: [
    CommonModule,
    ApprovalScreenRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharingComponentModule,
    UcShowErrorsModule,
    UcapprovalModule
  ],
  entryComponents : [TestComponent,LookupTestComponent],
  providers: [
    NgbActiveModal
  ]
})
export class ApprovalScreenModule { }
