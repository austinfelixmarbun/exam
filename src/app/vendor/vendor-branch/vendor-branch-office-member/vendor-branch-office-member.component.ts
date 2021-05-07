import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { HttpClient } from '@angular/common/http';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-vendor-branch-office-member',
  templateUrl: './vendor-branch-office-member.component.html'
})
export class VendorBranchOfficeMemberComponent implements OnInit {
  inputPagingObj: UcPagingObj = new UcPagingObj();
  VendorId: string;
  objPassing: any = {};
  MrVendorCategoryCode: string = "";

  readonly CancelLink: string = NavigationConstant.VENDOR_PAGING;
  readonly AddLink: string = NavigationConstant.VENDOR_BRANCH_MBR_ADD;
  constructor(private route: ActivatedRoute, private http : HttpClient) {
    this.route.queryParams.subscribe(params => {
      this.objPassing["VendorId"] = params['VendorId'];
      this.objPassing["VendorEmpId"] = params['VendorEmpId'];
      this.VendorId = params['VendorId'];
    });
  }

  ngOnInit() {
    this.inputPagingObj._url = "./assets/ucpaging/searchVendorOfficeMember.json";
    this.inputPagingObj.pagingJson = "./assets/ucpaging/searchVendorOfficeMember.json";
    this.inputPagingObj.deleteUrl = "/VendorOfficeMbr/DeleteVendorOfficeMember";

    this.inputPagingObj.addCritInput = new Array();
    var critObj = new CriteriaObj();
    critObj.propName = "VOM.VENDOR_ID";
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
