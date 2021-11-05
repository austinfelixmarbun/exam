import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';

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

  constructor(private http: HttpClient, private route: ActivatedRoute) { 
  }

  ngOnInit() {
    this.viewCustMainInfoHeaderObj.viewInput = "./assets/ucviewgeneric/viewCustMainInfoHeader.json";

    this.viewCustCoyMainInfoHeader.viewInput = "./assets/ucviewgeneric/viewCustCoyMainInfoHeader.json";
    this.route.queryParams.subscribe(params => {
      if (params["CustId"] != null) {
        this.CustId = params["CustId"];
      }
    });
    this.http.post(URLConstant.GetCustByCustId, {Id : this.CustId}).subscribe(
      (response) => {
        this.custResultData = response;
        this.custModel = this.custResultData['MrCustModelCode'];
        this.custType  = this.custResultData['MrCustTypeCode'];
      }
    );
  } 
}
