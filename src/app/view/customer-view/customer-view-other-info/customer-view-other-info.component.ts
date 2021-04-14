import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';

@Component({
  selector: 'app-customer-view-other-info',
  templateUrl: './customer-view-other-info.component.html',
  styleUrls: []
})
export class CustomerViewOtherInfoComponent implements OnInit {
  CustId: number;
  CustOtherInfoObj : any;
  CustAttrContentObj: any;
  IsReady: boolean = false;

  constructor(private http: HttpClient,
    private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      if (params['CustId'] != null) {
        this.CustId = params['CustId'];
      }
    });
  }

  ngOnInit() {
    this.http.post(URLConstant.GetCustOtherInfoByCustId, { Id : this.CustId }).subscribe(
      (response: any) => { 
        this.CustOtherInfoObj = response;

        this.http.post(URLConstant.GetCustAttrContentForCustViewByCustId, { Id : this.CustId }).subscribe(
          (response: any) => {
            this.CustAttrContentObj = response[CommonConstant.ReturnObj];

            this.IsReady = true;
          }
        );
      }
    );
  }
}