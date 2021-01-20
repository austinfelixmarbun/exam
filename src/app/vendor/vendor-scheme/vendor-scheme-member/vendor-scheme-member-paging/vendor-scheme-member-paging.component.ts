import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CriteriaObj } from "app/shared/model/CriteriaObj.Model";
import { URLConstant } from 'app/shared/constant/URLConstant';
import { UcViewGenericObj } from 'app/shared/model/UcViewGenericObj.model';

@Component({
  selector: 'app-vendor-scheme-member-paging',
  templateUrl: './vendor-scheme-member-paging.component.html'
})
export class VendorSchemeMemberPagingComponent implements OnInit {

  VendorSchmId: string;
  inputPagingObj: any;
  MrVendorCategoryCode: any;
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj();

  constructor(private route: ActivatedRoute){
    this.route.queryParams.subscribe(params => {
      this.VendorSchmId = params["VendorSchmId"];
      this.MrVendorCategoryCode = params["MrVendorCategoryCode"];
  })
  }

  ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewVendorSchemeMember.json";
    this.viewGenericObj.viewEnvironment = environment.FoundationR3Url;

    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/ucpaging/searchVendorSchemeMember.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = URLConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchVendorSchemeMember.json";
    this.inputPagingObj.addCritInput = new Array();
    this.inputPagingObj.deleteUrl = URLConstant.DeleteVendorSchmMember;

    var critInput = new CriteriaObj();
    critInput.propName = "vsm.VENDOR_SCHM_ID";
    critInput.restriction = AdInsConstant.RestrictionEq;
    critInput.value = this.VendorSchmId;
    this.inputPagingObj.addCritInput.push(critInput);
  }

}
