import { Component, OnInit, ViewChild } from '@angular/core';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { environment } from 'environments/environment';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';

@Component({
  selector: 'app-verification-question-answer-paging',
  templateUrl: './verification-question-answer-paging.component.html',
  styleUrls: ['./verification-question-answer-paging.component.scss']
})
export class VerificationQuestionAnswerPagingComponent implements OnInit {

  inputPagingObj: any;

  ngOnInit() {
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/ucpaging/verification/searchVerificationQuestionAnswer.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/verification/searchVerificationQuestionAnswer.json";
    this.inputPagingObj.deleteUrl = AdInsConstant.DeleteVerfQuestionAnswerById;
    this.inputPagingObj.ddlEnvironments = [
      {
        name: "VQA.REF_VERF_ANSWER_TYPE_ID",
        environment: environment.FoundationR3Url
      }
    ];
  }
}
