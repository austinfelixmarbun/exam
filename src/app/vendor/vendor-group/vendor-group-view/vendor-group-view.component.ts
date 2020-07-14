import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { VendorGroupObj } from 'app/shared/model/VendorGroupObj.Model';
import { ActivatedRoute, Router } from '@angular/router';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { UcViewGenericObj } from 'app/shared/model/UcViewGenericObj.model';


@Component({
  selector: 'app-vendor-group-view',
  templateUrl: './vendor-group-view.component.html'
})
export class VendorGroupViewComponent implements OnInit {
  VendorGrpId: any;
  vendorGrpObj: VendorGroupObj;
  inputPagingObj: any;
  MrVendorCategoryCode: any;
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj();

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
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewVendorGrp.json";
    this.viewGenericObj.viewEnvironment = environment.FoundationR3Url;
    
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj._url = "./assets/ucpaging/searchVendor.json";
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = URLConstant.GetPagingObjectBySQL;
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchVendor.json";
    this.inputPagingObj.deleteUrl = URLConstant.DeleteVendorGrpMemberById;
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
