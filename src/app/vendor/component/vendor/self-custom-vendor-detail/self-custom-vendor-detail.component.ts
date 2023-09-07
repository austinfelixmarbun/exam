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
    this.pageName = 'SupplierHoDetail'
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
    }

    setTimeout(() => {
      this.isReady = true;
    }, 10);
  }

}
