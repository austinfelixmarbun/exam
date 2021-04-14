import { Component, OnInit } from '@angular/core';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-surveyor-paging',
  templateUrl: './surveyor-paging.component.html',
  styleUrls: ['./surveyor-paging.component.css']
})
export class SurveyorPagingComponent implements OnInit {

  readonly AddLink: string = NavigationConstant.SURVEYOR_ADD;

  inputPagingObj: UcPagingObj = new UcPagingObj();

  constructor() { }

  ngOnInit() {
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/ucpaging/searchSurveyor.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = URLConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchSurveyor.json";
    this.inputPagingObj.ddlEnvironments = [
      {
        name: "RM.MASTER_CODE",
        environment: environment.FoundationR3Url
      },
      {
        name: "RO.OFFICE_NAME",
        environment: environment.FoundationR3Url
      }
    ];
  }

}
