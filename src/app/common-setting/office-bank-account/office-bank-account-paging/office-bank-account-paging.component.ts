import { Component, OnInit } from '@angular/core';
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
    this.inputPagingObj.pagingJson = "./assets/ucpaging/common-setting/office-bank-account/search-office-bank-account-paging.json";
    this.inputPagingObj.deleteUrl = URLConstant.DeleteOfficeBankAcc;

    this.isReady = true;
  }

  terimaCallBack(ev){

  }
}