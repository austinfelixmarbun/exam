import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private route: ActivatedRoute, private vendorService: VendorService) { 
    this.route.queryParams.subscribe(params => {
      this.objPassing["VendorId"] = params['VendorId'];
    });
  }

  ngOnInit() {
    this.VendorId = this.objPassing["VendorId"];
    this.objPassing["Type"]="Vendor";

    this.vendorService.GetVendorAndVendorAddrByVendorId({ VendorId: this.VendorId }).subscribe(
      (response) => {
        this.MrVendorCategoryCode = response["VendorObj"]["MrVendorCategoryCode"];
      },
      (error) => {
        console.log(error);
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
}
