import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { AddCustObj } from 'app/shared/model/AddCustObj.Model';
import { CustObj } from 'app/shared/model/CustObj.Model';
import { CustCompanyObj } from 'app/shared/model/CustCompanyObj.Model';

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
  addCustObj : any;
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

 
  }
  SaveValue() { 
  
    console.log("awdawdawdawdaw");
     this.addCustObj = new AddCustObj();
     this.addCustObj.custObj = new CustObj();
     this.addCustObj.CustCompanyObj = new CustCompanyObj();
     this.addCustObj.custObj.CustName = this.CustName;
     this.addCustObj.CustCompanyObj.MrCompanyTypeCode = this.MrCompanyTypeCode;
     this.addCustObj.custObj.MrCustTypeCode = "Company";
     this.addCustObj.custObj.MrCustModelCode = this.CustModel;
     this.addCustObj.custObj.MrIdTypeCode = "NPWP";
     this.addCustObj.custObj.IdNo = this.TaxIdNo;
     this.addCustObj.custObj.TaxIdNo = this.TaxIdNo;
     

    // this.http.post(this.addCustUrl, this.addCustObj).subscribe(
    //   (response) => {
    //     this.resultData = response;
    //     this.IdCust = this.resultData.CustObj.CustId;
    //     this.IdCustPersonal = this.resultData.CustPersonalObj.CustPersonalId;
    //     this.router.navigate(["/Customer/CustomerPersonal/Page"], { queryParams: { "IdCust": this.IdCust } });
    //   },

    //   error => {
    //     console.log(error);
    //   }
    // );
  }
}
