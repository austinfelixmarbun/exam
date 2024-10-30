import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { NgxRouterService } from '@adins/fe-core';
import { URLConstant } from 'app/shared/constant/URLConstant';

@Component({
  selector: 'app-employee-businessunit-paging',
  templateUrl: './employee-businessunit-paging.component.html'
})
export class EmployeeBusinessunitPagingComponent implements OnInit {

  pageType: string ="emp";
  RefUserId : string;
  inputPagingObj : UcPagingObj = new UcPagingObj();
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj();

  CancelLink: string = NavigationConstant.EMP_PAGING;
  readonly AddLink: string = NavigationConstant.EMP_BZ_UNIT_ADD;
  constructor(private route: ActivatedRoute, private ngxRouter: NgxRouterService) { 
    this.route.queryParams.subscribe(params => {
      const queryParams = this.ngxRouter.getQueryParams(params);
      this.RefUserId = queryParams["RefUserId"];
      this.pageType = queryParams["mode"];
    })
  }

  ngOnInit() {
    if(this.pageType == "systemUser"){
      this.CancelLink = NavigationConstant.SYS_USER_PAGING;
    }
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewEmployeeBusinessUnitMember.json";

    this.inputPagingObj._url = "./assets/ucpaging/searchEmployeeBusinessUnit.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchEmployeeBusinessUnit.json";
    this.inputPagingObj.deleteUrl = URLConstant.env.FoundationR3Url + "/v1" + "/RefUserRole/DeleteRefUserRole";

    var critInput = new CriteriaObj();
    critInput.propName = "usr.REF_USER_ID";
    critInput.restriction = AdInsConstant.RestrictionEq;
    critInput.value = this.RefUserId;
    this.inputPagingObj.addCritInput.push(critInput);
  }

}
