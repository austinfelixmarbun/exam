import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-employee-businessunit-paging',
  templateUrl: './employee-businessunit-paging.component.html'
})
export class EmployeeBusinessunitPagingComponent implements OnInit {

  RefUserId : string;
  inputPagingObj : UcPagingObj = new UcPagingObj();
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj();

  readonly CancelLink: string = NavigationConstant.EMP_PAGING;
  readonly AddLink: string = NavigationConstant.EMP_BZ_UNIT_ADD;
  constructor(private route: ActivatedRoute) { 
    this.route.queryParams.subscribe(params => {
      this.RefUserId = params["RefUserId"];
    })
  }

  ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewEmployeeBusinessUnitMember.json";

    this.inputPagingObj._url = "./assets/ucpaging/searchEmployeeBusinessUnit.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchEmployeeBusinessUnit.json";
    this.inputPagingObj.deleteUrl = environment.FoundationR3Url + "/v1" + "/RefUserRole/DeleteRefUserRole";

    var critInput = new CriteriaObj();
    critInput.propName = "usr.REF_USER_ID";
    critInput.restriction = AdInsConstant.RestrictionEq;
    critInput.value = this.RefUserId;
    this.inputPagingObj.addCritInput.push(critInput);
  }

}
