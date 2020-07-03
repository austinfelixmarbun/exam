import { Component, OnInit, ViewChild } from '@angular/core';
import { InputSearchObj } from 'app/shared/model/InputSearchObj.Model';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UCSearchComponent } from '@adins/ucsearch';
import { UcgridfooterComponent } from '@adins/ucgridfooter';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';

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
    this.inputPagingObj.apiQryPaging = AdInsConstant.GetOfficeZipCodeMemberPaging;
    this.inputPagingObj.pagingJson = "./assets/search/searchOfficeZipcodeMemberGridPaging.json"
    //** lib-ucpaging **//
  }

  //** Start UC Search **/
  
}
