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
    NoOfDependents : ['' ],
    MrNationalityCode:  [''  ],
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
    Email1: ['', ],
    Email2 : ['',],
    
  }); 
  
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
  addUrl: any;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient,private toastr: NGXToastrService, private fb: FormBuilder) {
    
    this.route.queryParams.subscribe(params => {
    this.addUrl =  AdInsConstant.AddNewCustPersonal;
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
  SaveValue(){
    

    // this.custObj = new CustObj();
    // this.custObj.CustName = this.CustName;
    // this.custObj.MrCustTypeCode


    this.custPersonalObj = new CustPersonalObj();
      this.custPersonalObj.CustFullName = this.CustomerDetailForm.controls["CustFullName"].value;
      this.custPersonalObj.NickName = this.CustomerDetailForm.controls["NickName"].value;
      this.custPersonalObj.MrSalutationCode = this.CustomerDetailForm.controls["MrSalutationCode"].value;
      this.custPersonalObj.MrMaritalStatCode = this.CustomerDetailForm.controls["MrMaritalStatCode"].value;
      this.custPersonalObj.CustPrefixName = this.CustomerDetailForm.controls["CustPrefixName"].value;
      this.custPersonalObj.IsAffiliateWithMf = this.CustomerDetailForm.controls["IsAffiliateWithMf"].value;
      this.custPersonalObj.CustSuffixName = this.CustomerDetailForm.controls["CustSuffixName"].value;
      this.custPersonalObj.NoOfDependents = this.CustomerDetailForm.controls["NoOfDependents"].value;
      this.custPersonalObj.MotherMaidenName= this.MotherMaidenName;
      this.custPersonalObj.MrGenderCode = this.Gender;
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
      this.custPersonalObj.Email1 = this.CustomerDetailForm.controls["Email1"].value;
      this.custPersonalObj.Email2 = this.CustomerDetailForm.controls["Email2"].value;
  
  






      this.http.post(this.addUrl, this.custPersonalObj).subscribe(
        response => {
            this.toastr.successMessage(response["Message"]);
            this.router.navigate(["/CommonSetting/RefProvince/paging"]);        
        },
        error => {
          console.log(error);
        }
      );
  }
}
