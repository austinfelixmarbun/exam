import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { URLConstant } from 'app/shared/constant/URLConstant';


@Component({
  selector: 'app-reason',
  templateUrl: './reason.component.html'
})
export class ReasonComponent implements OnInit {

  inputPagingObj: UcPagingObj = new UcPagingObj();

  constructor() { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchReason.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = URLConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchReason.json";
    this.inputPagingObj.ddlEnvironments = [
      {
        name: "REF_REASON_TYPE_CODE",
        environment: environment.FoundationR3Url
      }
    ];
  }
}
