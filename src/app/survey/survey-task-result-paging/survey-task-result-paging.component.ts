import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';

@Component({
  selector: 'app-survey-task-result-paging',
  templateUrl: './survey-task-result-paging.component.html'
})
export class SurveyTaskResultPagingComponent implements OnInit {

  inputPagingObj: UcPagingObj = new UcPagingObj();
  AppId: number;
  AppNo: number;

  constructor(private router: Router, private UrlConstantNew: UrlConstantNew) { }

  ngOnInit() {
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj.apiQryPaging = this.UrlConstantNew.GetPagingObjectBySQL;
    this.inputPagingObj._url = "./assets/ucpaging/searchSurveyTaskResult.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchSurveyTaskResult.json";
    
  }

}
