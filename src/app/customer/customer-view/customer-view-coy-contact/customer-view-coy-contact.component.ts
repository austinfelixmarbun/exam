import { Component, OnInit } from '@angular/core';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdInsService } from 'app/shared/services/adIns.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-customer-view-coy-contact',
  templateUrl: './customer-view-coy-contact.component.html',
  styleUrls: ['./customer-view-coy-contact.component.scss']
})
export class CustomerViewCoyContactComponent implements OnInit {
  GetCustCompanyContactPersonForCustViewByCustIdUrl = AdInsConstant.GetCustCompanyContactPersonForCustViewByCustId;
  responseResult: any;
  CustId: any;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private adInsService: AdInsService,
    private fb: FormBuilder
  ) { }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['CustId'] != null) {
        this.CustId = params['CustId'];
      }
    });
    var custObj = { "CustId": this.CustId };
    this.http.post(this.GetCustCompanyContactPersonForCustViewByCustIdUrl, custObj).subscribe(
      response => {
        this.responseResult = response['ReturnObject'];
      },
      error => {
        this.router.navigateByUrl('Error');
      }
    );
  }
}