import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-customer-view-coy-financial',
  templateUrl: './customer-view-coy-financial.component.html'
})
export class CustomerViewCoyFinancialComponent implements OnInit {
  CustId: number;
  TitleSuffix:string = '';
  IsShowDetail:boolean = false;
  GetCBAForCustFinDataByCustIdUrl = URLConstant.GetCBAForCustFinDataByCustId;
  ListCustCoyFinData: Array<object> = [];
  CustCoyFinData: object;
  responseCBAObj: any;
  currentCustFinDataIndex: number;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router) 
  {
    this.route.queryParams.subscribe(params => {
      if (params['CustId'] != null) {
        this.CustId = params['CustId'];
      }
    });
  }

  ngOnInit() {    
    this.getListCustCoyFinData();
    
    this.http.post(this.GetCBAForCustFinDataByCustIdUrl, { "CustId": this.CustId }).subscribe(
      response => {
        this.responseCBAObj = response['ListCBAForCustFinData'];
      },
      error => {
        AdInsHelper.RedirectUrl(this.router,["/Error"],{});
      }
    );
  }

  async getListCustCoyFinData()
  {
    this.ListCustCoyFinData = [];
    await this.http.post(URLConstant.GetListCustCompanyFinDataByCustId,  {'CustId': this.CustId}).toPromise().then((response) => {
      this.ListCustCoyFinData = response['ListCustCompanyFinData'];
    })
  }

  showDetailCustFinData(index:number){
    let datePipe = new DatePipe("en-US");
    this.currentCustFinDataIndex = index;
    this.CustCoyFinData = this.ListCustCoyFinData[this.currentCustFinDataIndex];
    this.TitleSuffix = 'Date as of '+datePipe.transform(this.CustCoyFinData['DateAsOf'], 'dd-MMM-yyyy')
    this.IsShowDetail = true;
  }
  
  hideDetail()
  {
    this.TitleSuffix = '';
    this.IsShowDetail = false;
    this.CustCoyFinData = {};
  }
}
