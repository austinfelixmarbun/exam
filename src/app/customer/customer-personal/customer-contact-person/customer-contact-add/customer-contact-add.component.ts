import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { WizardComponent } from 'angular-archwizard';
import { HttpClient } from '@angular/common/http';
 
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { environment } from 'environments/environment';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.model';
import { UcAddressObj } from 'app/shared/model/UcAddressObj.Model';
import { CustPersonalContactPersonObj } from 'app/shared/model/CustPersonalContactPerson.Obj.Model';
import { CustObj } from 'app/shared/model/CustObj.Model';
import { DatePipe } from '@angular/common'; 
import { AdInsConstant } from 'app/shared/AdInstConstant';

@Component({
  selector: 'app-customer-contact-add',
  templateUrl: './customer-contact-add.component.html',
  styleUrls: ['./customer-contact-add.component.scss'],
  providers: [NGXToastrService],
})
export class CustomerContactAddComponent implements OnInit {
  @Output() outputValues: EventEmitter<any> = new EventEmitter();
  @Input() inputValue: any;
  CustomerContactForm = this.fb.group({
    ContactPersonName: ['', [Validators.maxLength(100)]],
    MotherMaidenName: ['', [Validators.maxLength(100)]],
    MrIdTypeCode: [''],
    IdExpiredDt: [''],
    IdNo: [''],
    BirthPlace: [''],
    BirthDt: [''],
    MrGenderCode: [''],
    MrReligionCode: [''],
    MrEducationCode: [''],
    MrMaritalStatCode: [''],
    MrNationalityCode: [''],
    TaxIdNo: [''],
    MrCustRelationshipCode: [''],
    IsEmergencyContact: [true],
    IsFamily: [true],
    MobilePhnNo1: [''],
    MobilePhnNo2: [''],
    Email: [''],
    ContactPersonCustNo: [''],
  });
  flag : any;
  KTP = "KTP";
  CountryIndonesia = "Indonesia";
  tempKTPCheck:any;
  getUrl: any;
  tempIdType: any;
  tempNationality: any;
  tempMrMaritalStatCode: any;
  tempMrEducationCode: any;
  tempMrReligionCode: any;
  tempMrCustRelationshipCode: any;
  tempMrGenderCode : any;
  professionLookUpObj: any;
  lookUpObj: any;
  existingCustomerLookUpObj: any;
  criteriaList: any;
  criteriaObj: any;
  addressObj: any;
  custPersonaContactPersonObj: any;
  tempCountryCode: any;
  tempProfession: any;
  tempCustId : any;
  tempCustPersonal: any;
  tempCust : any;
  tempCountry : any;
  tempCustAddress : any;
  addCustPersonalContactPersonUrl: any;
  custObj : any;

  constructor(private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder, private wizard: WizardComponent) {
    this.getUrl = AdInsConstant.GetListActiveRefMaster;
    this.addCustPersonalContactPersonUrl = AdInsConstant.AddNewCustPersonalContactPerson ;
  }
  isAdd: any;
  ngOnInit() {
    console.log("aa" + this.inputValue);
    this.addressObj = new UcAddressObj();
    this.lookUpObj = new InputLookupObj();
    this.lookUpObj.urlJson = "./assets/lookup/lookupCustomerCountry.json";
    this.lookUpObj.urlQryPaging = "/Generic/GetPagingObjectBySQL";
    this.lookUpObj.urlEnviPaging = environment.FoundationR3Url;
    this.lookUpObj.pagingJson = "./assets/lookup/lookupCustomerCountry.json";
    this.lookUpObj.genericJson = "./assets/lookup/lookupCustomerCountry.json";
    this.criteriaList = new Array();
    this.criteriaObj = new CriteriaObj();
    this.criteriaObj.restriction = AdInsConstant.RestrictionNeq;
    this.criteriaObj.propName = 'COUNTRY_CODE';
    this.criteriaObj.value = "IDN";
    this.criteriaList.push(this.criteriaObj);
    this.lookUpObj.addCritInput = this.criteriaList;
    this.professionLookUpObj = new InputLookupObj();
    this.professionLookUpObj.urlJson = "./assets/lookup/lookupCustomerProfession.json";
    this.professionLookUpObj.urlQryPaging = "/Generic/GetPagingObjectBySQL";
    this.professionLookUpObj.urlEnviPaging = environment.FoundationR3Url;
    this.professionLookUpObj.pagingJson = "./assets/lookup/lookupCustomerProfession.json";
    this.professionLookUpObj.genericJson = "./assets/lookup/lookupCustomerProfession.json";

    this.existingCustomerLookUpObj = new InputLookupObj();
    this.existingCustomerLookUpObj.urlJson = "./assets/lookup/lookupExistingCustomer.json";
    this.existingCustomerLookUpObj.urlQryPaging = "/Generic/GetPagingObjectBySQL";
    this.existingCustomerLookUpObj.urlEnviPaging = environment.FoundationR3Url;
    this.existingCustomerLookUpObj.pagingJson = "./assets/lookup/lookupExistingCustomer.json";
    this.existingCustomerLookUpObj.genericJson = "./assets/lookup/lookupExistingCustomer.json";
    this.existingCustomerLookUpObj.isRequired = false;


    var refMasterObj1 = {
      RefMasterTypeCode: "ID_TYPE"
    }

    this.http.post(this.getUrl, refMasterObj1).subscribe(
      (response) => {
        this.tempIdType = response["ReturnObject"];
        this.CustomerContactForm.patchValue({
          MrIdTypeCode: this.tempIdType[0].Key
        });
        if(this.tempIdType[0].Key == this.KTP){
          this.tempKTPCheck=true;
        }else{
          this.tempKTPCheck=false;
        }
      }
    );

    var refMasterObj2 = {
      RefMasterTypeCode: "NATIONALITY"
    }
    this.http.post(this.getUrl, refMasterObj2).subscribe(
      (response) => {
        console.log("awd");
        this.tempNationality = response["ReturnObject"];
        this.CustomerContactForm.patchValue({
          MrNationalityCode: "WNI"
        });
        this.flag = true;
      });
    var refMasterObj3 = {
      RefMasterTypeCode: "MARITAL_STAT"
    }
    this.http.post(this.getUrl, refMasterObj3).subscribe(
      (response) => {
        this.tempMrMaritalStatCode = response["ReturnObject"];
        this.CustomerContactForm.patchValue({
          MrMaritalStatCode: this.tempMrMaritalStatCode[0].Key
        });
      });

    var refMasterObj4 = {
      RefMasterTypeCode: "EDUCATION"
    }
    this.http.post(this.getUrl, refMasterObj4).subscribe(
      (response) => {
        this.tempMrEducationCode = response["ReturnObject"];
        this.CustomerContactForm.patchValue({
          MrEducationCode: this.tempMrEducationCode[0].Key
        });
      });
    var refMasterObj5 = {
      RefMasterTypeCode: "RELIGION"
    }
    this.http.post(this.getUrl, refMasterObj5).subscribe(
      (response) => {
        this.tempMrReligionCode = response["ReturnObject"];
        this.CustomerContactForm.patchValue({
          MrReligionCode: this.tempMrReligionCode[0].Key
        });
      });

    var refMasterObj6 = {
      RefMasterTypeCode: "CUST_RELATIONSHIP"
    }
    this.http.post(this.getUrl, refMasterObj6).subscribe(
      (response) => {
        this.tempMrCustRelationshipCode = response["ReturnObject"];
        this.CustomerContactForm.patchValue({
          MrCustRelationshipCode: this.tempMrCustRelationshipCode[0].Key
        });
      });

      var refMasterObj7 = {
        RefMasterTypeCode: "GENDER",
        RowVersion: ""
      }
      this.http.post(this.getUrl, refMasterObj7).subscribe(
        (response) => {
          this.tempMrGenderCode = response["ReturnObject"];
          this.CustomerContactForm.patchValue({
            MrGenderCode: this.tempMrGenderCode[0].Key
          });
        }
      );
  } 

  SaveValue() {
    // this.isAdd = false; 
    // this.outputValues.emit(this.isAdd);
    console.log("awdawdawd");
    this.custPersonaContactPersonObj = new CustPersonalContactPersonObj();
    this.custPersonaContactPersonObj.CustId = this.inputValue;
    this.custPersonaContactPersonObj.ContactPersonName = this.CustomerContactForm.controls["ContactPersonName"].value;
    this.custPersonaContactPersonObj.MotherMaidenName = this.CustomerContactForm.controls["MotherMaidenName"].value;

    this.custPersonaContactPersonObj.MrIdTypeCode = this.CustomerContactForm.controls["MrIdTypeCode"].value;
    this.custPersonaContactPersonObj.MrNationalityCode = this.CustomerContactForm.controls["MrNationalityCode"].value;

    this.custPersonaContactPersonObj.IdNo = this.CustomerContactForm.controls["IdNo"].value;
    this.custPersonaContactPersonObj.NationalityCountryCode = this.tempCountryCode;
    this.custPersonaContactPersonObj.IdExpiredDt = this.CustomerContactForm.controls["IdExpiredDt"].value;

    this.custPersonaContactPersonObj.MrEducationCode = this.CustomerContactForm.controls["MrEducationCode"].value;
    this.custPersonaContactPersonObj.MrGenderCode = this.CustomerContactForm.controls["MrGenderCode"].value;
    this.custPersonaContactPersonObj.MrReligionCode = this.CustomerContactForm.controls["MrReligionCode"].value;

    this.custPersonaContactPersonObj.BirthPlace = this.CustomerContactForm.controls["BirthPlace"].value;
    this.custPersonaContactPersonObj.BirthDt = this.CustomerContactForm.controls["BirthDt"].value;
    this.custPersonaContactPersonObj.MrMaritalStatCode = this.CustomerContactForm.controls["MrMaritalStatCode"].value;

    this.custPersonaContactPersonObj.TaxIdNo = this.CustomerContactForm.controls["TaxIdNo"].value;
    this.custPersonaContactPersonObj.MrJobProfessionCode = this.tempProfession;

    this.custPersonaContactPersonObj.MrCustRelationshipCode = this.CustomerContactForm.controls["MrCustRelationshipCode"].value;
    this.custPersonaContactPersonObj.IsFamily = this.CustomerContactForm.controls["IsFamily"].value;
    this.custPersonaContactPersonObj.IsEmergencyContact = this.CustomerContactForm.controls["IsEmergencyContact"].value;

    this.custPersonaContactPersonObj.MobilePhnNo1 = this.CustomerContactForm.controls["MobilePhnNo1"].value;
    this.custPersonaContactPersonObj.MobilePhnNo2 = this.CustomerContactForm.controls["MobilePhnNo2"].value;
    this.custPersonaContactPersonObj.Email = this.CustomerContactForm.controls["Email"].value;

    this.custPersonaContactPersonObj.Addr = this.CustomerContactForm.value.UcAddress.Addr;
    this.custPersonaContactPersonObj.AreaCode1 = this.CustomerContactForm.value.UcAddress.AreaCode1;
    this.custPersonaContactPersonObj.AreaCode2 = this.CustomerContactForm.value.UcAddress.AreaCode2;
    this.custPersonaContactPersonObj.AreaCode3 = this.CustomerContactForm.value.UcAddress.AreaCode3;
    this.custPersonaContactPersonObj.AreaCode4 = this.CustomerContactForm.value.UcAddress.AreaCode4;
    this.custPersonaContactPersonObj.City = this.CustomerContactForm.value.UcAddress.City;
    this.custPersonaContactPersonObj.ZipCode = this.CustomerContactForm.value.UcAddressZipcode.value;
    this.custPersonaContactPersonObj.SubZipcode = this.CustomerContactForm.value.UcAddressZipcode.value;

    this.http.post(this.addCustPersonalContactPersonUrl, this.custPersonaContactPersonObj).subscribe(
      response => {
       console.log(response);
        this.toastr.successMessage(response["Message"]);
        // this.wizard.goToNextStep();
      },
      error => {
        console.log(error);
      }
    );
  }

  getLookUpCustomer(event) {
    console.log("aaaaa")
    this.tempCustId = event.CustId;
    var datePipe = new DatePipe("en-US");
    // this.expiredDt = datePipe.transform(this.response.IdExpiredDt, 'yyyy-MM-dd');
    this.custObj = new CustObj();
    this.custObj.CustId = this.tempCustId;
    this.http.post(AdInsConstant.GetCustPersonalbyCustId, this.custObj).subscribe(
      (response) => {
        this.tempCustPersonal = response;

        this.CustomerContactForm.patchValue({
          MotherMaidenName: this.tempCustPersonal.MotherMaidenName,    
          MrNationalityCode: this.tempCustPersonal.MrNationalityCode,
          MrReligionCode: this.tempCustPersonal.MrReligionCode,
          BirthPlace: this.tempCustPersonal.BirthPlace,
          BirthDt: datePipe.transform(this.tempCustPersonal.BirthDt, 'yyyy-MM-dd'),
          MrMaritalStatCode: this.tempCustPersonal.MrMaritalStatCode,
 

        });
        if( this.tempCustPersonal.MrNationalityCode!= "WNI"){
          this.flag = false;  
          var countryCode = {
            CountryCode: this.tempCustPersonal.WnaCountryCode
          };
          this.http.post(AdInsConstant.GetRefCountryByCountryCode, countryCode).subscribe(
            (response) => {
               
              this.tempCountry = response;
              this.lookUpObj.nameSelect = this.tempCountry.CountryName;;
            });
     
          
        }else{
          this.flag=true; 
        }
      }
     
    ); console.log(this.tempCustPersonal);
    this.http.post(AdInsConstant.GetCustByCustId, this.custObj).subscribe(
      (response) => {
        this.tempCust = response ;
        this.CustomerContactForm.patchValue({
          ContactPersonName: this.tempCust.CustName,
          MrIdTypeCode: this.tempCust.MrIdTypeCode,       
          IdNo: this.tempCust.IdNo,
          IdExpiredDt : datePipe.transform(this.tempCust.IdExpiredDt, 'yyyy-MM-dd'),
          TaxIdNo: this.tempCust.TaxIdNo
        });
      }

    );

    this.http.post(AdInsConstant.GetCustAddrLegalAddrByCustId, this.custIdObj).subscribe(
      (response) => {
        this.tempCustAddress = response;
      }
    );
    this.CustomerContactForm.patchValue({
      ContactPersonName: this.tempCust.CustName,
      MotherMaidenName: this.tempCustPersonal.MotherMaidenName,
      MrIdTypeCode: this.tempCust.MrIdTypeCode,
      MrNationalityCode: this.tempCustPersonal.MrNationalityCode,
      IdNo: this.tempCust.IdNo
    });
   
  }
   
  getLookUpCountry(event) {
    this.tempCountryCode = event.CountryCode;
  }
  getLookUpProfession(event) {
    this.tempProfession = event.ProfessionCode;
  }

  onOptionIdTypeSelected(event){  
    if(event.target.value == this.KTP){
      this.CustomerContactForm.controls.IdExpiredDt.clearValidators();
      this.tempKTPCheck= true;
    }else{
      this.CustomerContactForm.controls.IdExpiredDt.setValidators(Validators.required);  
      this.tempKTPCheck=false;
    }
    this.CustomerContactForm.controls.IdExpiredDt.updateValueAndValidity();
  }
  onOptionsNationalitySelected(event){
    if (event.target.value == "WNI") {    
      
      this.lookUpObj.isRequired = false;
      this.flag=true;
    } else {
      this.flag = false;
      this.lookUpObj.isRequired = true;
    }
  }
}
