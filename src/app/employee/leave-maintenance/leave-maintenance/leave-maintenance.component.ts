import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'environments/environment';
import { RefEmpObj } from 'app/shared/model/RefEmpObj.Model';
import { HttpClient } from '@angular/common/http';
import { InputSearchObj } from 'app/shared/model/InputSearchObj.Model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { Observable } from 'rxjs';
import { UCSearchComponent } from '@adins/ucsearch';
import { UcgridfooterComponent } from '@adins/ucgridfooter';
import { formatDate, DecimalPipe } from '@angular/common';
import { RefEmpLeaveMngmntObj } from 'app/shared/model/RefEmpLeaveMngmntObj.Model';
import { UcPagingObj } from '../../../shared/model/UcPagingObj.Model';

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
