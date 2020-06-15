import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';

@Component({
  selector: 'app-edit-main-data-paging',
  templateUrl: './edit-main-data-paging.component.html',
  styleUrls: ['./edit-main-data-paging.component.scss']
})
export class EditMainDataPagingComponent implements OnInit {
  inputPagingObj: UcPagingObj;

  constructor() { }
  ngOnInit() {
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/ucpaging/editMainDataCustomer.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/editMainDataCustomer.json";
    this.inputPagingObj.deleteUrl = AdInsConstant.DeleteAssetAccessory;
    this.inputPagingObj.ddlEnvironments = [
      {
        name: "C.MR_CUST_TYPE_CODE",
        environment: environment.FoundationR3Url
      }
    ];
  }
}
