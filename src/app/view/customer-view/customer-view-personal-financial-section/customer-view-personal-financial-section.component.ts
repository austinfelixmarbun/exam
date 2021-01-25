import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-customer-view-personal-financial-section',
  templateUrl: './customer-view-personal-financial-section.component.html'
})
export class CustomerViewPersonalFinancialSectionComponent implements OnInit {
  tempCustObj: any;
  IdCust: number;

  TitleSuffix:string = '';
  IsShowDetail:boolean = false;
  ListCustPersonalFinData : Array<object> = [];
  custPersonalId: number;
  currentCustFinDataIndex: number;
  

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.route.queryParams.subscribe(params => {
      if (params["IdCust"] != null) {
        this.IdCust = params["IdCust"];
      }
      else if (params["CustId"] != null) {
        this.IdCust = params["CustId"];
      }
    });
  }

  async ngOnInit() {
    await this.getListCustFinData();
  }

  async getListCustFinData(){
    this.ListCustPersonalFinData = [];
    await this.http.post(URLConstant.GetListCustPersonalFinDataForCustViewByCustId, {'CustId': this.IdCust}).toPromise().then((response) => {
      this.ListCustPersonalFinData = response['ListCustPersonalFinDataForCustView'];
    })
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