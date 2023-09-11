import { Component, OnInit } from '@angular/core';
import { CommonConstant } from 'app/shared/constant/CommonConstant';

@Component({
  selector: 'app-self-custom-vendor-branch-add-edit',
  templateUrl: './self-custom-vendor-branch-add-edit.component.html'
})
export class SelfCustomVendorBranchAddEditComponent implements OnInit {
  pageName: string;
  MrVendorCategoryCode: string;
  Type: string = "Default";
  navigationSubscription;
  isReady = false;

  constructor() {
    this.pageName = "SupplierRegistration";
  }

  ngOnInit(): void {
    this.selectPage();
  }

  selectPage() {
    this.isReady = false;
    if (this.Type == "Default") {
      if (this.MrVendorCategoryCode == CommonConstant.SUPPLIER) {
        this.pageName = 'SupplierRegistration'
      }
      else if (this.MrVendorCategoryCode == CommonConstant.AGENCY_PERSONAL || this.MrVendorCategoryCode == CommonConstant.NOTARY_PERSONAL || this.MrVendorCategoryCode == CommonConstant.CUSTODY) {
        this.pageName = 'Branchadd'
      }
      else {
        this.pageName = 'Branchadd'
      } 
    }
    

    setTimeout(() => {
      this.isReady = true;
    }, 10);
  }

}
