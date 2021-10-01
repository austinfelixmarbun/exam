import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UcViewGenericObj } from 'app/shared/model/UcViewGenericObj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';

@Component({
  selector: 'app-survey-order-view',
  templateUrl: './survey-order-view.component.html'
})
export class SurveyOrderViewComponent implements OnInit {
  SrvyOrderId: string;
  TaskList = new Array();
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj();

  readonly ViewLink: string = NavigationConstant.VIEW_SRVY_TASK;
  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.route.queryParams.subscribe(params => {
      /* istanbul ignore next */
      if (params["SrvyOrderId"] != null) {
        this.SrvyOrderId = params["SrvyOrderId"];
      }
    });
  }

  ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewSurveyOrder.json";
    
    /* istanbul ignore next */
    this.http.post(URLConstant.GetListSrvyTaskBySrvyOrderId, {Id : this.SrvyOrderId}).subscribe(
      response => {
        /* istanbul ignore next */
        this.TaskList = response[CommonConstant.ReturnObj];
      }
    );

  }

}
