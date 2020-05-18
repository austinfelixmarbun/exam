import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CustObj } from 'app/shared/model/CustObj.Model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CustPersonalObj } from 'app/shared/model/CustPersonalObj.Model';

@Component({
  selector: 'app-customer-view-header-personal',
  templateUrl: './customer-view-header-personal.component.html',
  styleUrls: ['./customer-view-header-personal.component.scss']
})
export class CustomerViewHeaderPersonalComponent implements OnInit {
  resultData: any;
  tempCustObj: any;
  tempMrGenderCode: any;
  tempMrIdTypeCode: any;
  tempMrCustModelCode: any;
  tempCustPersonalObj: any;
  viewCustMainInfoHeaderObj: any;

  custObj: CustObj;
  custPersonalObj: CustPersonalObj;

  IdCust: number;

  BirthDt: Date;
  IdExpiredDt: Date;

  IdNo: string;
  addUrl: string;
  TaxIdNo: string;
  CustModel: string;
  BirthPlace: string;
  GenderDesc: string;
  StatusIsVip: string;
  MrIdTypeCode: string;
  CustModelDesc: string;
  MotherMaidenName: string;
  MrIdTypeCodeDesc: string;
  StatusAffiliate: string;
  getRefMasterByMasterCodeUrl: string;

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.getRefMasterByMasterCodeUrl = AdInsConstant.GetRefMasterByMasterCode;
    this.route.queryParams.subscribe(params => {
      if (params["IdCust"] != null) {
        this.IdCust = params["IdCust"];
      }
      else if (params["CustId"] != null) {
        this.IdCust = params["CustId"];
      }
    });
  }

  ngOnInit() {
    this.custObj = new CustObj();
    this.custObj.CustId = this.IdCust;
    this.http.post(AdInsConstant.GetCustByCustId, this.custObj).subscribe(
      (response) => {
        this.tempCustObj = response;
        var refMasterObjMrCustModelCode = {
          MasterCode: this.tempCustObj.MrCustModelCode
        }
        this.http.post(this.getRefMasterByMasterCodeUrl, refMasterObjMrCustModelCode).subscribe(
          (response) => {
            this.tempMrCustModelCode = response;
          }
        );
        var refMasterObjMrIdTypeCode = {
          MasterCode: this.tempCustObj.MrIdTypeCode
        }
        this.http.post(this.getRefMasterByMasterCodeUrl, refMasterObjMrIdTypeCode).subscribe(
          (response) => {
            this.tempMrIdTypeCode = response;
          }
        );
        if (this.tempCustObj.IsVip === true) {
          this.StatusIsVip = "Yes";
        } else {
          this.StatusIsVip = "No";
        }
        if (this.tempCustObj.IsAffiliateWithMf === true) {
          this.StatusAffiliate = "Yes";
        } else {
          this.StatusAffiliate = "No";
        }
      });

    this.custPersonalObj = new CustPersonalObj();
    this.custPersonalObj.CustId = this.IdCust;
    this.http.post(AdInsConstant.GetCustPersonalbyCustId, this.custPersonalObj).subscribe(
      (response) => {
        this.tempCustPersonalObj = response;
        var refMasterObjMrGenderCode = {
          MasterCode: this.tempCustPersonalObj.MrGenderCode
        }
        this.http.post(this.getRefMasterByMasterCodeUrl, refMasterObjMrGenderCode).subscribe(
          (response) => {
            this.tempMrGenderCode = response;
          }
        );
      });
  }
}
