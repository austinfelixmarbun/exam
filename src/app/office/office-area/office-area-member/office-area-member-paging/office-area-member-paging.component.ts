import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UcPagingObj, WhereValueObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.Model';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { UcViewGenericObj } from 'app/shared/model/UcViewGenericObj.model';

@Component({
  selector: 'app-office-area-member-paging',
  templateUrl: './office-area-member-paging.component.html'
})
export class OfficeAreaMemberPagingComponent implements OnInit {

  param: any;
  RefOfficeAreaId: string;
  inputPagingObj: any;
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj();
  constructor(private route: ActivatedRoute){
    this.route.queryParams.subscribe(params => {
      this.RefOfficeAreaId = params["RefOfficeAreaId"];
  })
  }

  ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewOfficeAreaMember.json";
    this.viewGenericObj.viewEnvironment = environment.FoundationR3Url;

    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/ucpaging/searchOfficeAreaMember.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = URLConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchOfficeAreaMember.json";
    this.inputPagingObj.deleteUrl = URLConstant.UpdateRefOfficeAreaId;

    var whereValue = new WhereValueObj();
    whereValue.property = "RefOfficeAreaId";
    whereValue.value = this.RefOfficeAreaId;
    this.inputPagingObj.whereValue.push(whereValue);
  }

}
