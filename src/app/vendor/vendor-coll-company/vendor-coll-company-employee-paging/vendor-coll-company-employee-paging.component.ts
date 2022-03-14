import { CriteriaObj } from 'app/shared/model/criteria-obj.model';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { UcPagingObj } from 'app/shared/model/uc-paging-obj.model';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-vendor-coll-company-employee-paging',
  templateUrl: './vendor-coll-company-employee-paging.component.html'
})
export class VendorCollCompanyEmployeePagingComponent implements OnInit {
  VendorId: string;
  inputPagingObj: UcPagingObj = new UcPagingObj();
  arrCrit = new Array();
  MrVendorCategoryCode: string = "";

  readonly CancelLink: string = NavigationConstant.VENDOR_PAGING;
  readonly AddLink: string = NavigationConstant.VENDOR_COLL_COMPANY_EMP_DETAIL;
  constructor(private route: ActivatedRoute, private http : HttpClient) { 
    this.route.queryParams.subscribe(params => {
      if (params["VendorId"] != null) {
        this.VendorId = params["VendorId"];
      }
    });
  }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchVendorCollCompanyEmployee.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchVendorCollCompanyEmployee.json";

    var critObj = new CriteriaObj();
    critObj.propName = 'VENDOR_ID';
    critObj.restriction = AdInsConstant.RestrictionEq;
    critObj.value = this.VendorId;
    this.inputPagingObj.addCritInput.push(critObj);

    
    this.http.post(URLConstant.GetVendorBranchAndVendorTaxAddrByVendorId, { Id: this.VendorId }).subscribe(
      (response) => {
        this.MrVendorCategoryCode = response["VendorObj"]["MrVendorCategoryCode"];
      }
    );
  }


}
