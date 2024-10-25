import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UcPagingObj, WhereValueObj } from 'app/shared/model/uc-paging-obj.model';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { NgxRouterService } from '@adins/fe-core';

@Component({
  selector: 'app-office-area-member-paging',
  templateUrl: './office-area-member-paging.component.html'
})
export class OfficeAreaMemberPagingComponent implements OnInit {

  param: any;
  RefOfficeAreaId: string;
  inputPagingObj: UcPagingObj = new UcPagingObj();
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj();

  readonly CancelLink: string = NavigationConstant.OFFICE_AREA;
  readonly AddLink: string = NavigationConstant.OFFICE_AREA_MEMBER_ADD;
  constructor(private route: ActivatedRoute, private ngxRouter: NgxRouterService){
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      this.RefOfficeAreaId = queryParams["RefOfficeAreaId"];
  })
  }

  ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewOfficeAreaMember.json";

    this.inputPagingObj._url = "./assets/ucpaging/searchOfficeAreaMember.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchOfficeAreaMember.json";
    this.inputPagingObj.deleteUrl = URLConstant.UpdateRefOfficeAreaId;

    var whereValue = new WhereValueObj();
    whereValue.property = "RefOfficeAreaId";
    whereValue.value = this.RefOfficeAreaId;
    this.inputPagingObj.whereValue.push(whereValue);
  }

}
