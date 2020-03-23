import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AdInsConstant } from 'app/shared/AdInstConstant';

@Component({
  selector: 'app-customer-view-personal-financial-data',
  templateUrl: './customer-view-personal-financial-data.component.html',
  styleUrls: ['./customer-view-personal-financial-data.component.scss']
})
export class CustomerViewPersonalFinancialDataComponent implements OnInit {
  CustId: any;
  GetCBAForCustFinDataByCustIdUrl = AdInsConstant.GetCBAForCustFinDataByCustId;
  viewCustFinData =   "./assets/ucviewgeneric/viewCustFinData.json";
  responseCBAObj: any;
  allBankStmntList : any;

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
