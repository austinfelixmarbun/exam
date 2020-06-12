import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { DecimalPipe } from '@angular/common';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';

@Component({
  selector: 'app-leave-maintenance',
  templateUrl: './leave-maintenance.component.html',
  styleUrls: ['./leave-maintenance.component.scss'],
  providers: [DecimalPipe]
})
export class LeaveMaintenanceComponent implements OnInit {

  inputPagingObj: any;

  constructor() { }

  ngOnInit() {
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/search/searchLeaveMaintenance.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/search/searchLeaveMaintenance.json";
    this.inputPagingObj.deleteUrl = AdInsConstant.DeleteRefEmpLeaveMngmnt;
  }
}
