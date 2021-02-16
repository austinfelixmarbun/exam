 
import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-attribute',
  templateUrl: './attribute.component.html'
})
export class AttributeComponent implements OnInit {

 
  inputPagingObj: UcPagingObj;

  readonly AddLink: string = NavigationConstant.SYSTEM_SETTING_ATTR_DETAIL;
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
