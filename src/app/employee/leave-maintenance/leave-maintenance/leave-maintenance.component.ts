import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';

@Component({
  selector: 'app-leave-maintenance',
  templateUrl: './leave-maintenance.component.html',
  providers: [DecimalPipe]
})
export class LeaveMaintenanceComponent implements OnInit {

  inputPagingObj: UcPagingObj = new UcPagingObj();

  readonly AddLink: string = NavigationConstant.EMP_LEAVE_ADD;
  constructor() { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/search/searchLeaveMaintenance.json";
    this.inputPagingObj.pagingJson = "./assets/search/searchLeaveMaintenance.json";
    this.inputPagingObj.deleteUrl = URLConstant.DeleteRefEmpLeaveMngmnt;
  }
}
