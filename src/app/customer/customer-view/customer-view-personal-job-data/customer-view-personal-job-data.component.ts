import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-view-personal-job-data',
  templateUrl: './customer-view-personal-job-data.component.html',
  styleUrls: ['./customer-view-personal-job-data.component.scss']
})
export class CustomerViewPersonalJobDataComponent implements OnInit {
  viewCustJobData: string;
  getCustByCustIdUrl = AdInsConstant.GetCustByCustId;
  CustId: any;
  custResultData: any;
  custModel: any;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    this.viewCustJobData =  "./assets/ucviewgeneric/viewCustJobData.json";

    this.route.queryParams.subscribe(params => {
      if (params['CustId'] != null) {
        this.CustId = params['CustId'];
      }
    });

    var custObj = {
      CustId: this.CustId
    }
    // this.http.post(this.getCustByCustIdUrl, custObj).subscribe(
    //   (response) => {
    //     this.custResultData = response["ReturnObject"];
    //     this.custModel = this.custResultData['CustModel']
    //   }
    // );

  }

}
