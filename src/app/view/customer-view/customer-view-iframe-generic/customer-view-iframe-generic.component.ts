import { Component, Input, OnInit } from '@angular/core';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';
import { ResCustListIframeViewObj } from 'app/shared/model/response/cust-list-iframe-View/res-cust-list-iframe-view-obj.model';

@Component({
  selector: 'app-customer-view-iframe-generic',
  templateUrl: './customer-view-iframe-generic.component.html'
})
export class CustomerViewIframeGenericComponent implements OnInit {
  @Input() inputObj: any;
  @Input() iframeObj: ResCustListIframeViewObj = new ResCustListIframeViewObj;

  rootServer: string;
  IsReady: boolean = false;
  urlLink: string = '';

  constructor(
    private UrlConstantNew: UrlConstantNew) { }

  ngOnInit() {
    let queryParam: string = '';
    queryParam = this.genQueryParam();
    this.urlLink = this.UrlConstantNew.env.losR3Web + this.iframeObj.Url + queryParam;
    this.IsReady = true;

  }

  genQueryParam() {
    let arrList = {};

    for(let i = 0; i < this.iframeObj.Params.length; i++){
      if(this.inputObj[this.iframeObj.Params[i].Value] != null && this.inputObj[this.iframeObj.Params[i].Value] != undefined) {
        arrList[this.iframeObj.Params[i].Key] = this.inputObj[this.iframeObj.Params[i].Value];
      }
    }
    let queryParam: string = '?' + Object.keys(arrList).map(key => `${key}=${arrList[key]}`).join('&');
    return queryParam;
  }
}
