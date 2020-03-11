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

  getUrl: any;
  custPersonalObj: CustPersonalObj;
  tempGender: any;
  tempIdType: any;
  tempCustModel : any;
  CustName  : any;
  indexGender:any;
  indexCustModel :any;
  Gender : any;
  GenderDesc:any;
  CustModel : any;
  CustModelDesc:any;
  indexMrIdTypeCode : any;
  MrIdTypeCode : any;
  MrIdTypeCodeDesc : any;
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
          Gender: 0

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
          MrIdTypeCode: 0 

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
          CustModel: 0

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
    

    this.indexCustModel = this.CustomerPersonalForm.controls["CustModel"].value;
    this.CustModelDesc = this.tempCustModel[this.indexCustModel].Value;
    this.CustModel = this.tempCustModel[this.indexCustModel].Key;
    

    this.indexGender = this.CustomerPersonalForm.controls["Gender"].value;
    this.Gender = this.tempGender[this.indexGender].Key;
    this.GenderDesc= this.tempGender[this.indexGender].Value; 
    
    this.indexMrIdTypeCode = this.CustomerPersonalForm.controls["MrIdTypeCode"].value;
    this.MrIdTypeCode= this.tempIdType[this.indexMrIdTypeCode].Key;
    this.MrIdTypeCodeDesc = this.tempIdType[this.indexMrIdTypeCode].Value;
   
    this.BirthPlace = this.CustomerPersonalForm.controls["BirthPlace"].value;
    this.BirthDt= this.CustomerPersonalForm.controls["BirthDt"].value;
    this.IdNo = this.CustomerPersonalForm.controls["IdNo"].value;
    this.TaxIdNo= this.CustomerPersonalForm.controls["TaxIdNo"].value;
    this.IdExpiredDt = this.CustomerPersonalForm.controls["IdExpiredDt"].value;
    this.MotherMaidenName= this.CustomerPersonalForm.controls["MotherMaidenName"].value;
    this.IsVip = this.CustomerPersonalForm.controls["IsVip"].value;
    this.IsAffiliateWithMf = this.CustomerPersonalForm.controls["IsAffiliateWithMf"].value;
    this.VipNotes = this.CustomerPersonalForm.controls["VipNotes"].value;
    this.router.navigate(["/Customer/CustomerPersonal/DuplicateCheck"],{ queryParams: { "CustName": this.CustName,"GenderDesc":this.GenderDesc, "Gender" : this.Gender, "MrIdTypeCode" : this.MrIdTypeCode,"MrIdTypeCodeDesc" : this.MrIdTypeCodeDesc,"CustModelDesc" : this.CustModelDesc, "CustModel" : this.CustModel, "BirthPlace" : this.BirthPlace, "BirthDt": this.BirthDt, "IdNo": this.IdNo, "TaxIdNo": this.TaxIdNo,"IdExpiredDt": this.IdExpiredDt, "MotherMaidenName": this.MotherMaidenName,"IsVip"  : this.IsVip,"IsAffiliateWithMf": this.IsAffiliateWithMf, "VipNotes": this.VipNotes  } });
 
  }
}
