import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CustObj } from 'app/shared/model/CustObj.Model';
import { HttpClient } from '@angular/common/http';
 
@Component({
  selector: 'app-customer-personal-page',
  templateUrl: './customer-personal-page.component.html',
  styleUrls: ['./customer-personal-page.component.scss']
})
export class CustomerPersonalPageComponent implements OnInit {
  CustName  : any;
  Gender : any;
  GenderDesc:any;
  MrIdTypeCode : any;
  MrIdTypeCodeDesc : any;
  CustModel : any;
  CustModelDesc
  BirthPlace : any;
  BirthDt : any;
  IdNo : any;
  TaxIdNo : any;
  IdExpiredDt : any;
  MotherMaidenName : any;
  resultData: any;
  addUrl : any; IdCust : any;
  IdCustPersonal : any;
  custObj : any;
  constructor(private route: ActivatedRoute,private http: HttpClient) { 
     
    this.route.queryParams.subscribe(params => {
   
      if (params["IdCust"] != null) {
         this.IdCust = params["IdCust"];
       }
       if (params["IdCustPersonal"] != null) {
        this.IdCustPersonal = params["IdCustPersonal"];
      }
     
     });
    
  }

  ngOnInit() {
     
    this.custObj = new CustObj();
    this.custObj.CustId = this.IdCust;
    this.http.post(AdInsConstant.GetCustByCustId, this.custObj).subscribe(
      (response) => {
        
          this.custObj = response;
        });
  
  }

}
