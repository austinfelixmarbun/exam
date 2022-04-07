import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';

@Component({
  selector: 'app-survey-order-view',
  templateUrl: './survey-order-view.component.html'
})
export class SurveyOrderViewComponent implements OnInit {
  SrvyOrderId: string;
  TaskList = new Array();
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);

  readonly ViewLink: string = NavigationConstant.VIEW_SRVY_TASK;
  readonly ViewCust: string = NavigationConstant.VIEW_CUST_PERSONAL_DETAIL;
  
  constructor(private route: ActivatedRoute, private http: HttpClient, private UrlConstantNew: UrlConstantNew) {
    this.route.queryParams.subscribe(params => {
      if (params["SrvyOrderId"] != null) {
        this.SrvyOrderId = params["SrvyOrderId"];
      }
    });
  }

  ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewSurveyOrder.json";
    
    this.http.post(this.UrlConstantNew.GetListSrvyTaskBySrvyOrderIdForView, {Id : this.SrvyOrderId}).subscribe(
      response => {
        console.log(response);
        this.TaskList = response[CommonConstant.ReturnObj];
      }
    );
  }
}
