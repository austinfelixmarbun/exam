import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CustObj } from 'app/shared/model/CustObj.Model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CustPersonalObj } from 'app/shared/model/CustPersonalObj.Model';
import { environment } from 'environments/environment';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';

@Component({
  selector: 'app-customer-view-header-personal',
  templateUrl: './customer-view-header-personal.component.html'
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
  custUrl: string;

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.getRefMasterByMasterCodeUrl = URLConstant.GetRefMasterByMasterCode;
    this.route.queryParams.subscribe(params => {
      if (params["IdCust"] != null) {
        this.IdCust = params["IdCust"];
      }
      else if (params["CustId"] != null) {
        this.IdCust = params["CustId"];
      }
      this.custUrl = environment.FoundationR3Web + '/View/Customer/PersonalDetail?CustId=' + this.IdCust;
    });
  }

  ngOnInit() {
    this.custObj = new CustObj();
    this.custObj.CustId = this.IdCust;
    this.http.post(URLConstant.GetCustByCustId, {Id : this.IdCust}).subscribe(
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
    this.http.post(URLConstant.GetCustPersonalbyCustId, this.custPersonalObj).subscribe(
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

  ClickLinkViewCustExposure() {
    AdInsHelper.OpenCustExposure(this.IdCust);
  }
}
