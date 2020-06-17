import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { VendorGroupObj } from 'app/shared/model/VendorGroupObj.Model';
import { ActivatedRoute, Router } from '@angular/router';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';


@Component({
  selector: 'app-vendor-group-view',
  templateUrl: './vendor-group-view.component.html',
  styleUrls: ['./vendor-group-view.component.scss']
})
export class VendorGroupViewComponent implements OnInit {
  VendorGrpId: any;
  vendorGrpObj: VendorGroupObj;
  inputPagingObj: any;
  inputViewObj: any;
  MrVendorCategoryCode: any;

  constructor(private router: Router, private route: ActivatedRoute, ) {
    this.route.queryParams.subscribe(params => {
      if (params['VendorGrpId'] != null) {
        this.VendorGrpId = params['VendorGrpId'];
      }
      if (params['MrVendorCategoryCode'] != null) {
        this.MrVendorCategoryCode = params['MrVendorCategoryCode'];
      }
    });
  }


  ngOnInit() {

    this.inputViewObj = "./assets/ucviewgeneric/viewVendorGrp.json";

    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/ucpaging/searchVendor.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchVendor.json";
    this.inputPagingObj.deleteUrl = AdInsConstant.DeleteVendorGrpMemberById;
    this.inputPagingObj.addCritInput = new Array();


    var critInput = new CriteriaObj();
    critInput.propName = "C.VENDOR_GRP_ID";
    critInput.restriction = AdInsConstant.RestrictionEq;
    critInput.value = this.VendorGrpId;
    this.inputPagingObj.addCritInput.push(critInput);

    var critInput = new CriteriaObj();
    critInput.propName = "A.MR_VENDOR_CATEGORY_CODE";
    critInput.restriction = AdInsConstant.RestrictionEq;
    critInput.value = this.MrVendorCategoryCode;
    this.inputPagingObj.addCritInput.push(critInput);


  }
}
