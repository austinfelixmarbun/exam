import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CustObj } from 'app/shared/model/cust-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';

@Component({
  selector: 'app-customer-view-personal-financial-section',
  templateUrl: './customer-view-personal-financial-section.component.html'
})
export class CustomerViewPersonalFinancialSectionComponent implements OnInit {
  GetCustPersonalFinDataForCustViewByCustIdUrl = this.UrlConstantNew.GetCustPersonalFinDataForCustViewByCustId;
  custObj: CustObj;
  tempCustObj: any;
  IdCust: number;
  constructor(private route: ActivatedRoute, private http: HttpClient, private UrlConstantNew: UrlConstantNew) {
    this.route.queryParams.subscribe(params => {
      if (params["IdCust"] != null) {
        this.IdCust = params["IdCust"];
      }
      else if (params["CustId"] != null) {
        this.IdCust = params["CustId"];
      }
    });
  }
  async ngOnInit() {
    this.custObj = new CustObj();
    this.custObj.CustId = this.IdCust;
    await this.http.post(this.GetCustPersonalFinDataForCustViewByCustIdUrl, {Id : this.IdCust}).toPromise().then(
      (response) => {
        console.log(response)
        this.tempCustObj = response;
      });
  }
}