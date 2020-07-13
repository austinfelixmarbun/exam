import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { UcViewGenericObj } from 'app/shared/model/UcViewGenericObj.model';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-main-info-view',
  templateUrl: './main-info-view.component.html'
})
export class MainInfoViewComponent implements OnInit {
  VendorId: number;
  MrVendorClass: string;
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj();

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.VendorId = params["VendorId"];
    })
  }

  ngOnInit() {
    var vendorObj = {
      VendorId: this.VendorId
    }
    this.http.post(URLConstant.GetVendorByVendorId, vendorObj).subscribe(
      (response) => {
        this.MrVendorClass = response["MrVendorClass"];
        if (this.MrVendorClass == "HOLDING") {
          this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewVendorHoldingMainInfo.json";
        } else if (this.MrVendorClass == "HO") {
          this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewVendorHOMainInfo.json";
        } else if (this.MrVendorClass == "BRANCH") {
          this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewVendorBranchMainInfo.json";
        }
        this.viewGenericObj.viewEnvironment = environment.FoundationR3Url;
      }
    );
  }
}
