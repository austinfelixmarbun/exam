import { Component, OnInit, ViewChild } from '@angular/core';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { environment } from 'environments/environment';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';

@Component({
  selector: 'app-verification-question-group-paging',
  templateUrl: './verification-question-group-paging.component.html',
  styleUrls: ['./verification-question-group-paging.component.scss']
})
export class VerificationQuestionGroupPagingComponent implements OnInit {

  inputPagingObj: any;

  ngOnInit() {
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/ucpaging/verification/searchVerificationQuestionGroupForPaging.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/verification/searchVerificationQuestionGroupForPaging.json";
    this.inputPagingObj.deleteUrl = AdInsConstant.DeleteVerfQuestionGroupHById;
  }
}
