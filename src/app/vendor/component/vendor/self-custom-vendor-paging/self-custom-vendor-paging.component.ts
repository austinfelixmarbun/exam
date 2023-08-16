import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CommonConstant } from 'app/shared/constant/CommonConstant';

@Component({
  selector: 'app-self-custom-vendor-paging',
  templateUrl: './self-custom-vendor-paging.component.html'
})
export class SelfCustomVendorPagingComponent implements OnInit {
  pageName: string;
  MrVendorCategoryCode: string;
  Type: string = "Default";

  navigationSubscription;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.subscribeParam();
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.RefetchData();
      }
    });
    this.pageName = 'SupplierHoComponent'
  }

  ngOnInit(): void {
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
    if (this.Type == "Scheme") {
      switch (this.MrVendorCategoryCode) {
        case CommonConstant.SUPPLIER:
          this.pageName = 'SupplierSchemeComponent'
          break;
      }
    }
    else if (this.Type == "Group") {
      switch (this.MrVendorCategoryCode) {
        case CommonConstant.SUPPLIER:
          this.pageName = 'SupplierGroupComponent'
          break;
      }
    }
    else if (this.Type == "Default") {
      if (this.MrVendorCategoryCode == CommonConstant.SUPPLIER) {
        this.pageName = 'SupplierComponent'
      }
      else if (this.MrVendorCategoryCode == CommonConstant.SUPPLIER_HO) {
        this.pageName = 'SupplierHoComponent'
      }
      else if (this.MrVendorCategoryCode == CommonConstant.SUPPLIER_HOLDING) {
        this.pageName = 'SupplierHoldingComponent'
      }
      else if (this.MrVendorCategoryCode == CommonConstant.SUPPLIER_ATPM) {
        this.pageName = 'SupplierAtmpComponent'
      }
    }
  }

}
