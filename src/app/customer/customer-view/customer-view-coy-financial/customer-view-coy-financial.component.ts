import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AdInsConstant } from 'app/shared/AdInstConstant';

@Component({
  selector: 'app-customer-view-coy-financial',
  templateUrl: './customer-view-coy-financial.component.html',
  styleUrls: ['./customer-view-coy-financial.component.scss']
})
export class CustomerViewCoyFinancialComponent implements OnInit {
  viewCustCoyFinData =  "./assets/ucviewgeneric/viewCustCoyFinData.json";
  CustId: any;
  GetCBAForCustFinDataByCustIdUrl = AdInsConstant.GetCBAForCustFinDataByCustId;
  responseCBAObj: any;
  
  constructor(    
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,) {

   }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['CustId'] != null) {
        this.CustId = params['CustId'];
      }
    });
    var custAddrObj = { "CustId": this.CustId };
    console.log('debug sini');
    this.http.post(this.GetCBAForCustFinDataByCustIdUrl, custAddrObj).subscribe(
      response => {
        this.responseCBAObj = response['ListCBAForCustFinData'];
        console.log('isi get list = ', this.responseCBAObj);
      },
      error => {
        this.router.navigateByUrl('Error');
      }
    );
  }

}
