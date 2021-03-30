import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-customer-view-other-info',
  templateUrl: './customer-view-other-info.component.html',
  styleUrls: ['./customer-view-other-info.component.css']
})
export class CustomerViewOtherInfoComponent implements OnInit {
  CustId: number;
  CustOtherInfoObj : any;
  CustAttrContentObj: any;

  constructor(private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (params['CustId'] != null) {
        this.CustId = params['CustId'];
      }
    });
  }

  ngOnInit() {
    this.http.post(URLConstant.GetCustOtherInfoByCustId, { Id : this.CustId }).subscribe(
      (response:any) => { 
        this.CustOtherInfoObj = response;
      }
    ); 

    this.http.post(URLConstant.GetCustAttrContentForCustViewByCustId, { Id : this.CustId }).subscribe(
      response => {
        this.CustAttrContentObj = response[CommonConstant.ReturnObj];
      },
      error => {
        AdInsHelper.RedirectUrl(this.router,[NavigationConstant.ERROR],{});
      }
    );
  }
}