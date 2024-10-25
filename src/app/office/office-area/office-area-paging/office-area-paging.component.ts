import { Component, OnInit } from '@angular/core';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-office-area-paging',
  templateUrl: './office-area-paging.component.html'
})
export class OfficeAreaPagingComponent implements OnInit {
  inputPagingObj: UcPagingObj = new UcPagingObj();

  readonly AddLink: string = NavigationConstant.OFFICE_AREA_DETAIL;

  constructor() { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchOfficeArea.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchOfficeArea.json";
  }
}
