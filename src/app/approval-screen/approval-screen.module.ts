import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApprovalScreenRoutingModule } from './approval-screen-routing.module';
import { ApprovalScreenComponent } from './approval-screen.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UcProdCompComponent } from './uc-prod-component/uc-prod-comp.component';

@NgModule({
  declarations: [ApprovalScreenComponent,UcProdCompComponent],
  imports: [
    CommonModule,
    ApprovalScreenRoutingModule,
    ReactiveFormsModule
  ]
})
export class ApprovalScreenModule { }
