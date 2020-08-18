import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UcViewGenericObj } from 'app/shared/model/UcViewGenericObj.model';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-survey-task-view',
  templateUrl: './survey-task-view.component.html',
  styleUrls: ['./survey-task-view.component.scss']
})
export class SurveyTaskViewComponent implements OnInit {
  SrvyTaskId: string;
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj();
  
  constructor(private route: ActivatedRoute) { 
    this.route.queryParams.subscribe(params => {
      if (params["SrvyTaskId"] != null) {
        this.SrvyTaskId = params["SrvyTaskId"];
      }
    });
  }

  ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewSurveyTask.json";
    this.viewGenericObj.viewEnvironment = environment.FoundationR3Url;
  }

}
