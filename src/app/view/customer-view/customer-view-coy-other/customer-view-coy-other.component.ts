import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-customer-view-coy-other',
  templateUrl: './customer-view-coy-other.component.html'
})
export class CustomerViewCoyOtherComponent implements OnInit {
  CustId: number;
  GetCustAttrContentForCustViewByCustIdUrl = URLConstant.GetCustAttrContentForCustViewByCustId;
  responseCustAttr: any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['CustId'] != null) {
        this.CustId = params['CustId'];
      }
    });
    var custObj = { "CustId": this.CustId };
    this.http.post(this.GetCustAttrContentForCustViewByCustIdUrl, { Id : this.CustId }).subscribe(
      response => {
        this.responseCustAttr = response['ReturnObject'];
      },
      error => {
        AdInsHelper.RedirectUrl(this.router,[NavigationConstant.ERROR],{});
      }
    );
  }
}
