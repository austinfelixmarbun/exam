 
import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-attribute',
  templateUrl: './attribute.component.html'
})
export class AttributeComponent implements OnInit {

 
  inputPagingObj: UcPagingObj = new UcPagingObj();

  readonly AddLink: string = NavigationConstant.SYSTEM_SETTING_ATTR_DETAIL;
  constructor() { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchRefAttr.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchRefAttr.json";
  }

}
