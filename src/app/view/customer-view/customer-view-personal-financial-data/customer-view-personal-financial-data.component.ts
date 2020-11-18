import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { environment } from 'environments/environment';
import { AdInsHelper } from 'app/shared/AdInsHelper';

@Component({
  selector: 'app-customer-view-personal-financial-data',
  templateUrl: './customer-view-personal-financial-data.component.html'
})
export class CustomerViewPersonalFinancialDataComponent implements OnInit {
  CustId: number;
  GetCBAForCustFinDataByCustIdUrl = URLConstant.GetCBAForCustFinDataByCustId;
  responseCBAObj: any;
  allBankStmntList : any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['CustId'] != null) {
        this.CustId = params['CustId'];
      }
    });
    
    var custAddrObj = { "CustId": this.CustId };
    this.http.post(this.GetCBAForCustFinDataByCustIdUrl, custAddrObj).subscribe(
      response => {
        this.responseCBAObj = response['ListCBAForCustFinData'];
      },
      error => {
        AdInsHelper.RedirectUrl(this.router,["/Error"],{});
      }
    );
  }
}
