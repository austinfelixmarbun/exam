import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-ref-industry-type',
  templateUrl: './ref-industry-type.component.html'
})
export class RefIndustryTypeComponent implements OnInit {

  inputPagingObj: UcPagingObj = new UcPagingObj();

  readonly AddLink: string = NavigationConstant.CS_INDUSTRY_TYPE_DETAIL;
  constructor() { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/search/searchIndustryType.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = URLConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/search/searchIndustryType.json";
    this.inputPagingObj.deleteUrl = URLConstant.DeleteRefIndustryType;
  }

}
