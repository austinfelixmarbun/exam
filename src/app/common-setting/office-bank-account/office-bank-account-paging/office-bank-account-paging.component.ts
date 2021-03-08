import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { URLConstant } from 'app/shared/constant/URLConstant';

@Component({
  selector: 'app-office-bank-account-paging',
  templateUrl: './office-bank-account-paging.component.html'
})
export class OfficeBankAccountPagingComponent implements OnInit {
  inputPagingObj: UcPagingObj = new UcPagingObj();
  isReady: boolean;

  constructor() { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/common-setting/office-bank-account/search-office-bank-account-paging.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = URLConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/common-setting/office-bank-account/search-office-bank-account-paging.json";
    this.inputPagingObj.deleteUrl = URLConstant.DeleteOfficeBankAcc;
    this.inputPagingObj.ddlEnvironments = [
      {
        name: "RO.OFFICE_CODE",
        environment: environment.FoundationR3Url 
      },
      {
        name: "OBA.MR_BANK_ACC_PURPOSE_CODE",
        environment: environment.FoundationR3Url
      },
      {
        name: "OBA.BANK_ACC_TYPE",
        environment: environment.FoundationR3Url
      }
    ];

    this.isReady = true;
  }

  terimaCallBack(ev){

  }
}