import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'member-app-business-unit',
  templateUrl: './member-business-unit.component.html'
})
export class MemberBusinessUnitComponent implements OnInit {
  RefBizUnitId: string;
  viewObj: any;

  inputPagingObj: any;
  constructor(private route: ActivatedRoute){
    this.route.queryParams.subscribe(params => {
      this.RefBizUnitId = params["RefBizUnitId"];
  })
  }

  ngOnInit() {
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/ucpaging/searchBusinessUnitMember.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchBusinessUnitMember.json";
    this.inputPagingObj.ddlEnvironments = [
      {
        name: "D.JOB_TITLE_CODE",
        environment: environment.FoundationR3Url
      }
    ];

    this.inputPagingObj.addCritInput = new Array();
    var critInput = new CriteriaObj();
    critInput.propName = "A.REF_BIZ_UNIT_ID";
    critInput.restriction = AdInsConstant.RestrictionEq;
    critInput.value = this.RefBizUnitId;
    this.inputPagingObj.addCritInput.push(critInput);
    console.log(this.inputPagingObj);

    this.viewObj = "./assets/ucviewgeneric/viewBusinessUnitMember.json";
  }
}
