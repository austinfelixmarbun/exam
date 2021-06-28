import { Component, OnInit } from '@angular/core';
import { UcPagingObj, WhereValueObj } from 'app/shared/model/UcPagingObj.Model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-vendor-paging',
  templateUrl: './vendor-paging.component.html'
})
export class VendorPagingComponent implements OnInit {
  inputPagingObj: UcPagingObj = new UcPagingObj();
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
    if (this.Type == "Scheme") {
      this.inputPagingObj.pagingJson = "./assets/ucpaging/searchVendorScheme.json";
      this.inputPagingObj._url = "./assets/ucpaging/searchVendorScheme.json";

      if (this.MrVendorCategoryCode == CommonConstant.SUPPLIER) {
        this.inputPagingObj.title = "Supplier Scheme";
      }
      if (this.MrVendorCategoryCode == CommonConstant.ASSET_INSCO_BRANCH) {
        this.inputPagingObj.title = "Insurance Branch Scheme";
      }
      if (this.MrVendorCategoryCode == CommonConstant.LIFE_INSCO_BRANCH) {
        this.inputPagingObj.title = "Life Insurance Scheme";
      }
      if (this.MrVendorCategoryCode == CommonConstant.SURVEYOR_BRANCH) {
        this.inputPagingObj.title = "Surveyor Branch Scheme";
      }
      if (this.MrVendorCategoryCode == CommonConstant.AGENCY_PERSONAL) {
        this.inputPagingObj.title = "Agency Personal Scheme";
      }
      if (this.MrVendorCategoryCode == CommonConstant.AGENCY_COMPANY) {
        this.inputPagingObj.title = "Agency Company Scheme";
      }

      var critObj = new CriteriaObj();
      critObj.propName = "VS.MR_VENDOR_CATEGORY_CODE";
      critObj.restriction = AdInsConstant.RestrictionEq;
      critObj.value = this.MrVendorCategoryCode;
      this.inputPagingObj.addCritInput.push(critObj);
    }
    else if (this.Type == "Group") {
      this.inputPagingObj.pagingJson = "./assets/ucpaging/searchVendorGroup.json";
      this.inputPagingObj._url = "./assets/ucpaging/searchVendorGroup.json";

      if (this.MrVendorCategoryCode == CommonConstant.SUPPLIER) {
        this.inputPagingObj.title = "Supplier Group";
      }
      if (this.MrVendorCategoryCode == CommonConstant.ASSET_INSCO_BRANCH) {
        this.inputPagingObj.title = "Insurance Branch Group";
      }
      if (this.MrVendorCategoryCode == CommonConstant.LIFE_INSCO_BRANCH) {
        this.inputPagingObj.title = "Life Insurance Group";
      }
      if (this.MrVendorCategoryCode == CommonConstant.SURVEYOR_BRANCH) {
        this.inputPagingObj.title = "Surveyor Branch Group";
      }
      if (this.MrVendorCategoryCode == CommonConstant.AGENCY_PERSONAL) {
        this.inputPagingObj.title = "Agency Personal Group";
      }
      if (this.MrVendorCategoryCode == CommonConstant.AGENCY_COMPANY) {
        this.inputPagingObj.title = "Agency Company Group";
      }

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
        }
        else if (this.MrVendorCategoryCode == CommonConstant.AGENCY_PERSONAL) {
          this.inputPagingObj.pagingJson = "./assets/ucpaging/searchAgencyPersonal.json";
          this.inputPagingObj._url = "./assets/ucpaging/searchAgencyPersonal.json";
        }
        else if(this.MrVendorCategoryCode == CommonConstant.AGENCY_COMPANY){
          this.inputPagingObj.pagingJson = "./assets/ucpaging/searchAgencyCompany.json";
          this.inputPagingObj._url = "./assets/ucpaging/searchAgencyCompany.json";
        }
        else {
          this.inputPagingObj.pagingJson = "./assets/ucpaging/searchBranch.json";
          this.inputPagingObj._url = "./assets/ucpaging/searchBranch.json";
        }
        this.inputPagingObj.title = typeof (CommonConstant["TITLE_" + this.MrVendorCategoryCode]) != 'undefined' ? CommonConstant["TITLE_" + this.MrVendorCategoryCode] : this.MrVendorCategoryCode.replace(/_/g, ' ');
        this.inputPagingObj.addCritInput = new Array();
        this.inputPagingObj
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

        if (this.MrVendorCategoryCode == CommonConstant.ASSET_INSCO_HO) {
          this.inputPagingObj.title = "Insurance HO";
        }
        if (this.MrVendorCategoryCode == CommonConstant.LIFE_INSCO_HO) {
          this.inputPagingObj.title = "Life Insurance HO";
        }
        if (this.MrVendorCategoryCode == CommonConstant.SUPPLIER_HO) {
          this.inputPagingObj.title = "Supplier HO";
        }
        if (this.MrVendorCategoryCode == CommonConstant.SURVEYOR_HO) {
          this.inputPagingObj.title = "Surveyor HO";
        }

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
        this.inputPagingObj.title = "Supplier Holding";
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
      else if (this.MrVendorCategoryCode == CommonConstant.SUPPLIER_ATPM) {

        this.inputPagingObj.pagingJson = "./assets/ucpaging/searchSupplierATPM.json";
        this.inputPagingObj._url = "./assets/ucpaging/searchSupplierATPM.json";
        this.inputPagingObj.title = "Supplier ATPM";
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
      AdInsHelper.RedirectUrl(this.router, [NavigationConstant.VENDOR_BRANCH_ADD], { "MrVendorCategoryCode": this.MrVendorCategoryCode });
    }
    else if (this.MrVendorCategoryCode == CommonConstant.ASSET_INSCO_HO || this.MrVendorCategoryCode == CommonConstant.LIFE_INSCO_HO || this.MrVendorCategoryCode == CommonConstant.SUPPLIER_HO || this.MrVendorCategoryCode == CommonConstant.SURVEYOR_HO) {
      AdInsHelper.RedirectUrl(this.router, [NavigationConstant.VENDOR_HO_DETAIL], { "MrVendorCategoryCode": this.MrVendorCategoryCode });
    }
    else if (this.MrVendorCategoryCode == CommonConstant.SUPPLIER_HOLDING) {
      AdInsHelper.RedirectUrl(this.router, [NavigationConstant.VENDOR_HOLDING_DETAIL], { "MrVendorCategoryCode": this.MrVendorCategoryCode });
    }
    else if (this.MrVendorCategoryCode == CommonConstant.SUPPLIER_ATPM) {
      AdInsHelper.RedirectUrl(this.router, [NavigationConstant.VENDOR_ATPM_DETAIL], { "MrVendorCategoryCode": this.MrVendorCategoryCode });
    }
    if (this.Type == "Scheme") {
      AdInsHelper.RedirectUrl(this.router, [NavigationConstant.VENDOR_SCHM_DETAIL], { "MrVendorCategoryCode": this.MrVendorCategoryCode });
    }
    else if (this.Type == "Group") {
      AdInsHelper.RedirectUrl(this.router, [NavigationConstant.VENDOR_GRP_ADD], { "MrVendorCategoryCode": this.MrVendorCategoryCode });
    }
  }

}
