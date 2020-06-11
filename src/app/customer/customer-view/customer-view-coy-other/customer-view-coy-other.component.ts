import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AdInsConstant } from 'app/shared/AdInstConstant';

@Component({
  selector: 'app-customer-view-coy-other',
  templateUrl: './customer-view-coy-other.component.html',
  styleUrls: ['./customer-view-coy-other.component.scss']
})
export class CustomerViewCoyOtherComponent implements OnInit {
  CustId: number;
  GetCustAttrContentForCustViewByCustIdUrl = AdInsConstant.GetCustAttrContentForCustViewByCustId;
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
    this.http.post(this.GetCustAttrContentForCustViewByCustIdUrl, custObj).subscribe(
      response => {
        this.responseCustAttr = response['ReturnObject'];
      },
      error => {
        this.router.navigateByUrl('Error');
      }
    );
  }
}
