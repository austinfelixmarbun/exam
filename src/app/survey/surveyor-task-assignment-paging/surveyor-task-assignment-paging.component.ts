import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-surveyor-task-assignment-paging',
  templateUrl: './surveyor-task-assignment-paging.component.html',
  
})
export class SurveyorTaskAssignmentPagingComponent implements OnInit {

  readonly AddLink: string = NavigationConstant.SURVEYOR_PAGING;

  inputPagingObj: UcPagingObj = new UcPagingObj();
  
  constructor() { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchSurveyorTaskAssignment.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchSurveyorTaskAssignment.json"; 
    this.inputPagingObj.ddlEnvironments = [      
      {
        name: "RO.OFFICE_NAME",
        environment: environment.FoundationR3Url
      }
    ];  
  }

}
