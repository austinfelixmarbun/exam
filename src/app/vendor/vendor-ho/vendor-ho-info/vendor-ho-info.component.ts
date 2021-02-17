import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { VendorService } from 'app/vendor/vendor.service';

@Component({
  selector: 'app-vendor-ho-info',
  templateUrl: './vendor-ho-info.component.html'
})
export class VendorHoInfoComponent implements OnInit {
  VendorId: any;
  MrVendorCategoryCode: string = "";
  
  readonly CancelLink: string = NavigationConstant.VENDOR_PAGING;
  constructor(private route: ActivatedRoute, private vendorService: VendorService) {
    this.route.queryParams.subscribe(params => {
      this.VendorId = params['VendorId'];
    });
  }

  ngOnInit() {
    this.vendorService.GetVendorAndVendorAddrByVendorId({ VendorId: this.VendorId }).subscribe(
      (response) => {
        this.MrVendorCategoryCode = response["VendorObj"]["MrVendorCategoryCode"];
      }
    );
  }

}
