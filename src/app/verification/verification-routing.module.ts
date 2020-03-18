import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VerificationComponent } from './verification.component';
import { VerificationQuestionAnswerPagingComponent } from './verification-question-answer/verification-question-answer-paging/verification-question-answer-paging.component';
import { VerificationQuestionAnswerAddEditComponent } from './verification-question-answer/verification-question-answer-add-edit/verification-question-answer-add-edit.component';
import { VerificationQuestionGroupAddEditComponent } from './verification-question-group/verification-question-group-add-edit/verification-question-group-add-edit.component';
import { VerificationQuestionGroupPagingComponent } from './verification-question-group/verification-question-group-paging/verification-question-group-paging.component';

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
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerificationRoutingModule { }
