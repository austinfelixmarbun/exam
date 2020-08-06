import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { CustPersonalObj } from 'app/shared/model/CustPersonalObj.Model';
import { AddCustObj } from 'app/shared/model/AddCustObj.Model';
import { CustObj } from 'app/shared/model/CustObj.Model';
import { DuplicateCustObj } from 'app/shared/model/DuplicateCust.Model';
import { RefMasterConstant } from 'app/shared/RefMasterConstant';
import { RequestNegativeCustObj } from 'app/shared/model/RequestNegativeCustObj.Model';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';

@Component({
  selector: 'app-customer-personal-duplicate-check',
  templateUrl: './customer-personal-duplicate-check.component.html',
  styleUrls: [],
  providers: [NGXToastrService]
})
export class CustomerPersonalDuplicateCheckComponent implements OnInit {

  resultData: any;
  tempGender: any;
  tempCustModel: any;
  ResultDuplicate: any;
  tempMrIdTypeCode: any;
  ResultDuplicateNegative: any;

  IdCust: number;
  BirthDt: Date;
  IdExpiredDt: Date;

  custObj: CustObj;
  addCustObj: AddCustObj;
  custPersonalObj: CustPersonalObj;
  DuplicateCustObj: DuplicateCustObj;
  RequestNegativeCustObj: RequestNegativeCustObj = new RequestNegativeCustObj();

  IdNo: string;
  IsVip: string;
  Gender: string;
  TaxIdNo: string;
  CustName: string;
  VipNotes: string;
  CustModel: string;
  BirthPlace: string;
  StatusIsVip: string;
  MrIdTypeCode: string;
  IdCustPersonal: string;
  StatusAffiliate: string;
  DuplicateStatus: string;
  MotherMaidenName: string;
  IsAffiliateWithMf: string;

  addCustUrl: string;
  resultPersonalUrl: string;
  addCustPersonalUrl: string;
  urlGetDescByMasterCode: string;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder, private toastr: NGXToastrService) {
    this.addCustUrl = URLConstant.AddNewCust;
    this.addCustPersonalUrl = URLConstant.AddNewCustPersonal;
    this.urlGetDescByMasterCode = URLConstant.GetRefMasterByMasterCode;
    this.route.queryParams.subscribe(params => {

      if (params["CustName"] != null) {
        this.CustName = params["CustName"];
      }
      if (params["Gender"] != null) {
        this.Gender = params["Gender"];
      }
      if (params["MrIdTypeCode"] != null) {
        this.MrIdTypeCode = params["MrIdTypeCode"];
      }
      if (params["CustModel"] != null) {
        this.CustModel = params["CustModel"];
      }
      if (params["BirthPlace"] != null) {
        this.BirthPlace = params["BirthPlace"];
      }
      if (params["BirthDt"] != null) {
        this.BirthDt = params["BirthDt"];
      }
      if (params["IdNo"] != null) {
        this.IdNo = params["IdNo"];
      }
      if (params["TaxIdNo"] != null) {
        this.TaxIdNo = params["TaxIdNo"];
      }
      if (params["IdExpiredDt"] != null) {
        this.IdExpiredDt = params["IdExpiredDt"];
      }
      if (params["MotherMaidenName"] != null) {
        this.MotherMaidenName = params["MotherMaidenName"];
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
    this.DuplicateCustObj.MrCustTypeCode = RefMasterConstant.Personal;
    this.DuplicateCustObj.IdNo = this.IdNo;
    this.DuplicateCustObj.TaxIdNo = this.TaxIdNo;
    this.DuplicateCustObj.MotherMaidenName = this.MotherMaidenName;
    this.DuplicateCustObj.BirthDt = this.BirthDt;
    this.http.post(URLConstant.GetCustomerAndNegativeCustDuplicateCheck, this.DuplicateCustObj).subscribe(
      (response) => {
        this.DuplicateStatus = response["Status"];
        if (this.DuplicateStatus != null && this.DuplicateStatus != undefined) {
          this.ResultDuplicate = response[CommonConstant.ReturnObj]["CustDuplicate"];
          this.ResultDuplicateNegative = response[CommonConstant.ReturnObj]["NegativeCustDuplicate"];
        }
        else
          this.SaveValue();
      });

    var refMasterObjGender = {
      MasterCode: this.Gender,
      RowVersion: ""
    }
    this.http.post(this.urlGetDescByMasterCode, refMasterObjGender).subscribe(
      (response) => {
        this.tempGender = response;
      }
    );

    var refMasterObjMrIdTypeCode = {
      MasterCode: this.MrIdTypeCode,
      RowVersion: ""
    }
    this.http.post(this.urlGetDescByMasterCode, refMasterObjMrIdTypeCode).subscribe(
      (response) => {
        this.tempMrIdTypeCode = response;
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
    this.addCustObj.CustPersonalObj = new CustPersonalObj();
    this.addCustObj.CustObj.CustName = this.CustName;
    this.addCustObj.CustObj.MrCustTypeCode = RefMasterConstant.Personal;
    this.addCustObj.CustObj.MrCustModelCode = this.CustModel;
    this.addCustObj.CustObj.MrIdTypeCode = this.MrIdTypeCode;
    this.addCustObj.CustObj.IdNo = this.IdNo;
    this.addCustObj.CustObj.IdExpiredDt = this.IdExpiredDt;
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
    this.addCustObj.CustPersonalObj.CustFullName = this.CustName;
    this.addCustObj.CustPersonalObj.MrGenderCode = this.Gender;
    this.addCustObj.CustPersonalObj.BirthPlace = this.BirthPlace;
    this.addCustObj.CustPersonalObj.BirthDt = this.BirthDt;
    this.addCustObj.CustPersonalObj.MotherMaidenName = this.MotherMaidenName;
    this.addCustObj.CustPersonalObj.IsRestInPeace = false;

    this.http.post(this.addCustUrl, this.addCustObj).subscribe(
      (response) => {
        this.resultData = response;
        this.IdCust = this.resultData.CustObj.CustId;
        this.router.navigate(["/Customer/CustomerPersonal/Page"], { queryParams: { "IdCust": this.IdCust, 'From': 'CustPaging' } });
      }
    );
  }

  EditCustPersonal(item) {
    var CustObj = { CustNo: item.CustNo, CustName: this.CustName, IdNo: item.IdNo };
    this.http.post(URLConstant.GetCustPersonalForUpdateByCustNo, CustObj).subscribe(
      (response) => {
        this.addCustObj = new AddCustObj();
        this.addCustObj.CustObj = response['CustObj'];
        this.addCustObj.CustPersonalObj = response['CustPersonalObj'];
        this.addCustObj.CustObj.CustName = item.CustName;
        this.addCustObj.CustObj.MrCustTypeCode = RefMasterConstant.Personal;
        this.addCustObj.CustObj.MrCustModelCode = this.CustModel;
        this.addCustObj.CustObj.MrIdTypeCode = this.MrIdTypeCode;
        this.addCustObj.CustObj.IdNo = item.IdNo;
        this.addCustObj.CustObj.IdExpiredDt = this.IdExpiredDt;
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
        this.addCustObj.CustPersonalObj.CustFullName = item.CustName;
        this.addCustObj.CustPersonalObj.MrGenderCode = this.Gender;
        this.addCustObj.CustPersonalObj.BirthPlace = this.BirthPlace;
        this.addCustObj.CustPersonalObj.BirthDt = item.BirthDt;
        this.addCustObj.CustPersonalObj.MotherMaidenName = item.MotherMaidenName;
        this.addCustObj.CustPersonalObj.IsRestInPeace = false;
        this.http.post(URLConstant.EditDuplicateCust, this.addCustObj).subscribe(
          (response) => {
            this.router.navigate(["/Customer/CustomerPersonal/Page"], { queryParams: { "IdCust": this.addCustObj.CustObj.CustId, 'From': 'CustPaging' } });
          }
        );
      }
    );
  }

  EditNegativeCustPersonal(item) {
    var NegativeCustObj = { CustNo: item.CustNo, CustName: item.CustName, MrCustTypeCode: item.MrCustTypeCode, IdNo: item.IdNo };
    this.http.post<RequestNegativeCustObj>(URLConstant.GetNegativeCustByNegativeCustNameAndCustType, NegativeCustObj).subscribe(
      (response) => {
        this.RequestNegativeCustObj = response;
        this.RequestNegativeCustObj.CustName = item.CustName;
        this.RequestNegativeCustObj.MrCustTypeCode = RefMasterConstant.Personal;
        this.RequestNegativeCustObj.MrCustModelCode = this.CustModel;
        this.RequestNegativeCustObj.MrIdTypeCode = this.MrIdTypeCode;
        this.RequestNegativeCustObj.IdNo = item.IdNo;
        this.RequestNegativeCustObj.IdExpiredDt = this.IdExpiredDt;
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
        this.RequestNegativeCustObj.CustFullName = item.CustName;
        this.RequestNegativeCustObj.MrGenderCode = this.Gender;
        this.RequestNegativeCustObj.BirthPlace = this.BirthPlace;
        this.RequestNegativeCustObj.BirthDt = item.BirthDt;
        this.RequestNegativeCustObj.MotherMaidenName = item.MotherMaidenName;
        this.RequestNegativeCustObj.IsRestInPeace = false;
        this.http.post(URLConstant.EditDuplicateNegativeCust, this.RequestNegativeCustObj).subscribe(
          (response) => {
            var custId = response['CustId'];
            this.router.navigate(["/Customer/CustomerPersonal/Page"], { queryParams: { 'IdCust': custId, 'From': 'CustPaging' } });
          }
        );
      }
    );
  }
}
