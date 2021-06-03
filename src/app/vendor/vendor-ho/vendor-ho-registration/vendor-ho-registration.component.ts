import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { VendorService } from 'app/vendor/vendor.service';

@Component({
  selector: 'app-vendor-ho-registration',
  templateUrl: './vendor-ho-registration.component.html'
})
export class VendorHoRegistrationComponent implements OnInit {
  VendorId: any; 
  objPassing: any = {};
  objPassingCP: any = {};
  HiddenState: boolean = true;
  mode: string;
  VendorContactPersonId:any;
  MrVendorCategoryCode: string = "";
  MrVendorCategoryCodeParam: string = "";

  readonly EditLink: string = NavigationConstant.VENDOR_HO_DETAIL;
  constructor(private route: ActivatedRoute, private router: Router, private vendorService: VendorService) { 
    this.route.queryParams.subscribe(params => {
      this.objPassing["VendorId"] = params['VendorId'];
      this.MrVendorCategoryCodeParam = params['MrVendorCategoryCode'];
    });
  }

  ngOnInit() {
    this.VendorId = this.objPassing["VendorId"];
    this.objPassing["Type"]="Vendor";

    this.vendorService.GetVendorAndVendorAddrByVendorId({ VendorId: this.VendorId }).subscribe(
      (response) => {
        this.MrVendorCategoryCode = response["VendorObj"]["MrVendorCategoryCode"];
      }
    );
  }

  outputValue(ev){
    this.HiddenState = ev.HiddenState;
    this.mode = ev.mode;
    this.VendorContactPersonId = ev.VendorContactPersonId;

    this.objPassingCP.VendorContactPersonId = this.VendorContactPersonId;
    this.objPassingCP.mode = this.mode;
    this.objPassingCP.VendorId = this.VendorId;
  }

  Back() {
      AdInsHelper.RedirectUrl(this.router, [NavigationConstant.VENDOR_PAGING], { "MrVendorCategoryCode": this.MrVendorCategoryCodeParam });
  }
}
