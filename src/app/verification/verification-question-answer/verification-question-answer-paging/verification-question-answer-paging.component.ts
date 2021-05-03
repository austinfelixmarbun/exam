import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
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
    this.inputPagingObj.ddlEnvironments = [
      {
        name: "VQA.REF_VERF_ANSWER_TYPE_ID",
        environment: environment.FoundationR3Url
      }
    ];
  }
}
