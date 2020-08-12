import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-ref-attr',
  templateUrl: './ref-attr.component.html',
  styles: []
})
export class RefAttrComponent implements OnInit {

  inputPagingObj: UcPagingObj;

  constructor() { 
    this.inputPagingObj = new UcPagingObj();
  }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchRefAttr.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = "/Generic/GetPagingObjectBySQL";
    this.inputPagingObj.deleteUrl = "";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchRefAttr.json";
  }

}
