import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { UcViewGenericObj } from 'app/shared/model/UcViewGenericObj.model';
import { environment } from 'environments/environment';
import { CommonConstant } from 'app/shared/constant/CommonConstant';

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
    
    this.http.post(URLConstant.GetVendorByVendorId, {Id : this.VendorId}).subscribe(
      (response) => {
        this.MrVendorClass = response["MrVendorClass"];
        if (this.MrVendorClass == CommonConstant.Holding) {
          this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewVendorHoldingMainInfo.json";
        } else if (this.MrVendorClass == CommonConstant.HeadOffice) {
          this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewVendorHOMainInfo.json";
        } else if (this.MrVendorClass == CommonConstant.Branch) {
          this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewVendorBranchMainInfo.json";
        }
        this.viewGenericObj.viewEnvironment = environment.FoundationR3Url;
      }
    );
  }
}
