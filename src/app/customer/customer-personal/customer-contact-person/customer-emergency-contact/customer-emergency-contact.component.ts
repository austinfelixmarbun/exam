import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { HttpClient } from '@angular/common/http';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { environment } from 'environments/environment';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.Model';
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
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { InputAddressObj } from 'app/shared/model/InputAddressObj.Model';
import { CookieService } from 'ngx-cookie';
import { AdInsHelper } from 'app/shared/AdInsHelper';

@Component({
  selector: 'app-customer-emergency-contact',
  templateUrl: './customer-emergency-contact.component.html',
  styles: [],
  providers: [NGXToastrService],
})
export class CustomerEmergencyContactComponent implements OnInit {
  @Output() outputTab: EventEmitter<any> = new EventEmitter();
  @Input() custId: number;
  // @Input() custPersonalContactPersonId: number;
  // @Input() listCustIdToExclude: Array<string>;

  Country: any;
  tempCust: any;
  tempIdType: any;
  tempCountry: any;
  LocalCountry: any;
  tempProfession: any;
  tempNationality: any;
  tempCustAddress: any;
  tempCustPersonal: any;
  tempMrGenderCode: any;
  tempMrReligionCode: any;
  tempMrEducationCode: any;
  tempMrMaritalStatCode: any;
  tempProfessionCodeObj: any;
  tempMrCustRelationshipCode: any;
  tempCustPersonalContactPerson: CustPersonalContactPersonObj;

  lookUpObj: InputLookupObj;
  inputFieldObj: InputFieldObj;
  professionLookUpObj: InputLookupObj;
  existingCustomerLookUpObj: InputLookupObj;

  custObj: CustObj;
  criteriaObj: CriteriaObj;
  custAddrObj: CustAddrObj;
  UcAddressObj: UcAddressObj;
  custPersonalObj: CustPersonalObj;
  criteriaList: Array<CriteriaObj>;
  custPersonalContactPersonObj: CustPersonalContactPersonObj;
  listCustAddr: Array<CustAddrObj>

  IdCust: number;
  tempCustId: number;

  flag: boolean;
  tempKTPCheck: boolean;
  tempMobilePhone1 : boolean;
  businessDtMin: Date;
  businessDtMax: Date;

  KTP: string;
  tempCountryCode: string;
  GetListActiveRefMasterUrl: string;
  GetGeneralSettingByCodeUrl: string;
  addCustPersonalContactPersonUrl: string;
  editCustPersonalContactPersonUrl: string;

  CustomerContactForm = this.fb.group({
    ContactPersonName: ['', [Validators.maxLength(100), Validators.required]],
    MotherMaidenName: ['', [Validators.maxLength(100)]],
    MrIdTypeCode: [''],
    IdExpiredDt: [''],
    IdNo: [''],
    BirthPlace: [''],
    BirthDt: ['', Validators.required],
    MrGenderCode: ['', Validators.required],
    MrReligionCode: [''],
    MrEducationCode: [''],
    MrMaritalStatCode: [''],
    MrNationalityCode: [''],
    TaxIdNo: ['', [Validators.pattern("^[0-9]+$"), Validators.minLength(15), Validators.maxLength(15)]],
    MrCustRelationshipCode: [''],
    MobilePhnNo1: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
    MobilePhnNo2: ['', [Validators.pattern("^[0-9]+$")]],
    Email: ['', [Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
    ContactPersonCustNo: [''],
    CopyFromContactPerson: [''],
  });
  criteriaExistingList: any[];
  criteriaExistingObj: CriteriaObj;
  criteriaCurrentCust : CriteriaObj;
  inputAddressObj: InputAddressObj;

  constructor(private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder, private cookieService: CookieService) {
    this.KTP = RefMasterConstant.EKtp;
    this.GetListActiveRefMasterUrl = URLConstant.GetListActiveRefMaster;
    this.addCustPersonalContactPersonUrl = URLConstant.AddNewCustPersonalContactPerson;
    this.editCustPersonalContactPersonUrl = URLConstant.EditCustPersonalContactPerson;
    this.GetGeneralSettingByCodeUrl = URLConstant.GetGeneralSettingByCode;
    this.route.queryParams.subscribe(params => {
      if (params["IdCust"] != null) {
        this.IdCust = params["IdCust"];
      }
    });
    this.custId = 0;
  }
  isAdd: any;
  ngOnInit() {
    var context = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
    this.businessDtMin = new Date(context[CommonConstant.BUSINESS_DT]);
    this.businessDtMin.setDate(this.businessDtMin.getDate() - 1);
    this.businessDtMax = new Date(context[CommonConstant.BUSINESS_DT]);
    this.businessDtMax.setDate(this.businessDtMax.getDate() + 1);

    this.lookUpObj = new InputLookupObj();
    this.lookUpObj.urlJson = "./assets/lookup/lookupCustomerCountry.json";
    this.lookUpObj.urlQryPaging = "/Generic/GetPagingObjectBySQL";
    this.lookUpObj.urlEnviPaging = environment.FoundationR3Url;
    this.lookUpObj.pagingJson = "./assets/lookup/lookupCustomerCountry.json";
    this.lookUpObj.genericJson = "./assets/lookup/lookupCustomerCountry.json";

    this.UcAddressObj = new UcAddressObj();

    var generalSettingObjDefLocalNationality = {
      GsCode: CommonConstant.GSCodeDefLocalNationality
    }

    this.http.post(this.GetGeneralSettingByCodeUrl, {Code: CommonConstant.GSCodeDefLocalNationality }).subscribe(
      (response) => {
        this.Country = response;
        this.criteriaList = new Array();
        this.criteriaObj = new CriteriaObj();
        this.criteriaObj.restriction = AdInsConstant.RestrictionNeq;
        this.criteriaObj.propName = 'COUNTRY_CODE';
        this.criteriaObj.value = this.Country.GsValue;
        this.criteriaList.push(this.criteriaObj);
        this.lookUpObj.addCritInput = this.criteriaList;

        var countryCode = {
          CountryCode: this.Country.GsValue
        };
        this.http.post(URLConstant.GetRefCountryByCountryCode, {Code: this.Country.GsValue}).subscribe(
          (response) => {
            this.LocalCountry = response;
          });
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

    this.criteriaExistingList = new Array();
    this.criteriaCurrentCust = new CriteriaObj();
    this.criteriaCurrentCust.restriction = AdInsConstant.RestrictionNeq;
    this.criteriaCurrentCust.propName = 'CUST_ID';
    this.criteriaCurrentCust.value = this.custId.toString();
    this.criteriaExistingList.push(this.criteriaCurrentCust);

    this.criteriaExistingObj = new CriteriaObj();
    this.criteriaExistingObj.restriction = AdInsConstant.RestrictionEq;
    this.criteriaExistingObj.propName = 'MR_CUST_TYPE_CODE';
    this.criteriaExistingObj.value = CommonConstant.CustomerPersonal;
    this.criteriaExistingList.push(this.criteriaExistingObj);
    if (this.existingCustomerLookUpObj.addCritInput) {
      this.existingCustomerLookUpObj.addCritInput.push(this.criteriaExistingObj);
    }
    else {
      this.existingCustomerLookUpObj.addCritInput = this.criteriaExistingList;
    }

    this.inputFieldObj = new InputFieldObj();
    this.inputFieldObj.inputLookupObj = new InputLookupObj();

    var refMasterObjMrIdTypeCode = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeIdType
    }
    this.http.post(this.GetListActiveRefMasterUrl, refMasterObjMrIdTypeCode).subscribe(
      (response) => {
        this.tempIdType = response[CommonConstant.ReturnObj];
        if (this.tempIdType.length > 0) {
          this.CustomerContactForm.patchValue({
            MrIdTypeCode: this.tempIdType[0].Key
          });
          this.onChangeIdType();
        }
        if (this.tempIdType[0].Key == this.KTP) {
          this.tempKTPCheck = true;
        } else {
          this.tempKTPCheck = false;
          this.CustomerContactForm.controls.IdExpiredDt.setValidators(Validators.required);
          this.CustomerContactForm.controls.IdExpiredDt.updateValueAndValidity();
        }
      }
    );

    var refMasterObjMrNationalityCode = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeNationality
    }
    this.http.post(URLConstant.GetListActiveRefMasterByRefMasterTypeCode, {Code : CommonConstant.RefMasterTypeCodeNationality}).subscribe(
      (response) => {
        this.tempNationality = response["RefMasterObjs"];
        this.CustomerContactForm.patchValue({
          MrNationalityCode: CommonConstant.NationalityCodeLocal
        });
        this.lookUpObj.isRequired = false;
        this.flag = true;
      });
    var refMasterObjMrMaritalStatCode = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeMaritalStat
    }
    this.http.post(this.GetListActiveRefMasterUrl, refMasterObjMrMaritalStatCode).subscribe(
      (response) => {
        this.tempMrMaritalStatCode = response[CommonConstant.ReturnObj];
        if (this.tempMrMaritalStatCode.length > 0) {
          this.CustomerContactForm.patchValue({
            MrMaritalStatCode: this.tempMrMaritalStatCode[0].Key
          });
        }
      });

    var refMasterObjMrEducationCode = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeEducation
    }
    this.http.post(this.GetListActiveRefMasterUrl, refMasterObjMrEducationCode).subscribe(
      (response) => {
        this.tempMrEducationCode = response[CommonConstant.ReturnObj];
        if (this.tempMrEducationCode.length > 0) {
          this.CustomerContactForm.patchValue({
            MrEducationCode: this.tempMrEducationCode[0].Key
          });
        }
      });
    var refMasterObjMrReligionCode = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeReligion
    }
    this.http.post(this.GetListActiveRefMasterUrl, refMasterObjMrReligionCode).subscribe(
      (response) => {
        this.tempMrReligionCode = response[CommonConstant.ReturnObj];
        if (this.tempMrReligionCode.length > 0) {
          this.CustomerContactForm.patchValue({
            MrReligionCode: this.tempMrReligionCode[0].Key
          });
        }
      });

    var refMasterObjMrCustRelationshipCode = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeCustRelationship
    }
    this.http.post(this.GetListActiveRefMasterUrl, refMasterObjMrCustRelationshipCode).subscribe(
      (response) => {
        this.tempMrCustRelationshipCode = response[CommonConstant.ReturnObj];
        if (this.tempMrCustRelationshipCode.length > 0) {
          this.CustomerContactForm.patchValue({
            MrCustRelationshipCode: this.tempMrCustRelationshipCode[0].Key
          });
        }
        if (this.tempMrCustRelationshipCode[0].Key == "SPOUSE") {
          this.CustomerContactForm.controls.MobilePhnNo1.setValidators(Validators.required);
          this.tempMobilePhone1 = true;
        } else {
            this.tempMobilePhone1 = false;
          this.CustomerContactForm.controls.MobilePhnNo1.clearValidators();
        }
        this.CustomerContactForm.controls.MobilePhnNo1.updateValueAndValidity();

      });

    var refMasterObjMrGenderCode = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeGender,
      RowVersion: ""
    }
    this.http.post(this.GetListActiveRefMasterUrl, refMasterObjMrGenderCode).subscribe(
      (response) => {
        this.tempMrGenderCode = response[CommonConstant.ReturnObj];
        if (this.tempMrGenderCode.length > 0) {
          this.CustomerContactForm.patchValue({
            MrGenderCode: this.tempMrGenderCode[0].Key
          });
        }
      }
    );

    console.log("Emergency Comp Cust Id: " + this.custId);
    if (this.custId > 0) {
      this.custPersonalContactPersonObj = new CustPersonalContactPersonObj();
      this.custPersonalContactPersonObj.CustId = this.custId;
      this.http.post<CustPersonalContactPersonObj>(URLConstant.GetCustPersonalEmergencyContactByCustId, this.custPersonalContactPersonObj).subscribe(
        (response) => {
          var datePipe = new DatePipe("en-US");
          this.tempCustPersonalContactPerson = response;
          console.log("tempCustPersonalContactPerson: " + JSON.stringify(this.tempCustPersonalContactPerson));
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
            // IsFamily: this.tempCustPersonalContactPerson.IsFamily,
            // IsEmergencyContact: this.tempCustPersonalContactPerson.IsEmergencyContact,
            MrCustRelationshipCode: this.tempCustPersonalContactPerson.MrCustRelationshipCode,
          });
          this.onChangeIdType();
          if (this.tempCustPersonalContactPerson.MrJobProfessionCode != null) {
            
            this.http.post(URLConstant.GetRefProfessionByProfessionCode, {Code : this.tempCustPersonalContactPerson.MrJobProfessionCode}).subscribe(
              (response) => {
                this.tempProfessionCodeObj = response;
                this.professionLookUpObj.nameSelect = this.tempProfessionCodeObj.ProfessionName;
              }
            );
          }
          if (this.tempCustPersonalContactPerson.MrNationalityCode != CommonConstant.NationalityCodeLocal) {
            this.flag = false;
            var countryCode = {
              CountryCode: this.tempCustPersonalContactPerson.NationalityCountryCode
            };
            this.http.post(URLConstant.GetRefCountryByCountryCode, {Code: this.tempCustPersonalContactPerson.NationalityCountryCode}).subscribe(
              (response) => {

                this.tempCountry = response;
                this.lookUpObj.nameSelect = this.tempCountry.CountryName;
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
          this.UcAddressObj.Phn1 = this.tempCustPersonalContactPerson.Phn1;
          this.UcAddressObj.Phn2 = this.tempCustPersonalContactPerson.Phn2;
          this.UcAddressObj.Phn3 = this.tempCustPersonalContactPerson.Phn3;
          this.UcAddressObj.PhnArea1 = this.tempCustPersonalContactPerson.PhnArea1;
          this.UcAddressObj.PhnArea2 = this.tempCustPersonalContactPerson.PhnArea2;
          this.UcAddressObj.PhnArea3 = this.tempCustPersonalContactPerson.PhnArea3;
          this.UcAddressObj.PhnExt1 = this.tempCustPersonalContactPerson.PhnExt1;
          this.UcAddressObj.PhnExt2 = this.tempCustPersonalContactPerson.PhnExt2;
          this.UcAddressObj.PhnExt3 = this.tempCustPersonalContactPerson.PhnExt3;
          this.UcAddressObj.Addr = this.tempCustPersonalContactPerson.Addr;
          this.UcAddressObj.City = this.tempCustPersonalContactPerson.City;
          this.inputAddressObj.default = this.UcAddressObj;
          this.inputAddressObj.inputField = this.inputFieldObj;
        });
    }
    this.inputAddressObj = new InputAddressObj();
    this.inputAddressObj.showSubsection = false;
    this.inputAddressObj.title = "Customer Address";
    this.inputAddressObj.default = UcAddressObj;
    this.inputAddressObj.inputField = this.inputFieldObj;
    this.inputAddressObj.showAllPhn= true;
    this.inputAddressObj.showFax= false;

    var tempCustAddrObj = new CustAddrObj();
    tempCustAddrObj.CustId = this.IdCust;
    tempCustAddrObj.MrCustAddrTypeCode = "-";
    this.http.post(URLConstant.GetListCustAddr, tempCustAddrObj).subscribe(
      (response) => {
        this.listCustAddr = response[CommonConstant.ReturnObj];
        if (this.listCustAddr.length > 0) {
          this.CustomerContactForm.patchValue({ CopyFromContactPerson: response[CommonConstant.ReturnObj][0]['CustAddrId'] });
        }
      });
  }

  copyAddress() {
    if(this.listCustAddr.length<1){
      return
    }
    var custAddrFromObj = new CustAddrObj();
    custAddrFromObj.CustAddrId = this.CustomerContactForm.controls["CopyFromContactPerson"].value;
    this.http.post<CustAddrObj>(URLConstant.GetCustAddr, custAddrFromObj).subscribe(
      (response) => {
        var copyCustomerAddrFrom = response;

        this.UcAddressObj = new UcAddressObj();
        this.UcAddressObj.Addr = copyCustomerAddrFrom.Addr;
        this.UcAddressObj.AreaCode3 = copyCustomerAddrFrom.AreaCode3;
        this.UcAddressObj.AreaCode4 = copyCustomerAddrFrom.AreaCode4;
        this.UcAddressObj.AreaCode1 = copyCustomerAddrFrom.AreaCode1;
        this.UcAddressObj.AreaCode2 = copyCustomerAddrFrom.AreaCode2;
        this.UcAddressObj.City = copyCustomerAddrFrom.City;
        this.UcAddressObj.PhnArea1 = copyCustomerAddrFrom.PhnArea1;
        this.UcAddressObj.Phn1 = copyCustomerAddrFrom.Phn1;
        this.UcAddressObj.PhnExt1 = copyCustomerAddrFrom.PhnExt1;
        this.UcAddressObj.PhnArea2 = copyCustomerAddrFrom.PhnArea2;
        this.UcAddressObj.Phn2 = copyCustomerAddrFrom.Phn2;
        this.UcAddressObj.PhnExt2 = copyCustomerAddrFrom.PhnExt2;
        this.UcAddressObj.PhnArea3 = copyCustomerAddrFrom.PhnArea3;
        this.UcAddressObj.Phn3 = copyCustomerAddrFrom.Phn3;
        this.UcAddressObj.PhnExt3 = copyCustomerAddrFrom.PhnExt3;
        this.UcAddressObj.FaxArea = copyCustomerAddrFrom.FaxArea;
        this.UcAddressObj.Fax = copyCustomerAddrFrom.Fax;

        this.inputFieldObj = new InputFieldObj();
        this.inputFieldObj.inputLookupObj = new InputLookupObj();
        this.inputFieldObj.inputLookupObj.nameSelect = copyCustomerAddrFrom.Zipcode;
        this.inputFieldObj.inputLookupObj.jsonSelect = { Zipcode: copyCustomerAddrFrom.Zipcode };
        this.inputAddressObj.default = this.UcAddressObj;
        this.inputAddressObj.inputField = this.inputFieldObj;
      });
  }
	
  onChangeIdType() {
    let idType: string = this.CustomerContactForm.get("MrIdTypeCode").value;

    if (idType == CommonConstant.MrIdTypeCodeEKTP) {
      this.CustomerContactForm.get("IdNo").setValidators([Validators.minLength(16), Validators.maxLength(16)]);
    } else {
      this.CustomerContactForm.get("IdNo").clearValidators();
    }
    this.CustomerContactForm.get("IdNo").updateValueAndValidity();
  }

  SaveValue() {
    console.log("ameng");
    this.custPersonalContactPersonObj = new CustPersonalContactPersonObj();
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
    // this.custPersonalContactPersonObj.IsFamily = this.CustomerContactForm.controls["IsFamily"].value;
    // this.custPersonalContactPersonObj.IsEmergencyContact = this.CustomerContactForm.controls["IsEmergencyContact"].value;
    this.custPersonalContactPersonObj.MobilePhnNo1 = this.CustomerContactForm.controls["MobilePhnNo1"].value;
    this.custPersonalContactPersonObj.MobilePhnNo2 = this.CustomerContactForm.controls["MobilePhnNo2"].value;
    this.custPersonalContactPersonObj.Email = this.CustomerContactForm.controls["Email"].value;
    this.custPersonalContactPersonObj.Addr = this.CustomerContactForm.value.UcAddress.Addr;
    this.custPersonalContactPersonObj.AreaCode1 = this.CustomerContactForm.value.UcAddress.AreaCode1;
    this.custPersonalContactPersonObj.AreaCode2 = this.CustomerContactForm.value.UcAddress.AreaCode2;
    this.custPersonalContactPersonObj.AreaCode3 = this.CustomerContactForm.value.UcAddress.AreaCode3;
    this.custPersonalContactPersonObj.AreaCode4 = this.CustomerContactForm.value.UcAddress.AreaCode4;
    this.custPersonalContactPersonObj.City = this.CustomerContactForm.value.UcAddress.City;
    this.custPersonalContactPersonObj.Zipcode = this.CustomerContactForm.value.UcAddressZipcode.value;
    this.custPersonalContactPersonObj["Phn1"] = this.CustomerContactForm.value.UcAddress.Phn1;
    this.custPersonalContactPersonObj["PhnArea1"] = this.CustomerContactForm.value.UcAddress.PhnArea1;
    this.custPersonalContactPersonObj["PhnExt1"] = this.CustomerContactForm.value.UcAddress.PhnExt1;
    this.custPersonalContactPersonObj["Phn2"] = this.CustomerContactForm.value.UcAddress.Phn2;
    this.custPersonalContactPersonObj["PhnArea2"] = this.CustomerContactForm.value.UcAddress.PhnArea2;
    this.custPersonalContactPersonObj["PhnExt2"] = this.CustomerContactForm.value.UcAddress.PhnExt2;
    this.custPersonalContactPersonObj["Phn3"] = this.CustomerContactForm.value.UcAddress.Phn3;
    this.custPersonalContactPersonObj["PhnArea3"] = this.CustomerContactForm.value.UcAddress.PhnArea3;
    this.custPersonalContactPersonObj["PhnExt3"] = this.CustomerContactForm.value.UcAddress.PhnArea3;
    if (this.tempCust != null) {
      this.custPersonalContactPersonObj.ContactPersonCustNo = this.tempCust.CustNo;
    }

    if (this.tempCustPersonal != null) {
      this.custPersonalContactPersonObj.NationalityCountryCode = this.tempCustPersonal.WnaCountryCode;

    } else {
      this.custPersonalContactPersonObj.NationalityCountryCode = this.tempCountryCode;
    }

    if (this.tempCustPersonalContactPerson && this.tempCustPersonalContactPerson.CustPersonalContactPersonId > 0) {

      this.custPersonalContactPersonObj.CustPersonalContactPersonId = this.tempCustPersonalContactPerson.CustPersonalContactPersonId;

      this.custPersonalContactPersonObj.RowVersion = this.tempCustPersonalContactPerson.RowVersion;
      this.http.post(URLConstant.EditCustPersonalEmergencyContact, this.custPersonalContactPersonObj).subscribe(
        response => {
          this.toastr.successMessage(response["Message"]);
          // this.wizard.goToNextStep();
          this.isAdd = false;
          // this.outputTab.emit({ isAdd: this.isAdd });
          this.outputTab.emit({ stepMode: "next"});
        }
      );
    } else {
      this.http.post(URLConstant.AddCustPersonalEmergencyContact, this.custPersonalContactPersonObj).subscribe(
        response => {
          this.toastr.successMessage(response["Message"]);
          this.isAdd = false;
          // this.outputTab.emit({ isAdd: this.isAdd });
          // this.wizard.goToNextStep();
          this.outputTab.emit({ stepMode: "next" });
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
    this.http.post(URLConstant.GetCustPersonalbyCustId, this.custObj).subscribe(
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
        if (this.tempCustPersonal.MrNationalityCode != CommonConstant.NationalityCodeLocal) {
          this.flag = false;
          var countryCode = {
            CountryCode: this.tempCustPersonal.WnaCountryCode
          };
          this.http.post(URLConstant.GetRefCountryByCountryCode, {Code: this.tempCustPersonal.WnaCountryCode}).subscribe(
            (response) => {

              this.tempCountry = response;
              this.lookUpObj.nameSelect = this.tempCountry.CountryName;;
            });
        } else {
          this.flag = true;
        }

        if (this.tempCustPersonal.MobilePhnNo1 != null) {
          this.CustomerContactForm.controls.MobilePhnNo1.disable();
          this.CustomerContactForm.controls.MobilePhnNo2.disable();
          this.CustomerContactForm.controls.Email.disable();
        }
      }

    );
    this.http.post(URLConstant.GetCustByCustId, this.custObj).subscribe(
      (response) => {
        this.tempCust = response;
        this.CustomerContactForm.patchValue({
          ContactPersonName: this.tempCust.CustName,
          MrIdTypeCode: this.tempCust.MrIdTypeCode,
          IdNo: this.tempCust.IdNo,
          IdExpiredDt: datePipe.transform(this.tempCust.IdExpiredDt, 'yyyy-MM-dd'),
          TaxIdNo: this.tempCust.TaxIdNo
        });
        this.onChangeIdType();
      }
    );
    this.custAddrObj = new CustAddrObj();
    this.custAddrObj.CustId = this.tempCustId;
    this.custAddrObj.MrCustAddrTypeCode = RefMasterConstant.LegalAddr;
    this.http.post(URLConstant.GetCustAddrByMrCustAddrType, this.custAddrObj).subscribe(
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
    let noExpDate = [CommonConstant.MrIdTypeCodeEKTP, CommonConstant.MrIdTypeCodeNPWP, CommonConstant.MrIdTypeCodeAKTA];
    if (noExpDate.includes(event.target.value)) {
      this.CustomerContactForm.controls.IdExpiredDt.clearValidators();
      this.CustomerContactForm.patchValue({
        IdExpiredDt : ''
      })
      this.tempKTPCheck = true;
    } else {
      this.CustomerContactForm.controls.IdExpiredDt.setValidators(Validators.required);
      this.tempKTPCheck = false;
    }
    this.CustomerContactForm.controls.IdExpiredDt.updateValueAndValidity();
    this.onChangeIdType();
  }
  onOptionsNationalitySelected(event) {
    if (event.target.value == CommonConstant.NationalityCodeLocal) {
      this.lookUpObj.isRequired = false;
      this.flag = true;
    } else {
      this.flag = false;
      var foreign = this.tempNationality.find(x => x["MasterCode"] == event.target.value);
      var setCountry = foreign.DefaultValue.split(';');
      this.lookUpObj.nameSelect = setCountry[1] ? setCountry[1] : setCountry[0];
      this.lookUpObj.jsonSelect =  { CountryName: setCountry[1] ? setCountry[1] : setCountry[0]};
      this.tempCountryCode = setCountry[0];
      this.lookUpObj.isRequired = true;
    }
  }
  Check() {
    if (this.CustomerContactForm.controls.MrCustRelationshipCode.value == "SPOUSE") {
      this.CustomerContactForm.controls.MobilePhnNo1.setValidators(Validators.required);
      this.tempMobilePhone1 = true;
    } else {
      this.CustomerContactForm.controls.MobilePhnNo1.clearValidators();
      this.tempMobilePhone1 = false;
    }
    this.CustomerContactForm.controls.MobilePhnNo1.updateValueAndValidity();
  }

  back() {
    this.isAdd = false;
    this.outputTab.emit({ isAdd: this.isAdd });
  }
}
