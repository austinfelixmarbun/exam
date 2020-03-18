import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AdInsConstant } from 'app/shared/AdInstConstant';

@Component({
  selector: 'app-customer-view-personal',
  templateUrl: './customer-view-personal.component.html',
  styleUrls: ['./customer-view-personal.component.scss']
})
export class CustomerViewPersonalComponent implements OnInit {
  viewCustMainInfoHeaderObj : any;
  CustId: any;
  viewCustJobData: string;
  getCustByCustIdUrl = AdInsConstant.GetCustByCustId;
  custResultData: any;
  custModel: any;
  viewCustJobDataAddress: string;
  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    console.log('sini');
    this.viewCustMainInfoHeaderObj =  "./assets/ucviewgeneric/viewCustMainInfoHeader.json";
    this.route.queryParams.subscribe(params => {
      if (params["CustId"] != null) {
        this.CustId = params["CustId"];
      }
    });

    var custObj = {
      CustId: this.CustId
    }
    this.http.post(this.getCustByCustIdUrl, custObj).subscribe(
      (response) => {
        this.custResultData = response;
        this.custModel = this.custResultData['MrCustModelCode'];
        console.log('cust model = ', this.custModel);
      },
      (error) =>{
        console.log('error');
        console.log(error);
      }
    );
  }

}
