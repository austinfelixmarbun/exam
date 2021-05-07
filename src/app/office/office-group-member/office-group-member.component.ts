import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { AdInsConstant } from "app/shared/AdInstConstant";
import { CriteriaObj } from "app/shared/model/CriteriaObj.Model";
import { environment } from "environments/environment";
import { CriteriaObj } from "app/shared/model/CriteriaObj.model";
import { UcPagingObj } from "app/shared/model/UcPagingObj.Model";
import { URLConstant } from "app/shared/constant/URLConstant";
import { UcViewGenericObj } from "app/shared/model/UcViewGenericObj.model";
import { NavigationConstant } from "app/shared/NavigationConstant";

@Component({
  selector: 'app-office-group-member',
  templateUrl: './office-group-member.component.html'
})
export class OfficeGroupMemberComponent implements OnInit {

  RefOfficeId: string;
  CenterGrpId: string;
  inputPagingObj: UcPagingObj = new UcPagingObj();
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj();

  readonly CancelLink: string = NavigationConstant.OFFICE_PAGING;
  readonly AddLink: string = NavigationConstant.OFFICE_GROUP_MEMBER_ADD;
  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.RefOfficeId = params["RefOfficeId"];
      this.CenterGrpId = params["CenterGrpId"];
    })
  }

  ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewOfficeCenterGrpMbr.json";

    this.inputPagingObj._url = "./assets/ucpaging/searchCenterGrpMbr.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchCenterGrpMbr.json";
    this.inputPagingObj.deleteUrl = URLConstant.DeleteCenterGrpOfficeMember;

    var critInput = new CriteriaObj();
    critInput.propName = "RO.REF_OFFICE_ID";
    critInput.restriction = AdInsConstant.RestrictionEq;
    critInput.value = this.RefOfficeId;
    this.inputPagingObj.addCritInput.push(critInput);
  }
}