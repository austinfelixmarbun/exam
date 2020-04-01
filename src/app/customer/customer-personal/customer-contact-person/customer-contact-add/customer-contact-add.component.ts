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
import { CustAddrObj } from 'app/shared/model/CustAddrObj.Model';
import { RefMasterConstant } from 'app/shared/RefMasterConstant';
import { InputFieldObj } from 'app/shared/model/InputFieldObj.Model';
import { ActivatedRoute } from '@angular/router';
import { CustPersonalObj } from 'app/shared/model/CustPersonalObj.Model';

@Component({
  selector: 'app-customer-contact-add',
  templateUrl: './customer-contact-add.component.html',
  styleUrls: ['./customer-contact-add.component.scss'],
  providers: [NGXToastrService],
})
export class CustomerContactAddComponent implements OnInit {
  @Output() outputValues: EventEmitter<any> = new EventEmitter();
  @Input() custPersonalContactPersonId: any;
  IdCust: any;
  CustomerContactForm = this.fb.group({
    ContactPersonName: ['', [Validators.maxLength(100),Validators.required]],
    MotherMaidenName: ['', [Validators.maxLength(100)]],
    MrIdTypeCode: [''],
    IdExpiredDt: ['',Validators.required],
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
    MobilePhnNo1: ['',[Validators.required]],
    MobilePhnNo2: [''],
    Email: [''],
    ContactPersonCustNo: [''],
  });
  flag: any;
  KTP = "KTP"; 
  tempKTPCheck: any;
  GetListActiveRefMasterUrl: any;
  tempIdType: any;
  tempNationality: any;
  tempMrMaritalStatCode: any;
  tempMrEducationCode: any;
  tempMrReligionCode: any;
  tempMrCustRelationshipCode: any;
  tempMrGenderCode: any;
  professionLookUpObj: any;
  lookUpObj: any;
  existingCustomerLookUpObj: any;
  criteriaList: any;
  criteriaObj: any;
  UcAddressObj: any;
  custPersonalContactPersonObj: any;
  tempCountryCode: any;
  tempProfession: any;
  tempCustId: any;
  tempCustPersonal: any;
  tempCust: any;
  tempCountry: any;
  tempCustAddress: any;
  tempCustPersonalContactPerson: any;
  addCustPersonalContactPersonUrl: any;
  editCustPersonalContactPersonUrl : any;
  custObj: any;
  custPersonalObj : any;
  custAddrObj: any;
  inputFieldObj: any;
  tempProfessionCodeObj;
  GetGeneralSettingByCodeUrl : string;
  Country : any;

  constructor(private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder, private wizard: WizardComponent) {
    this.GetListActiveRefMasterUrl = AdInsConstant.GetListActiveRefMaster;
    this.addCustPersonalContactPersonUrl = AdInsConstant.AddNewCustPersonalContactPerson;
    this.editCustPersonalContactPersonUrl = AdInsConstant.EditCustPersonalContactPerson;
    this.GetGeneralSettingByCodeUrl = AdInsConstant.GetGeneralSettingByCode;
    this.route.queryParams.subscribe(params => {
      if (params["IdCust"] != null) {
         this.IdCust = params["IdCust"];
       }
     });
  }
  isAdd: any;
  ngOnInit() { 
    this.UcAddressObj = new UcAddressObj();
    this.lookUpObj = new InputLookupObj();
    this.lookUpObj.urlJson = "./assets/lookup/lookupCustomerCountry.json";
    this.lookUpObj.urlQryPaging = "/Generic/GetPagingObjectBySQL";
    this.lookUpObj.urlEnviPaging = environment.FoundationR3Url;
    this.lookUpObj.pagingJson = "./assets/lookup/lookupCustomerCountry.json";
    this.lookUpObj.genericJson = "./assets/lookup/lookupCustomerCountry.json";
 
    var generalSettingObjDefLocalNationality = {
      GsCode: "DEF_LOCAL_NATIONALITY"
    }
    this.http.post(this.GetGeneralSettingByCodeUrl, generalSettingObjDefLocalNationality).subscribe(
      (response) => {
        this.Country = response;
        this.criteriaList = new Array();
        this.criteriaObj = new CriteriaObj();
        this.criteriaObj.restriction = AdInsConstant.RestrictionNeq;
        this.criteriaObj.propName = 'COUNTRY_CODE';
        this.criteriaObj.value = this.Country.GsValue;
        this.criteriaList.push(this.criteriaObj);
        this.lookUpObj.addCritInput = this.criteriaList;
      });




    this.professionLookUpObj = new InputLookupObj();
    this.professionLookUpObj.isRequired = false;
    this.professionLookUpObj.urlJson = "./assets/lookup/lookupCustomerProfession.json";
    this.professionLookUpObj.urlQryPaging = "/Generic/GetPagingObjectBySQL";
    this.professionLookUpObj.urlEnviPaging = environment.FoundationR3Url;
    this.professionLookUpObj.pagingJson = "./assets/lookup/lookupCustomerProfession.json";
    this.professionLookUpObj.genericJson = "./assets/lookup/lookupCustomerProfession.json";

    this.existingCustomerLookUpObj = new InputLookupObj();
    this.existingCustomerLookUpObj.isRequired = false;
    this.existingCustomerLookUpObj.urlJson = "./assets/lookup/lookupExistingCustomer.json";
    this.existingCustomerLookUpObj.urlQryPaging = "/Generic/GetPagingObjectBySQL";
    this.existingCustomerLookUpObj.urlEnviPaging = environment.FoundationR3Url;
    this.existingCustomerLookUpObj.pagingJson = "./assets/lookup/lookupExistingCustomer.json";
    this.existingCustomerLookUpObj.genericJson = "./assets/lookup/lookupExistingCustomer.json";

    this.inputFieldObj = new InputFieldObj();
    this.inputFieldObj.inputLookupObj = new InputLookupObj();

    var refMasterObjMrIdTypeCode = {
      RefMasterTypeCode: "ID_TYPE"
    }
    this.http.post(this.GetListActiveRefMasterUrl, refMasterObjMrIdTypeCode).subscribe(
      (response) => {
        this.tempIdType = response["ReturnObject"];
        this.CustomerContactForm.patchValue({
          MrIdTypeCode: this.tempIdType[0].Key
        });
        if (this.tempIdType[0].Key == this.KTP) {
          this.tempKTPCheck = true;
        } else {
          this.tempKTPCheck = false;
        }
      }
    );

    var refMasterObjMrNationalityCode = {
      RefMasterTypeCode: "NATIONALITY"
    }
    this.http.post(this.GetListActiveRefMasterUrl, refMasterObjMrNationalityCode).subscribe(
      (response) => {
        console.log("awd");
        this.tempNationality = response["ReturnObject"];
        this.CustomerContactForm.patchValue({
          MrNationalityCode: "LOCAL"
        });
        this.lookUpObj.isRequired = false;
        this.flag = true;
      });
    var refMasterObjMrMaritalStatCode = {
      RefMasterTypeCode: "MARITAL_STAT"
    }
    this.http.post(this.GetListActiveRefMasterUrl, refMasterObjMrMaritalStatCode).subscribe(
      (response) => {
        this.tempMrMaritalStatCode = response["ReturnObject"];
        this.CustomerContactForm.patchValue({
          MrMaritalStatCode: this.tempMrMaritalStatCode[0].Key
        });
      });

    var refMasterObjMrEducationCode = {
      RefMasterTypeCode: "EDUCATION"
    }
    this.http.post(this.GetListActiveRefMasterUrl, refMasterObjMrEducationCode).subscribe(
      (response) => {
        this.tempMrEducationCode = response["ReturnObject"];
        this.CustomerContactForm.patchValue({
          MrEducationCode: this.tempMrEducationCode[0].Key
        });
      });
    var refMasterObjMrReligionCode = {
      RefMasterTypeCode: "RELIGION"
    }
    this.http.post(this.GetListActiveRefMasterUrl, refMasterObjMrReligionCode).subscribe(
      (response) => {
        this.tempMrReligionCode = response["ReturnObject"];
        this.CustomerContactForm.patchValue({
          MrReligionCode: this.tempMrReligionCode[0].Key
        });
      });

    var refMasterObjMrCustRelationshipCode = {
      RefMasterTypeCode: "CUST_RELATIONSHIP"
    }
    this.http.post(this.GetListActiveRefMasterUrl, refMasterObjMrCustRelationshipCode).subscribe(
      (response) => {
        this.tempMrCustRelationshipCode = response["ReturnObject"];
        this.CustomerContactForm.patchValue({
          MrCustRelationshipCode: this.tempMrCustRelationshipCode[0].Key
        });
      });

    var refMasterObjMrGenderCode = {
      RefMasterTypeCode: "GENDER",
      RowVersion: ""
    }
    this.http.post(this.GetListActiveRefMasterUrl, refMasterObjMrGenderCode).subscribe(
      (response) => {
        this.tempMrGenderCode = response["ReturnObject"];
        this.CustomerContactForm.patchValue({
          MrGenderCode: this.tempMrGenderCode[0].Key
        });
      }
    );

    if (this.custPersonalContactPersonId != null) {
      this.custPersonalContactPersonObj = new CustPersonalContactPersonObj();
      this.custPersonalContactPersonObj.custPersonalContactPersonId = this.custPersonalContactPersonId;
      console.log("aaaaaa");
      this.http.post(AdInsConstant.GetCustPersonalContactPersonByCustPersonalContactPersonId, this.custPersonalContactPersonObj).subscribe(
        (response) => {
          var datePipe = new DatePipe("en-US");
          this.tempCustPersonalContactPerson = response;
          this.CustomerContactForm.patchValue({
            ContactPersonName: this.tempCustPersonalContactPerson.ContactPersonName,
            MrIdTypeCode: this.tempCustPersonalContactPerson.MrIdTypeCode,
            IdNo: this.tempCustPersonalContactPerson.IdNo,
            IdExpiredDt: datePipe.transform(this.tempCustPersonalContactPerson.IdExpiredDt, 'yyyy-MM-dd'),
            TaxIdNo: this.tempCustPersonalContactPerson.TaxIdNo,
            MotherMaidenName: this.tempCustPersonalContactPerson.MotherMaidenName,
            MrNationalityCode: this.tempCustPersonalContactPerson.MrNationalityCode,
            MrReligionCode: this.tempCustPersonalContactPerson.MrReligionCode,
            BirthPlace: this.tempCustPersonalContactPerson.BirthPlace,
            BirthDt: datePipe.transform(this.tempCustPersonalContactPerson.BirthDt, 'yyyy-MM-dd'),
            MrMaritalStatCode: this.tempCustPersonalContactPerson.MrMaritalStatCode,
            MobilePhnNo1: this.tempCustPersonalContactPerson.MobilePhnNo1,
            MobilePhnNo2: this.tempCustPersonalContactPerson.MobilePhnNo2,
            Email: this.tempCustPersonalContactPerson.Email,
            IsFamily: this.tempCustPersonalContactPerson.IsFamily,
            IsEmergencyContact: this.tempCustPersonalContactPerson.IsEmergencyContact,
            MrCustRelationshipCode: this.tempCustPersonalContactPerson.MrCustRelationshipCode,
          });
          if (this.tempCustPersonalContactPerson.MrJobProfessionCode != null) {
            var ProfessionCodeObj = {
              ProfessionCode: this.tempCustPersonalContactPerson.MrJobProfessionCode,
              RowVersion: ""
            }
            this.http.post(AdInsConstant.GetRefProfessionByProfessionCode, ProfessionCodeObj).subscribe(
              (response) => {
                console.log("awdawdawd");
                this.tempProfessionCodeObj = response;
                this.professionLookUpObj.nameSelect = this.tempProfessionCodeObj.ProfessionName;
              }
            );
          }
          if (this.tempCustPersonalContactPerson.MrNationalityCode != "LOCAL") {
            this.flag = false;
            var countryCode = {
              CountryCode: this.tempCustPersonalContactPerson.NationalityCountryCode
            };
            this.http.post(AdInsConstant.GetRefCountryByCountryCode, countryCode).subscribe(
              (response) => {
  
                this.tempCountry = response;
                this.lookUpObj.nameSelect = this.tempCountry.CountryName;;
              });
  
          } else {
            this.flag = true;
          }
          
          this.inputFieldObj.inputLookupObj.nameSelect = this.tempCustPersonalContactPerson.Zipcode;
          this.inputFieldObj.inputLookupObj.jsonSelect = { Zipcode: this.tempCustPersonalContactPerson.Zipcode };
          this.UcAddressObj.AreaCode1 = this.tempCustPersonalContactPerson.AreaCode1;
          this.UcAddressObj.AreaCode2 = this.tempCustPersonalContactPerson.AreaCode2;
          this.UcAddressObj.AreaCode3 = this.tempCustPersonalContactPerson.AreaCode3;
          this.UcAddressObj.AreaCode4 = this.tempCustPersonalContactPerson.AreaCode4;
          this.UcAddressObj.Addr = this.tempCustPersonalContactPerson.Addr;
          this.UcAddressObj.City = this.tempCustPersonalContactPerson.City;
        });
    }
  }
  SaveValue() {

    console.log("awdawdawd");
    this.custPersonalContactPersonObj = new CustPersonalContactPersonObj();
    // if(this.custPersonalContactPersonId !=null){
    //   this.custPersonalContactPersonObj= this.tempCustPersonalContactPerson;
    // }

    this.custPersonalContactPersonObj.CustId = this.IdCust;
    this.custPersonalContactPersonObj.ContactPersonName = this.CustomerContactForm.controls["ContactPersonName"].value;
    this.custPersonalContactPersonObj.MotherMaidenName = this.CustomerContactForm.controls["MotherMaidenName"].value;
    this.custPersonalContactPersonObj.MrIdTypeCode = this.CustomerContactForm.controls["MrIdTypeCode"].value;
    this.custPersonalContactPersonObj.MrNationalityCode = this.CustomerContactForm.controls["MrNationalityCode"].value;
    this.custPersonalContactPersonObj.IdNo = this.CustomerContactForm.controls["IdNo"].value;
    this.custPersonalContactPersonObj.IdExpiredDt = this.CustomerContactForm.controls["IdExpiredDt"].value;
    this.custPersonalContactPersonObj.MrEducationCode = this.CustomerContactForm.controls["MrEducationCode"].value;
    this.custPersonalContactPersonObj.MrGenderCode = this.CustomerContactForm.controls["MrGenderCode"].value;
    this.custPersonalContactPersonObj.MrReligionCode = this.CustomerContactForm.controls["MrReligionCode"].value;
    this.custPersonalContactPersonObj.BirthPlace = this.CustomerContactForm.controls["BirthPlace"].value;
    this.custPersonalContactPersonObj.BirthDt = this.CustomerContactForm.controls["BirthDt"].value;
    this.custPersonalContactPersonObj.MrMaritalStatCode = this.CustomerContactForm.controls["MrMaritalStatCode"].value;
    this.custPersonalContactPersonObj.TaxIdNo = this.CustomerContactForm.controls["TaxIdNo"].value;
    this.custPersonalContactPersonObj.MrJobProfessionCode = this.tempProfession;
    this.custPersonalContactPersonObj.MrCustRelationshipCode = this.CustomerContactForm.controls["MrCustRelationshipCode"].value;
    this.custPersonalContactPersonObj.IsFamily = this.CustomerContactForm.controls["IsFamily"].value;
    this.custPersonalContactPersonObj.IsEmergencyContact = this.CustomerContactForm.controls["IsEmergencyContact"].value;
    this.custPersonalContactPersonObj.MobilePhnNo1 = this.CustomerContactForm.controls["MobilePhnNo1"].value;
    this.custPersonalContactPersonObj.MobilePhnNo2 = this.CustomerContactForm.controls["MobilePhnNo2"].value;
    this.custPersonalContactPersonObj.Email = this.CustomerContactForm.controls["Email"].value;
    this.custPersonalContactPersonObj.Addr = this.CustomerContactForm.value.UcAddress.Addr;
    this.custPersonalContactPersonObj.AreaCode1 = this.CustomerContactForm.value.UcAddress.AreaCode1;
    this.custPersonalContactPersonObj.AreaCode2 = this.CustomerContactForm.value.UcAddress.AreaCode2;
    this.custPersonalContactPersonObj.AreaCode3 = this.CustomerContactForm.value.UcAddress.AreaCode3;
    this.custPersonalContactPersonObj.AreaCode4 = this.CustomerContactForm.value.UcAddress.AreaCode4;
    this.custPersonalContactPersonObj.City = this.CustomerContactForm.value.UcAddress.City;
    this.custPersonalContactPersonObj.ZipCode = this.CustomerContactForm.value.UcAddressZipcode.value;
    this.custPersonalContactPersonObj.SubZipcode = this.CustomerContactForm.value.UcAddressZipcode.value;
    if (this.tempCust != null) {
      this.custPersonalContactPersonObj.ContactPersonCustNo = this.tempCust.CustNo;
    }
    if (this.tempCustPersonal != null) {
      this.custPersonalContactPersonObj.NationalityCountryCode = this.tempCustPersonal.WnaCountryCode;

    } else {
      this.custPersonalContactPersonObj.NationalityCountryCode = this.tempCountryCode;
    }

    if(this.tempCustPersonalContactPerson !=null){
      
      this.custPersonalContactPersonObj.CustPersonalContactPersonId = this.tempCustPersonalContactPerson.CustPersonalContactPersonId;
    
      this.custPersonalContactPersonObj.RowVersion = this.tempCustPersonalContactPerson.RowVersion;
      console.log(this.editCustPersonalContactPersonUrl);
      this.http.post(this.editCustPersonalContactPersonUrl, this.custPersonalContactPersonObj).subscribe(
        response => {
          console.log(response);
          this.toastr.successMessage(response["Message"]);
          // this.wizard.goToNextStep();
          this.isAdd = false; 
          this.outputValues.emit({isAdd : this.isAdd});
        }, 
        error => {
          console.log(error);
        }
      );
    }else{

      this.http.post(this.addCustPersonalContactPersonUrl, this.custPersonalContactPersonObj).subscribe(
        response => {
          console.log(response);
          this.toastr.successMessage(response["Message"]);
          this.isAdd = false;
          this.outputValues.emit({isAdd : this.isAdd});
          // this.wizard.goToNextStep();
        },
        error => {
          console.log(error);
        }
      );

    }
  }

  getLookUpCustomer(event) {
    this.tempCustId = event.CustId;
    var datePipe = new DatePipe("en-US");
    this.custObj = new CustObj();
    this.custPersonalObj = new CustPersonalObj();
    this.custObj.CustId = this.tempCustId;
    this.custPersonalObj.CustId = this.tempCustId;
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
          MobilePhnNo1: this.tempCustPersonal.MobilePhnNo1,
          MobilePhnNo2: this.tempCustPersonal.MobilePhnNo2,
          Email: this.tempCustPersonal.Email1
        });
        if (this.tempCustPersonal.MrNationalityCode != "LOCAL") {
          this.flag = false;
          var countryCode = {
            CountryCode: this.tempCustPersonal.WnaCountryCode
          };
          this.http.post(AdInsConstant.GetRefCountryByCountryCode, countryCode).subscribe(
            (response) => {

              this.tempCountry = response;
              this.lookUpObj.nameSelect = this.tempCountry.CountryName;;
            });
        } else {
          this.flag = true;
        }
        
    if(this.tempCustPersonal.MobilePhnNo1!=null){
      this.CustomerContactForm.controls.MobilePhnNo1.disable();
      this.CustomerContactForm.controls.MobilePhnNo2.disable();
      this.CustomerContactForm.controls.Email.disable();
      }
      }

    );  
    this.http.post(AdInsConstant.GetCustByCustId, this.custObj).subscribe(
      (response) => {
        this.tempCust = response;
        this.CustomerContactForm.patchValue({
          ContactPersonName: this.tempCust.CustName,
          MrIdTypeCode: this.tempCust.MrIdTypeCode,
          IdNo: this.tempCust.IdNo,
          IdExpiredDt: datePipe.transform(this.tempCust.IdExpiredDt, 'yyyy-MM-dd'),
          TaxIdNo: this.tempCust.TaxIdNo
        });
      }
    );
    this.custAddrObj = new CustAddrObj();
    this.custAddrObj.CustId = this.tempCustId;
    console.log(this.tempCustId);
    this.custAddrObj.MrCustAddrTypeCode = RefMasterConstant.LegalAddr; 
    this.http.post(AdInsConstant.GetCustAddrLegalAddrByCustId, this.custAddrObj).subscribe(
      (response) => {
        this.tempCustAddress = response;
        this.UcAddressObj.AreaCode1 = this.tempCustAddress.AreaCode1;
        this.UcAddressObj.AreaCode2 = this.tempCustAddress.AreaCode2;
        this.UcAddressObj.AreaCode3 = this.tempCustAddress.AreaCode3;
        this.UcAddressObj.AreaCode4 = this.tempCustAddress.AreaCode4;
        this.UcAddressObj.Addr = this.tempCustAddress.Addr;
        this.UcAddressObj.City = this.tempCustAddress.City;
        this.inputFieldObj.inputLookupObj.nameSelect = this.tempCustAddress.Zipcode;
        this.inputFieldObj.inputLookupObj.jsonSelect = { Zipcode: this.tempCustAddress.Zipcode };
      }
    );
    this.CustomerContactForm.controls.ContactPersonName.disable();
    this.CustomerContactForm.controls.MotherMaidenName.disable();
    this.CustomerContactForm.controls.MrIdTypeCode.disable();
    this.CustomerContactForm.controls.IdExpiredDt.disable();
    this.CustomerContactForm.controls.IdNo.disable();
    this.CustomerContactForm.controls.BirthPlace.disable();
    this.CustomerContactForm.controls.BirthDt.disable();
    this.CustomerContactForm.controls.MrGenderCode.disable();
    this.CustomerContactForm.controls.MrReligionCode.disable();
    this.CustomerContactForm.controls.MrEducationCode.disable();
    this.CustomerContactForm.controls.MrMaritalStatCode.disable();
    this.CustomerContactForm.controls.MrNationalityCode.disable();
    this.CustomerContactForm.controls.TaxIdNo.disable(); 
  }
  getLookUpCountry(event) {
    this.tempCountryCode = event.CountryCode;
  }
  getLookUpProfession(event) {
    this.tempProfession = event.ProfessionCode;
  }
  onOptionIdTypeSelected(event) {
    if (event.target.value == this.KTP) {
      this.CustomerContactForm.controls.IdExpiredDt.clearValidators();
      this.tempKTPCheck = true;
    } else {
      this.CustomerContactForm.controls.IdExpiredDt.setValidators(Validators.required);
      this.tempKTPCheck = false;
    }
    this.CustomerContactForm.controls.IdExpiredDt.updateValueAndValidity();
  }
  onOptionsNationalitySelected(event) {
    if (event.target.value == "LOCAL") {
      this.lookUpObj.isRequired = false;
      this.flag = true;
    } else {
      this.flag = false;
      this.lookUpObj.isRequired = true;
    }
  }
  back(){
    this.isAdd = false;
    this.outputValues.emit({isAdd : this.isAdd});
  }
}
