import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-customer-view-customer-group',
  templateUrl: './customer-view-customer-group.component.html',
  styleUrls: ['./customer-view-customer-group.component.scss']
})
export class CustomerViewCustomerGroupComponent implements OnInit {
  CustId: number;
  GetListCustGrpForCustViewByCustIdUrl = AdInsConstant.GetListCustGrpForCustViewByCustId;
  responseObj: any;
  custViewUrl: string;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.custViewUrl = environment.FoundationR3Web +  "/Customer/CustomerView/Page?CustId=";
    this.route.queryParams.subscribe(params => {
      if (params['CustId'] != null) {
        this.CustId = params['CustId'];
      }
    });
    var custObj = { "CustId": this.CustId };
    this.http.post(this.GetListCustGrpForCustViewByCustIdUrl, custObj).subscribe(
      response => {
        this.responseObj = response['ReturnObject'];
      },
      error => {
        this.router.navigateByUrl('Error');
      }
    );
  }
}
