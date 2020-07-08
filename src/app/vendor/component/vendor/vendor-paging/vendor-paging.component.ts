import { Component, OnInit } from '@angular/core';
import { UcPagingObj, WhereValueObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { CommonConstant } from 'app/shared/constant/CommonConstant';

@Component({
  selector: 'app-vendor-paging',
  templateUrl: './vendor-paging.component.html',
  styleUrls: ['./vendor-paging.component.scss']
})
export class VendorPagingComponent implements OnInit {
  inputPagingObj: any;
  MrVendorCategoryCode: string;
  Type: string = "Default";
  mode: string;

  constructor(private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (params["MrVendorCategoryCode"] != null) {
        this.MrVendorCategoryCode = params["MrVendorCategoryCode"];

      }
      if (params["Type"] != null) {
        this.Type = params["Type"];
      }
    });
  }

  ngOnInit() {
    this.inputPagingObj = new UcPagingObj();
    this.inputPagingObj.enviromentUrl = environment.FoundationR3Url;
    this.inputPagingObj.apiQryPaging = AdInsConstant.GetPagingObjectBySQL;



    if (this.Type == "Scheme") {
      this.inputPagingObj.pagingJson = "./assets/ucpaging/searchVendorScheme.json";
      this.inputPagingObj._url = "./assets/ucpaging/searchVendorScheme.json";
      this.inputPagingObj.addCritInput = new Array();
      var critObj = new CriteriaObj();
      critObj.propName = "VS.MR_VENDOR_CATEGORY_CODE";
      critObj.restriction = AdInsConstant.RestrictionEq;
      critObj.value = this.MrVendorCategoryCode;
      this.inputPagingObj.addCritInput.push(critObj);
    }
    else if (this.Type == "Group") {
      this.inputPagingObj.pagingJson = "./assets/ucpaging/searchVendorGroup.json";
      this.inputPagingObj._url = "./assets/ucpaging/searchVendorGroup.json";
      this.inputPagingObj.addCritInput = new Array();
      var critObj = new CriteriaObj();
      critObj.propName = "VG.MR_VENDOR_CATEGORY_CODE";
      critObj.restriction = AdInsConstant.RestrictionEq;
      critObj.value = this.MrVendorCategoryCode;
      this.inputPagingObj.addCritInput.push(critObj);
    }
    else if (this.Type == "Default") {
      if (this.MrVendorCategoryCode == CommonConstant.SUPPLIER_BRANCH || this.MrVendorCategoryCode == CommonConstant.ASSET_INSCO_BRANCH || this.MrVendorCategoryCode == CommonConstant.LIFE_INSCO_BRANCH || this.MrVendorCategoryCode == CommonConstant.SURVEYOR_BRANCH || this.MrVendorCategoryCode == CommonConstant.AGENCY_COMPANY || this.MrVendorCategoryCode == CommonConstant.AGENCY_PERSONAL) {
        this.inputPagingObj.pagingJson = "./assets/ucpaging/searchBranch.json";
        this.inputPagingObj._url = "./assets/ucpaging/searchBranch.json";
        this.inputPagingObj.addCritInput = new Array();
        var critObj = new CriteriaObj();
        critObj.propName = "vdr.MR_VENDOR_CATEGORY_CODE";
        critObj.restriction = AdInsConstant.RestrictionEq;
        critObj.value = this.MrVendorCategoryCode;

        this.inputPagingObj.addCritInput.push(critObj);

        var WVendorClassObj = new WhereValueObj();
        WVendorClassObj.property = "VendorClass";
        WVendorClassObj.value = "BRANCH";
        this.inputPagingObj.whereValue.push(WVendorClassObj);

      }
      else if (this.MrVendorCategoryCode == CommonConstant.ASSET_INSCO_HO || this.MrVendorCategoryCode == CommonConstant.LIFE_INSCO_HO || this.MrVendorCategoryCode == CommonConstant.SUPPLIER_HO || this.MrVendorCategoryCode == CommonConstant.SURVEYOR_HO) {

        this.inputPagingObj.pagingJson = "./assets/ucpaging/searchVendorHO.json";
        this.inputPagingObj._url = "./assets/ucpaging/searchVendorHO.json";
        this.inputPagingObj.addCritInput = new Array();
        var critObj = new CriteriaObj();
        critObj.propName = "V.MR_VENDOR_CATEGORY_CODE";
        critObj.restriction = AdInsConstant.RestrictionEq;
        critObj.value = this.MrVendorCategoryCode;

        this.inputPagingObj.addCritInput.push(critObj);

        var WVAddrTypeObj = new WhereValueObj();
        WVAddrTypeObj.property = "AddrType";
        WVAddrTypeObj.value = "TAX";
        this.inputPagingObj.whereValue.push(WVAddrTypeObj);

        var WVendorClassObj = new WhereValueObj();
        WVendorClassObj.property = "VendorClass";
        WVendorClassObj.value = "HO";
        this.inputPagingObj.whereValue.push(WVendorClassObj);
      }
      else if (this.MrVendorCategoryCode == CommonConstant.SUPPLIER_HOLDING) {

        this.inputPagingObj.pagingJson = "./assets/ucpaging/searchVendorHolding.json";
        this.inputPagingObj._url = "./assets/ucpaging/searchVendorHolding.json";
        this.inputPagingObj.addCritInput = new Array();
        var critObj = new CriteriaObj();
        critObj.propName = "V.MR_VENDOR_CATEGORY_CODE";
        critObj.restriction = AdInsConstant.RestrictionEq;
        critObj.value = this.MrVendorCategoryCode;

        this.inputPagingObj.addCritInput.push(critObj);

        var WVendorClassObj = new WhereValueObj();
        WVendorClassObj.property = "VendorClass";
        WVendorClassObj.value = "HOLDING";
        this.inputPagingObj.whereValue.push(WVendorClassObj);
      }
    }

  }

  navigate() {
    if (this.MrVendorCategoryCode == CommonConstant.SUPPLIER_BRANCH || this.MrVendorCategoryCode == CommonConstant.ASSET_INSCO_BRANCH || this.MrVendorCategoryCode == CommonConstant.LIFE_INSCO_BRANCH || this.MrVendorCategoryCode == CommonConstant.SURVEYOR_BRANCH || this.MrVendorCategoryCode == CommonConstant.AGENCY_COMPANY || this.MrVendorCategoryCode == CommonConstant.AGENCY_PERSONAL) {
      this.router.navigate(["/Vendor/Branch/Add"], { queryParams: { "MrVendorCategoryCode": this.MrVendorCategoryCode } });
    }
    else if (this.MrVendorCategoryCode == CommonConstant.ASSET_INSCO_HO || this.MrVendorCategoryCode == CommonConstant.LIFE_INSCO_HO || this.MrVendorCategoryCode == CommonConstant.SUPPLIER_HO || this.MrVendorCategoryCode == CommonConstant.SURVEYOR_HO) {
      this.router.navigate(["/Vendor/HO/Detail"], { queryParams: { "MrVendorCategoryCode": this.MrVendorCategoryCode } });
    }
    else if (this.MrVendorCategoryCode == CommonConstant.SUPPLIER_HOLDING) {
      this.router.navigate(["/Vendor/Holding/Detail"], { queryParams: { "MrVendorCategoryCode": this.MrVendorCategoryCode } });
    }
    if (this.Type == "Scheme") {
      this.router.navigate(["/Vendor/VendorScheme/Detail"], { queryParams: { "MrVendorCategoryCode": this.MrVendorCategoryCode } });
    }
    else if (this.Type == "Group") {
      this.router.navigate(["/Vendor/Group/Add"], { queryParams: { "MrVendorCategoryCode": this.MrVendorCategoryCode } });
    }
  }

}
