import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';

@Component({
  selector: 'app-ho-info',
  templateUrl: './ho-info.component.html'
})
export class HoInfoComponent implements OnInit {
  MrVendorCategoryCode:any;
  VendorId:any;
  viewSupplierObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);
  viewSurveyorObj: UcViewGenericObj = new UcViewGenericObj(this.UrlConstantNew);

  constructor(private route: ActivatedRoute, private http: HttpClient, private UrlConstantNew: UrlConstantNew) {
    this.route.queryParams.subscribe(params => {
      this.VendorId = params['VendorId'];
    });
  }

  ngOnInit() {    

    this.http.post(this.UrlConstantNew.GetVendorByVendorId, {Id : this.VendorId}).subscribe(
      (response) => {
        this.MrVendorCategoryCode = response["MrVendorCategoryCode"];
      }
    )

    this.viewSupplierObj.viewInput = "./assets/ucviewgeneric/viewHOInfoSupplier.json";

    this.viewSurveyorObj.viewInput = "./assets/ucviewgeneric/viewHOInfoSurveyor.json";   
  }
}
