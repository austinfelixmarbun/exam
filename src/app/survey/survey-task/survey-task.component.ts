import { Component, OnInit } from '@angular/core';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-survey-task',
  templateUrl: './survey-task.component.html',
  styleUrls: ['./survey-task.component.css']
})
export class SurveyTaskComponent implements OnInit {

  inputPagingObj: UcPagingObj = new UcPagingObj();

  constructor() { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchSurveyTask.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = URLConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchSurveyTask.json";
    this.inputPagingObj.ddlEnvironments = [
      {
        name: "SO.MR_SURVEY_INITIAL_CODE",
        environment: environment.FoundationR3Url
      },
      {
        name: "RO.OFFICE_NAME",
        environment: environment.FoundationR3Url
      },
      {
        name: "ST.MR_SURVEY_TASK_STAT_CODE",
        environment: environment.FoundationR3Url
      },
      {
        name: "ST.MR_SRVY_OBJ_TYPE_CODE",
        environment: environment.FoundationR3Url
      }
    ];
  }

}
