import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-system-user',
  templateUrl: './system-user.component.html'
})
export class SystemUserComponent implements OnInit {

  inputPagingObj: UcPagingObj = new UcPagingObj();

  readonly AddLink: string = NavigationConstant.SYS_DETAIL;
  constructor() { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/search/searchSystemUser.json";
    this.inputPagingObj.pagingJson = "./assets/search/searchSystemUser.json";
  }

}
