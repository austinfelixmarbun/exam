import { Component, OnInit, ViewChild } from '@angular/core';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { environment } from 'environments/environment';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';

@Component({
  selector: 'app-verification-question-scheme-paging',
  templateUrl: './verification-question-scheme-paging.component.html',
  styleUrls: ['./verification-question-scheme-paging.component.scss']
})
export class VerificationQuestionSchemePagingComponent implements OnInit {

  inputPagingObj: any;

  ngOnInit() {
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/ucpaging/verification/searchVerificationQuestionScheme.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/verification/searchVerificationQuestionScheme.json";
    this.inputPagingObj.deleteUrl = AdInsConstant.DeleteVerfSchemeHById;
  }
}
