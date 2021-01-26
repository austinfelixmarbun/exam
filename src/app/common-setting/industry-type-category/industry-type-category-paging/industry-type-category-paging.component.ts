import { Component, OnInit } from '@angular/core';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { environment } from 'environments/environment';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
@Component({
  selector: 'app-industry-type-category-paging',
  templateUrl: './industry-type-category-paging.component.html'
})
export class IndustryTypeCategoryPagingComponent implements OnInit {

  inputPagingObj: UcPagingObj = new UcPagingObj();

  constructor() { }

  ngOnInit() {
  this.inputPagingObj._url = "./assets/search/searchIndustryTypeCategory.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = URLConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/search/searchIndustryTypeCategory.json";
    this.inputPagingObj.deleteUrl = URLConstant.DeleteRefIndustryType;
  }

}
