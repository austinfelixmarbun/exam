import { Component, OnInit } from '@angular/core';
import { UcPagingObj, WhereValueObj } from 'app/shared/model/UcPagingObj.Model';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.Model';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-vendor-paging',
  templateUrl: './vendor-paging.component.html'
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
    this.inputPagingObj.apiQryPaging = URLConstant.GetPagingObjectBySQL;



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
      if (this.MrVendorCategoryCode == CommonConstant.SUPPLIER || this.MrVendorCategoryCode == CommonConstant.ASSET_INSCO_BRANCH || this.MrVendorCategoryCode == CommonConstant.LIFE_INSCO_BRANCH || this.MrVendorCategoryCode == CommonConstant.SURVEYOR_BRANCH || this.MrVendorCategoryCode == CommonConstant.AGENCY_COMPANY || this.MrVendorCategoryCode == CommonConstant.AGENCY_PERSONAL) {
        if (this.MrVendorCategoryCode == CommonConstant.SUPPLIER) {
          this.inputPagingObj.pagingJson = "./assets/ucpaging/searchSupplier.json";
          this.inputPagingObj._url = "./assets/ucpaging/searchSupplier.json";
        } else {
          this.inputPagingObj.pagingJson = "./assets/ucpaging/searchBranch.json";
          this.inputPagingObj._url = "./assets/ucpaging/searchBranch.json";
        } 
        this.inputPagingObj.title = typeof(CommonConstant["TITLE_"+this.MrVendorCategoryCode]) != 'undefined' ? CommonConstant["TITLE_"+this.MrVendorCategoryCode] : this.MrVendorCategoryCode.replace(/_/g,' ');
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
        WVAddrTypeObj.value = CommonConstant.AddrTypeTax;
        this.inputPagingObj.whereValue.push(WVAddrTypeObj);

        var WVendorClassObj = new WhereValueObj();
        WVendorClassObj.property = "VendorClass";
        WVendorClassObj.value = CommonConstant.HeadOffice;
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
      else if (this.MrVendorCategoryCode == CommonConstant.SUPPLIER_ATPM){
        
        this.inputPagingObj.pagingJson = "./assets/ucpaging/searchSupplierATPM.json";
        this.inputPagingObj._url = "./assets/ucpaging/searchSupplierATPM.json";
        this.inputPagingObj.addCritInput = new Array();
        var critObj = new CriteriaObj();
        critObj.propName = "V.MR_VENDOR_CATEGORY_CODE";
        critObj.restriction = AdInsConstant.RestrictionEq;
        critObj.value = this.MrVendorCategoryCode;

        this.inputPagingObj.addCritInput.push(critObj);

        var WVendorClassObj = new WhereValueObj();
        WVendorClassObj.property = "VendorClass";
        WVendorClassObj.value = CommonConstant.ATPM;
        this.inputPagingObj.whereValue.push(WVendorClassObj);
      }
    }

  }

  navigate() {
    if (this.MrVendorCategoryCode == CommonConstant.SUPPLIER || this.MrVendorCategoryCode == CommonConstant.ASSET_INSCO_BRANCH || this.MrVendorCategoryCode == CommonConstant.LIFE_INSCO_BRANCH || this.MrVendorCategoryCode == CommonConstant.SURVEYOR_BRANCH || this.MrVendorCategoryCode == CommonConstant.AGENCY_COMPANY || this.MrVendorCategoryCode == CommonConstant.AGENCY_PERSONAL) {
      AdInsHelper.RedirectUrl(this.router,[NavigationConstant.VENDOR_BRANCH_ADD],{ "MrVendorCategoryCode": this.MrVendorCategoryCode });
    }
    else if (this.MrVendorCategoryCode == CommonConstant.ASSET_INSCO_HO || this.MrVendorCategoryCode == CommonConstant.LIFE_INSCO_HO || this.MrVendorCategoryCode == CommonConstant.SUPPLIER_HO || this.MrVendorCategoryCode == CommonConstant.SURVEYOR_HO) {
      AdInsHelper.RedirectUrl(this.router,[NavigationConstant.VENDOR_HO_DETAIL],{ "MrVendorCategoryCode": this.MrVendorCategoryCode });   
    }
    else if (this.MrVendorCategoryCode == CommonConstant.SUPPLIER_HOLDING) {
      AdInsHelper.RedirectUrl(this.router,[NavigationConstant.VENDOR_HOLDING_DETAIL],{ "MrVendorCategoryCode": this.MrVendorCategoryCode });    
    }
    else if (this.MrVendorCategoryCode == CommonConstant.SUPPLIER_ATPM) {
      AdInsHelper.RedirectUrl(this.router,[NavigationConstant.VENDOR_ATPM_DETAIL],{ "MrVendorCategoryCode": this.MrVendorCategoryCode });    
    }
    if (this.Type == "Scheme") {
      AdInsHelper.RedirectUrl(this.router,[NavigationConstant.VENDOR_SCHM_DETAIL],{ "MrVendorCategoryCode": this.MrVendorCategoryCode });    
    }
    else if (this.Type == "Group") {
      AdInsHelper.RedirectUrl(this.router,[NavigationConstant.VENDOR_GRP_ADD],{ "MrVendorCategoryCode": this.MrVendorCategoryCode });    
    }
  }

}
