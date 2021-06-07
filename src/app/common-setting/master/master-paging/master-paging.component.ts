import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-master-paging',
  templateUrl: './master-paging.component.html'
})
export class MasterPagingComponent implements OnInit {
  inputPagingObj: UcPagingObj = new UcPagingObj();

  readonly AddLink: string = NavigationConstant.CS_MASTER_DETAIL;
  ngOnInit() {
    this.inputPagingObj._url = "./assets/search/searchMaster.json";
    this.inputPagingObj.pagingJson = "./assets/search/searchMaster.json";
  }
}
