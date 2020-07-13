import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { UcViewGenericObj } from 'app/shared/model/UcViewGenericObj.model';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-survey-order-view',
  templateUrl: './survey-order-view.component.html'
})
export class SurveyOrderViewComponent implements OnInit {
  SrvyOrderId: string;
  TaskList = new Array();
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj();

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.route.queryParams.subscribe(params => {
      if (params["SrvyOrderId"] != null) {
        this.SrvyOrderId = params["SrvyOrderId"];
      }
    });
  }

  ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewSurveyOrder.json";
    this.viewGenericObj.viewEnvironment = environment.FoundationR3Url;

    var SrvyTaskObj = {
      SrvyOrderId: this.SrvyOrderId,
      RowVersion: ""
    }
    this.http.post(URLConstant.GetListSrvyTaskBySrvyOrderId, SrvyTaskObj).subscribe(
      response => {
        this.TaskList = response["ReturnObject"];
      },
      error => {
        console.log(error);
      }
    );

  }

}
