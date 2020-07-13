import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';

@Component({
  selector: 'app-customer-view-personal-customer-group',
  templateUrl: './customer-view-personal-customer-group.component.html'
})
export class CustomerViewPersonalCustomerGroupComponent implements OnInit {
  CustId: number;
  responseObj: any;

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
    var custObj = { "CustId": this.CustId };
    this.http.post(URLConstant.GetListCustGrpForCustViewByCustId, custObj).subscribe(
      response => {
        this.responseObj = response[CommonConstant.ReturnObj];
      },
      error => {
        this.router.navigateByUrl('Error');
      }
    );
  }
}
