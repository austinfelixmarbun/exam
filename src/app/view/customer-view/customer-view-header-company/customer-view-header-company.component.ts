import { Component, OnInit } from '@angular/core';
import { CustObj } from 'app/shared/model/CustObj.Model';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CustCompanyObj } from 'app/shared/model/CustCompanyObj.Model';
import { environment } from 'environments/environment';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';

@Component({
  selector: 'app-customer-view-header-company',
  templateUrl: './customer-view-header-company.component.html'
})
export class CustomerViewHeaderCompanyComponent implements OnInit {
  IdCust: number; 

  tempCustObj: any;
  tempCustCompanyObj: any;
  tempMrCustModelCode: any;
  tempMrCompanyTypeCode: any;

  custObj: CustObj;
  custCompanyObj: CustCompanyObj;
  
  getCustUrl: string;
  StatusIsVip : string;
  StatusAffiliate : string;
  getCustCompanyUrl: string;
  getRefMasterByMasterCodeUrl: string;
  custUrl: string;

  constructor(private route: ActivatedRoute, private http: HttpClient) { 
    this.getRefMasterByMasterCodeUrl = URLConstant.GetRefMasterByMasterCode;
    this.getCustCompanyUrl = URLConstant.GetCustCompanyByCustId;
    this.getCustUrl = URLConstant.GetCustByCustId;
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

    this.custCompanyObj = new CustCompanyObj();
    this.custCompanyObj.CustId = this.IdCust;
    this.http.post(this.getCustCompanyUrl, {Id : this.IdCust}).subscribe(
      (response) => {
        this.tempCustCompanyObj = response;
        var refMasterObjMrCompanyTypeCode = {
          MasterCode: this.tempCustCompanyObj.MrCompanyTypeCode
        }
        this.http.post(this.getRefMasterByMasterCodeUrl, refMasterObjMrCompanyTypeCode).subscribe(
          (response) => {
            this.tempMrCompanyTypeCode = response;
          }
        );
      });
  }

  ClickLinkViewCustExposure() {
    AdInsHelper.OpenCustExposure(this.IdCust);
  }
}
