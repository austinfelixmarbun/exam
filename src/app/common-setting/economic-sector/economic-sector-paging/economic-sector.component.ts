import { Component, OnInit } from '@angular/core';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { environment } from 'environments/environment';
import { DecimalPipe } from '@angular/common';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { UcpagingComponent } from '@adins/ucpaging';


@Component({
  selector: 'app-economic-sector',
  templateUrl: './economic-sector.component.html',
  styleUrls: ['./economic-sector.component.scss'],
  providers: [DecimalPipe]
})
export class EconomicSectorComponent implements OnInit {

  inputPagingObj: any;
  
  constructor() { }

  ngOnInit() {
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/ucpaging/searchEconomicSector.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchEconomicSector.json";
    this.inputPagingObj.deleteUrl = AdInsConstant.DeleteRefEconomicSector;
  }
}
