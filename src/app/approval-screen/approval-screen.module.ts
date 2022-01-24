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
import { UcApprovebyComponent } from './uc-approveby/uc-approveby.component';
import { UcApprovalhistComponent } from './uc-approvalhist/uc-approvalhist.component';
import { UcApprovalrecommendationComponent } from './uc-approvalrecommendation/uc-approvalrecommendation.component';
import { UcApprovalsummaryComponent } from './uc-approvalsummary/uc-approvalsummary.component'
import { UcApprovalComponent } from './uc-approval/uc-approval.component';
import { UcSubsectionModule } from '@adins/uc-subsection';
import { AdInsModule } from 'app/components/adins-module/adins.module';
import { AdInsSharedModule } from 'app/components/adins-module/adins-shared.module';

@NgModule({
    declarations: [ApprovalScreenComponent, UcProdCompComponent, TestComponent, LookupTestComponent,
        UcApprovebyComponent, UcApprovalhistComponent, UcApprovalrecommendationComponent, UcApprovalsummaryComponent, UcApprovalComponent],
    imports: [
        AdInsModule,
        CommonModule,
        ApprovalScreenRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        AdInsSharedModule,
        SharingComponentModule,
        UcShowErrorsModule,
        UcSubsectionModule
    ],
    providers: [
        NgbActiveModal
    ]
})
export class ApprovalScreenModule { }
