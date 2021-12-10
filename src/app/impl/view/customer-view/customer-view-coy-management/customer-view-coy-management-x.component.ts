import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'environments/environment';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { ShareholderListingObj } from 'app/shared/model/new-cust/shareholder/shareholder-listing-obj.model';
import { GenericListObj } from 'app/shared/model/generic/generic-list-obj.model';
import { URLConstantX } from 'app/impl/shared/constant/URLConstantX';

@Component({
  selector: 'app-customer-view-coy-management-x',
  templateUrl: './customer-view-coy-management-x.component.html'
})

export class CustomerViewCoyManagementXComponent implements OnInit {
  CustId: number;
  responseObj: Array<ShareholderListingObj> = new Array();

  readonly CustomerPersonal = CommonConstant.CustomerPersonal;
  readonly CustomerCompany = CommonConstant.CustomerCompany;
  readonly CustomerPublic = CommonConstant.CustomerPublic;
  
  readonly NegCustTypeBad = CommonConstant.NegCustTypeBad;
  readonly NegCustTypeWarning = CommonConstant.NegCustTypeWarning;
  readonly dictNegCustType: {[id: string]: string}={};
  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router) { 
  }

  ngOnInit() {
    this.dictNegCustType[this.NegCustTypeBad]="red";
    this.dictNegCustType[this.NegCustTypeWarning]="yellow";
    this.route.queryParams.subscribe(params => {
      if (params['CustId'] != null) {
        this.CustId = params['CustId'];
      }
    });
    this.http.post(URLConstantX.GetListManagementShareholderForListPagingByCustId, {Id : this.CustId}).subscribe(
      (response: GenericListObj) => {
        this.responseObj = response.ReturnObject;
      },
      error => {
        AdInsHelper.RedirectUrl(this.router,[NavigationConstant.ERROR],{});
      }
    );
  }

  openViewPersonal(custId: number){
    AdInsHelper.OpenCustomerViewByCustId(custId);
  }

  openViewCoy(custId: number){
    AdInsHelper.OpenCustomerCoyViewByCustId(custId);
  }
}