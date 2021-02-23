import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { environment } from 'environments/environment';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';

@Component({
  selector: 'app-customer-view-customer-group',
  templateUrl: './customer-view-customer-group.component.html'
})
export class CustomerViewCustomerGroupComponent implements OnInit {
  CustId: number;
  GetListCustGrpForCustViewByCustIdUrl = URLConstant.GetListCustGrpForCustViewByCustId;
  GetListCustGrpForCustViewByMemberCustIdUrl = URLConstant.GetListCustGrpForCustViewByMemberCustId;
  responseObj: any;
  custViewUrl: string;
  responseMemberCustGrpObj: any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.custViewUrl = environment.FoundationR3Web +  "/View/Customer/PersonalDetail?CustId=";
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
        AdInsHelper.RedirectUrl(this.router,["/Error"],{});
      }
    );
    this.http.post(this.GetListCustGrpForCustViewByMemberCustIdUrl, custObj).subscribe(
      response => {
        this.responseMemberCustGrpObj = response['ReturnObject'];
      },
      error => {
        AdInsHelper.RedirectUrl(this.router,["/Error"],{});
      }
    );
  }
}
