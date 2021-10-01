import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-survey-result-review-paging',
  templateUrl: './survey-result-review-paging.component.html'  
})
export class SurveyResultReviewPagingComponent implements OnInit {

  inputPagingObj: UcPagingObj = new UcPagingObj();
  AppNo: string;
  AppId: number;

  constructor(private router: Router) { }  

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchSurveyResultReview.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchSurveyResultReview.json";
  }

  viewApp(event: any){
    this.AppNo = event['RowObj']['TrxRefNo'];
    window.open(environment.losR3Web + "/View/AppView?AppId=" + this.AppId + "&AppNo=" + this.AppNo, "_blank");
  }

}
