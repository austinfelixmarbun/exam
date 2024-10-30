import { Component, OnInit } from '@angular/core';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-business-unit',
  templateUrl: './business-unit.component.html'
})

export class BusinessUnitComponent implements OnInit {

  inputPagingObj: UcPagingObj = new UcPagingObj();

  readonly AddLink: string = NavigationConstant.ORG_BZ_UNIT_DETAIL;
  constructor() { }
  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchBusinessUnit.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchBusinessUnit.json";

  }
}
