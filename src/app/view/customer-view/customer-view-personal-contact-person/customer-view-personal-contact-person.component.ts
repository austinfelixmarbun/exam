import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CustObj } from 'app/shared/model/CustObj.Model';
import { environment } from 'environments/environment.sit';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';

@Component({
  selector: 'app-customer-view-personal-contact-person',
  templateUrl: './customer-view-personal-contact-person.component.html'
})
export class CustomerViewPersonalContactPersonComponent implements OnInit {
  CustId: number;
  GetListCustPersonalContactPersonForCustViewByCustIdUrl = URLConstant.GetListCustPersonalContactPersonForCustViewByCustId;
  responseObj: any;
  resCustObj: any;

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
    var custAddrObj = { "CustId": this.CustId };
    this.http.post(this.GetListCustPersonalContactPersonForCustViewByCustIdUrl, custAddrObj).subscribe(
      response => {
        this.responseObj = response[CommonConstant.ReturnObj];
      },
      error => {
        AdInsHelper.RedirectUrl(this.router,["/Error"],{});
      }
    );
  }

  openView(ContactPersonCustNo)
  {
    // GetCustByCustNo
    var custObj = new CustObj;
    custObj.CustNo = ContactPersonCustNo
    this.http.post(URLConstant.GetCustByCustNo, custObj).subscribe(
      response => {
        this.resCustObj = response;
        AdInsHelper.OpenCustomerViewByCustId(this.resCustObj.CustId);
      }
    );
  }
}
