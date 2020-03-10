import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http'; 

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
