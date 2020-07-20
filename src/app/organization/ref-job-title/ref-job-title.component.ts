import { Component, OnInit, ViewChild } from '@angular/core';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { environment } from 'environments/environment';
import { RefJobTitleObj } from 'app/shared/model/RefJobTitleObj.Model';
import { DecimalPipe } from '@angular/common';
import { UcPagingObj } from '../../shared/model/UcPagingObj.Model';
import { URLConstant } from 'app/shared/constant/URLConstant';

@Component({
  selector: 'app-ref-job-title',
  templateUrl: './ref-job-title.component.html',
  providers: [DecimalPipe] // add NgbPaginationConfig to the component providers

})
export class RefJobTitleComponent implements OnInit {

  inputPagingObj: any;

  constructor() { }

  ngOnInit() {
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/search/searchJobTitle.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = URLConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/search/searchJobTitle.json";
    this.inputPagingObj.deleteUrl = URLConstant.DeleteRefJobTitle;
  }
}
