import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-vendor-coll-company-registration',
  templateUrl: './vendor-coll-company-registration.component.html'
})
export class VendorCollCompanyRegistrationComponent implements OnInit {
  VendorId: any; 
  objPassing: any = {};
  MrVendorCategoryCode: string = "";
  constructor(private route: ActivatedRoute) { 
    this.route.queryParams.subscribe(params => {
      this.objPassing["VendorId"] = params['VendorId'];
      if(!params['VendorEmpId']){
      this.objPassing["VendorEmpId"] = params['VendorEmpId'];
      }if(params['MrVendorCategoryCode']!=null){
        this.MrVendorCategoryCode = params['MrVendorCategoryCode'];
      }
    });
  }

  readonly EditLink: string = NavigationConstant.VENDOR_COLL_COMPANY_ADD;
  readonly CancelLink: string = NavigationConstant.VENDOR_PAGING;
  ngOnInit() {
    this.VendorId = this.objPassing["VendorId"];
    this.objPassing["Type"]="Vendor";
  }
}
