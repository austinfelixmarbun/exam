import { Component, OnInit } from '@angular/core';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';

@Component({
  selector: 'app-role-paging',
  templateUrl: './role-paging.component.html',
  providers: [NgbPaginationConfig]
})
export class RolePagingComponent implements OnInit {

  inputPagingObj: UcPagingObj = new UcPagingObj();

  readonly AddLink: string = NavigationConstant.SYSTEM_SETTING_ROLE_DETAIL;
  constructor() {
  }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchRefRole.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchRefRole.json";
  }
}
