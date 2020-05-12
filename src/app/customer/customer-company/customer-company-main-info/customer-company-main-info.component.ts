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

  tempCustModel: any;
  tempCompanyTypeCode: any;

  IsVip: boolean;
  VipNotesRequired: boolean;

  TaxIdNo: string;
  VipNotes: string;
  CustName: string;
  CustModel: string;
  MrIdTypeCode: string;
  IsAffiliateWithMf: string;
  MrCompanyTypeCode: string;
  GetListActiveRefMasterUrl: string;
  GetListActiveRefMasterWithReserveFieldAllUrl: string;

  CustomerCompanyForm = this.fb.group({
    CustModel: ['', [Validators.required]],
    CustName: ['', [Validators.required, Validators.maxLength(100)]],
    MrCompanyTypeCode: ['', [Validators.required]],
    TaxIdNo: [''],
    IsVip: [true],
    IsAffiliateWithMf: [true],
    VipNotes: ['', [Validators.required]]
  });


  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder) {
    this.GetListActiveRefMasterUrl = AdInsConstant.GetListActiveRefMaster;
    this.GetListActiveRefMasterWithReserveFieldAllUrl = AdInsConstant.GetListActiveRefMasterWithReserveFieldAll;
  }

  ngOnInit() {
    this.VipNotesRequired = true;
    var refMasterObjCustModel = {
      RefMasterTypeCode: "CUST_MODEL",
      ReserveField1: "COMPANY",
      RowVersion: ""
    }
    this.http.post(this.GetListActiveRefMasterWithReserveFieldAllUrl, refMasterObjCustModel).subscribe(
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
    this.IsVip = this.CustomerCompanyForm.controls["IsVip"].value;
    this.IsAffiliateWithMf = this.CustomerCompanyForm.controls["IsAffiliateWithMf"].value;

    if (this.IsVip == true) {
      this.VipNotes = this.CustomerCompanyForm.controls["VipNotes"].value;
    }
    this.router.navigate(["/Customer/CustomerCompany/DuplicateCheck"], { queryParams: { "CustModel": this.CustModel, "CustName": this.CustName, "MrCompanyTypeCode": this.MrCompanyTypeCode, "MrIdTypeCode": this.MrIdTypeCode, "TaxIdNo": this.TaxIdNo, "IsAffiliateWithMf": this.IsAffiliateWithMf, "IsVip": this.IsVip, "VipNotes": this.VipNotes } });
  }

  checkState() {
    if (this.CustomerCompanyForm.controls.IsVip.value === true) {
      this.CustomerCompanyForm.patchValue({
        VipNotes: null
      });
      this.CustomerCompanyForm.controls.VipNotes.disable();
      this.VipNotesRequired = false;
      this.CustomerCompanyForm.controls.IdExpiredDt.clearValidators();
    
      

    } else {
      this.CustomerCompanyForm.controls.VipNotes.enable();
      this.CustomerCompanyForm.controls.VipNotes.setValidators(Validators.required);
      this.VipNotesRequired = true; 
    }
    this.CustomerCompanyForm.controls.VipNotes.updateValueAndValidity();
  }
}
