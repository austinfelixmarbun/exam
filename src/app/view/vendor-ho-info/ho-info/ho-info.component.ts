import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { UcViewGenericObj } from 'app/shared/model/UcViewGenericObj.model';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-ho-info',
  templateUrl: './ho-info.component.html'
})
export class HoInfoComponent implements OnInit {
  MrVendorCategoryCode:any;
  VendorId:any;
  viewSupplierObj: UcViewGenericObj = new UcViewGenericObj();
  viewSurveyorObj: UcViewGenericObj = new UcViewGenericObj();

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.route.queryParams.subscribe(params => {
      this.VendorId = params['VendorId'];
    });
  }

  ngOnInit() {
    var obj={
      VendorId: this.VendorId
    }

    this.http.post(URLConstant.GetVendorByVendorId, obj).subscribe(
      (response) => {
        this.MrVendorCategoryCode = response["MrVendorCategoryCode"];
      }
    )

    this.viewSupplierObj.viewInput = "./assets/ucviewgeneric/viewHOInfoSupplier.json";
    this.viewSupplierObj.viewEnvironment = environment.FoundationR3Url;    
    this.viewSupplierObj.ddlEnvironments = [
      {
        name: "LinkSupplierHolding",
        environment: environment.FoundationR3Web
      },
    ];
    this.viewSurveyorObj.viewInput = "./assets/ucviewgeneric/viewHOInfoSurveyor.json";
    this.viewSurveyorObj.viewEnvironment = environment.FoundationR3Url;    
  }
}
