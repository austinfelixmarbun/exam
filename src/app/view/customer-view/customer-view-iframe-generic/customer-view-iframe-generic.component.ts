import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-customer-view-iframe-generic',
  templateUrl: './customer-view-iframe-generic.component.html'
})
export class CustomerViewIframeGenericComponent implements OnInit {
  @Input() inputObj: any;
  @Input() iframeObj: any;

  rootServer: string;
  IsReady: boolean = false;
  urlLink: string = '';

  constructor() { }

  ngOnInit() {
    let queryParam: string = '';
    queryParam = this.genQueryParam();
    // this.rootServer = environment.losR3Web;
    this.urlLink = this.iframeObj.Url + queryParam;
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
