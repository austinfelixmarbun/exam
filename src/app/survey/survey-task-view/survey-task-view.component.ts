import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-survey-task-view',
  templateUrl: './survey-task-view.component.html',
  styleUrls: ['./survey-task-view.component.scss']
})
export class SurveyTaskViewComponent implements OnInit {

  viewObj: string;
  SrvyTaskId: string;
  
  constructor(private route: ActivatedRoute) { 
    this.route.queryParams.subscribe(params => {
      if (params["SrvyTaskId"] != null) {
        this.SrvyTaskId = params["SrvyTaskId"];
      }
    });
  }

  ngOnInit() {
    this.viewObj = "./assets/ucviewgeneric/viewSurveyTask.json";
  }

}
