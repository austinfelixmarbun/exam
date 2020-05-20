import { Component, OnInit } from '@angular/core';
import { InputSearchObj } from 'app/shared/model/InputSearchObj.Model';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { InputReportObj } from '../dummy7/InputReportObj.model';

@Component({
  selector: 'app-dummy5',
  templateUrl: './dummy5.component.html',
  styleUrls: ['./dummy5.component.scss']
})
export class Dummy5Component implements OnInit {

  inputReportObj: InputReportObj = new InputReportObj();
  inputObj: any;
  resultData: any;
  constructor() { }

  ngOnInit() {
    this.inputReportObj.JsonPath = "./assets/ucreport/ReportDummy.json";
    this.inputReportObj.EnvironmentUrl = environment.FoundationR3Url;
    this.inputReportObj.ApiReportPath = "/Report/GenerateReportSync";

    this.inputObj = new InputSearchObj();
    this.inputObj._url = "./assets/ucpaging/searchTest.json";
    this.inputObj.enviromentUrl = environment.FoundationR3Url;
    this.inputObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputObj.ddlEnvironments = [
      {
        name: "A.MR_OFFICE_TYPE_CODE",
        environment: environment.localHostUrl
      },
      {
        name: "A.MR_OFFICE_CLASS_CODE",
        environment: environment.localHostUrl
      }
    ];
  }

  // ** Start UC Search **/
  getResult(event) {
    this.resultData = event.response;
  }

}
