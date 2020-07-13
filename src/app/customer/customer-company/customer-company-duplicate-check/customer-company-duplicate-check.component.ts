import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { AddCustObj } from 'app/shared/model/AddCustObj.Model';
import { CustObj } from 'app/shared/model/CustObj.Model';
import { CustCompanyObj } from 'app/shared/model/CustCompanyObj.Model';
import { DuplicateCustObj } from 'app/shared/model/DuplicateCust.Model';
import { RefMasterConstant } from 'app/shared/RefMasterConstant';
import { RequestNegativeCustObj } from 'app/shared/model/RequestNegativeCustObj.Model';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';

@Component({
  selector: 'app-customer-company-duplicate-check',
  templateUrl: './customer-company-duplicate-check.component.html',
  styleUrls: [],
})
export class CustomerCompanyDuplicateCheckComponent implements OnInit {

  resultData: any;
  tempCustModel: any;
  ResultDuplicate: any;
  tempMrIdTypeCode: any;
  tempCompanyTypeCode: any;
  tempMrCompanyTypeCode: any;
  ResultDuplicateNegative: any;

  addCustObj: AddCustObj;
  DuplicateCustObj: DuplicateCustObj;
  RequestNegativeCustObj: RequestNegativeCustObj = new RequestNegativeCustObj();

  CustId: number;

  IdNo: string;
  IsVip: string;
  TaxIdNo: string;
  VipNotes: string;
  CustName: string;
  CustModel: string;
  tempIdType: string;
  StatusIsVip: string;
  MrIdTypeCode: string;
  StatusAffiliate: string;
  DuplicateStatus: string;
  MrCompanyTypeCode: string;
  IsAffiliateWithMf: string;
  urlGetDescByMasterCode: string;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) {
    this.urlGetDescByMasterCode = URLConstant.GetRefMasterByMasterCode;
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
    this.DuplicateCustObj = new DuplicateCustObj();
    this.DuplicateCustObj.CustName = this.CustName;
    this.DuplicateCustObj.MrCustTypeCode = RefMasterConstant.Company;
    this.DuplicateCustObj.TaxIdNo = this.TaxIdNo;
    console.log(this.DuplicateCustObj);
    this.http.post(URLConstant.GetCustomerAndNegativeCustDuplicateCheck, this.DuplicateCustObj).subscribe(
      (response) => {
        this.DuplicateStatus = response["Status"];
        console.log(this.DuplicateStatus);
        if (this.DuplicateStatus != null && this.DuplicateStatus != undefined) {
          this.ResultDuplicate = response[CommonConstant.ReturnObj]["CustDuplicate"];
          this.ResultDuplicateNegative = response[CommonConstant.ReturnObj]["NegativeCustDuplicate"];
        }
        else
          this.SaveValue();
      }
    );

    this.http.post(this.urlGetDescByMasterCode, refMasterObjCustModel).subscribe(
      (response) => {
        this.tempCustModel = response;
      }
    );

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
    this.addCustObj.CustObj = new CustObj();
    this.addCustObj.CustCompanyObj = new CustCompanyObj();
    this.addCustObj.CustObj.CustName = this.CustName;
    this.addCustObj.CustCompanyObj.MrCompanyTypeCode = this.MrCompanyTypeCode;
    this.addCustObj.CustObj.MrCustTypeCode = RefMasterConstant.Company;
    this.addCustObj.CustObj.MrCustModelCode = this.CustModel;
    this.addCustObj.CustObj.MrIdTypeCode = RefMasterConstant.Npwp;
    this.addCustObj.CustObj.IdNo = this.TaxIdNo;
    this.addCustObj.CustObj.TaxIdNo = this.TaxIdNo;
    if (this.IsVip === "true") {
      this.addCustObj.CustObj.IsVip = true;
    } else {
      this.addCustObj.CustObj.IsVip = false;
    }
    if (this.IsAffiliateWithMf === "true") {
      this.addCustObj.CustObj.IsAffiliateWithMf = true;
    } else {
      this.addCustObj.CustObj.IsAffiliateWithMf = false;
    }
    this.addCustObj.CustObj.VipNotes = this.VipNotes;
    this.http.post(URLConstant.AddNewCust, this.addCustObj).subscribe(
      (response) => {
        this.resultData = response;
        this.CustId = this.resultData.CustObj.CustId;
        this.router.navigate(["/Customer/CustomerCompany/Page"], { queryParams: { "IdCust": this.CustId, 'From': 'CustPaging' } });
      },
      error => {
        console.log(error);
      }
    );
  }

  EditCustCompany(item) {
    var custObj = { CustNo: item.CustNo, CustName: item.CustName, TaxIdNo: item.TaxIdNo };
    this.http.post(URLConstant.GetCustCompanyForUpdateByCustNo, custObj).subscribe(
      (response) => {
        this.addCustObj = new AddCustObj();
        this.addCustObj.CustObj = response['CustObj'];
        this.addCustObj.CustCompanyObj = response['CustCompanyObj'];
        this.addCustObj.CustObj.CustName = item.CustName;
        this.addCustObj.CustCompanyObj.MrCompanyTypeCode = this.MrCompanyTypeCode;
        this.addCustObj.CustObj.MrCustTypeCode = RefMasterConstant.Company;
        this.addCustObj.CustObj.MrCustModelCode = this.CustModel;
        this.addCustObj.CustObj.MrIdTypeCode = RefMasterConstant.Npwp;
        this.addCustObj.CustObj.IdNo = item.TaxIdNo;
        this.addCustObj.CustObj.TaxIdNo = item.TaxIdNo;
        if (this.IsVip === "true") {
          this.addCustObj.CustObj.IsVip = true;
        } else {
          this.addCustObj.CustObj.IsVip = false;
        }
        if (this.IsAffiliateWithMf === "true") {
          this.addCustObj.CustObj.IsAffiliateWithMf = true;
        } else {
          this.addCustObj.CustObj.IsAffiliateWithMf = false;
        }
        this.addCustObj.CustObj.VipNotes = this.VipNotes;
        this.http.post(URLConstant.EditDuplicateCust, this.addCustObj).subscribe(
          () => {
            this.router.navigate(["/Customer/CustomerCompany/Page"], { queryParams: { "IdCust": this.addCustObj.CustObj.CustId, 'From': 'CustPaging' } });
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

  EditNegativeCustCompany(item) {
    var NegativeCustObj = { CustNo: item.CustNo, CustName: item.CustName, MrCustTypeCode: item.MrCustTypeCode, TaxIdNo: item.TaxIdNo };
    this.http.post<RequestNegativeCustObj>(URLConstant.GetNegativeCustByNegativeCustNameAndCustType, NegativeCustObj).subscribe(
      (response) => {
        this.RequestNegativeCustObj = response;
        this.RequestNegativeCustObj.CustName = item.CustName;
        this.RequestNegativeCustObj.MrCompanyTypeCode = this.MrCompanyTypeCode;
        this.RequestNegativeCustObj.MrCustTypeCode = RefMasterConstant.Company;
        this.RequestNegativeCustObj.MrCustModelCode = this.CustModel;
        this.RequestNegativeCustObj.MrIdTypeCode = RefMasterConstant.Npwp;
        this.RequestNegativeCustObj.IdNo = item.TaxIdNo;
        this.RequestNegativeCustObj.TaxIdNo = item.TaxIdNo;
        if (this.IsVip === "true") {
          this.RequestNegativeCustObj.IsVip = true;
        } else {
          this.RequestNegativeCustObj.IsVip = false;
        }
        if (this.IsAffiliateWithMf === "true") {
          this.RequestNegativeCustObj.IsAffiliateWithMf = true;
        } else {
          this.RequestNegativeCustObj.IsAffiliateWithMf = false;
        }
        this.RequestNegativeCustObj.VipNotes = this.VipNotes;
        this.http.post(URLConstant.EditDuplicateNegativeCust, this.RequestNegativeCustObj).subscribe(
          (response) => {
            var custId = response['CustId'];
            this.router.navigate(["/Customer/CustomerCompany/Page"], { queryParams: { 'IdCust': custId, 'From': 'CustPaging' } });
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
}
