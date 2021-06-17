import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { URLConstant } from 'app/shared/constant/URLConstant';
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
  AppId: number;
  AppNo: number;

  constructor(private router: Router) { }

  ngOnInit() {
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj.apiQryPaging = URLConstant.GetPagingObjectBySQL;
    this.inputPagingObj._url = "./assets/ucpaging/searchSurveyTaskAssignment.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchSurveyTaskAssignment.json";
    
  }

  viewApp(event: any) {
    console.log(event);
    this.AppNo = event['RowObj'].TransactionRefNo;
    this.router.navigateByUrl(NavigationConstant.VIEW_CUST, { skipLocationChange: true }).then(() => {
      window.open(environment.losR3Web + "/View/AppView?AppId=" + this.AppId + "&AppNo=" + this.AppNo, "_blank");
    });

    this.router.navigateByUrl(NavigationConstant.SURVEY_TASK_ASSIGNMENT_PAGING, { skipLocationChange: true });
  }

}
