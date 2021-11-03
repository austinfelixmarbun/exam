import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';
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
    

    this.http.post(URLConstant.GetVendorByVendorId, {Id : this.VendorId}).subscribe(
      (response) => {
        this.MrVendorCategoryCode = response["MrVendorCategoryCode"];
      }
    )

    this.viewSupplierObj.viewInput = "./assets/ucviewgeneric/viewHOInfoSupplier.json"; 

    this.viewSurveyorObj.viewInput = "./assets/ucviewgeneric/viewHOInfoSurveyor.json";
  }
}
