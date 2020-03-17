import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { WizardComponent } from 'angular-archwizard';
import { CustPersonalObj } from 'app/shared/model/CustPersonalObj.Model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsConstant } from 'app/shared/AdInstConstant';  
import { CustObj } from 'app/shared/model/CustObj.Model';

@Component({
  selector: 'app-customer-personal-detail',
  templateUrl: './customer-personal-detail.component.html',
  styleUrls: ['./customer-personal-detail.component.scss'],
  providers: [NGXToastrService]
})
export class CustomerPersonalDetailComponent implements OnInit {
  
  @ViewChild(WizardComponent) wizard; 
  CustomerDetailForm = this.fb.group({
    CustFullName: ['', [  Validators.maxLength(100)]],
    NickName: ['', [ Validators.maxLength(100)]], 
    MrSalutationCode: ['' ],
    MrMaritalStatCode: [''  ],
    CustPrefixName : [''  ],
    IsAffiliateWithMf:  [true],
    CustSuffixName : ['' ],
    NoOfDependents : ['', Validators ],
    MrNationalityCode:  [''],
    NoOfResidence: [''],
    WnaCountryCode :  [''],
    FamilyCardNo : ['', ],
    MrEducationCode: ['',],
    MrReligionCode:  ['',],
    IsRestInPeace : [false],
    IsVip  : [true],
    VipNotes: ['',],
    MobilePhnNo1: ['', ],
    MobilePhnNo2: ['',],
    EMail1: ['', ],
    EMail2 : ['',],
    
  }); 
  CountryCodeIndonesia = "COUNTRY101";
  custPersonalObj : any;
  custObj : any;
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
  
  tempNationality : any;
  tempSalutation : any;
  tempEducation : any;
  tempReligion : any;
  IdCust : any;
  tempCustPersonalObj : any;
  tempMrMaritalStatCode : any;
  tempWnaCountryCode : any;
  getListCountryUrl: any;
  tempCustObj : any;
  
 
  GetUrl : any;
  GetCustByCustIdUrl:any;
  GetCustPersonalbyCustIdUrl : any;
  EditCustPersonalUrl : any;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient,private toastr: NGXToastrService, private fb: FormBuilder) {
     
    this.GetUrl = AdInsConstant.GetListActiveRefMaster; 
    this.getListCountryUrl = AdInsConstant.GetListRefCountry;
    this.GetCustByCustIdUrl=AdInsConstant.GetCustByCustId;
    this.EditCustPersonalUrl = AdInsConstant.EditCustPersonal;
    this.route.queryParams.subscribe(params => {
      this.GetCustPersonalbyCustIdUrl=AdInsConstant.GetCustPersonalbyCustId;
      if (params["IdCust"] != null) {
        this.IdCust = params["IdCust"];
      }
     
     });
 
   }

  ngOnInit() {
    
 
    this.custObj = new CustObj()
    this.custObj.CustId = this.IdCust;

    this.http.post(this.GetCustByCustIdUrl, this.custObj).subscribe(
      (response) => {
        
          this.tempCustObj = response;
        });
        
    this.custPersonalObj = new CustPersonalObj();
    this.custPersonalObj.CustId = this.IdCust;
    this.http.post(this.GetCustPersonalbyCustIdUrl, this.custPersonalObj).subscribe(
      (response) => {
        
          this.tempCustPersonalObj = response;
        });


    var refMasterObj = {
      RefMasterTypeCode: "NATIONALITY",
      
    }
    this.http.post(this.GetUrl, refMasterObj).subscribe(
      (response) => {
         
        this.tempNationality = response["ReturnObject"];
        this.CustomerDetailForm.patchValue({
          MrNationalityCode: "WNI"

        });
 
      }
    );

    var refMasterObj1 = {
      RefMasterTypeCode: "SALUTATION",
      
    }
    this.http.post(this.GetUrl, refMasterObj1).subscribe(
      (response) => {
        
        this.tempSalutation = response["ReturnObject"];
        this.CustomerDetailForm.patchValue({
          MrSalutationCode: response['ReturnObject'][0]['Key']
        });
 
      }
    );

    var refMasterObj2 = {
      RefMasterTypeCode: "EDUCATION",
      
    }
    this.http.post(this.GetUrl, refMasterObj2).subscribe(
      (response) => {
        
        this.tempEducation = response["ReturnObject"];
        this.CustomerDetailForm.patchValue({
          MrEducationCode: response['ReturnObject'][0]['Key']
        });
 
      }
    );

       
    var refMasterObj3 = {
      RefMasterTypeCode: "RELIGION",
      
    }
    this.http.post(this.GetUrl, refMasterObj3).subscribe(
      (response) => {
        
        this.tempReligion = response["ReturnObject"];
        this.CustomerDetailForm.patchValue({
          MrReligionCode: response['ReturnObject'][0]['Key']
        });
 
      }
    );
 
      
    var refMasterObj4 = {
      RefMasterTypeCode: "MARITAL_STAT",
      
    }
    this.http.post(this.GetUrl, refMasterObj4).subscribe(
      (response) => {
        console.log("awdawd")
        this.tempMrMaritalStatCode = response["ReturnObject"];
        this.CustomerDetailForm.patchValue({
          MrMaritalStatCode: response['ReturnObject'][0]['Key']
        });
 
      }
    );
    var refMasterObj5 ;

    this.http.post(this.getListCountryUrl,refMasterObj5).subscribe(
      (response) => {
        
        this.tempWnaCountryCode = response["ReturnObject"];
        this.CustomerDetailForm.patchValue({
          WnaCountryCode: this.CountryCodeIndonesia
        });
        this.CustomerDetailForm.controls.WnaCountryCode.disable();
      }
    );




  }
  SaveValue(){
 

console.log("bisa");
    this.custPersonalObj = new CustPersonalObj();
    this.custPersonalObj = this.tempCustPersonalObj;
 
      this.custPersonalObj.CustFullName = this.tempCustObj.CustName;
      this.custPersonalObj.NickName = this.CustomerDetailForm.controls["NickName"].value;
      this.custPersonalObj.MrSalutationCode = this.CustomerDetailForm.controls["MrSalutationCode"].value;
      this.custPersonalObj.MrMaritalStatCode = this.CustomerDetailForm.controls["MrMaritalStatCode"].value;
      this.custPersonalObj.CustPrefixName = this.CustomerDetailForm.controls["CustPrefixName"].value;
      this.custPersonalObj.IsAffiliateWithMf = this.CustomerDetailForm.controls["IsAffiliateWithMf"].value;
      this.custPersonalObj.CustSuffixName = this.CustomerDetailForm.controls["CustSuffixName"].value;
      this.custPersonalObj.NoOfDependents = this.CustomerDetailForm.controls["NoOfDependents"].value;
      this.custPersonalObj.MotherMaidenName= this.tempCustPersonalObj.MotherMaidenName;
      this.custPersonalObj.MrGenderCode = this.tempCustPersonalObj.MrGenderCode;
      this.custPersonalObj.MrNationalityCode = this.CustomerDetailForm.controls["MrNationalityCode"].value;
      this.custPersonalObj.NoOfResidence = this.CustomerDetailForm.controls["NoOfResidence"].value;
      this.custPersonalObj.WnaCountryCode = this.CustomerDetailForm.controls["WnaCountryCode"].value;
      this.custPersonalObj.FamilyCardNo = this.CustomerDetailForm.controls["FamilyCardNo"].value;  
      this.custPersonalObj.MrEducationCode = this.CustomerDetailForm.controls["MrEducationCode"].value;
      this.custPersonalObj.MrReligionCode = this.CustomerDetailForm.controls["MrReligionCode"].value;
      this.custPersonalObj.IsRestInPeace = this.CustomerDetailForm.controls["IsRestInPeace"].value;
      this.custPersonalObj.IsVip = this.CustomerDetailForm.controls["IsVip"].value;
      this.custPersonalObj.VipNotes = this.CustomerDetailForm.controls["VipNotes"].value;
      this.custPersonalObj.MobilePhnNo1 = this.CustomerDetailForm.controls["MobilePhnNo1"].value;
      this.custPersonalObj.MobilePhnNo2 = this.CustomerDetailForm.controls["MobilePhnNo2"].value;
      this.custPersonalObj.EMail1 = this.CustomerDetailForm.controls["EMail1"].value;
      this.custPersonalObj.EMail2 = this.CustomerDetailForm.controls["EMail2"].value;
  
    

 

      this.http.post(this.EditCustPersonalUrl, this.custPersonalObj).subscribe(
        response => {
            this.toastr.successMessage(response["Message"]);
                 
        },
        error => {
          console.log(error);
        }
      );
  }
  onOptionsSelected(event){
    if(event.target.value == "WNI"){
      this.CustomerDetailForm.controls.WnaCountryCode.disable();
      this.CustomerDetailForm.patchValue({
        WnaCountryCode: this.CountryCodeIndonesia
  
      });
    }else{
      this.CustomerDetailForm.controls.WnaCountryCode.enable();
    }
  
   
  }
}
