import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CustObj } from 'app/shared/model/CustObj.Model';
import { CustCompanyObj } from 'app/shared/model/CustCompanyObj.Model';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';

@Component({
  selector: 'app-edit-main-data-company',
  templateUrl: './edit-main-data-company.component.html',
  styleUrls: ['./edit-main-data-company.component.scss'],
  providers: [NGXToastrService]
})
export class EditMainDataCompanyComponent implements OnInit {
  getCustCompanyByCustIdUrl: string;
  getCustByCustIdUrl: string;
  tempCustModel: any;
  getListActiveRefMasterUrl: string;
  GetListActiveRefMasterWithReserveFieldAllUrl : string;
  tempCompanyTypeCode: any;
  custCompanyObj: any;
  custObj: any
  tempCustCompanyObj: any;
  tempCustObj: any
  CustId: any;
  editCustUrl: any;
  editCustCompanyUrl: any;
  From: any;
  constructor(private route: ActivatedRoute, private fb: FormBuilder, private http: HttpClient, private router: Router, private toastr: NGXToastrService) {
    this.getListActiveRefMasterUrl = AdInsConstant.GetListActiveRefMaster;
    this.getCustCompanyByCustIdUrl = AdInsConstant.GetCustCompanyByCustId;
    this.getCustByCustIdUrl = AdInsConstant.GetCustByCustId;
    this.editCustUrl = AdInsConstant.EditCust;
    this.editCustCompanyUrl = AdInsConstant.EditCustCompany; 
    this.GetListActiveRefMasterWithReserveFieldAllUrl = AdInsConstant.GetListActiveRefMasterWithReserveFieldAll;
    this.route.queryParams.subscribe(params => {
      if (params["CustId"] != null) {
        this.CustId = params["CustId"];
      }
      if (params["From"] != null) {
        this.From = params["From"];
      }
    });
  }
  CustomerCompanyForm = this.fb.group({
    CustModel: ['', [Validators.required]],
    CustName: ['', [Validators.required, Validators.maxLength(100)]],
    MrCompanyTypeCode: ['', [Validators.required]],
    TaxIdNo: ['', [Validators.required]],
  });

  ngOnInit() {
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
    this.http.post(this.getListActiveRefMasterUrl, refMasterObjMrCompanyTypeCode).subscribe(
      (response) => {
        this.tempCompanyTypeCode = response["ReturnObject"];
        this.CustomerCompanyForm.patchValue({
          MrCompanyTypeCode: this.tempCompanyTypeCode[0].Key
        });
      }
    );
    this.custObj = new CustObj();
    this.custCompanyObj = new CustCompanyObj();
    this.custObj.CustId = this.CustId;
    this.custCompanyObj.CustId = this.CustId;

    this.http.post(this.getCustByCustIdUrl, this.custObj).subscribe(
      (response) => {
        this.tempCustObj = response;
        this.CustomerCompanyForm.patchValue({
          CustName: this.tempCustObj.CustName,
          TaxIdNo: this.tempCustObj.TaxIdNo,
          MrCustModelCode: this.tempCustObj.MrCustModelCode
        });
      }
    );
    this.http.post(this.getCustCompanyByCustIdUrl, this.custCompanyObj).subscribe(
      (response) => {
        this.tempCustCompanyObj = response;
        this.CustomerCompanyForm.patchValue({
          MrCompanyTypeCode: this.tempCustCompanyObj.MrCompanyTypeCode
        });
      }
    );
  }

  SaveValue() {
    this.custObj = new CustObj();
    this.custCompanyObj = new CustCompanyObj();
    this.custObj = this.tempCustObj;
    this.custCompanyObj = this.tempCustCompanyObj;

    this.custObj.CustName = this.CustomerCompanyForm.controls["CustName"].value;
    this.custObj.TaxIdNo = this.CustomerCompanyForm.controls["TaxIdNo"].value;
    this.custObj.IdNo = this.CustomerCompanyForm.controls["TaxIdNo"].value;
    this.custObj.MrCustModelCode = this.CustomerCompanyForm.controls["CustModel"].value;
    this.custCompanyObj.MrCompanyTypeCode = this.CustomerCompanyForm.controls["MrCompanyTypeCode"].value;

    this.http.post(this.editCustUrl, this.custObj).subscribe(
      (response) => {
        this.http.post(this.editCustCompanyUrl, this.custCompanyObj).subscribe(
          (response) => {
            this.toastr.successMessage(response["Message"]);
            if (this.From == "EditMainData") {
              this.router.navigate(["/Customer/CustomerCompany/Page"], { queryParams: { IdCust: this.CustId, Page: 'Edit' } });
            } else {
              this.router.navigate(["/Customer/CustomerCompany/Page"], { queryParams: { IdCust: this.CustId } });
            }
          },
          error => {
            console.log(error);
          }
        );
      },
      error => {
        console.log(error);
      }
    );
  }

  back() {
    if (this.From == "CustPaging") {
      this.router.navigate(["/Customer/Paging"]);
    }
    else if (this.From = "EditMainData") {
      this.router.navigate(["/Customer/EditMainData/Paging"]);
    }
  }
}
