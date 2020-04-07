import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AdInsConstant } from 'app/shared/AdInstConstant';

@Component({
  selector: 'app-customer-view-coy-management',
  templateUrl: './customer-view-coy-management.component.html',
  styleUrls: ['./customer-view-coy-management.component.scss']
})


export class CustomerViewCoyManagementComponent implements OnInit {
  CustId: any;
  GetCustCompanyMgmntShrholderForCustViewByCustCompanyMgmntShrholderIdUrl = AdInsConstant.GetCustCompanyMgmntShrholderForCustViewByCustCompanyMgmntShrholderId;
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
    var custAddrObj = { "CustId": this.CustId };
    this.http.post(this.GetCustCompanyMgmntShrholderForCustViewByCustCompanyMgmntShrholderIdUrl, custAddrObj).subscribe(
      response => {
        this.responseObj = response['ReturnObject'];
      },
      error => {
        this.router.navigateByUrl('Error');
      }
    );
  }
}
