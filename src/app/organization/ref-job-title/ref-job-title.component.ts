import { Component, OnInit, ViewChild } from '@angular/core';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { environment } from 'environments/environment';
import { RefJobTitleObj } from 'app/shared/model/RefJobTitleObj.Model';
import { DecimalPipe } from '@angular/common';
import { UcPagingObj } from '../../shared/model/UcPagingObj.Model';

@Component({
  selector: 'app-ref-job-title',
  templateUrl: './ref-job-title.component.html',
  styleUrls: ['./ref-job-title.component.scss'],
  providers: [DecimalPipe] // add NgbPaginationConfig to the component providers

})
export class RefJobTitleComponent implements OnInit {

  inputPagingObj: any;

  constructor() { }

  ngOnInit() {
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/search/searchJobTitle.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/search/searchJobTitle.json";
    this.inputPagingObj.deleteUrl = AdInsConstant.DeleteRefJobTitle;
  }
}
