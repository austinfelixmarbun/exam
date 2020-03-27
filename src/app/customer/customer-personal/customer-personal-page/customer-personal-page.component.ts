import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'environments/environment';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { CustObj } from 'app/shared/model/CustObj.Model';
import { HttpClient } from '@angular/common/http';
import { CustPersonalObj } from 'app/shared/model/CustPersonalObj.Model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';

@Component({
  selector: 'app-customer-personal-page',
  templateUrl: './customer-personal-page.component.html',
  styleUrls: ['./customer-personal-page.component.scss'],
  providers: [NGXToastrService],
})
export class CustomerPersonalPageComponent implements OnInit {

  Gender: any;
  GenderDesc: any;
  MrIdTypeCode: any;
  MrIdTypeCodeDesc: any;
  CustModel: any;
  CustModelDesc
  BirthPlace: any;
  BirthDt: any;
  IdNo: any;
  TaxIdNo: any;
  IdExpiredDt: any;
  MotherMaidenName: any;
  resultData: any;
  addUrl: any; IdCust: any;
  custObj: any;
  tempCustPersonalObj: any;
  custPersonalObj: any;
  tempCustObj: any;
  getRefMasterByMasterCodeUrl: any;
  tempMrGenderCode: any;
  tempMrIdTypeCode;
  tempMrCustModelCode: any;
 
  isDetail: any;
  isAddress : any;
  isContact : any;
  isGroup : any;
  isJob:any;
  isFinancial : any;
  isOther :any;
  CustPersonalId : any;
  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.getRefMasterByMasterCodeUrl = AdInsConstant.GetRefMasterByMasterCode;
    this.route.queryParams.subscribe(params => {
      if (params["IdCust"] != null) {
        this.IdCust = params["IdCust"];
      }
    });
  }

  ngOnInit() {
    this.custObj = new CustObj();
    this.custObj.CustId = this.IdCust;
    this.http.post(AdInsConstant.GetCustByCustId, this.custObj).subscribe(
      (response) => {
        this.tempCustObj = response;
        var refMasterObj1 = {
          MasterCode: this.tempCustObj.MrCustModelCode
        }
        this.http.post(this.getRefMasterByMasterCodeUrl, refMasterObj1).subscribe(
          (response) => {
            this.tempMrCustModelCode = response;
          }
        );
        var refMasterObj2 = {
          MasterCode: this.tempCustObj.MrIdTypeCode
        }
        this.http.post(this.getRefMasterByMasterCodeUrl, refMasterObj2).subscribe(
          (response) => {
            this.tempMrIdTypeCode = response;
        
          }
        );
      });

    this.custPersonalObj = new CustPersonalObj();
    this.custPersonalObj.CustId = this.IdCust;
    this.http.post(AdInsConstant.GetCustPersonalbyCustId, this.custPersonalObj).subscribe(
      (response) => {
        this.tempCustPersonalObj = response;

        var refMasterObj = {
          MasterCode: this.tempCustPersonalObj.MrGenderCode
        }

        this.http.post(this.getRefMasterByMasterCodeUrl, refMasterObj).subscribe(
          (response) => {
            this.tempMrGenderCode = response;
          }
        );
       
      });


  }

  EnterTab(type){
    if(type == "Detail"){
      this.isDetail = true;
      this.isAddress = false;
      this.isContact  = false;
      this.isGroup  = false;
      this.isJob = false;
      this.isFinancial = false;
      this.isOther  = false;
    }

    if(type == "Address"){
      this.isDetail = false;
      this.isAddress = true;
      this.isContact  = false;
      this.isGroup  = false;
      this.isJob = false;
      this.isFinancial = false;
      this.isOther  = false;
    }
   
    if(type == "Contact"){
      this.isDetail = false;
      this.isAddress = false;
      this.isContact  = true;
      this.isGroup  = false;
      this.isJob = false;
      this.isFinancial = false;
      this.isOther  = false;
    }
    if(type == "Group"){
      this.isDetail = false;
      this.isAddress = false;
      this.isContact  = false;
      this.isGroup  = true;
      this.isJob = false;
      this.isFinancial = false;
      this.isOther  = false;
    }
    if(type == "Job"){
      this.isDetail = false;
      this.isAddress = false;
      this.isContact  = false;
      this.isGroup  = false;
      this.isJob = true;
      this.isFinancial = false;
      this.isOther  = false;
    }
    if(type == "Financial"){
      this.isDetail = false;
      this.isAddress = false;
      this.isContact  = false;
      this.isGroup  = false;
      this.isJob = false;
      this.isFinancial = true;
      this.isOther  = false;
    }

    if(type == "Other"){
      this.isDetail = false;
      this.isAddress = false;
      this.isContact  = false;
      this.isGroup  = false;
      this.isJob = false;
      this.isFinancial = false;
      this.isOther  = true;
    }
  }

  terimaValue(ev: any) {
    console.log(ev);
    this.CustPersonalId = ev.CustPersonalId;
  }
   
}