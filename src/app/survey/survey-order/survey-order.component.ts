import { Component, OnInit, ViewChild } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { UcpagingComponent } from '@adins/ucpaging';

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