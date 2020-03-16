import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdInsConstant } from 'app/shared/AdInstConstant';

@Component({
  selector: 'app-customer-company-duplicate-check',
  templateUrl: './customer-company-duplicate-check.component.html',
  styleUrls: ['./customer-company-duplicate-check.component.scss']
})
export class CustomerCompanyDuplicateCheckComponent implements OnInit {

   
  getUrl: any;
  tempCompanyTypeCode: any;
  tempIdType: any;
  
  CustModel: any;
   
  CustName: any;
  MrCompanyTypeCode: any;
  
  MrIdTypeCode: any;
 
  IdNo: any;
  TaxIdNo: any;
  urlGetDescByMasterCode : any;
  tempMrCompanyTypeCode: any;
  tempCustModel: any;
  tempMrIdTypeCode : any;
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) {
    this.urlGetDescByMasterCode =AdInsConstant.GetRefMasterByMasterCode;
    this.route.queryParams.subscribe(params => {
      if (params["CustModel"] != null) {
        this.CustModel = params["CustModel"];
      }  
      if (params["CustName"] != null) {
        this.CustName = params["CustName"];
      }
      if (params["MrCompanyTypeCode"] != null) {
        this.MrCompanyTypeCode = params["MrCompanyTypeCode"];
      }  
      if (params["MrIdTypeCode"] != null) {
        this.MrIdTypeCode = params["MrIdTypeCode"];
      }     
      if (params["IdNo"] != null) {
        this.IdNo = params["IdNo"];
      }
      if (params["TaxIdNo"] != null) {
        this.TaxIdNo = params["TaxIdNo"];
      }
    });
  }

  ngOnInit() {
    var refMasterObj1 = {
      MasterCode: this.CustModel,
      RowVersion: ""
    }
    this.http.post(this.urlGetDescByMasterCode, refMasterObj1).subscribe(
      (response) => {
        this.tempCustModel = response;
      }
    );    
 
    var refMasterObj2 = {
      MasterCode: this.MrCompanyTypeCode,
      RowVersion: ""
    }
    this.http.post(this.urlGetDescByMasterCode, refMasterObj2).subscribe(
      (response) => {
        this.tempMrCompanyTypeCode = response;
      }
    );

    var refMasterObj3 = {
      MasterCode: this.MrIdTypeCode,
      RowVersion: ""
    }
    this.http.post(this.urlGetDescByMasterCode, refMasterObj3).subscribe(
      (response) => {
        this.tempMrIdTypeCode = response;
      }
    );
  }

}
