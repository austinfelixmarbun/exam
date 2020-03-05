import { Component, OnInit, ViewChild } from '@angular/core';
import { UcpagingComponent } from '@adins/ucpaging';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';

@Component({
  selector: 'app-ref-industry-type',
  templateUrl: './ref-industry-type.component.html',
  styleUrls: ['./ref-industry-type.component.scss']
})
export class RefIndustryTypeComponent implements OnInit {

  @ViewChild(UcpagingComponent) ucpaging;
  inputPagingObj: any;

  constructor() { }

  ngOnInit() {
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/search/searchIndustryType.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = "/Generic/GetPagingObjectBySQL";
    this.inputPagingObj.deleteUrl = AdInsConstant.DeleteRefIndustryType;
    this.inputPagingObj.pagingJson = "./assets/search/searchIndustryType.json";
  }

}
