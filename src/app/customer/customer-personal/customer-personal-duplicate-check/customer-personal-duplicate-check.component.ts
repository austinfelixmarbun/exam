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

@Component({
  selector: 'app-customer-personal-duplicate-check',
  templateUrl: './customer-personal-duplicate-check.component.html',
  styleUrls: ['./customer-personal-duplicate-check.component.scss'],
  providers: [NGXToastrService]
})
export class CustomerPersonalDuplicateCheckComponent implements OnInit {
  CustName: any;
  Gender: any;
  MrIdTypeCode: any;
  CustModel: any;
  BirthPlace: any;
  BirthDt: any;
  IdNo: any;
  TaxIdNo: any;
  IdExpiredDt: any;
  MotherMaidenName: any;
  IsVip: any;
  IsAffiliateWithMf: any;
  resultData: any;
  custObj: any;
  addCustObj: any;
  custPersonalObj: any;
  StatusIsVip: any;
  StatusAffiliate: any;
  VipNotes: any;
  addCustUrl: any;
  addCustPersonalUrl: any;
  resultPersonalUrl: any;
  IdCust: any;
  IdCustPersonal: any;
  urlGetDescByMasterCode: any;
  tempGender: any;
  tempMrIdTypeCode: any;
  tempCustModel: any; 

  DuplicateCustObj: DuplicateCustObj;
  ResultDuplicate: any;
  ResultDuplicateNegative: any;
  DuplicateStatus: string;
  
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder, private toastr: NGXToastrService) {
    this.addCustUrl = AdInsConstant.AddNewCust;
    this.addCustPersonalUrl = AdInsConstant.AddNewCustPersonal;
    this.urlGetDescByMasterCode = AdInsConstant.GetRefMasterByMasterCode;
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
    console.log(this.DuplicateCustObj);
    this.http.post(AdInsConstant.GetCustomerAndNegativeCustDuplicateCheck, this.DuplicateCustObj).subscribe(
      (response) => {
        this.DuplicateStatus = response["Status"];
        console.log(this.DuplicateStatus);
        if (this.DuplicateStatus != null && this.DuplicateStatus != undefined)
        {
          this.ResultDuplicate = response["ReturnObject"]["CustDuplicate"];
          this.ResultDuplicateNegative = response["ReturnObject"]["NegativeCustDuplicate"];
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
    this.addCustObj.custObj = new CustObj();
    this.addCustObj.CustPersonalObj = new CustPersonalObj();
    this.addCustObj.custObj.CustName = this.CustName;
    this.addCustObj.custObj.MrCustTypeCode = RefMasterConstant.Personal;
    this.addCustObj.custObj.MrCustModelCode = this.CustModel;
    this.addCustObj.custObj.MrIdTypeCode = this.MrIdTypeCode;
    this.addCustObj.custObj.IdNo = this.IdNo;
    this.addCustObj.custObj.IdExpiredDt = this.IdExpiredDt;
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
        this.router.navigate(["/Customer/CustomerPersonal/Page"], { queryParams: { "IdCust": this.IdCust } });
      },
      error => {
        console.log(error);
      }
    );
  }

  EditCustPersonal(item)
  {
    var CustObj = {CustNo: item.CustNo, CustName: this.CustName, IdNo: item.IdNo};
    this.http.post(AdInsConstant.GetCustPersonalForUpdateByCustNo, CustObj).subscribe(
      (response) => {
        this.addCustObj = new AddCustObj();
        this.addCustObj.custObj = response['CustObj'];
        this.addCustObj.custPersonalObj = response['CustPersonalObj'];
        this.addCustObj.custObj.CustName = item.CustName;
        this.addCustObj.custObj.MrCustTypeCode = RefMasterConstant.Personal;
        this.addCustObj.custObj.MrCustModelCode = this.CustModel;
        this.addCustObj.custObj.MrIdTypeCode = this.MrIdTypeCode;
        this.addCustObj.custObj.IdNo = item.IdNo;
        this.addCustObj.custObj.IdExpiredDt = this.IdExpiredDt;
        this.addCustObj.custObj.TaxIdNo = item.TaxIdNo;
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
        this.addCustObj.custPersonalObj.custFullName = item.CustName;
        this.addCustObj.custPersonalObj.MrGenderCode = this.Gender;
        this.addCustObj.custPersonalObj.BirthPlace = this.BirthPlace;
        this.addCustObj.custPersonalObj.BirthDt = item.BirthDt;
        this.addCustObj.custPersonalObj.MotherMaidenName = item.MotherMaidenName;
        this.addCustObj.custPersonalObj.IsRestInPeace = false;
        this.http.post(AdInsConstant.EditDuplicateCust, this.addCustObj).subscribe(
          () => {
            this.router.navigate(["/Customer/CustomerPersonal/Page"], { queryParams: { "IdCust": this.addCustObj.custObj.CustId } });
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

  EditNegativeCustPersonal(item)
  {
    var CustObj = {CustNo: item.CustNo, CustName: this.CustName, IdNo: item.IdNo};
    this.http.post(AdInsConstant.GetCustPersonalForUpdateByCustNo, CustObj).subscribe(
      (response) => {
        this.addCustObj = new AddCustObj();
        this.addCustObj.custObj = response['CustObj'];
        this.addCustObj.custPersonalObj = response['CustPersonalObj'];
        this.addCustObj.custObj.CustName = item.CustName;
        this.addCustObj.custObj.MrCustTypeCode = RefMasterConstant.Personal;
        this.addCustObj.custObj.MrCustModelCode = this.CustModel;
        this.addCustObj.custObj.MrIdTypeCode = this.MrIdTypeCode;
        this.addCustObj.custObj.IdNo = item.IdNo;
        this.addCustObj.custObj.IdExpiredDt = this.IdExpiredDt;
        this.addCustObj.custObj.TaxIdNo = item.TaxIdNo;
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
        this.addCustObj.custPersonalObj.custFullName = item.CustName;
        this.addCustObj.custPersonalObj.MrGenderCode = this.Gender;
        this.addCustObj.custPersonalObj.BirthPlace = this.BirthPlace;
        this.addCustObj.custPersonalObj.BirthDt = item.BirthDt;
        this.addCustObj.custPersonalObj.MotherMaidenName = item.MotherMaidenName;
        this.addCustObj.custPersonalObj.IsRestInPeace = false;
        this.http.post(AdInsConstant.EditDuplicateCust, this.addCustObj).subscribe(
          () => {
            this.router.navigate(["/Customer/CustomerPersonal/Page"], { queryParams: { "IdCust": this.addCustObj.custObj.CustId } });
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
