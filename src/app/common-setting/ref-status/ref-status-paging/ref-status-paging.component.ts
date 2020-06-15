import { environment } from "environments/environment";
import { Component, OnInit, ViewChild } from "@angular/core";
import { AdInsConstant } from "app/shared/AdInstConstant";
import { DecimalPipe } from "@angular/common";
import { UcPagingObj } from "app/shared/model/UcPagingObj.Model";

@Component({
  selector: "app-ref-status-paging",
  templateUrl: "./ref-status-paging.component.html",
  providers: [DecimalPipe]
})
export class RefStatusPagingComponent implements OnInit {
  inputPagingObj: any;

  constructor() { }

  ngOnInit() {
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/ucpaging/searchRefStatus.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchRefStatus.json";
    this.inputPagingObj.ddlEnvironments = [
      {
        name: "MODULE_CODE",
        environment: environment.FoundationR3Url
      },
      {
        name: "REF_TRX_TYPE_ID",
        environment: environment.FoundationR3Url
      }
    ];
  }
}
