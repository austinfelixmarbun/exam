import { Component, OnInit, ViewChild } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { UcpagingComponent } from '@adins/ucpaging';
import { URLConstant } from 'app/shared/constant/URLConstant';

@Component({
  selector: 'app-survey-order',
  templateUrl: './survey-order.component.html'
})
export class SurveyOrderComponent implements OnInit {

  @ViewChild(UcpagingComponent) ucPaging: UcpagingComponent;

  inputPagingObj: UcPagingObj = new UcPagingObj();

  constructor(private http: HttpClient, private toastr: NGXToastrService) {

  }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchSurveyOrder.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = URLConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchSurveyOrder.json";
    this.inputPagingObj.ddlEnvironments = [
      {
        name: "RM.MASTER_CODE",
        environment: environment.FoundationR3Url
      },
      {
        name: "RO.OFFICE_NAME",
        environment: environment.FoundationR3Url
      },
      {
        name: "RS.REF_STATUS_CODE",
        environment: environment.FoundationR3Url
      }
    ];
  }
}