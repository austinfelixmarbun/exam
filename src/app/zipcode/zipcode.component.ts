import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { UcPagingObj } from '../shared/model/uc-paging-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-zipcode',
  templateUrl: './zipcode.component.html',
  styleUrls: ['./zipcode.component.scss'],
  providers: [DecimalPipe]
})
export class ZipcodeComponent implements OnInit {

  inputPagingObj: UcPagingObj = new UcPagingObj();

  readonly AddLink: string = NavigationConstant.CS_ZIPCODE_DETAIL;
  constructor() { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/search/searchZip.json";
    this.inputPagingObj.pagingJson = "./assets/search/searchZip.json";
  }
}
