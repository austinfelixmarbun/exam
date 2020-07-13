import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';

@Component({
  selector: 'app-ho-info',
  templateUrl: './ho-info.component.html'
})
export class HoInfoComponent implements OnInit {
  MrVendorCategoryCode:any;
  VendorId:any;
  viewSupplierObj:any;
  viewSurveyorObj:any;

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
    
    this.viewSupplierObj = "./assets/ucviewgeneric/viewHOInfoSupplier.json";
    this.viewSurveyorObj = "./assets/ucviewgeneric/viewHOInfoSurveyor.json";
  }

}
