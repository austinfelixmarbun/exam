import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-verification-question-answer-paging',
  templateUrl: './verification-question-answer-paging.component.html'
})
export class VerificationQuestionAnswerPagingComponent implements OnInit {

  inputPagingObj: UcPagingObj = new UcPagingObj();

  readonly AddLink: string = NavigationConstant.VERIF_QA_ADD;
  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/verification/searchVerificationQuestionAnswer.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/verification/searchVerificationQuestionAnswer.json";
  }
}
