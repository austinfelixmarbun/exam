import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CustObj } from 'app/shared/model/CustObj.Model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CustPersonalObj } from 'app/shared/model/CustPersonalObj.Model';

@Component({
  selector: 'app-customer-view-personal-financial-section',
  templateUrl: './customer-view-personal-financial-section.component.html',
  styleUrls: ['./customer-view-personal-financial-section.component.scss']
})
export class CustomerViewPersonalFinancialSectionComponent implements OnInit {
  GetCustPersonalFinDataForCustViewByCustIdUrl = AdInsConstant.GetCustPersonalFinDataForCustViewByCustId;
  custObj: CustObj;
  tempCustObj: Object;
  IdCust: any;
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
    this.custObj = new CustObj();
    this.custObj.CustId = this.IdCust;
    this.http.post(this.GetCustPersonalFinDataForCustViewByCustIdUrl, this.custObj).subscribe(
      (response) => {
        this.tempCustObj = response;
      });
  }
}