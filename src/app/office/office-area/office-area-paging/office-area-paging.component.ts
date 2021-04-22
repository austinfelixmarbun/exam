import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-office-area-paging',
  templateUrl: './office-area-paging.component.html'
})
export class OfficeAreaPagingComponent implements OnInit {
  inputPagingObj: UcPagingObj = new UcPagingObj();

  readonly AddLink: string = NavigationConstant.OFFICE_AREA_DETAIL;
  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchOfficeArea.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchOfficeArea.json";
  }
}
