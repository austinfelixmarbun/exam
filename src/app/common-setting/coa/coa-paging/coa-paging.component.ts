import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-coa-paging',
  templateUrl: './coa-paging.component.html'
})
export class CoaPagingComponent implements OnInit {
  inputPagingObj: UcPagingObj = new UcPagingObj();
  isReady: boolean;

  readonly AddLink: string = NavigationConstant.CS_COA_DETAIL;
  constructor() { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/common-setting/coa/search-coa.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/common-setting/coa/search-coa.json";
    this.inputPagingObj.ddlEnvironments = [
      {
        name: "rc.PAYMENT_ALLOC_CODE",
        environment: environment.FoundationR3Url 
      },
      {
        name: "RC.MR_ENTITY_TYPE",
        environment: environment.FoundationR3Url 
      },
    ];
    this.isReady = true;
  }
}