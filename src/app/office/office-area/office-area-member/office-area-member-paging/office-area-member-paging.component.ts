import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';

@Component({
  selector: 'app-office-area-member-paging',
  templateUrl: './office-area-member-paging.component.html'
})
export class OfficeAreaMemberPagingComponent implements OnInit {

  param: any;
  RefOfficeAreaId: string;
  viewObj: any;

  inputPagingObj: any;
  constructor(private route: ActivatedRoute){
    this.route.queryParams.subscribe(params => {
      this.RefOfficeAreaId = params["RefOfficeAreaId"];
  })
  }

  ngOnInit() {
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/ucpaging/searchOfficeAreaMember.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchOfficeAreaMember.json";
    this.inputPagingObj.deleteUrl = AdInsConstant.UpdateRefOfficeAreaId;
    this.inputPagingObj.addCritInput = new Array();

    var critInput = new CriteriaObj();
    critInput.propName = "A.REF_OFFICE_AREA_ID";
    critInput.restriction = AdInsConstant.RestrictionEq;
    critInput.value = this.RefOfficeAreaId;
    this.inputPagingObj.addCritInput.push(critInput);

    this.viewObj = "./assets/ucviewgeneric/viewOfficeAreaMember.json";
  }

}
