import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VendorService } from 'app/vendor/vendor.service';

@Component({
  selector: 'app-vendor-ho-info',
  templateUrl: './vendor-ho-info.component.html'
})
export class VendorHoInfoComponent implements OnInit {
  VendorId: any;
  MrVendorCategoryCode: string = "";
  
  constructor(private route: ActivatedRoute, private vendorService: VendorService) {
    this.route.queryParams.subscribe(params => {
      this.VendorId = params['VendorId'];
    });
  }

  ngOnInit() {
    this.vendorService.GetVendorAndVendorAddrByVendorId({ VendorId: this.VendorId }).subscribe(
      (response) => {
        this.MrVendorCategoryCode = response["VendorObj"]["MrVendorCategoryCode"];
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
