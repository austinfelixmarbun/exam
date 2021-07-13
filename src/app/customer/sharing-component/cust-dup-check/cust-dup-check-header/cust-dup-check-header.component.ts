import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { DuplicateCustObj } from 'app/shared/model/DuplicateCust.Model';
import { CustDuplicateObj } from 'app/shared/model/NewCust/CustDuplicateObj.Model';
import { NegCustDuplicateObj } from 'app/shared/model/NewCust/NegCustDuplicateObj.Model';
import { ReqPersonalObj } from 'app/shared/model/NewCust/ReqPersonalObj.Model';

@Component({
  selector: 'app-cust-dup-check-header',
  templateUrl: './cust-dup-check-header.component.html',
})
export class CustDupCheckHeaderComponent implements OnInit {

  @Input() CustPersonalObj: ReqPersonalObj;
  @Input() CustCoyObj: any;
  @Input() CustType: string = CommonConstant.CustomerPersonal;
  @Input() CustDataMode: string = CommonConstant.CustMainDataModeCust;
  
  readonly CustTypePersonal: string = CommonConstant.CustomerPersonal;
  readonly CustTypeCoy: string = CommonConstant.CustomerCompany;

  readonly CustDataModeMain: string = CommonConstant.CustMainDataModeCust;
  readonly CustDataModeFamily: string = CommonConstant.CustMainDataModeFamily;
  readonly CustDataModeShareholder: string = CommonConstant.CustMainDataModeMgmntShrholder;
  
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  ResultDuplicate: Array<CustDuplicateObj> = new Array();
  ResultDuplicateNegative: Array<NegCustDuplicateObj> = new Array();
  GetDuplicateCust(){    
    var DuplicateCustObj = this.SetDuplicateCustObj();
    this.http.post(URLConstant.GetCustomerAndNegativeCustDuplicateCheck, DuplicateCustObj).subscribe(
      (response) => {
        var DuplicateStatus = response["Status"];
        if (DuplicateStatus != null && DuplicateStatus != undefined) {
          this.ResultDuplicate = response[CommonConstant.ReturnObj]["CustDuplicate"];
          this.ResultDuplicateNegative = response[CommonConstant.ReturnObj]["NegativeCustDuplicate"];
        }
      });
  }

  SetDuplicateCustObj(): DuplicateCustObj {
    var duplicateCustObj = new DuplicateCustObj();
    if (this.CustType == this.CustTypePersonal) {
      duplicateCustObj.CustName = this.CustPersonalObj.CustObj.CustName;
      duplicateCustObj.MrCustTypeCode = this.CustTypePersonal;
      duplicateCustObj.IdNo = this.CustPersonalObj.CustObj.IdNo;
      duplicateCustObj.TaxIdNo = this.CustPersonalObj.CustObj.TaxIdNo;
      duplicateCustObj.MotherMaidenName = this.CustPersonalObj.CustPersonalObj.MotherMaidenName;
      duplicateCustObj.BirthDt = this.CustPersonalObj.CustPersonalObj.BirthDt;
      return duplicateCustObj;
    }

    duplicateCustObj.CustName = this.CustCoyObj.CustName;
    duplicateCustObj.MrCustTypeCode = this.CustTypeCoy;
    duplicateCustObj.TaxIdNo = this.CustCoyObj.TaxIdNo;
    return duplicateCustObj;
  }

  EditCust(item: CustDuplicateObj){

  }

  EditNegativeCust(item: NegCustDuplicateObj){
    
  }
}
