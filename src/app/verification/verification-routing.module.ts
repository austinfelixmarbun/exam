import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VerificationComponent } from './verification.component';
import { VerificationQuestionAnswerPagingComponent } from './verification-question-answer/verification-question-answer-paging/verification-question-answer-paging.component';
import { VerificationQuestionAnswerAddEditComponent } from './verification-question-answer/verification-question-answer-add-edit/verification-question-answer-add-edit.component';
import { VerificationQuestionGroupAddEditComponent } from './verification-question-group/verification-question-group-add-edit/verification-question-group-add-edit.component';
import { VerificationQuestionGroupPagingComponent } from './verification-question-group/verification-question-group-paging/verification-question-group-paging.component';
import { VerificationQuestionGroupMemberPagingComponent } from './verification-question-group-member/verification-question-group-member-paging/verification-question-group-member-paging.component';
import { VerificationQuestionGroupMemberEditComponent } from './verification-question-group-member/verification-question-group-member-edit/verification-question-group-member-edit.component';
import { VerificationQuestionGroupMemberAddComponent } from './verification-question-group-member/verification-question-group-member-add/verification-question-group-member-add.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'QuestionAnswerPaging',
        component: VerificationQuestionAnswerPagingComponent,
        data: {
          title: 'Verification Question Answer Paging'
        },
      },
      {
        path: 'QuestionAnswer/Add',
        component: VerificationQuestionAnswerAddEditComponent,
        data: {
          title: 'Verification Question Answer Add'
        },
      },
      {
        path: 'QuestionAnswer/Edit',
        component: VerificationQuestionAnswerAddEditComponent,
        data: {
          title: 'Verification Question Answer Edit'
        },
      },
      {
        path: 'QuestionGroupPaging',
        component: VerificationQuestionGroupPagingComponent,
        data: {
          title: 'Verification Question Group Paging'
        },
      },
      {
        path: 'QuestionGroup/Add',
        component: VerificationQuestionGroupAddEditComponent,
        data: {
          title: 'Verification Question Group Edit'
        },
      },
      {
        path: 'QuestionGroup/Edit',
        component: VerificationQuestionGroupAddEditComponent,
        data: {
          title: 'Verification Question Group Edit'
        },
      },
      {
        path: 'QuestionGroupMemberPaging',
        component: VerificationQuestionGroupMemberPagingComponent,
        data: {
          title: 'Verification Question Group Member Paging'
        },
      },
      {
        path: 'QuestionGroupMember/Add',
        component: VerificationQuestionGroupMemberAddComponent,
        data: {
          title: 'Verification Question Group Member Add'
        },
      },
      {
        path: 'QuestionGroupMember/Edit',
        component: VerificationQuestionGroupMemberEditComponent,
        data: {
          title: 'Verification Question Group Member Edit'
        },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerificationRoutingModule { }
