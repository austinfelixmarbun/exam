import { Component, OnInit } from '@angular/core';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { environment } from 'environments/environment';
import { DecimalPipe } from '@angular/common';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { UcpagingComponent } from '@adins/ucpaging';

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.scss'],
  providers: [DecimalPipe]
})
export class OfficeComponent implements OnInit {
  foundationUrl: any = environment.foundationUrl;

  inputPagingObj: any;
  
  constructor() { }

  ngOnInit() {
      this.inputPagingObj = new UcPagingObj();
      this.inputPagingObj._url = "./assets/ucpaging/searchOffice.json";
      this.inputPagingObj.enviromentUrl = this.foundationUrl;
      this.inputPagingObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;
      this.inputPagingObj.pagingJson = "./assets/ucpaging/searchOffice.json";
  } 
}
