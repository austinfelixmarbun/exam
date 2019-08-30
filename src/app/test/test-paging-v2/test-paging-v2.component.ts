import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';

@Component({
  selector: 'app-test-paging-v2',
  templateUrl: './test-paging-v2.component.html',
  styleUrls: ['./test-paging-v2.component.scss']
})
export class TestPagingV2Component implements OnInit {

  //** Start UC Search **//
  inputObj: any;
  inputPagingObj: any;
  inputLookupObj: any;
  //** End UC Search **//

  viewObj: any;
  constructor() { }

  ngOnInit() {
    console.log("v2");
    //** lib-ucpaging **//
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/search/searchBank.json";
    this.inputPagingObj.enviromentUrl = environment.settingUrl;
    this.inputPagingObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputPagingObj.deleteUrl = AdInsConstant.DeleteRefBank;
    this.inputPagingObj.pagingJson = "./assets/form-setting/dummyPaging.json";
    //** lib-ucpaging **//

    //** app-lookupgeneric **//
    this.inputLookupObj = new InputLookupObj();
    this.inputLookupObj.urlJson = "./assets/lookup/lookupRefBank.json";
    this.inputLookupObj.urlQryPaging = AdInsConstant.GetBankPaging;
    this.inputLookupObj.urlEnviPaging = environment.settingUrl;
    this.inputLookupObj.pagingJson = "./assets/form-setting/dummyPaging2.json";
    this.inputLookupObj.genericJson = "./assets/form-setting/dummyGeneric.json";
    this.inputLookupObj.isRequired = true;
    //** app-lookupgeneric **//


    //** app-viewgeneric **//
    this.viewObj = "./assets/form-setting/dummyView.json";
    //** app-viewgeneric **//
  }

  SaveForm(form) {
    console.log(form.value);
    console.log(this.inputLookupObj);
  }
}
