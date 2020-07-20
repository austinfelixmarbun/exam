import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'environments/environment';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { URLConstant } from 'app/shared/constant/URLConstant';

@Component({
  selector: 'app-verification-question-scheme-paging',
  templateUrl: './verification-question-scheme-paging.component.html'
})
export class VerificationQuestionSchemePagingComponent implements OnInit {

  inputPagingObj: any;

  ngOnInit() {
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/ucpaging/verification/searchVerificationQuestionScheme.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = URLConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/verification/searchVerificationQuestionScheme.json";
    this.inputPagingObj.deleteUrl = URLConstant.DeleteVerfSchemeHById;
  }
}
