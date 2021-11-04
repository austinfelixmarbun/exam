import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CustObj } from 'app/shared/model/cust-obj.model';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-customer-view-personal-financial-section',
  templateUrl: './customer-view-personal-financial-section.component.html'
})
export class CustomerViewPersonalFinancialSectionComponent implements OnInit {
  tempCustObj: any;
  CustId: number;

  TitleSuffix:string = '';
  IsShowDetail:boolean = false;
  currentCustFinDataIndex: number;
  ListCustPersonalFinData : Array<object> = [];

  responseCustAttr: any;
  IsAttrExist: boolean;
  custObj: CustObj = new CustObj();
  constructor(private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (params["IdCust"] != null) {
        this.CustId = params["IdCust"];
      }
      else if (params["CustId"] != null) {
        this.CustId = params["CustId"];
      }
    });
  }

  async ngOnInit() {
    this.custObj = new CustObj();
    this.custObj.CustId = this.CustId;
    await this.http.post(URLConstant.GetListCustPersonalFinDataForCustViewByCustId, {custId : this.CustId }).toPromise().then(
      (response) => {
        console.log(response)
        this.ListCustPersonalFinData = response["ListCustPersonalFinDataForCustView"];
      }
    );

    await this.http.post(URLConstant.GetCustFinDataAttrContentForCustViewByCustId, { Id : this.CustId }).toPromise().then(
      (response) => {
        this.responseCustAttr = response[CommonConstant.ReturnObj];
        console.log(this.responseCustAttr);
        if (this.responseCustAttr[0] != null){
          this.IsAttrExist = true;
        }
      },
      (error) => {
        AdInsHelper.RedirectUrl(this.router,[NavigationConstant.ERROR],{});
      }
    );

    console.log(this.responseCustAttr)
  }

  showDetailCustFinData(index:number){
    let datePipe = new DatePipe("en-US");
    this.currentCustFinDataIndex = index;
    this.tempCustObj = this.ListCustPersonalFinData[this.currentCustFinDataIndex];
    this.TitleSuffix = 'Date as of '+datePipe.transform(this.tempCustObj['DateAsOf'], 'dd-MMM-yyyy')
    this.IsShowDetail = true;
  }
  
  hideDetail()
  {
    this.TitleSuffix = '';
    this.IsShowDetail = false;
    this.tempCustObj = null;
  }

}