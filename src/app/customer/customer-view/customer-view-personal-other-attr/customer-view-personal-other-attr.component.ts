import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AdInsConstant } from 'app/shared/AdInstConstant';

@Component({
  selector: 'app-customer-view-personal-other-attr',
  templateUrl: './customer-view-personal-other-attr.component.html',
  styleUrls: ['./customer-view-personal-other-attr.component.scss']
})
export class CustomerViewPersonalOtherAttrComponent implements OnInit {
  CustId: any;
  GetCustAttrContentForCustViewByCustIdUrl = AdInsConstant.GetCustAttrContentForCustViewByCustId;
  responseCustAttr: any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    // private adInsService: AdInsService,
    // private fb: FormBuilder
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
