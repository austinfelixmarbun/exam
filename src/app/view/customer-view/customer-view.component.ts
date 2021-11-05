import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { environment } from 'environments/environment';
import { UcViewGenericObj } from 'app/shared/model/uc-view-generic-obj.model';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { ResSysConfigResultObj } from 'app/shared/model/response/res-sys-config-result-obj,model';
import { GenericObj } from 'app/shared/model/generic/generic-obj.model';
import { KeyValueObj } from 'app/shared/model/key-value/key-value-obj.model';
import { ResCustListIframeViewObj } from 'app/shared/model/response/cust-list-iframe-View/res-cust-list-iframe-view-obj.model';

@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html'
})
export class CustomerViewComponent implements OnInit {
  custResultData: any;

  viewCustMainInfoHeaderObj: UcViewGenericObj = new UcViewGenericObj();
  viewCustCoyMainInfoHeader: UcViewGenericObj = new UcViewGenericObj();

  CustId: number;

  CustNo: string;
  custModel: string;
  custType: string;
  viewCustJobData: string;
  getCustByCustIdUrl: string;
  viewCustJobDataAddress: string;

  IsLos: boolean = false;
  IsLms: boolean = false;
  IsUseDms: boolean = false;

  IsIframe: boolean = false;
  IsUseDigitalization: boolean = false;
  IsUseTs: boolean = false;
  listIframe: Array<ResCustListIframeViewObj> = new Array<ResCustListIframeViewObj>();

  SysConfigResultObj: ResSysConfigResultObj = new ResSysConfigResultObj();
  digitalizationSysConfigResultObj: ResSysConfigResultObj = new ResSysConfigResultObj();

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.getCustByCustIdUrl = URLConstant.GetCustByCustId;
  }

  changeRoute(url) {
    this.router.navigateByUrl('', { skipLocationChange: true });
    setTimeout(() => AdInsHelper.RedirectUrl(this.router, [url], {}));
  }

  dictIdxAt: { [Id: string]: number } = {};
  async ngOnInit(): Promise<void> {
    this.viewCustMainInfoHeaderObj.viewInput = "./assets/ucviewgeneric/viewCustMainInfoHeader.json";

    this.viewCustCoyMainInfoHeader.viewInput = "./assets/ucviewgeneric/viewCustCoyMainInfoHeader.json";
    this.route.queryParams.subscribe(params => {
      if (params["CustId"] != null) {
        this.CustId = params["CustId"];
      }
    });

    var custObj = {
      CustId: this.CustId
    }
    await this.http.post(this.getCustByCustIdUrl, { Id: this.CustId }).toPromise().then(
      (response) => {
        this.custResultData = response;
        this.CustNo = this.custResultData['CustNo'];
        this.custModel = this.custResultData['MrCustModelCode'];
        this.custType = this.custResultData['MrCustTypeCode'];
      }
    );

    let reqGetSysConfigResultLOSObj = new GenericObj();
    reqGetSysConfigResultLOSObj.Code = CommonConstant.MODULE_LOS;
    await this.http.post<ResSysConfigResultObj>(URLConstant.GetSysConfigResultByCode, { ConfigCode: reqGetSysConfigResultLOSObj.Code }).toPromise().then(
      (response) => {
        if (response.ConfigValue === "1") {
          this.IsLos = true;
        }
        else {
          this.IsLos = false;
        }
      }
    );

    let reqGetSysConfigResultLMSObj = new GenericObj();
    reqGetSysConfigResultLMSObj.Code = CommonConstant.MODULE_LMS;
    await this.http.post<ResSysConfigResultObj>(URLConstant.GetSysConfigResultByCode, { ConfigCode: reqGetSysConfigResultLMSObj.Code }).toPromise().then(
      (response) => {
        if (response.ConfigValue === "1") {
          this.IsLms = true;
        }
        else {
          this.IsLms = false;
        }
      }
    );

    //check DMS
    await this.http.post<ResSysConfigResultObj>(URLConstant.GetSysConfigPncplResultByCode, { Code: CommonConstant.ConfigCodeIsUseDms }).toPromise().then(
      (response) => {
        this.SysConfigResultObj = response;
        if (response.ConfigValue === "1") {
          this.IsUseDms = true;
        }
        else {
          this.IsUseDms = false;
        }
      }
    );

    await this.GetCustListIframeView();
    await this.getIsUseDigitalization();
    this.setDictIdxAt();
  }

  setDictIdxAt() {
    let idxAt: number = 8;
    if (this.IsUseDms) this.dictIdxAt["DMS"] = ++idxAt;
    if (this.custType == 'PERSONAL') {
      if (this.IsUseDigitalization && this.IsUseTs) this.dictIdxAt["TrustSocial"] = ++idxAt;
    } else {
      if (this.IsUseDigitalization) this.dictIdxAt["TrustSocial"] = ++idxAt;
    }
    if (this.IsIframe) {
      let totalListIframe: number = this.listIframe.length;
      idxAt += totalListIframe;
    }
    this.dictIdxAt["OTH"] = ++idxAt;
    console.log(this.dictIdxAt);
  }

  async GetCustListIframeView() {
    await this.http.post(URLConstant.GetCustListIframeView, {}).toPromise().then(
      (response) => {
        this.listIframe = response[CommonConstant.ReturnObj];
        this.IsIframe = true;
      }
    );
  }

  mencuba(ev: number) {
    console.log(ev);
    let linkUrl: string = "";
    if (this.custType == CommonConstant.CustomerPersonal) {
      if (ev == 0) { 
        linkUrl = NavigationConstant.VIEW_CUST_PERSONAL_DETAIL;
      }
      else if (ev == 1) { 
        linkUrl = NavigationConstant.VIEW_CUST_ADDR;
      }
      else if (ev == 2) { // Family
        linkUrl = NavigationConstant.VIEW_CUST_PERSONAL_FAMILY;
      }
      else if (ev == 3) { // Contact Person
        linkUrl = NavigationConstant.VIEW_CUST_PERSONAL_CONTACT_PERSON;
      }
      else if (ev == 4) { // Customer Group
        linkUrl = NavigationConstant.VIEW_CUST_GRP;
      }
      else if (ev == 5) { // Job Data
        switch(this.custModel){
          case CommonConstant.CUST_MODEL_PROF:
            linkUrl = NavigationConstant.VIEW_CUST_PERSONAL_JOB_DATA;
            break;
          case CommonConstant.CUST_MODEL_NONPROF:
            linkUrl = NavigationConstant.VIEW_CUST_PERSONAL_JOB_DATA_NON_PROF;
            break;
          case CommonConstant.CUST_MODEL_EMP:
            linkUrl = NavigationConstant.VIEW_CUST_PERSONAL_JOB_DATA_EMP;
            break;
          case CommonConstant.CUST_MODEL_SME:
            linkUrl = NavigationConstant.VIEW_CUST_PERSONAL_JOB_DATA_SME;
            break;
        }
      }
      else if (ev == 6) { // Financial Data
        linkUrl = NavigationConstant.VIEW_CUST_PERSONAL_FINANCIAL_DATA;
      }
      else if (ev == 7) { // Customer Asset
        linkUrl = NavigationConstant.VIEW_CUST_ASSET_DATA;
      }
      else if (ev == 8) { // Highlight Comment
        linkUrl = NavigationConstant.VIEW_CUST_HIGHLIGHT_COMMENT;
      }
      else {
        linkUrl = NavigationConstant.VIEW_CUST;
        if(ev == this.dictIdxAt["DMS"]) linkUrl = NavigationConstant.VIEW_CUST_DOC;
        else if(ev == this.dictIdxAt["TrustSocial"]) linkUrl = NavigationConstant.VIEW_CUST_TRUSTING_SOCIAL;
        else if(ev == this.dictIdxAt["OTH"]) linkUrl = NavigationConstant.VIEW_CUST_OTH_INFO;
      }
    }
    else if (this.custType == CommonConstant.CustomerCompany) {
      if (ev == 0) { // Main Data
        linkUrl = NavigationConstant.VIEW_CUST_COY_DETAIL;
      }
      else if (ev == 1) { // Address
        linkUrl = NavigationConstant.VIEW_CUST_ADDR;
      }
      else if (ev == 2) { // Management / Shareholder
        linkUrl = NavigationConstant.VIEW_CUST_COY_MNGMNT;
      }
      else if (ev == 3) { // Customer Group
        linkUrl = NavigationConstant.VIEW_CUST_GRP;
      }
      else if (ev == 4) { // Contact Information
        linkUrl = NavigationConstant.VIEW_CUST_COY_CONTACT;
      }
      else if (ev == 5) { // Financial Data
        linkUrl = NavigationConstant.VIEW_CUST_COY_FINANCIAL;
      }
      else if (ev == 6) { // Customer Asset
        linkUrl = NavigationConstant.VIEW_CUST_ASSET_DATA;
      }
      else if (ev == 7) { // Legal Document
        linkUrl = NavigationConstant.VIEW_CUST_COY_LEGAL;
      }
      else if (ev == 8) { // Highlight Comment
        linkUrl = NavigationConstant.VIEW_CUST_HIGHLIGHT_COMMENT;
      }
      else {
        linkUrl = NavigationConstant.VIEW_CUST;
        if(ev == this.dictIdxAt["DMS"]) linkUrl = NavigationConstant.VIEW_CUST_DOC;
        else if(ev == this.dictIdxAt["TrustSocial"]) linkUrl = NavigationConstant.VIEW_CUST_TRUSTING_SOCIAL;
        else if(ev == this.dictIdxAt["OTH"]) linkUrl = NavigationConstant.VIEW_CUST_OTH_INFO;
      }
    }
    AdInsHelper.RedirectUrl(this.router, [linkUrl], { "CustId": this.CustId }, true);
  }

  async getIsUseDigitalization() {
    await this.http.post(URLConstant.GetGeneralSettingValueByCode, { Code: CommonConstant.GSCodeIsUseDigitalization }).toPromise().then(
      async (response) => {
        if (response["GsValue"] === CommonConstant.TRUE_CONDITION) {
          this.IsUseDigitalization = true;
          await this.getDigitalizationSvcType();
        }
        else {
          this.IsUseDigitalization = false;
        }
      }
    );
  }

  async getDigitalizationSvcType() {
    await this.http.post<ResSysConfigResultObj>(URLConstant.GetSysConfigPncplResultByCode, { Code: CommonConstant.ConfigCodeDigitalizationSvcType }).toPromise().then(
      (response) => {
        this.digitalizationSysConfigResultObj = response;
      });

    if (this.digitalizationSysConfigResultObj.ConfigValue != null) {
      var listSvcType = this.digitalizationSysConfigResultObj.ConfigValue.split("|");

      var svcTypeTs = listSvcType.find(x => x == CommonConstant.DigitalizationSvcTypeTrustingSocial);

      if (svcTypeTs != null) {
        this.IsUseTs = true;
      }
    }
  }
}