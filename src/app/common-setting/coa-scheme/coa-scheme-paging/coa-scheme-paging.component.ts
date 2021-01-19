import { Component, OnInit } from '@angular/core';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-coa-scheme-paging',
  templateUrl: './coa-scheme-paging.component.html'
})
export class CoaSchemePagingComponent implements OnInit {
  inputPagingObj: UcPagingObj = new UcPagingObj();
  isReady: boolean;

  constructor() { }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/common-setting/coa-scheme/search-coa-scheme.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = URLConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/common-setting/coa-scheme/search-coa-scheme.json";
    
    this.isReady = true;
  }

  getCallback(event) {
    if (event.Key == "view") {
      var url = "http://r3impl-websvr.ad-ins.com/Foundation/CommonSettingView/coascheme/view?CoaSchmId=" + event.RowObj.CoaSchmId
      window.open(url, "_blank")
    }
  }
}