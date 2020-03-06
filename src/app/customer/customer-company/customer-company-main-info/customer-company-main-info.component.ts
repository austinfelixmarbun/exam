import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';

@Component({
  selector: 'app-customer-company-main-info',
  templateUrl: './customer-company-main-info.component.html',
  styleUrls: ['./customer-company-main-info.component.scss']
})
export class CustomerCompanyMainInfoComponent implements OnInit {

  CustomerCompanyForm = this.fb.group({
    CustModel : ['', [Validators.required]],
    CustName: ['', [Validators.required, Validators.maxLength(100)]],
    MrCompanyTypeCode: ['', [Validators.required]],
    MrIdTypeCode: ['', [Validators.required, Validators.maxLength(100)]],
    IdNo: ['', [Validators.required]],
    TaxIdNo: ['', [Validators.required]], 
  });
  getUrl: any;
  tempCompanyTypeCode: any;
  tempIdType: any;



  CustModel:any;
  CustName:any;
  MrCompanyTypeCode: any;
  MrIdTypeCode : any;
  IdNo : any;
  TaxIdNo : any;
  
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder) { this.getUrl = environment.FoundationR3Url + AdInsConstant.GetListKeyValueRefMasterByCode;   }

  ngOnInit() {
    
    var refMasterObj = {
      RefMasterTypeCode: "ID_TYPE",
      RowVersion: ""
    }

    this.http.post(this.getUrl, refMasterObj).subscribe(
      (response) => {
        this.tempIdType = response["ReturnObject"];
        this.CustomerCompanyForm.patchValue({
          MrIdTypeCode: this.tempIdType[0].Key

        });
      }
    );

    var refMasterObj1 = {
      RefMasterTypeCode: "CUST_MODEL",
      RowVersion: ""
    }

    this.http.post(this.getUrl, refMasterObj1).subscribe(
      (response) => {
        this.tempCompanyTypeCode = response["ReturnObject"];
        this.CustomerCompanyForm.patchValue({
          MrCompanyTypeCode: this.tempCompanyTypeCode[0].Key

        });
      }
    );
  }

  SaveValue(){

    

    this.CustModel= this.CustomerCompanyForm.controls["CustModel"].value;
    this.CustName = this.CustName.controls["CustName"].value;
    this.MrCompanyTypeCode= this.CustName.controls["MrCompanyTypeCode"].value;
    this.MrIdTypeCode = this.CustName.controls["MrIdTypeCode"].value;
    this.IdNo= this.CustName.controls["IdNo"].value;
    this.TaxIdNo = this.CustName.controls["TaxIdNo"].value;
    
   
    // this.router.navigate(["/Customer/CustomerCompany/DuplicateCheck"],{ queryParams: { "CustName": this.CustName, "Gender" : this.Gender, "MrIdTypeCode" : this.MrIdTypeCode,"BirthPlace" : this.BirthPlace, "BirthDt": this.BirthDt, "IdNo": this.IdNo, "TaxIdNo": this.TaxIdNo,"IdExpiredDt": this.IdExpiredDt, "MotherMaidenName": this.MotherMaidenName    } });
          
  }
}
