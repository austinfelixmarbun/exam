import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';  
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { CustPersonalObj } from 'app/shared/model/CustPersonalObj.Model';
import { AddCustObj } from 'app/shared/model/AddCustObj.Model';
import { CustObj } from 'app/shared/model/CustObj.Model';
 
 

@Component({
  selector: 'app-customer-personal-duplicate-check',
  templateUrl: './customer-personal-duplicate-check.component.html',
  styleUrls: ['./customer-personal-duplicate-check.component.scss'],
  providers: [NGXToastrService]
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
  addCustObj : any;
  custPersonalObj : any;
  StatusIsVip : any;
  StatusAffiliate : any;
  VipNotes : any; 
  addCustUrl: any;
  addCustPersonalUrl : any;
  resultPersonalUrl: any;
  IdCust : any;
  IdCustPersonal : any;
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder,private toastr: NGXToastrService) {
   this.addCustUrl = AdInsConstant.AddNewCust;
   this.addCustPersonalUrl = AdInsConstant.AddNewCustPersonal;
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
      if (params["VipNotes"] != null) {
        this.VipNotes = params["VipNotes"];
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

  SaveValue(){ console.log("awdawdawdawdaw");
    this.addCustObj = new AddCustObj();
    this.addCustObj.custObj = new CustObj();
    this.addCustObj.CustPersonalObj = new CustPersonalObj();
      
    this.addCustObj.custObj.CustName = this.CustName;
    this.addCustObj.custObj.CustNo = "awd";
    this.addCustObj.custObj.MrCustTypeCode = "Personal";
    this.addCustObj.custObj.MrCustModelCode = this.CustModel;
    this.addCustObj.custObj.MrIdTypeCode =this.MrIdTypeCode;
    this.addCustObj.custObj.IdNo = this.IdNo;
  
    this.addCustObj.custObj.IdExpiredDt =this.IdExpiredDt ;
    this.addCustObj.custObj.TaxIdNo = this.TaxIdNo;
    this.addCustObj.custObj.IsVip = this.IsVip;
    this.addCustObj.custObj.IsAffiliateWithMf = this.IsAffiliateWithMf;
    this.addCustObj.custObj.VipNotes = this.VipNotes;
 
   
    this.addCustObj.CustPersonalObj.CustFullName = this.CustName;
    this.addCustObj.CustPersonalObj.MrGenderCode = this.Gender;
    this.addCustObj.CustPersonalObj.BirthPlace = this.BirthPlace;
    this.addCustObj.CustPersonalObj.BirthDt = this.BirthDt;
    this.addCustObj.CustPersonalObj.IsRestInPeace = false;
   
    
    this.http.post(this.addCustUrl, this.addCustObj).subscribe(
      (response) => {
     
          this.resultData = response;
           this.IdCust =this.resultData.CustObj.CustId;
           this.IdCustPersonal =  this.resultData.CustPersonalObj.CustPersonalId;
         this.router.navigate(["/Customer/CustomerPersonal/Page"],{ queryParams: { "IdCust": this.IdCust, "IdCustPersonal": this.IdCustPersonal   } });   
        
     
        
      },
 
      error => {
        console.log(error);
      }
    );


 
  }
 

}
