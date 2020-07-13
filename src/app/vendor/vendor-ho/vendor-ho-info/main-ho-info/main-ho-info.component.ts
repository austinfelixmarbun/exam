import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';

@Component({
  selector: 'app-main-ho-info',
  templateUrl: './main-ho-info.component.html',
  styleUrls: ['./main-ho-info.component.scss']
})
export class MainHoInfoComponent implements OnInit {
  viewCObj: any;
  viewPObj: any;
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

    this.http.post(URLConstant.GetVendorByVendorId, obj).subscribe(
      (response) => {
        this.MrVendorTypeCode = response["MrVendorTypeCode"];
      }
    )

    this.viewCObj = "./assets/ucviewgeneric/viewHOInfoCompany.json";
    this.viewPObj = "./assets/ucviewgeneric/viewHOInfoPersonal.json";

  }

}
