import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';

@Component({
  selector: 'member-app-business-unit',
  templateUrl: './member-business-unit.component.html'
})
export class MemberBusinessUnitComponent implements OnInit {
  inputPagingObj: any;

  ngOnInit() {
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/ucpaging/searchBusinessUnitMember.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchBusinessUnitMember.json";
  }
}
