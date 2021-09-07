import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-economic-sector-slik-paging-x',
  templateUrl: './economic-sector-slik-paging-x.component.html'
})
export class EconomicSectorSlikPagingXComponent implements OnInit {

  inputPagingObj: UcPagingObj = new UcPagingObj();

  readonly AddLink: string = NavigationConstant.CS_ECONOMIC_SECTOR_SLIK_DETAIL;
  constructor() { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchEconomicSectorSlik.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchEconomicSectorSlik.json";
  }
}
