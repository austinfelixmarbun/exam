import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'environments/environment';
import { DecimalPipe } from '@angular/common';
import { UcPagingObj } from '../shared/model/UcPagingObj.Model';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-zipcode',
  templateUrl: './zipcode.component.html',
  styleUrls: ['./zipcode.component.scss'],
  providers: [DecimalPipe]
})
export class ZipcodeComponent implements OnInit {

  inputPagingObj: any;

  readonly AddLink: string = NavigationConstant.CS_ZIPCODE_DETAIL;
  constructor() { }

  ngOnInit() {
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/search/searchZip.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = URLConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/search/searchZip.json";
    this.inputPagingObj.deleteUrl = URLConstant.DeleteRefZipcode;
  }
}
