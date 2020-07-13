import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { environment } from 'environments/environment';
import { URLConstant } from 'app/shared/constant/URLConstant';

@Component({
  selector: 'app-customer-view-coy-management',
  templateUrl: './customer-view-coy-management.component.html'
})


export class CustomerViewCoyManagementComponent implements OnInit {

  CustId: number;
  responseObj: any;
  GetCustCompanyMgmntShrholderForCustViewByCustIdUrl: string;
  custUrl: string;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
  ) { 
    this.GetCustCompanyMgmntShrholderForCustViewByCustIdUrl = URLConstant.GetCustCompanyMgmntShrholderForCustViewByCustId
  }

  ngOnInit() {
    this.custUrl = environment.FoundationR3Web + '/Customer/CustomerView/Page?CustId=';
    this.route.queryParams.subscribe(params => {
      if (params['CustId'] != null) {
        this.CustId = params['CustId'];
      }
    });
    var custObj = { "CustId": this.CustId };
    this.http.post(this.GetCustCompanyMgmntShrholderForCustViewByCustIdUrl, custObj).subscribe(
      response => {
        this.responseObj = response['ReturnObject'];
      },
      error => {
        this.router.navigateByUrl('Error');
      }
    );
  }
}
