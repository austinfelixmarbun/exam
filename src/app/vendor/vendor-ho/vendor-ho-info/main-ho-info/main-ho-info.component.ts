import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';

@Component({
  selector: 'app-main-ho-info',
  templateUrl: './main-ho-info.component.html',
  styleUrls: ['./main-ho-info.component.scss']
})
export class MainHoInfoComponent implements OnInit {
  viewCObj: UcViewGenericObj = new UcViewGenericObj();
  viewPObj: UcViewGenericObj = new UcViewGenericObj();
  VendorId: any;
  MrVendorTypeCode: any;
  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.route.queryParams.subscribe(params => {
      this.VendorId = params['VendorId'];
    });
  }

  ngOnInit() {   

    this.http.post(URLConstant.GetVendorByVendorId, {Id : this.VendorId}).subscribe(
      (response) => {
        this.MrVendorTypeCode = response["MrVendorTypeCode"];
      }
    )
    
    this.viewCObj.viewInput = "./assets/ucviewgeneric/viewHOInfoCompany.json";
    this.viewPObj.viewInput = "./assets/ucviewgeneric/viewHOInfoPersonal.json";
  }

}
