import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AdInsConstant } from 'app/shared/AdInstConstant';

@Component({
  selector: 'app-main-info-view',
  templateUrl: './main-info-view.component.html',
  styleUrls: ['./main-info-view.component.scss']
})
export class MainInfoViewComponent implements OnInit {
  viewObj: any;
  VendorId: number;
  MrVendorClass: string;

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
        this.VendorId = params["VendorId"];
  })
  }

  ngOnInit() {
    var vendorObj = {
      VendorId: this.VendorId
    }
    this.http.post(AdInsConstant.GetVendorByVendorId, vendorObj).subscribe(
      (response) => {
        this.MrVendorClass = response["MrVendorClass"];
        if(this.MrVendorClass == "HOLDING"){
          this.viewObj = "./assets/ucviewgeneric/viewVendorHoldingMainInfo.json"
        }else if(this.MrVendorClass == "HO"){
          this.viewObj = "./assets/ucviewgeneric/viewVendorHOMainInfo.json"
        }else if(this.MrVendorClass == "BRANCH")
          this.viewObj = "./assets/ucviewgeneric/viewVendorBranchMainInfo.json"
      }
    );
  }

}
