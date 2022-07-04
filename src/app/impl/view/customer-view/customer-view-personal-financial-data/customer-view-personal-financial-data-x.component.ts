import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { environment } from 'environments/environment';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-customer-view-personal-financial-data-x',
  templateUrl: './customer-view-personal-financial-data-x.component.html'
})
export class CustomerViewPersonalFinancialDataXComponent implements OnInit {
  CustId: number;
  GetCBAForCustFinDataByCustIdUrl = URLConstant.GetCBAForCustFinDataByCustId;
  responseCBAObj: any;
  allBankStmntList : any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  async ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['CustId'] != null) {
        this.CustId = params['CustId'];
      }
    });
    
    await this.http.post(this.GetCBAForCustFinDataByCustIdUrl, { Id : this.CustId }).toPromise().then(
      response => {
        this.responseCBAObj = response['ListCBAForCustFinData'];
      },
      error => {
        AdInsHelper.RedirectUrl(this.router,[NavigationConstant.ERROR],{});
      }
    );
  }
}
