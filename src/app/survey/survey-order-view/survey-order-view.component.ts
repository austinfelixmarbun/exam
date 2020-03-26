import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdInsConstant } from 'app/shared/AdInstConstant';

@Component({
  selector: 'app-survey-order-view',
  templateUrl: './survey-order-view.component.html',
  styleUrls: ['./survey-order-view.component.scss']
})
export class SurveyOrderViewComponent implements OnInit {

  viewObj: string;
  SrvyOrderId: string;
  TaskList = new Array();

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.route.queryParams.subscribe(params => {
      if (params["SrvyOrderId"] != null) {
        this.SrvyOrderId = params["SrvyOrderId"];
      }
    });
  }

  ngOnInit() {
    this.viewObj = "./assets/ucviewgeneric/viewSurveyOrder.json";

    var SrvyTaskObj = {
      SrvyOrderId: this.SrvyOrderId,
      RowVersion: ""
    }
    this.http.post(AdInsConstant.GetListSrvyTaskBySrvyOrderId, SrvyTaskObj).subscribe(
      response => {
        this.TaskList = response["ReturnObject"];
      },
      error => {
        console.log(error);
      }
    );

  }

}
