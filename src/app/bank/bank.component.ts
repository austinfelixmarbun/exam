import { Component, OnInit } from '@angular/core';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html'
})
export class BankComponent implements OnInit {
  inputPagingObj: UcPagingObj = new UcPagingObj();

  readonly AddLink: string = NavigationConstant.CS_BANK_DETAIL;
  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchBank.json";
    this.inputPagingObj.deleteUrl = URLConstant.DeleteRefBank;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchBank.json";
  }

}