import { Component, OnInit, ViewChild } from '@angular/core';
import { UcpagingComponent } from '@adins/ucpaging';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';

@Component({
  selector: 'app-ref-industry-type',
  templateUrl: './ref-industry-type.component.html'
})
export class RefIndustryTypeComponent implements OnInit {

  @ViewChild(UcpagingComponent) ucpaging;
  inputPagingObj: UcPagingObj;

  constructor() { }

  ngOnInit() {
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/search/searchIndustryType.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/search/searchIndustryType.json";
    this.inputPagingObj.deleteUrl = AdInsConstant.DeleteRefIndustryType;
  }

}
