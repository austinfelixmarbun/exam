import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { environment } from 'environments/environment';
import { UcViewGenericObj } from 'app/shared/model/UcViewGenericObj.model';

@Component({
  selector: 'app-customer-view-coy-financial',
  templateUrl: './customer-view-coy-financial.component.html'
})
export class CustomerViewCoyFinancialComponent implements OnInit {
  CustId: number;
  GetCBAForCustFinDataByCustIdUrl = URLConstant.GetCBAForCustFinDataByCustId;
  viewGenericObj: UcViewGenericObj = new UcViewGenericObj();
  responseCBAObj: any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router, ) {
  }

  ngOnInit() {
    this.viewGenericObj.viewInput = "./assets/ucviewgeneric/viewCustCoyFinData.json";
    this.viewGenericObj.viewEnvironment = environment.FoundationR3Url;
    
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
        this.router.navigateByUrl('Error');
      }
    );
  }
}
