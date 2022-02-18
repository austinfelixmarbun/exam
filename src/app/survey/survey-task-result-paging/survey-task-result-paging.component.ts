import { Component, OnInit } from '@angular/core';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';

@Component({
  selector: 'app-survey-task-result-paging',
  templateUrl: './survey-task-result-paging.component.html'
})
export class SurveyTaskResultPagingComponent implements OnInit {

  inputPagingObj: UcPagingObj = new UcPagingObj();
  AppId: number;
  AppNo: number;

  constructor() { }

  ngOnInit() {
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputPagingObj._url = "./assets/ucpaging/searchSurveyTaskResult.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchSurveyTaskResult.json";
    
  }

}
