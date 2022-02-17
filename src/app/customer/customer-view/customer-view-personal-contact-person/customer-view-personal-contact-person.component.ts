import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { UrlConstantNew } from 'app/shared/constant/URLConstantNew';

@Component({
  selector: 'app-customer-view-personal-contact-person',
  templateUrl: './customer-view-personal-contact-person.component.html'
})
export class CustomerViewPersonalContactPersonComponent implements OnInit {
  CustId: number;
  GetListCustPersonalContactPersonForCustViewByCustIdUrl = this.UrlConstantNew.GetListCustPersonalContactPersonForCustViewByCustId;
  CustNoObj: GenericObj = new GenericObj();
  responseObj: any;
  resCustObj: any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router, 
    private UrlConstantNew: UrlConstantNew
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['CustId'] != null) {
        this.CustId = params['CustId'];
      }
    });
    this.http.post(this.GetListCustPersonalContactPersonForCustViewByCustIdUrl, {Id : this.CustId}).subscribe(
      response => {
        this.responseObj = response[CommonConstant.ReturnObj];
      },
      error => {
        AdInsHelper.RedirectUrl(this.router,[NavigationConstant.ERROR],{});
      }
    );
  }

  openView(ContactPersonCustNo)
  {
    // GetCustByCustNo
    this.CustNoObj.CustNo = ContactPersonCustNo
    this.http.post(this.UrlConstantNew.GetCustByCustNo, this.CustNoObj).subscribe(
      response => {
        this.resCustObj = response;
        AdInsHelper.OpenCustomerViewByCustId(this.resCustObj.CustId);
      }
    );
  }
}
