import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { UcViewGenericObj } from 'app/shared/model/UcViewGenericObj.model';

@Component({
  selector: 'app-employee-businessunit-paging',
  templateUrl: './employee-businessunit-paging.component.html',
  styleUrls: ['./employee-businessunit-paging.component.scss']
})
export class EmployeeBusinessunitPagingComponent implements OnInit {

  RefUserId : string;
  inputPagingObj : any;
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj();

  constructor(private route: ActivatedRoute) { 
    this.route.queryParams.subscribe(params => {
      this.RefUserId = params["RefUserId"];
    })
  }

  ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewEmployeeBusinessUnitMember.json";
    this.viewGenericObj.viewEnvironment = environment.FoundationR3Url;

    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/ucpaging/searchEmployeeBusinessUnit.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchEmployeeBusinessUnit.json";
    this.inputPagingObj.deleteUrl = "/RefUserRole/DeleteRefUserRole";
    this.inputPagingObj.addCritInput = new Array();

    var critInput = new CriteriaObj();
    critInput.propName = "usr.REF_USER_ID";
    critInput.restriction = AdInsConstant.RestrictionEq;
    critInput.value = this.RefUserId;
    this.inputPagingObj.addCritInput.push(critInput);
  }

}
