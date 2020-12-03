import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { environment } from 'environments/environment';
import { UcViewGenericObj } from 'app/shared/model/UcViewGenericObj.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html'
})
export class CustomerViewComponent implements OnInit {
  custModel: any;
  custResultData: any;
  viewCustMainInfoHeaderObj: UcViewGenericObj = new UcViewGenericObj();
  viewCustCoyMainInfoHeader: UcViewGenericObj= new UcViewGenericObj();

  CustId: number;

  

  custType: string;
  viewCustJobData: string;
  getCustByCustIdUrl: string;
  viewCustJobDataAddress: string;

  constructor(private http: HttpClient, private route: ActivatedRoute, private location: Location) { 
    this.getCustByCustIdUrl = URLConstant.GetCustByCustId;
    this.location.replaceState(environment.FoundationR3Web + "/View/Customer/");
  }

  ngOnInit() {
    this.viewCustMainInfoHeaderObj.viewInput = "./assets/ucviewgeneric/viewCustMainInfoHeader.json";
    this.viewCustMainInfoHeaderObj.viewEnvironment = environment.FoundationR3Url;

    this.viewCustCoyMainInfoHeader.viewInput = "./assets/ucviewgeneric/viewCustCoyMainInfoHeader.json";
    this.viewCustCoyMainInfoHeader.viewEnvironment = environment.FoundationR3Url;
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
        this.custType  = this.custResultData['MrCustTypeCode'];
      }
    );
  } 
}
