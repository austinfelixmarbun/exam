import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { CustPersonalObj } from 'app/shared/model/CustPersonalObj.Model';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdInsConstant } from 'app/shared/AdInstConstant';

@Component({
  selector: 'app-customer-personal-main-info',
  templateUrl: './customer-personal-main-info.component.html',
  styleUrls: ['./customer-personal-main-info.component.scss']
})
export class CustomerPersonalMainInfoComponent implements OnInit {


state: any;
  CustomerPersonalForm = this.fb.group({
    CustName: ['', [Validators.required, Validators.maxLength(100)]],
    Gender: ['', [Validators.required]],
    MrIdTypeCode: ['', [Validators.required, Validators.maxLength(100)]],
    BirthPlace: ['', [Validators.required]],
    BirthDt: ['', [Validators.required]],
    IdNo: ['', [Validators.required]],
    TaxIdNo: ['', [Validators.required]],
    IdExpiredDt: ['', [Validators.required]],
    MotherMaidenName: ['', [Validators.required, Validators.maxLength(100)]],
    CustModel : ['', [Validators.required]],
    IsVip : [true],
    IsAffiliateWithMf: [true],
    VipNotes : ['']
  });
  KTP = "KTP";
  getUrl: any;
  custPersonalObj: CustPersonalObj;
  tempGender: any;
  tempIdType: any;
  tempCustModel : any;
  CustName  : any;
 
  
  Gender : any;
  
  CustModel : any;
 
  
  MrIdTypeCode : any;
 
  BirthPlace : any;
  BirthDt : any;
  IdNo : any;
  TaxIdNo : any;
  IdExpiredDt : any;
  MotherMaidenName : any;
  IsVip :any;
  IsAffiliateWithMf : any;
  VipNotes: any;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder) {
  this.getUrl = AdInsConstant.GetListActiveRefMaster; 
   
  }

  ngOnInit() {
    console.log("Awd");
    var refMasterObj = {
      RefMasterTypeCode: "GENDER",
      RowVersion: ""
    }
    this.http.post(this.getUrl, refMasterObj).subscribe(
      (response) => {
        this.tempGender = response["ReturnObject"];
        this.CustomerPersonalForm.patchValue({
          Gender: this.tempGender[0].Key

        });
 
      }
    );
    var refMasterObj1 = {
      RefMasterTypeCode: "ID_TYPE",
      RowVersion: ""
    }

    this.http.post(this.getUrl, refMasterObj1).subscribe(
      (response) => {
        this.tempIdType = response["ReturnObject"];
        this.CustomerPersonalForm.patchValue({
          MrIdTypeCode: this.tempIdType[0].Key
        });
      }
    );
    console.log( "awdawdwad");
    var refMasterObj2 = {
      RefMasterTypeCode: "CUST_MODEL",
      ReserveField1: "PERSONAL",
      RowVersion: ""
    }

    this.http.post(this.getUrl, refMasterObj2).subscribe(
      (response) => {
        this.tempCustModel = response["ReturnObject"];
        this.CustomerPersonalForm.patchValue({
          
          CustModel: this.tempCustModel[0].Key

        });
      }
    );
  }

  checkState(){
    if(this.CustomerPersonalForm.controls.IsVip.value === true){
     
      this.CustomerPersonalForm.controls.VipNotes.disable();
    }else{
      this.CustomerPersonalForm.controls.VipNotes.enable();
    }
  }
  SaveValue (){ 
    this.CustName= this.CustomerPersonalForm.controls["CustName"].value; 
    

     
    this.CustModel =  this.CustomerPersonalForm.controls["CustModel"].value;
    
 
    this.Gender = this.CustomerPersonalForm.controls["Gender"].value;
    
    
    
    this.MrIdTypeCode= this.CustomerPersonalForm.controls["MrIdTypeCode"].value;
     
   
    this.BirthPlace = this.CustomerPersonalForm.controls["BirthPlace"].value;
    this.BirthDt= this.CustomerPersonalForm.controls["BirthDt"].value;
    this.IdNo = this.CustomerPersonalForm.controls["IdNo"].value;
    this.TaxIdNo= this.CustomerPersonalForm.controls["TaxIdNo"].value;
    this.IdExpiredDt = this.CustomerPersonalForm.controls["IdExpiredDt"].value;
    this.MotherMaidenName= this.CustomerPersonalForm.controls["MotherMaidenName"].value;
    this.IsVip = this.CustomerPersonalForm.controls["IsVip"].value;
    this.IsAffiliateWithMf = this.CustomerPersonalForm.controls["IsAffiliateWithMf"].value;
    this.VipNotes = this.CustomerPersonalForm.controls["VipNotes"].value;
    this.router.navigate(["/Customer/CustomerPersonal/DuplicateCheck"],{ queryParams: { "CustName": this.CustName, "Gender" : this.Gender, "MrIdTypeCode" : this.MrIdTypeCode,   "CustModel" : this.CustModel, "BirthPlace" : this.BirthPlace, "BirthDt": this.BirthDt, "IdNo": this.IdNo, "TaxIdNo": this.TaxIdNo,"IdExpiredDt": this.IdExpiredDt, "MotherMaidenName": this.MotherMaidenName,"IsVip"  : this.IsVip,"IsAffiliateWithMf": this.IsAffiliateWithMf, "VipNotes": this.VipNotes  } });
 
  }
  onOptionsSelected(event){    console.log(event.target.value);
    if(event.target.value == this.KTP){
  
      this.CustomerPersonalForm.controls.IdExpiredDt.clearValidators();
      this.CustomerPersonalForm.controls.IdExpiredDt.disable();
    
    }else{
      this.CustomerPersonalForm.controls.IdExpiredDt.setValidators(Validators.required);   this.CustomerPersonalForm.controls.IdExpiredDt.disable();
    }
    this.CustomerPersonalForm.controls.IdExpiredDt.updateValueAndValidity();
  
   
  }

}

