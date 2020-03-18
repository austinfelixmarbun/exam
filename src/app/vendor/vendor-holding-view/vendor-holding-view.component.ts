import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { DecimalPipe } from '@angular/common';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { VendorHoObj } from 'app/shared/model/VendorHoObj.Model';

@Component({
  selector: 'app-vendor-holding-view',
  templateUrl: './vendor-holding-view.component.html',
  styleUrls: ['./vendor-holding-view.component.scss'],
  providers: [DecimalPipe, NGXToastrService]
})
export class VendorHoldingViewComponent implements OnInit {
  VendorId: any;
  viewVendorHoldingObj: string;
  arrCrit: any[];
  vendorHoObj: VendorHoObj;
  MainInfo: any;
  vendorAddrObj: VendorHoObj;


  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService) {

    // this.ProdOfferingDUrl = AdInsConstant.GetListProdOfferingDByProdOfferingHIdAndProdCompntGrpCode;
    // this.ProdOfferingBranchUrl = AdInsConstant.GetListProdOfferingBranchOfficeMbrByProdHId;
    // this.ProdOfferingVerUrl = AdInsConstant.GetListProdOfferingHVersionByProdOfferingHId;

    this.route.queryParams.subscribe(params => {
      if (params["VendorId"] != null) {
        this.VendorId = params["VendorId"];
      }
    });
  }

  ngOnInit() {
     //** Main Information **//
     this.viewVendorHoldingObj = "./assets/ucviewgeneric/viewVendorHolding.json";

     this.vendorHoObj = new VendorHoObj();
     this.vendorHoObj.VendorId = this.VendorId;
     this.http.post(AdInsConstant.GetVendorByVendorId, this.viewVendorHoldingObj).subscribe(
      response => {
        console.log("Response: ");
        console.log(response);
        this.MainInfo = response['ReturnObject'];
      },
      error => {
        console.log(error);
      }
    );

    // this.vendorAddrObj = new VendorHoObj();
    // this.vendorAddrObj.VendorId = this.VendorId;
    // this

  } 

}
