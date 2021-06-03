import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.Model';
import { ActivatedRoute } from '@angular/router';
import { UcViewGenericObj } from 'app/shared/model/UcViewGenericObj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'member-app-business-unit',
  templateUrl: './member-business-unit.component.html'
})
export class MemberBusinessUnitComponent implements OnInit {
  RefBizUnitId: string;
  inputPagingObj: UcPagingObj = new UcPagingObj();
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj();
  
  readonly CancelLink: string = NavigationConstant.ORG_BZ_UNIT;
  constructor(private route: ActivatedRoute){
    this.route.queryParams.subscribe(params => {
      this.RefBizUnitId = params["RefBizUnitId"];
  })
  }

  ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewBusinessUnitMember.json";

    this.inputPagingObj._url = "./assets/ucpaging/searchBusinessUnitMember.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchBusinessUnitMember.json";

    var critInput = new CriteriaObj();
    critInput.propName = "RUR.REF_BIZ_UNIT_ID";
    critInput.restriction = AdInsConstant.RestrictionEq;
    critInput.value = this.RefBizUnitId;
    this.inputPagingObj.addCritInput.push(critInput);
  }
}
