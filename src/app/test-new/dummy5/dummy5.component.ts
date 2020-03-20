import { Component, OnInit } from '@angular/core';
import { InputSearchObj } from 'app/shared/model/InputSearchObj.Model';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';

@Component({
  selector: 'app-dummy5',
  templateUrl: './dummy5.component.html',
  styleUrls: ['./dummy5.component.scss']
})
export class Dummy5Component implements OnInit {

  inputObj: any;
  resultData: any;
  constructor() { }

  ngOnInit() {
    this.inputObj = new InputSearchObj();
    this.inputObj._url = "./assets/ucpaging/searchTest.json";
    this.inputObj.enviromentUrl = environment.FoundationR3Url;
    this.inputObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;
  }

  // ** Start UC Search **/
  getResult(event) {
    this.resultData = event.response;
  }

}
