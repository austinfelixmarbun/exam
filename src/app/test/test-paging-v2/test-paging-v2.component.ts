import { Component, OnInit } from '@angular/core';
import { InputSearchObj } from 'app/shared/model/InputSearchObj.Model';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';

@Component({
  selector: 'app-test-paging-v2',
  templateUrl: './test-paging-v2.component.html',
  styleUrls: ['./test-paging-v2.component.scss']
})
export class TestPagingV2Component implements OnInit {

  //** Start UC Search **//
  inputObj: any;
  //** End UC Search **//
  constructor() { }

  ngOnInit() {
    var test = {
      _url : "./assets/search/searchBank.json",
      enviromentUrl : environment.settingUrl,
      apiQryPaging : AdInsConstant.GetBankPaging,
      deleteUrl : AdInsConstant.DeleteRefBank,
      pagingJson : "./assets/form-setting/dummyPaging.json"
    }
    this.inputObj = test;
  }

}
