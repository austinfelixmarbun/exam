import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';

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
  constructor() { }

  ngOnInit() {
    console.log("v2");
    //** lib-ucpaging **//
    var test = {
      _url : "./assets/search/searchBank.json",
      enviromentUrl : environment.settingUrl,
      apiQryPaging : AdInsConstant.GetBankPaging,
      deleteUrl : AdInsConstant.DeleteRefBank,
      pagingJson : "./assets/form-setting/dummyPaging.json"
    }
    this.inputObj = test;
    //** lib-ucpaging **//
    
    //** app-lookupgeneric **//
    this.inputLookupObj = new InputLookupObj();
    this.inputLookupObj.urlJson = "./assets/lookup/lookupRefBank.json";
    this.inputLookupObj.urlQryPaging = AdInsConstant.GetBankPaging;
    this.inputLookupObj.urlEnviPaging = environment.settingUrl;
    this.inputLookupObj.pagingJson = "./assets/form-setting/dummyPaging2.json";
    this.inputLookupObj.genericJson = "./assets/form-setting/dummyGeneric.json";
    this.inputLookupObj.jsonSelect = {refBankId:65, bankCode:"B-0009", bankName:"Bank Mandiri"};
    this.inputLookupObj.nameSelect = "Bank Mandiri";
    this.inputLookupObj.idSelect = "B-0009";
    //** app-lookupgeneric **//
  }

  SaveForm(form) {
    console.log(form.value);
    console.log(this.inputLookupObj);
  }
}
