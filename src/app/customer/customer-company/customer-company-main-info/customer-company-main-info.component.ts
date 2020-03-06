import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { TriStateCheckbox } from 'primeng/primeng';

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
    MrIdTypeCode: ['', [Validators.required, Validators.maxLength(100)]],
    IdNo: ['', [Validators.required]],
    TaxIdNo: ['', [Validators.required]],
  });
  getUrl: any;
  tempCustModel: any;
  tempCompanyTypeCode: any;
  tempIdType: any;

  indexCustModel: any;
  indexMrCompanyTypeCode : any
  indexMrIdTypeCode: any;

  CustModel: any;
  CustModelDesc: any;
  
  MrCompanyTypeCode: any;
  MrCompanyTypeCodeDesc:any;

  MrIdTypeCode: any;
  MrIdTypeCodeDesc: any;

  CustName: any;

  
  IdNo: any;
  TaxIdNo: any;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder) { this.getUrl = environment.FoundationR3Url + AdInsConstant.GetListActiveRefMaster; }

  ngOnInit() {

    var refMasterObj = {
      RefMasterTypeCode: "ID_TYPE",
      RowVersion: ""
    }

    this.http.post(this.getUrl, refMasterObj).subscribe(
      (response) => {
        this.tempIdType = response["ReturnObject"];
        this.CustomerCompanyForm.patchValue({
          MrIdTypeCode: 0

        });
      }
    );

    var refMasterObj1 = {
      RefMasterTypeCode: "CUST_MODEL",
      RowVersion: ""
    }

    this.http.post(this.getUrl, refMasterObj1).subscribe(
      (response) => {
        this.tempCustModel = response["ReturnObject"];
        this.CustomerCompanyForm.patchValue({
          CustModel: 0

        });
      }
    );

    
    var refMasterObj2 = {
      RefMasterTypeCode: "COMPANY_TYPE",
      RowVersion: ""
    }

    this.http.post(this.getUrl, refMasterObj2).subscribe(
      (response) => {
        this.tempCompanyTypeCode = response["ReturnObject"];
        this.CustomerCompanyForm.patchValue({
          MrCompanyTypeCode: 0

        });
      }
    );




  }

  SaveValue() {


    this.CustName = this.CustomerCompanyForm.controls["CustName"].value;
    this.IdNo = this.CustomerCompanyForm.controls["IdNo"].value;
    this.TaxIdNo = this.CustomerCompanyForm.controls["TaxIdNo"].value;

    this.indexCustModel = this.CustomerCompanyForm.controls["CustModel"].value;
    this.indexMrIdTypeCode = this.CustomerCompanyForm.controls["MrIdTypeCode"].value;
    this.indexMrCompanyTypeCode = this.CustomerCompanyForm.controls["MrCompanyTypeCode"].value;

    this.CustModel = this.tempCustModel[this.indexCustModel].Value;
    this.CustModelDesc = this.tempCustModel[this.indexCustModel].Value.Key;

    this.MrCompanyTypeCode = this.tempCompanyTypeCode[this.indexMrCompanyTypeCode].Value;
    this.MrCompanyTypeCodeDesc =  this.tempCompanyTypeCode[this.indexMrCompanyTypeCode].Key;
    
    this.MrIdTypeCode = this.tempIdType[this.indexMrIdTypeCode].Value;
    this.MrIdTypeCodeDesc = this.tempIdType[this.indexMrIdTypeCode].Key;
 
    this.router.navigate(["/Customer/CustomerCompany/DuplicateCheck"], { queryParams: { "CustModel": this.CustModel,"CustModelDesc":  this.CustModelDesc, "CustName": this.CustName, "MrCompanyTypeCode": this.MrCompanyTypeCode,  "MrCompanyTypeCodeDesc": this.MrCompanyTypeCodeDesc, "MrIdTypeCode": this.MrIdTypeCode,"MrIdTypeCodeDesc":this.MrIdTypeCodeDesc, "IdNo": this.IdNo, "TaxIdNo": this.TaxIdNo, } });

  }
}
