import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CriteriaObj } from "app/shared/model/CriteriaObj.model";

@Component({
  selector: 'app-vendor-scheme-member-paging',
  templateUrl: './vendor-scheme-member-paging.component.html',
  styleUrls: ['./vendor-scheme-member-paging.component.scss']
})
export class VendorSchemeMemberPagingComponent implements OnInit {

  VendorSchmId: string;
  viewObj: any;
  inputPagingObj: any;
  MrVendorCategoryCode: any;

  constructor(private route: ActivatedRoute){
    this.route.queryParams.subscribe(params => {
      this.VendorSchmId = params["VendorSchmId"];
      this.MrVendorCategoryCode = params["MrVendorCategoryCode"];
  })
  }

  ngOnInit() {
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/ucpaging/searchVendorSchemeMember.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchVendorSchemeMember.json";
    this.inputPagingObj.addCritInput = new Array();
    this.inputPagingObj.deleteUrl = AdInsConstant.DeleteVendorSchmMember;

    var critInput = new CriteriaObj();
    critInput.propName = "vsm.VENDOR_SCHM_ID";
    critInput.restriction = AdInsConstant.RestrictionEq;
    critInput.value = this.VendorSchmId;
    this.inputPagingObj.addCritInput.push(critInput);

    this.viewObj = "./assets/ucviewgeneric/viewVendorSchemeMember.json";
  }

}
