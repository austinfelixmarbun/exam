import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { DuplicateCustObj } from 'app/shared/model/DuplicateCust.Model';
import { GenericObj } from 'app/shared/model/Generic/GenericObj.Model';
import { CustCompanyMgmntShrholderObj } from 'app/shared/model/NewCust/CustCompanyMgmntShrholderObj.Model';
import { CustDuplicateObj } from 'app/shared/model/NewCust/CustDuplicateObj.Model';
import { CustPersonalFamilyObj } from 'app/shared/model/NewCust/CustPersonalFamilyObj.Model';
import { NegCustDuplicateObj } from 'app/shared/model/NewCust/NegCustDuplicateObj.Model';
import { ReqCoyObj } from 'app/shared/model/NewCust/ReqCoyObj.Model';
import { ReqDupObj } from 'app/shared/model/NewCust/ReqDupObj.Model';
import { ReqNegDupObj } from 'app/shared/model/NewCust/ReqNegDupObj.Model';
import { ReqPersonalObj } from 'app/shared/model/NewCust/ReqPersonalObj.Model';
import { NavigationConstant } from 'app/shared/NavigationConstant';

@Component({
  selector: 'app-cust-dup-check-header',
  templateUrl: './cust-dup-check-header.component.html',
})
export class CustDupCheckHeaderComponent implements OnInit {

  @Input() CustPersonalObj: ReqPersonalObj;
  @Input() CustCoyObj: ReqCoyObj;
  @Input() CustPersonalFamilyData: CustPersonalFamilyObj;
  @Input() CustMgmntShareholderData: CustCompanyMgmntShrholderObj;
  @Input() CustType: string = CommonConstant.CustomerPersonal;
  @Input() CustDataMode: string = CommonConstant.CustMainDataModeCust;
  @Output() outputSave: EventEmitter<string> = new EventEmitter();
  @Output() outputCancel: EventEmitter<string> = new EventEmitter();

  readonly CustTypePersonal: string = CommonConstant.CustomerPersonal;
  readonly CustTypeCoy: string = CommonConstant.CustomerCompany;

  readonly CustDataModeMain: string = CommonConstant.CustMainDataModeCust;
  readonly CustDataModeFamily: string = CommonConstant.CustMainDataModeFamily;
  readonly CustDataModeShareholder: string = CommonConstant.CustMainDataModeMgmntShrholder;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.GetDuplicateCust();
  }

  ResultDuplicate: Array<CustDuplicateObj> = new Array();
  ResultDuplicateNegative: Array<NegCustDuplicateObj> = new Array();
  GetDuplicateCust() {
    let DuplicateCustObj = this.SetDuplicateCustObj();
    this.http.post(URLConstant.GetCustomerAndNegativeCustDuplicateCheck, DuplicateCustObj).subscribe(
      (response) => {
        let DuplicateStatus = response["Status"];
        if (DuplicateStatus != null && DuplicateStatus != undefined) {
          this.ResultDuplicate = response[CommonConstant.ReturnObj]["CustDuplicate"];
          this.ResultDuplicateNegative = response[CommonConstant.ReturnObj]["NegativeCustDuplicate"];
        } else {
          this.SaveForm();
        }
      });
  }

  SetDuplicateCustObj(): DuplicateCustObj {
    let duplicateCustObj = new DuplicateCustObj();
    if (this.CustType == this.CustTypePersonal) {
      duplicateCustObj.CustName = this.CustPersonalObj.CustObj.CustName;
      duplicateCustObj.MrCustTypeCode = this.CustTypePersonal;
      duplicateCustObj.IdNo = this.CustPersonalObj.CustObj.IdNo;
      duplicateCustObj.TaxIdNo = this.CustPersonalObj.CustObj.TaxIdNo;
      duplicateCustObj.MotherMaidenName = this.CustPersonalObj.CustPersonalObj.MotherMaidenName;
      duplicateCustObj.BirthDt = this.CustPersonalObj.CustPersonalObj.BirthDt;
      return duplicateCustObj;
    }

    duplicateCustObj.CustName = this.CustCoyObj.CustObj.CustName;
    duplicateCustObj.MrCustTypeCode = this.CustTypeCoy;
    duplicateCustObj.TaxIdNo = this.CustCoyObj.CustObj.TaxIdNo;
    return duplicateCustObj;
  }

  EditCust(item: CustDuplicateObj) {
    if (this.CustType == this.CustTypePersonal) {
      this.EditCustPersonal(item);
      return;
    }
    this.EditCustCoy(item);
  }

  EditCustPersonal(item: CustDuplicateObj) {
    let reqEditDupCheck: ReqDupObj = new ReqDupObj();
    reqEditDupCheck.CustNo = item.CustNo;
    // salah logic save is is ny
    reqEditDupCheck.IsCustomer = this.CustPersonalObj.CustObj.IsCustomer;
    reqEditDupCheck.IsFamily = this.CustPersonalObj.CustObj.IsFamily;
    reqEditDupCheck.IsShareholder = this.CustPersonalObj.CustObj.IsShareholder;

    if (this.CustDataMode == this.CustDataModeFamily) {
      reqEditDupCheck.CustPersonalFamilyObj = this.CustPersonalFamilyData;
    }
    if (this.CustDataMode == this.CustDataModeShareholder) {
      reqEditDupCheck.CustCompanyMgmntShrholderObj = this.CustMgmntShareholderData;
    }
    this.http.post(URLConstant.NewEditDuplicateCust, reqEditDupCheck).subscribe(
      (response: GenericObj) => {
        if (this.CustDataMode == this.CustDataModeMain) {
          AdInsHelper.RedirectUrl(this.router, [NavigationConstant.CUST_PERSONAL_PAGE], { "IdCust": response.Id });
          return;
        }
        this.outputSave.emit("");
      }
    );
  }

  EditCustCoy(item: CustDuplicateObj) {
    let reqEditDupCheck: ReqDupObj = new ReqDupObj();
    reqEditDupCheck.CustNo = item.CustNo;
    reqEditDupCheck.IsCustomer = this.CustPersonalObj.CustObj.IsCustomer;
    reqEditDupCheck.IsFamily = this.CustPersonalObj.CustObj.IsFamily;
    reqEditDupCheck.IsShareholder = this.CustPersonalObj.CustObj.IsShareholder;

    if (this.CustDataMode == this.CustDataModeFamily) {
      reqEditDupCheck.CustPersonalFamilyObj = this.CustPersonalFamilyData;
    }
    if (this.CustDataMode == this.CustDataModeShareholder) {
      reqEditDupCheck.CustCompanyMgmntShrholderObj = this.CustMgmntShareholderData;
    }
    this.http.post(URLConstant.NewEditDuplicateCust, reqEditDupCheck).subscribe(
      (response: GenericObj) => {
        if (this.CustDataMode == this.CustDataModeMain) {
          AdInsHelper.RedirectUrl(this.router, [NavigationConstant.CUST_PERSONAL_PAGE], { "IdCust": response.Id });
          return;
        }
        this.outputSave.emit("");
      }
    );
  } 

  EditNegativeCust(item: NegCustDuplicateObj) {
    if (this.CustType == this.CustTypePersonal) {
      this.EditNegativeCustPersonal(item);
      return;
    }
    this.EditNegativeCustCoy(item);
  }

  EditNegativeCustPersonal(item: NegCustDuplicateObj) {
    let NegativeCustObj: ReqNegDupObj = new ReqNegDupObj();
    NegativeCustObj.CustName = item.CustName;
    NegativeCustObj.MrCustTypeCode = this.CustTypePersonal;
    NegativeCustObj.IdNo = item.IdNo;
    NegativeCustObj.IsCustomer = this.CustPersonalObj.CustObj.IsCustomer;
    NegativeCustObj.IsFamily = this.CustPersonalObj.CustObj.IsFamily;
    NegativeCustObj.IsShareholder = this.CustPersonalObj.CustObj.IsShareholder;

    if (this.CustDataMode == this.CustDataModeFamily) {
      NegativeCustObj.CustPersonalFamilyObj = this.CustPersonalFamilyData;
    }
    if (this.CustDataMode == this.CustDataModeShareholder) {
      NegativeCustObj.CustCompanyMgmntShrholderObj = this.CustMgmntShareholderData;
    }
    this.http.post<GenericObj>(URLConstant.EditDuplicateNegativeCust, NegativeCustObj).subscribe(
      (response) => {
        if (this.CustDataMode == this.CustDataModeMain) {
          AdInsHelper.RedirectUrl(this.router, [NavigationConstant.CUST_PERSONAL_PAGE], { "IdCust": response.Id });
          return;
        }
        this.outputSave.emit("");
      }
    );
  }

  EditNegativeCustCoy(item: NegCustDuplicateObj) {
    let NegativeCustObj: ReqNegDupObj = new ReqNegDupObj();
    NegativeCustObj.CustName = item.CustName;
    NegativeCustObj.MrCustTypeCode = this.CustTypeCoy;
    NegativeCustObj.IdNo = item.IdNo;
    NegativeCustObj.MrCompanyTypeCode = this.CustCoyObj.CustCompanyObj.MrCompanyTypeCode;
    NegativeCustObj.IsCustomer = this.CustCoyObj.CustObj.IsCustomer;
    NegativeCustObj.IsFamily = this.CustCoyObj.CustObj.IsFamily;
    NegativeCustObj.IsShareholder = this.CustCoyObj.CustObj.IsShareholder;

    if (this.CustDataMode == this.CustDataModeFamily) {
      NegativeCustObj.CustPersonalFamilyObj = this.CustPersonalFamilyData;
    }
    if (this.CustDataMode == this.CustDataModeShareholder) {
      NegativeCustObj.CustCompanyMgmntShrholderObj = this.CustMgmntShareholderData;
    }
    this.http.post<GenericObj>(URLConstant.EditDuplicateNegativeCust, NegativeCustObj).subscribe(
      (response) => {
        if (this.CustDataMode == this.CustDataModeMain) {
          AdInsHelper.RedirectUrl(this.router, [NavigationConstant.CUST_PERSONAL_PAGE], { "IdCust": response.Id });
          return;
        }
        this.outputSave.emit("");
      }
    );
  }

  Back() {
    this.outputCancel.emit();
  }

  SaveForm() {
    if (this.CustType == this.CustTypePersonal) {
      this.SavePersonalData();
      return;
    }
    this.SaveCoyData();
  }

  SaveCoyData() {
    let urlAdd: string = this.SetUrlAddCoy();
    this.http.post(urlAdd, this.CustCoyObj).subscribe(
      (response: GenericObj) => {
        if (this.CustDataMode == this.CustDataModeMain) {
          AdInsHelper.RedirectUrl(this.router, [NavigationConstant.CUST_COY_PAGE], { "IdCust": response.Id });
          return;
        }
        this.outputSave.emit("");
      }
    );
  }

  SavePersonalData() {
    let urlAdd: string = this.SetUrlAddPersonal();
    this.http.post(urlAdd, this.CustPersonalObj).subscribe(
      (response: GenericObj) => {
        if (this.CustDataMode == this.CustDataModeMain) {
          AdInsHelper.RedirectUrl(this.router, [NavigationConstant.CUST_PERSONAL_PAGE], { "IdCust": response.Id });
          return;
        }
        this.outputSave.emit("");
      }
    );
  }

  SetUrlAddCoy(): string {
    let urlAdd: string = "";
    switch (this.CustDataMode) {
      case this.CustDataModeMain:
        urlAdd = URLConstant.AddCustCompanyMainData;
        break;
      case this.CustDataModeShareholder:
        urlAdd = URLConstant.AddCustCompanyMgmntShrholder;
        break;
    }
    return urlAdd;
  }

  SetUrlAddPersonal(): string {
    let urlAdd: string = "";
    switch (this.CustDataMode) {
      case this.CustDataModeMain:
        urlAdd = URLConstant.AddCustPersonalMainData;
        break;
      case this.CustDataModeFamily:
        urlAdd = URLConstant.AddCustPersonalFamily;
        break;
      case this.CustDataModeShareholder:
        urlAdd = URLConstant.AddCustCompanyMgmntShrholder;
        break;
    }
    return urlAdd;
  }
}
