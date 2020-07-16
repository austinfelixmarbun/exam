import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { DecimalPipe } from '@angular/common';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { URLConstant } from 'app/shared/constant/URLConstant';

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
    this.inputPagingObj.apiQryPaging = URLConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchWorkingHourSchm.json";
    this.inputPagingObj.deleteUrl = URLConstant.DeleteWorkingHourSchm;
  }
}
