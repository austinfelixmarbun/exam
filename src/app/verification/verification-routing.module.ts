import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VerificationQuestionAnswerAddEditComponent } from './verification-question-answer/verification-question-answer-add-edit/verification-question-answer-add-edit.component';
import { VerificationQuestionGroupAddEditComponent } from './verification-question-group/verification-question-group-add-edit/verification-question-group-add-edit.component';
import { VerificationQuestionGroupMemberPagingComponent } from './verification-question-group-member/verification-question-group-member-paging/verification-question-group-member-paging.component';
import { VerificationQuestionGroupMemberEditComponent } from './verification-question-group-member/verification-question-group-member-edit/verification-question-group-member-edit.component';
import { VerificationQuestionGroupMemberAddComponent } from './verification-question-group-member/verification-question-group-member-add/verification-question-group-member-add.component';
import { VerificationQuestionSchemePagingComponent } from './verification-question-scheme/verification-question-scheme-paging/verification-question-scheme-paging.component';
import { VerificationQuestionSchemeAddEditComponent } from './verification-question-scheme/verification-question-scheme-add-edit/verification-question-scheme-add-edit.component';
import { VerificationQuestionSchemeMemberPagingComponent } from './verification-question-scheme-member/verification-question-scheme-member-paging/verification-question-scheme-member-paging.component';
import { VerificationQuestionSchemeMemberAddComponent } from './verification-question-scheme-member/verification-question-scheme-member-add/verification-question-scheme-member-add.component';
import { VerificationQuestionSchemeMemberEditComponent } from './verification-question-scheme-member/verification-question-scheme-member-edit/verification-question-scheme-member-edit.component';
import { VerificationQuestionGroupPagingComponent } from './verification-question-group/verification-question-group-paging/verification-question-group-paging.component';
import { VerificationQuestionAnswerPagingComponent } from './verification-question-answer/verification-question-answer-paging/verification-question-answer-paging.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'QuestionAnswer/Paging',
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
        path: 'QuestionGroup/Paging',
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
      },
      {
        path: 'QuestionScheme/Paging',
        component: VerificationQuestionSchemePagingComponent,
        data: {
          title: 'Verification Question Scheme Paging'
        },
      },
      {
        path: 'QuestionScheme/Add',
        component: VerificationQuestionSchemeAddEditComponent,
        data: {
          title: 'Verification Question Scheme Add'
        },
      },
      {
        path: 'QuestionScheme/Edit',
        component: VerificationQuestionSchemeAddEditComponent,
        data: {
          title: 'Verification Question Scheme Edit'
        },
      },
      {
        path: 'QuestionSchemeMemberPaging',
        component: VerificationQuestionSchemeMemberPagingComponent,
        data: {
          title: 'Verification Question Scheme Member Paging'
        },
      },
      {
        path: 'QuestionSchemeMember/Add',
        component: VerificationQuestionSchemeMemberAddComponent,
        data: {
          title: 'Verification Question Scheme Member Add'
        },
      },
      {
        path: 'QuestionSchemeMember/Edit',
        component: VerificationQuestionSchemeMemberEditComponent,
        data: {
          title: 'Verification Question Scheme Member Edit'
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
