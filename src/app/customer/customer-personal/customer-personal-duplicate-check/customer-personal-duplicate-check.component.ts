import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 
import { CustObj } from 'app/shared/model/CustObj.Model';

@Component({
  selector: 'app-customer-personal-duplicate-check',
  templateUrl: './customer-personal-duplicate-check.component.html',
  styleUrls: ['./customer-personal-duplicate-check.component.scss']
})
export class CustomerPersonalDuplicateCheckComponent implements OnInit {
 
   

  CustName  : any;
  Gender : any;
  GenderDesc:any;
  MrIdTypeCode : any;
  MrIdTypeCodeDesc : any;
  CustModel : any;
  CustModelDesc : any;
  BirthPlace : any;
  BirthDt : any;
  IdNo : any;
  TaxIdNo : any;
  IdExpiredDt : any;
  MotherMaidenName : any;
  IsVip :any;
  IsAffiliateWithMf : any;
  resultData: any;
  custObj : any;
  StatusIsVip : any;
  StatusAffiliate : any;
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder) {
    this.route.queryParams.subscribe(params => {
   
      if (params["CustName"] != null) {
        this.CustName = params["CustName"];
      }
      if (params["Gender"] != null) {
      this.Gender = params["Gender"];
      } if (params["GenderDesc"] != null) {
        this.GenderDesc = params["GenderDesc"];
        }
      if (params["MrIdTypeCode"] != null) {
        this.MrIdTypeCode = params["MrIdTypeCode"];
      }
      if (params["MrIdTypeCodeDesc"] != null) {
        this.MrIdTypeCodeDesc = params["MrIdTypeCodeDesc"];
      }
      if (params["CustModel"] != null) {
        this.CustModel = params["CustModel"];
      }
      if (params["CustModelDesc"] != null) {
        this.CustModelDesc = params["CustModelDesc"];
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
  
    });
 
   }

  ngOnInit() {   

    if(this.IsAffiliateWithMf ==="true"){
      this.StatusAffiliate = "Yes";
    }else {
      this.StatusAffiliate = "No";
    }

    if(this.IsVip === true){
      this.StatusIsVip = "Yes";
    } else{
      this.StatusIsVip = "No";
    }


  }

  SaveValue(){

    
    this.custObj = new CustObj();
    this.custObj.CustName = this.CustName;
    this.custObj.MrCustTypeCode = this.MrIdTypeCode;
    this.custObj.MrCustModelCode = this.CustModel;
    this.custObj.MrIdTypeCode =this.MrIdTypeCode;
    this.IdNo = this.IdNo;
    this.custObj.IdExpiredDt = this.IdExpiredDt;
    this.custObj.TaxIdNo = this.TaxIdNo;
    this.custObj.IsVip = this.IsVip;
    this.custObj.IsAffiliateWithMf = this.IsAffiliateWithMf;
    // this.custObj.VipNotes = this.vip
    
  //   // CustId : any;
  //   // CustNo :any;
  //   // CustName : any;
  //   // MrCustTypeCode :any;
  //   // MrCustModelCode: any;
  //   // MrIdTypeCode : any;
  //   // IdNo:any;
  //   // IdExpiredDt:any;
  //   // TaxIdNo :any;
  //   // IsVip : any;
  //   // IsAffiliateWithMf :any;
  //   // VipNotes :any;
  //   // OriginalOfficeCode:any;

  }
 

}
