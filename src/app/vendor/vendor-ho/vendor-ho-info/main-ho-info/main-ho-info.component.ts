import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { UcViewGenericObj } from 'app/shared/model/UcViewGenericObj.model';
import { environment } from 'environments/environment';

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
  viewObj12345: any;
  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.route.queryParams.subscribe(params => {
      this.VendorId = params['VendorId'];
    });
  }

  ngOnInit() {
    var obj={
      VendorId: this.VendorId
    }

    this.http.post(AdInsConstant.GetVendorByVendorId, obj).subscribe(
      (response) => {
        this.MrVendorTypeCode = response["MrVendorTypeCode"];
      }
    )
    
    this.viewCObj.viewInput = "./assets/ucviewgeneric/viewHOInfoCompany.json";
    this.viewCObj.viewEnvironment = environment.FoundationR3Url;
    this.viewPObj.viewInput = "./assets/ucviewgeneric/viewHOInfoPersonal.json";
    this.viewPObj.viewEnvironment = environment.FoundationR3Url;

  }

}
