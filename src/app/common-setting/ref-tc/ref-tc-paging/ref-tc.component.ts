import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-ref-tc',
  templateUrl: './ref-tc.component.html'
})
export class RefTcComponent implements OnInit {
  inputPagingObj: UcPagingObj = new UcPagingObj();

  readonly AddLink: string = NavigationConstant.CS_REF_TC_DETAIL;
  constructor() { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchRefTc.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchRefTc.json";
  }
}
