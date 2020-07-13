import { Component, OnInit, ViewChild } from '@angular/core';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { environment } from 'environments/environment';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { URLConstant } from 'app/shared/constant/URLConstant';

@Component({
  selector: 'app-verification-question-answer-paging',
  templateUrl: './verification-question-answer-paging.component.html'
})
export class VerificationQuestionAnswerPagingComponent implements OnInit {

  inputPagingObj: any;

  ngOnInit() {
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/ucpaging/verification/searchVerificationQuestionAnswer.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = URLConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/verification/searchVerificationQuestionAnswer.json";
    this.inputPagingObj.deleteUrl = URLConstant.DeleteVerfQuestionAnswerById;
    this.inputPagingObj.ddlEnvironments = [
      {
        name: "VQA.REF_VERF_ANSWER_TYPE_ID",
        environment: environment.FoundationR3Url
      }
    ];
  }
}
