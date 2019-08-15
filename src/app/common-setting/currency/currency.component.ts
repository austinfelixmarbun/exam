import { Component, OnInit } from '@angular/core';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { environment } from 'environments/environment';
import { DecimalPipe } from '@angular/common';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss'],
  providers: [DecimalPipe]
})
export class CurrencyComponent implements OnInit {

  inputPagingObj: any;
  
  constructor() { }

  ngOnInit() {
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/search/searchCurrency.json";
    this.inputPagingObj.enviromentUrl = environment.settingUrl;
    this.inputPagingObj.apiQryPaging = AdInsConstant.GetRefCurrPaging;
    this.inputPagingObj.pagingJson = "./assets/form-setting/currencyPaging.json";
  }
}
