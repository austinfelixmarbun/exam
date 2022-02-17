import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'environments/environment';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';

@Component({
  selector: 'app-customer-view-customer-group',
  templateUrl: './customer-view-customer-group.component.html'
})
export class CustomerViewCustomerGroupComponent implements OnInit {
  CustId: number;
  GetListCustGrpForCustViewByCustIdUrl = this.UrlConstantNew.GetListCustGrpForCustViewByCustId;
  responseObj: any;
  custViewUrl: string;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router, 
    private UrlConstantNew: UrlConstantNew
  ) { }

  ngOnInit() {
    this.custViewUrl = environment.FoundationR3Web +  "/View/Customer/PersonalDetail?CustId=";
    this.route.queryParams.subscribe(params => {
      if (params['CustId'] != null) {
        this.CustId = params['CustId'];
      }
    });
    this.http.post(this.GetListCustGrpForCustViewByCustIdUrl, {Id : this.CustId}).subscribe(
      response => {
        this.responseObj = response['ReturnObject'];
      },
      error => {
        AdInsHelper.RedirectUrl(this.router,[NavigationConstant.ERROR],{});
      }
    );
  }
}
