import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vendor-holding-registration',
  templateUrl: './vendor-holding-registration.component.html',
  styleUrls: ['./vendor-holding-registration.component.scss']
})
export class VendorHoldingRegistrationComponent implements OnInit {
  viewObj: any;
  VendorId : any;
  objPassing: any = {};
  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.objPassing["VendorId"] = params['VendorId'];
      this.objPassing["mode"] = params['mode'];
    });
   }

  ngOnInit() {
    this.viewObj = "./assets/ucviewgeneric/viewVendorHolding.json";
    this.VendorId = this.objPassing["VendorId"];
  }

}
