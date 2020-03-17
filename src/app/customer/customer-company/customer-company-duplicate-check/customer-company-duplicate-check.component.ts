import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
  CustModelDesc: any;
  CustName: any;
  MrCompanyTypeCode: any;
  MrCompanyTypeCodeDesc : any;
  MrIdTypeCode: any;
  MrIdTypeCodeDesc:any;
  IdNo: any;
  TaxIdNo: any;
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) {
    this.route.queryParams.subscribe(params => {
      if (params["CustModel"] != null) {
        this.CustModel = params["CustModel"];
      }
      if (params["CustModelDesc"] != null) {
        this.CustModelDesc = params["CustModelDesc"];
      }
      if (params["CustName"] != null) {
        this.CustName = params["CustName"];
      }
      if (params["MrCompanyTypeCode"] != null) {
        this.MrCompanyTypeCode = params["MrCompanyTypeCode"];
      }
      if (params["MrCompanyTypeCodeDesc"] != null) {
        this.MrCompanyTypeCodeDesc = params["MrCompanyTypeCodeDesc"];
      }
      if (params["MrIdTypeCode"] != null) {
        this.MrIdTypeCode = params["MrIdTypeCode"];
      }
      if (params["MrIdTypeCodeDesc"] != null) {
        this.MrIdTypeCodeDesc = params["MrIdTypeCodeDesc"];
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
 
    

  }

}
