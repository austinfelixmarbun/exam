import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CommonConstant } from 'app/shared/constant/CommonConstant';

@Component({
  selector: 'app-self-custom-vendor-detail',
  templateUrl: './self-custom-vendor-detail.component.html'
})
export class SelfCustomVendorDetailComponent implements OnInit, OnDestroy {
  pageName: string;
  MrVendorCategoryCode: string;
  Type: string = "Default";
  navigationSubscription;
  isReady = false;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.subscribeParam();

    this.pageName = 'SupplierDetail'
    this.selectPage();
  }

  ngOnInit(): void {
    this.selectPage();
  }

  ngOnDestroy(): void {
  }

  RefetchData() {
    this.ReInit();
    this.subscribeParam();
    this.selectPage();
  }

  ReInit() {
    this.Type = "Default";
  }

  subscribeParam() {
    this.route.queryParams.subscribe(params => {
      if (params["MrVendorCategoryCode"] != null) {
          this.MrVendorCategoryCode = params["MrVendorCategoryCode"];

      }
      if (params["Type"] != null) {
        this.Type = params["Type"];
      }
    });
  }

  selectPage() {
    this.isReady = false;
    if (this.Type == "Scheme") {

    }
    else if (this.Type == "Group") {

    }
    else if (this.Type == "Default") {
      if (this.MrVendorCategoryCode == CommonConstant.SUPPLIER) {
        this.pageName = "SupplierDetail"
      }
      else if (this.MrVendorCategoryCode == CommonConstant.SUPPLIER_HO ||
               this.MrVendorCategoryCode == CommonConstant.ASSET_INSCO_HO ||
               this.MrVendorCategoryCode == CommonConstant.LIFE_INSCO_HO ||
               this.MrVendorCategoryCode == CommonConstant.CRD_INSCO_HO ||
               this.MrVendorCategoryCode == CommonConstant.SURVEYOR_HO) {
        switch (this.MrVendorCategoryCode) {
          case CommonConstant.SURVEYOR_HO:
            this.pageName = 'VendorSurveyorHoDetail'
            break;
        }
      }
      else if (this.MrVendorCategoryCode == CommonConstant.SUPPLIER_HOLDING) {

      }
      else if (this.MrVendorCategoryCode == CommonConstant.SUPPLIER_ATPM) {

      }
      else if (this.MrVendorCategoryCode == CommonConstant.SURVEYOR_BRANCH) {
        this.pageName = 'VendorSurveyorDetail'
      }
      else if (this.MrVendorCategoryCode == CommonConstant.COLL_COMPANY){
        this.pageName = 'VendorCollectionCompanyDetail'
      }
      else if (this.MrVendorCategoryCode == CommonConstant.AUCTION_COMPANY){
        this.pageName = 'VendoRauctionCompanyDetail'
      }
      else if (this.MrVendorCategoryCode == CommonConstant.LIFE_INSCO_BRANCH){
        this.pageName = 'VendorLifeInsuranceBranchDetail'
      }
      else if (this.MrVendorCategoryCode == CommonConstant.ASSET_INSCO_BRANCH){
        this.pageName = 'VendorInsuranceDetail'
      }
      else if (this.MrVendorCategoryCode == CommonConstant.AGENCY_COMPANY){
        this.pageName = 'VendorAgencyCompanyDetail'
      }
      else if (this.MrVendorCategoryCode == CommonConstant.NOTARY_COMPANY){
        this.pageName = 'VendorNotaryCompanyDetail'
      }
      else if (this.MrVendorCategoryCode == CommonConstant.AGENCY_PERSONAL || this.MrVendorCategoryCode == CommonConstant.NOTARY_PERSONAL || this.MrVendorCategoryCode == CommonConstant.CUSTODY)
      {
        this.pageName = 'Vendorbranchregistration'
      }
      else{
        this.pageName = 'VendorbranchregistrationwithParam'
      }
    }

    setTimeout(() => {
      this.isReady = true;
    }, 10);
  }

}
