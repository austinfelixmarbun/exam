import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TreeViewModule } from '@progress/kendo-angular-treeview';
import { SharingComponentModule } from 'app/shared/sharingcomponent.module';
import { UCSearchModule } from '@adins/ucsearch';
import { UcgridfooterModule } from '@adins/ucgridfooter';
import { UcpagingModule } from '@adins/ucpaging';
import { UcSubsectionModule } from '@adins/uc-subsection';
import { VerificationComponent } from './verification.component';
import { VerificationRoutingModule } from './verification-routing.module';
import { UcviewgenericModule, UcviewgenericComponent } from '@adins/ucviewgeneric';
import { UclookupgenericModule } from '@adins/uclookupgeneric';
import { ArchwizardModule } from 'angular-archwizard';
import { VerificationQuestionAnswerPagingComponent } from './verification-question-answer/verification-question-answer-paging/verification-question-answer-paging.component';
import { VerificationQuestionAnswerAddEditComponent } from './verification-question-answer/verification-question-answer-add-edit/verification-question-answer-add-edit.component';
import { VerificationQuestionGroupAddEditComponent } from './verification-question-group/verification-question-group-add-edit/verification-question-group-add-edit.component';
import { VerificationQuestionGroupPagingComponent } from './verification-question-group/verification-question-group-paging/verification-question-group-paging.component';
import { VerificationService } from './verification.service';
import { VerificationQuestionGroupMemberPagingComponent } from './verification-question-group-member/verification-question-group-member-paging/verification-question-group-member-paging.component';
import { VerificationQuestionGroupMemberEditComponent } from './verification-question-group-member/verification-question-group-member-edit/verification-question-group-member-edit.component';
import { VerificationQuestionGroupMemberAddComponent } from './verification-question-group-member/verification-question-group-member-add/verification-question-group-member-add.component';
import { VerificationQuestionSchemePagingComponent } from './verification-question-scheme/verification-question-scheme-paging/verification-question-scheme-paging.component';
import { VerificationQuestionSchemeAddEditComponent } from './verification-question-scheme/verification-question-scheme-add-edit/verification-question-scheme-add-edit.component';
import { VerificationQuestionSchemeMemberPagingComponent } from './verification-question-scheme-member/verification-question-scheme-member-paging/verification-question-scheme-member-paging.component';
import { VerificationQuestionSchemeMemberAddComponent } from './verification-question-scheme-member/verification-question-scheme-member-add/verification-question-scheme-member-add.component';
import { VerificationQuestionSchemeMemberEditComponent } from './verification-question-scheme-member/verification-question-scheme-member-edit/verification-question-scheme-member-edit.component';

@NgModule({
  imports: [
    VerificationRoutingModule,
    CommonModule,
    FormsModule,
    HttpModule,
    NgbModule,
    SharingComponentModule,
    UCSearchModule,
    UcgridfooterModule,
    UcpagingModule,
    UcSubsectionModule,
    UclookupgenericModule,
    ReactiveFormsModule,
    TreeViewModule,
    UcviewgenericModule,
    UclookupgenericModule,
    NgbDropdownModule,
    ArchwizardModule
  ],
  declarations: [
    VerificationComponent,
    VerificationQuestionAnswerPagingComponent,
    VerificationQuestionAnswerAddEditComponent,
    VerificationQuestionGroupAddEditComponent,
    VerificationQuestionGroupPagingComponent,
    VerificationQuestionGroupMemberPagingComponent,
    VerificationQuestionGroupMemberEditComponent,
    VerificationQuestionGroupMemberAddComponent,
    VerificationQuestionSchemePagingComponent,
    VerificationQuestionSchemeAddEditComponent,
    VerificationQuestionSchemeMemberPagingComponent,
    VerificationQuestionSchemeMemberAddComponent,
    VerificationQuestionSchemeMemberEditComponent,
  ],
  entryComponents : [UcviewgenericComponent],
  providers: [
    VerificationService
  ]
})
export class VerificationModule { }
