import { Component, OnInit, ViewChild } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { UCSearchComponent } from '@adins/ucsearch';
import { UcpagingComponent } from '@adins/ucpaging';

@Component({
  selector: 'app-survey-order',
  templateUrl: './survey-order.component.html'
})
export class SurveyOrderComponent implements OnInit {

  @ViewChild(UcpagingComponent) ucPaging: UcpagingComponent;

  inputPagingObj: any;

  constructor(private http: HttpClient,private toastr: NGXToastrService)
  {

  }

  ngOnInit() {
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/ucpaging/searchSurveyOrder.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchSurveyOrder.json";
    this.inputPagingObj.ddlEnvironments = [
      {
        name: "RE.REF_OFFICE_ID",
        environment: environment.FoundationR3Url
      },
      {
        name: "SO.MR_SRVY_SOURCE_CODE",
        environment: environment.FoundationR3Url
      },
      {
        name: "SO.MR_SRVY_STAT_CODE",
        environment: environment.FoundationR3Url
      }
    ];
  }

  event(ev){
    var SrvyOrderObj = {
      SrvyOrderId: ev.RowObj.SrvyOrderId
    }
    this.http.post(AdInsConstant.SendSrvyOrder, SrvyOrderObj).subscribe(
      response => {
        this.toastr.successMessage(response["Message"]);
        this.ucPaging.searchPagination(1);
      },
      error => {
        console.log(error);
      }
    );
  }
}