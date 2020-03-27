import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdInsConstant } from 'app/shared/AdInstConstant';

@Component({
  selector: 'app-customer-company-main-info',
  templateUrl: './customer-company-main-info.component.html',
  styleUrls: ['./customer-company-main-info.component.scss']
})
export class CustomerCompanyMainInfoComponent implements OnInit {
  CustomerCompanyForm = this.fb.group({
    CustModel: ['', [Validators.required]],
    CustName: ['', [Validators.required, Validators.maxLength(100)]],
    MrCompanyTypeCode: ['', [Validators.required]],
    TaxIdNo: ['', [Validators.required]],
  });
  GetListActiveRefMasterUrl: any;
  tempCustModel: any;
  tempCompanyTypeCode: any;
  CustModel: any;
  MrCompanyTypeCode: any;
  MrIdTypeCode: any;
  CustName: any;
  TaxIdNo: any;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder) {
    this.GetListActiveRefMasterUrl = AdInsConstant.GetListActiveRefMaster;
  }

  ngOnInit() {
    var refMasterObjCustModel = {
      RefMasterTypeCode: "CUST_MODEL",
      ReserveField1: "COMPANY",
      RowVersion: ""
    }
    this.http.post(this.GetListActiveRefMasterUrl, refMasterObjCustModel).subscribe(
      (response) => {
        this.tempCustModel = response["ReturnObject"];
        this.CustomerCompanyForm.patchValue({
          CustModel: this.tempCustModel[0].Key
        });
      }
    );

    var refMasterObjMrCompanyTypeCode = {
      RefMasterTypeCode: "COMPANY_TYPE",
      RowVersion: ""
    }
    this.http.post(this.GetListActiveRefMasterUrl, refMasterObjMrCompanyTypeCode).subscribe(
      (response) => {
        this.tempCompanyTypeCode = response["ReturnObject"];
        this.CustomerCompanyForm.patchValue({
          MrCompanyTypeCode: this.tempCompanyTypeCode[0].Key
        });
      }
    );
  }
  SaveValue() {
    this.CustName = this.CustomerCompanyForm.controls["CustName"].value;
    this.TaxIdNo = this.CustomerCompanyForm.controls["TaxIdNo"].value;
    this.CustModel = this.CustomerCompanyForm.controls["CustModel"].value;
    this.MrCompanyTypeCode = this.CustomerCompanyForm.controls["MrCompanyTypeCode"].value;
    this.router.navigate(["/Customer/CustomerCompany/DuplicateCheck"], { queryParams: { "CustModel": this.CustModel, "CustName": this.CustName, "MrCompanyTypeCode": this.MrCompanyTypeCode, "MrIdTypeCode": this.MrIdTypeCode, "TaxIdNo": this.TaxIdNo, } });
  }
}
