import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AdInsConstant } from 'app/shared/AdInstConstant';

@Component({
  selector: 'app-customer-view-personal-contact-person',
  templateUrl: './customer-view-personal-contact-person.component.html',
  styleUrls: ['./customer-view-personal-contact-person.component.scss']
})
export class CustomerViewPersonalContactPersonComponent implements OnInit {
  CustId: any;
  GetListCustPersonalContactPersonForCustViewByCustIdUrl = AdInsConstant.GetListCustPersonalContactPersonForCustViewByCustId;
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
    this.http.post(this.GetListCustPersonalContactPersonForCustViewByCustIdUrl, custAddrObj).subscribe(
      response => {
        this.responseObj = response['ReturnObject'];
      },
      error => {
        this.router.navigateByUrl('Error');
      }
    );

  }

}
