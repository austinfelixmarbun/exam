import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';

@Component({
  selector: 'app-self-custom-surveyor-task-assignment-paging',
  templateUrl: './self-custom-surveyor-task-assignment-paging.component.html',

})
export class SelfCustomSurveyorTaskAssignmentPagingComponent implements OnInit {
  pageName: string;
  AppId: number;
  AppNo: number;

  constructor(private http: HttpClient, private UrlConstantNew: UrlConstantNew) {
    this.pageName = "SurveyTaskAssignment"
  }

  ngOnInit(): void {
  }

  handler = {
    callback: ($event) => this.callback($event)
  };

  callback(event) {
    if (event.Key === "view") {
      this.AppNo = event['RowObj'].TransactionRefNo;
    window.open(this.UrlConstantNew.env.losR3Web + "/View/AppView?AppId=" + this.AppId + "&AppNo=" + this.AppNo, "_blank");
    }
  }
}
