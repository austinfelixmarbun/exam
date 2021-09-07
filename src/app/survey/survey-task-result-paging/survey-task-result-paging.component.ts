import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-survey-task-result-paging',
  templateUrl: './survey-task-result-paging.component.html'
})
export class SurveyTaskResultPagingComponent implements OnInit {

  inputPagingObj: UcPagingObj = new UcPagingObj();
  AppId: number;
  AppNo: number;

  constructor(private router: Router) { }

  ngOnInit() {
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj.apiQryPaging = URLConstant.GetPagingObjectBySQL;
    this.inputPagingObj._url = "./assets/ucpaging/searchSurveyTaskResult.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchSurveyTaskResult.json";
    
  }

}
