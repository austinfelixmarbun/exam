import { Component, OnInit, ViewChild } from '@angular/core';
import { UcgridfooterComponent } from '@adins/ucgridfooter';
import { UCSearchComponent } from '@adins/ucsearch';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { environment } from 'environments/environment';
import { WorkingHourSchmHObj } from 'app/shared/model/WorkingHourSchmHObj.Model';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { DecimalPipe } from '@angular/common';
import { InputSearchObj } from 'app/shared/model/InputSearchObj.Model';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';

@Component({
  selector: 'app-working-hour-paging',
  templateUrl: './working-hour-paging.component.html',
  providers: [NGXToastrService, DecimalPipe]
})
export class WorkingHourPagingComponent implements OnInit {
  inputPagingObj: any;
  
  constructor(private http: HttpClient, private toastr: NGXToastrService) { }

  ngOnInit() {
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/ucpaging/searchWorkingHourSchm.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchWorkingHourSchm.json";
    this.inputPagingObj.deleteUrl = AdInsConstant.DeleteWorkingHourSchm;
  }
}
