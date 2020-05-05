import { Component, OnInit } from '@angular/core';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { environment } from 'environments/environment';
import { DecimalPipe } from '@angular/common';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { UcpagingComponent } from '@adins/ucpaging';


@Component({
  selector: 'app-asset-master',
  templateUrl: './asset-master.component.html',
  styleUrls: ['./asset-master.component.scss'],
  providers: [DecimalPipe]
})
export class AssetMasterComponent implements OnInit {

  inputPagingObj: any;
  
  constructor() { }

  ngOnInit() {
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/ucpaging/searchAssetMaster.json";
    this.inputPagingObj.enviromentUrl = environment.foundationUrl;
    this.inputPagingObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchAssetMaster.json";
    this.inputPagingObj.deleteUrl = AdInsConstant.DeleteAssetMaster;
  }
}
