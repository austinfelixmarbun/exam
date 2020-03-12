import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { AdInsConstant } from "app/shared/AdInstConstant";
import { environment } from "environments/environment";
import { CriteriaObj } from "app/shared/model/CriteriaObj.model";
import { UcPagingObj } from "app/shared/model/UcPagingObj.Model";

@Component({
  selector: 'app-office-group-member',
  templateUrl: './office-group-member.component.html',
  styleUrls: ['./office-group-member.component.scss'],
})
export class OfficeGroupMemberComponent implements OnInit {

  RefOfficeId: string;
  CenterGrpId: string;
  viewObj: any;
  inputPagingObj: any;

  constructor(private route: ActivatedRoute){
    this.route.queryParams.subscribe(params => {
      this.RefOfficeId = params["RefOfficeId"];
      this.CenterGrpId = params["CenterGrpId"];
  })
  }

  ngOnInit() {
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/ucpaging/searchCenterGrpMbr.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchCenterGrpMbr.json";
    this.inputPagingObj.addCritInput = new Array();
    this.inputPagingObj.deleteUrl = AdInsConstant.DeleteCenterGrpOfficeMember;

    var critInput = new CriteriaObj();
    critInput.propName = "RO.REF_OFFICE_ID";
    critInput.restriction = AdInsConstant.RestrictionEq;
    critInput.value = this.RefOfficeId;
    this.inputPagingObj.addCritInput.push(critInput);

    this.viewObj = "./assets/ucviewgeneric/viewOfficeCenterGrpMbr.json";
  }

}