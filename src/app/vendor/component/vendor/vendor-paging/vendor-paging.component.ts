import { Component, OnInit } from '@angular/core';
import { UcPagingObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';

@Component({
  selector: 'app-vendor-paging',
  templateUrl: './vendor-paging.component.html',
  styleUrls: ['./vendor-paging.component.scss']
})
export class VendorPagingComponent implements OnInit {
  inputPagingObj: any;
  MrVendorCategoryCode: string;
  Type: string;
  mode: string;

  constructor(private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService) {
    this.route.queryParams.subscribe(params => {
      if (params["MrVendorCategoryCode"] != null) {
        this.MrVendorCategoryCode = params["MrVendorCategoryCode"];

      }
      this.Type = params['Type'];
      if (params['Type'] != null) {
        this.Type = params['Type'];
      }
    });
  }

  ngOnInit() {

    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;
    if (this.MrVendorCategoryCode == "SUPPLIER_BRANCH" || this.MrVendorCategoryCode == "ASSET_INSCO_BRANCH" || this.MrVendorCategoryCode == "LIFE_INSCO_BRANCH" || this.MrVendorCategoryCode == "SURVEYOR_BRANCH" || this.MrVendorCategoryCode == "AGENCY_COMPANY" || this.MrVendorCategoryCode == "AGENCY_PERSONAL") {
      this.inputPagingObj.pagingJson = "./assets/ucpaging/searchBranch.json";
      this.inputPagingObj._url = "./assets/ucpaging/searchBranch.json";
      this.inputPagingObj.addCritInput = new Array();
      var critObj = new CriteriaObj();
      critObj.propName = "vdr.MR_VENDOR_CATEGORY_CODE";
      critObj.restriction = AdInsConstant.RestrictionEq;
      critObj.value = this.MrVendorCategoryCode;

      this.inputPagingObj.addCritInput.push(critObj);
    }
    else if (this.MrVendorCategoryCode == "ASSET_INSCO_HO" || this.MrVendorCategoryCode == "LIFE_INSCO_HO" || this.MrVendorCategoryCode == "SUPPLIER_HO" || this.MrVendorCategoryCode == "SURVEYOR_HO") {

      this.inputPagingObj.pagingJson = "./assets/ucpaging/searchVendorHO.json";
      this.inputPagingObj._url = "./assets/ucpaging/searchVendorHO.json";
      this.inputPagingObj.addCritInput = new Array();
      var critObj = new CriteriaObj();
      critObj.propName = "VA.MR_VENDOR_CATEGORY_CODE";
      critObj.restriction = AdInsConstant.RestrictionEq;
      critObj.value = this.MrVendorCategoryCode;

      this.inputPagingObj.addCritInput.push(critObj);
    }
    else if (this.MrVendorCategoryCode == "SUPPLIER_HOLDING") {

      this.inputPagingObj.pagingJson = "./assets/ucpaging/searchVendorHolding.json";
      this.inputPagingObj._url = "./assets/ucpaging/searchVendorHolding.json";
      this.inputPagingObj.addCritInput = new Array();
      var critObj = new CriteriaObj();
      critObj.propName = "V.MR_VENDOR_CATEGORY_CODE";
      critObj.restriction = AdInsConstant.RestrictionEq;
      critObj.value = this.MrVendorCategoryCode;

      this.inputPagingObj.addCritInput.push(critObj);
    }
    else if (this.Type == "Scheme") {
      this.inputPagingObj.pagingJson = "./assets/ucpaging/searchVendorScheme.json";
      this.inputPagingObj._url = "./assets/ucpaging/searchVendorScheme.json";
      this.inputPagingObj.ddlEnvironments = [
        {
          name: "vs.MR_VENDOR_CATEGORY_CODE",
          environment: environment.FoundationR3Url
        }
      ];
    }
    else if (this.Type == "Group") {
      this.inputPagingObj.pagingJson = "./assets/ucpaging/searchVendorGroup.json";
      this.inputPagingObj._url = "./assets/ucpaging/searchVendorGroup.json";

      this.inputPagingObj.ddlEnvironments = [
        {
          name: "VG.MR_VENDOR_CATEGORY_CODE",
          environment: environment.FoundationR3Url
        }
      ];

    }

  }

}
