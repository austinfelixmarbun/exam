import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from 'environments/environment';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { URLConstant } from 'app/shared/constant/URLConstant';

@Component({
  selector: 'app-office-zipcode-member',
  templateUrl: './office-zipcode-member.component.html'
})
export class OfficeZipcodeMemberComponent implements OnInit {
  //** Start UC Search **//
  inputPagingObj: any;
  //** End UC Search **//
  constructor() {
  }

  ngOnInit() {
    //** lib-ucpaging **//
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/search/searchOfficeZipcodeMember.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = URLConstant.GetOfficeZipCodeMemberPaging;
    this.inputPagingObj.pagingJson = "./assets/search/searchOfficeZipcodeMemberGridPaging.json"
    //** lib-ucpaging **//
  }

  //** Start UC Search **/
  
}
