import { Component, OnInit } from '@angular/core';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-survey-task',
  templateUrl: './survey-task.component.html'
})
export class SurveyTaskComponent implements OnInit {

  inputPagingObj: UcPagingObj = new UcPagingObj();
  srvyTaskId: number;

  constructor() { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchSurveyTask.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchSurveyTask.json";
    
  }

  getCallback(event){
    this.srvyTaskId = event['RowObj']['SrvyTaskId'];
    AdInsHelper.OpenSurveyTaskViewBySrvyTaskId(this.srvyTaskId);
  }
}
