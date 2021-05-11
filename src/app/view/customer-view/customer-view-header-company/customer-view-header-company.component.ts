import { Component, OnInit } from '@angular/core';
import { CustObj } from 'app/shared/model/CustObj.Model';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CustCompanyObj } from 'app/shared/model/CustCompanyObj.Model';
import { environment } from 'environments/environment';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { UcViewGenericObj } from 'app/shared/model/UcViewGenericObj.model';

@Component({
  selector: 'app-customer-view-header-company',
  templateUrl: './customer-view-header-company.component.html'
})
export class CustomerViewHeaderCompanyComponent implements OnInit {
  IdCust: number; 
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj();

  constructor(private route: ActivatedRoute, private http: HttpClient) { 
    this.route.queryParams.subscribe(params => {

      if (params["IdCust"] != null) {
        this.IdCust = params["IdCust"];
      }
      else if (params["CustId"] != null) {
        this.IdCust = params["CustId"];
      }
    });
  }
  ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewCustCompanyHeader.json";
  }

  ClickLinkViewCustExposure() {
    AdInsHelper.OpenCustExposure(this.IdCust);
  }
}
