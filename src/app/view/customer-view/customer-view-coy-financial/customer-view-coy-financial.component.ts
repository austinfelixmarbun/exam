import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';

@Component({
  selector: 'app-customer-view-coy-financial',
  templateUrl: './customer-view-coy-financial.component.html'
})
export class CustomerViewCoyFinancialComponent implements OnInit {
  CustId: number;
  TitleSuffix:string = '';
  IsShowDetail:boolean = false;
  GetCBAForCustFinDataByCustIdUrl = URLConstant.GetCBAForCustFinDataByCustId;
  ListCustCoyFinData: Array<object> = [];
  CustCoyFinData: object;
  responseCBAObj: any;
  responseCustAttr: any;
  IsAttrExist: boolean;

  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    
    this.route.queryParams.subscribe(params => {
      if (params['CustId'] != null) {
        this.CustId = params['CustId'];
      }
    });
    var custAddrObj = { "CustId": this.CustId };
    this.http.post(this.GetCBAForCustFinDataByCustIdUrl, { Id: this.CustId }).subscribe(
      (response) => {
        this.responseCBAObj = response['ListCBAForCustFinData'];
      },
      (error) => {
        AdInsHelper.RedirectUrl(this.router,[NavigationConstant.ERROR],{});
      }
    );

    this.http.post(URLConstant.GetCustFinDataAttrContentForCustViewByCustId, { Id : this.CustId }).subscribe(
      (response) => {
        this.responseCustAttr = response[CommonConstant.ReturnObj];
        this.IsAttrExist = true;
      },
      (error) => {
        AdInsHelper.RedirectUrl(this.router,[NavigationConstant.ERROR],{});
      }
    );
  }
}
