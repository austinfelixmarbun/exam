import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-vendor-branch-registration',
  templateUrl: './vendor-branch-registration.component.html'
})
export class VendorBranchRegistrationComponent implements OnInit {
  VendorId: any; 
  objPassing: any = {};
  MrVendorCategoryCode: string = "";
  Registration : string;
  constructor(private route: ActivatedRoute,private http: HttpClient) { 
    this.route.queryParams.subscribe(params => {
      this.objPassing["VendorId"] = params['VendorId'];
      if(!params['VendorEmpId']){
      this.objPassing["VendorEmpId"] = params['VendorEmpId'];
      }
    });
  }

  readonly EditLink: string = NavigationConstant.VENDOR_BRANCH_ADD;
  readonly CancelLink: string = NavigationConstant.VENDOR_PAGING;
  ngOnInit() {
    this.VendorId = this.objPassing["VendorId"];
    this.objPassing["Type"]="Vendor";

    this.http.post(URLConstant.GetVendorBranchAndVendorTaxAddrByVendorId, { Id: this.VendorId }).subscribe(
      (response) => {
        this.MrVendorCategoryCode = response["VendorObj"]["MrVendorCategoryCode"]; 
        if(this.MrVendorCategoryCode == CommonConstant.SUPPLIER){
          this.Registration = "Supplier Registration"
        }else{
          this.Registration = "Branch Registration"
        } 
      }
    );
  }

}