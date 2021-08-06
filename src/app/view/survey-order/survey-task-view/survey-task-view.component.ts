import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { UcViewGenericObj } from 'app/shared/model/UcViewGenericObj.model';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-survey-task-view',
  templateUrl: './survey-task-view.component.html',
  styleUrls: ['./survey-task-view.component.scss']
})
export class SurveyTaskViewComponent implements OnInit {
  SrvyTaskId: string;
  htmlCode: string;
  isReady: boolean = false;
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj();
  viewGenericSbjctObj: UcViewGenericObj = new UcViewGenericObj();
  
  constructor(private route: ActivatedRoute, private http: HttpClient) { 
    this.route.queryParams.subscribe(params => {
      if (params["SrvyTaskId"] != null) {
        this.SrvyTaskId = params["SrvyTaskId"];
      }
    });
  }

  async ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewSurveyTask.json";
    this.viewGenericSbjctObj.viewInput = "./assets/ucviewgeneric/viewSrvyTaskSubject.json";
    await this.http.post(URLConstant.GetHtmlCodeFromMobile, { Id: this.SrvyTaskId }).subscribe(
      (response) => {
        this.htmlCode = response["HtmlCode"];
      }
    );
    this.isReady = true;
  }

}
