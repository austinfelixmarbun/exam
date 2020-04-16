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
  styleUrls: ['./customer-company-duplicate-check.component.scss'],
})
export class CustomerCompanyDuplicateCheckComponent implements OnInit {
  getUrl: any;
  tempCompanyTypeCode: any;
  tempIdType: string;
  CustModel: string;
  CustName: string;
  MrCompanyTypeCode: string;
  MrIdTypeCode: string;
  IdNo: any;
  TaxIdNo: string;
  urlGetDescByMasterCode: string;
  tempMrCompanyTypeCode: any;
  tempCustModel: any;
  tempMrIdTypeCode: any;
  addCustObj: any;
  resultData: any;
  IdCust: any;
  IsAffiliateWithMf : any
  IsVip : any;
  VipNotes : any;
  StatusAffiliate : string;
  StatusIsVip : string;
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) {
    this.urlGetDescByMasterCode = AdInsConstant.GetRefMasterByMasterCode;
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
      if (params["IsAffiliateWithMf"] != null) {
        this.IsAffiliateWithMf = params["IsAffiliateWithMf"];
      }
      if (params["IsVip"] != null) {
        this.IsVip = params["IsVip"];
      }
      if (params["VipNotes"] != null) {
        this.VipNotes = params["VipNotes"];
      }
    });
  }

  ngOnInit() {
    var refMasterObjCustModel = {
      MasterCode: this.CustModel,
      RowVersion: ""
    }
    this.http.post(this.urlGetDescByMasterCode, refMasterObjCustModel).subscribe(
      (response) => {
        this.tempCustModel = response;
      }
    );

    var refMasterObjMrCompanyTypeCode = {
      MasterCode: this.MrCompanyTypeCode,
      RowVersion: ""
    }
    this.http.post(this.urlGetDescByMasterCode, refMasterObjMrCompanyTypeCode).subscribe(
      (response) => {
        this.tempMrCompanyTypeCode = response;
      }
    );
    if (this.IsAffiliateWithMf === "true") {
      this.StatusAffiliate = "Yes";
    } else {
      this.StatusAffiliate = "No";
    }
    if (this.IsVip === "true") {
      this.StatusIsVip = "Yes";
    } else {
      this.StatusIsVip = "No";
    }
  }
  SaveValue() {
    this.addCustObj = new AddCustObj();
    this.addCustObj.custObj = new CustObj();
    this.addCustObj.CustCompanyObj = new CustCompanyObj();
    this.addCustObj.custObj.CustName = this.CustName;
    this.addCustObj.CustCompanyObj.MrCompanyTypeCode = this.MrCompanyTypeCode;
    this.addCustObj.custObj.MrCustTypeCode = "COMPANY";
    this.addCustObj.custObj.MrCustModelCode = this.CustModel;
    this.addCustObj.custObj.MrIdTypeCode = "NPWP";
    this.addCustObj.custObj.IdNo = this.TaxIdNo;
    this.addCustObj.custObj.TaxIdNo = this.TaxIdNo;
    if(this.IsVip === "true"){
      this.addCustObj.custObj.IsVip = true;
    }else{
      this.addCustObj.custObj.IsVip = false;
    }
    if(this.IsAffiliateWithMf === "true"){
      this.addCustObj.custObj.IsAffiliateWithMf = true;
    }else{
      this.addCustObj.custObj.IsAffiliateWithMf = false;
    } 
    this.addCustObj.custObj.VipNotes = this.VipNotes;
    this.http.post(AdInsConstant.AddNewCust, this.addCustObj).subscribe(
      (response) => {
        this.resultData = response;
        this.IdCust = this.resultData.CustObj.CustId;
        this.router.navigate(["/Customer/CustomerCompany/Page"], { queryParams: { "IdCust": this.IdCust } });
      },
      error => {
        console.log(error);
      }
    );
  }
}
