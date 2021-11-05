import { Component, OnInit, ViewChild } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-verification-question-scheme-paging',
  templateUrl: './verification-question-scheme-paging.component.html'
})
export class VerificationQuestionSchemePagingComponent implements OnInit {

  inputPagingObj: UcPagingObj = new UcPagingObj();

  readonly AddLink: string = NavigationConstant.VERIF_QA_SCHM_ADD;
  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/verification/searchVerificationQuestionScheme.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/verification/searchVerificationQuestionScheme.json";
    this.inputPagingObj.deleteUrl = URLConstant.DeleteVerfSchemeHById;
  }
}
