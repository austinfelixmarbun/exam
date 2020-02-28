import { Component, OnInit } from '@angular/core';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { environment } from 'environments/environment';
import { DecimalPipe } from '@angular/common';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { UcpagingComponent } from '@adins/ucpaging';

@Component({
  selector: 'app-office-area-paging',
  templateUrl: './office-area-paging.component.html',
  providers: [DecimalPipe]
})
export class OfficeAreaPagingComponent implements OnInit {
  foundationUrl: any = environment.foundationUrl;

  inputPagingObj: any;
  
  constructor() { }

  ngOnInit() {
      this.inputPagingObj = new UcPagingObj();
      this.inputPagingObj._url = "./assets/ucpaging/searchOfficeArea.json";
      this.inputPagingObj.enviromentUrl = "http://localhost/R3/Foundation";
      this.inputPagingObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;
      this.inputPagingObj.pagingJson = "./assets/ucpaging/searchOfficeArea.json";
  } 
}
