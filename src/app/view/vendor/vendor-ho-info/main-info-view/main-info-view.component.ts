import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';

@Component({
  selector: 'app-main-info-view',
  templateUrl: './main-info-view.component.html'
})
export class MainInfoViewComponent implements OnInit {
  VendorId: number;
  MrVendorClass: string;
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);

  constructor(private http: HttpClient, private route: ActivatedRoute, private UrlConstantNew: UrlConstantNew) {
    this.route.queryParams.subscribe(params => {
      this.VendorId = params["VendorId"];
    })
  }

  ngOnInit() {
    
    this.http.post(this.UrlConstantNew.GetVendorByVendorId, {Id : this.VendorId}).subscribe(
      (response) => {
        this.MrVendorClass = response["MrVendorClass"];
        if (this.MrVendorClass == CommonConstant.Holding) {
          this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewVendorHoldingMainInfo.json";
        } else if (this.MrVendorClass == CommonConstant.HeadOffice) {
          this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewVendorHOMainInfo.json";
        } else if (this.MrVendorClass == CommonConstant.Branch) {
          this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewVendorBranchMainInfo.json";
        }
      }
    );
  }
}
