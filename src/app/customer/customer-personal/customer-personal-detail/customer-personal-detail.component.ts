import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { WizardComponent } from 'angular-archwizard';

@Component({
  selector: 'app-customer-personal-detail',
  templateUrl: './customer-personal-detail.component.html',
  styleUrls: ['./customer-personal-detail.component.scss']
})
export class CustomerPersonalDetailComponent implements OnInit {
  
  @ViewChild(WizardComponent) wizard; 
  CustomerDetailForm = this.fb.group({
    CustFullName: ['', [Validators.required, Validators.maxLength(100)]],
    NickName: ['', [Validators.required, Validators.maxLength(100)]], 
    MrSalutationCode: ['', [Validators.required]],
    MrMaritalStatCode: ['', [Validators.required]],
    CustPrefixName : ['', [Validators.required]],
    IsAffiliateWithMf:  [true],
    CustSuffixName : ['', [Validators.required]],
    NoOfDependents : ['', [Validators.required]],
    MrNationalityCode:  ['', [Validators.required]],
    NoOfResidence: ['', [Validators.required]],
    WnaCountryCode :  ['', [Validators.required]],
    FamilyCardNo : ['', [Validators.required]],
    MrEducationCode: ['', [Validators.required]],
    MrReligionCode:  ['', [Validators.required]],
    IsRestInPeace : [false],
    IsVip  : [true],
    VipNotes: ['', [Validators.required]],
    MobilePhnNo1: ['', [Validators.required]],
    MobilePhnNo2: ['', [Validators.required]],
    Email1: ['', [Validators.required]],
    Email2 : ['', [Validators.required]],
    
  }); 
  

  CustName  : any;
  Gender : any;
  GenderDesc:any;
  MrIdTypeCode : any;
  MrIdTypeCodeDesc : any;
  BirthPlace : any;
  BirthDt : any;
  IdNo : any;
  TaxIdNo : any;
  IdExpiredDt : any;
  MotherMaidenName : any;
  resultData: any;


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
    });
 
   }

  ngOnInit() {
  }

}
