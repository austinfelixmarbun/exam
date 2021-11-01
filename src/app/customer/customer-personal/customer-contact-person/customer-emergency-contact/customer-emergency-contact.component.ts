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
import { RegexService } from 'app/customer/regex.service';
import { CustomPatternObj } from 'app/shared/model/LibraryObj/CustomPatternObj.model';
import { CookieService } from 'ngx-cookie';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { ReqRefMasterByTypeCodeAndMappingCodeObj } from 'app/shared/model/RefMaster/ReqRefMasterByTypeCodeAndMappingCodeObj.Model';
import { ResGetListCustAddrObj, ResListCustAddrObj } from 'app/shared/model/Response/ResGetListCustAddrObj.model';
import { GenericObj } from 'app/shared/model/Generic/GenericObj.Model';
import { UcDropdownListCallbackObj, UcDropdownListConstant, UcDropdownListObj } from 'app/shared/model/library/UcDropdownListObj.model';
import { ExceptionConstant } from 'app/shared/constant/ExceptionConstant';

@Component({
  selector: 'app-customer-emergency-contact',
  templateUrl: './customer-emergency-contact.component.html',
  styles: [],
  providers: [NGXToastrService, RegexService],
})
export class CustomerEmergencyContactComponent implements OnInit {
  @Output() outputTab: EventEmitter<any> = new EventEmitter();
  @Input() custId: number;
  // @Input() custPersonalContactPersonId: number;
  // @Input() listCustIdToExclude: Array<string>;

  Country: any;
  tempCust: any;
  tempIdType: any;
  tempCustAddress: any;
  tempCustPersonal: any;
  tempCustAddrObj: GenericObj = new GenericObj();
  tempMrGenderCode: any;
  tempMrCustRelationshipCode: any;
  tempCustPersonalContactPerson: CustPersonalContactPersonObj;

  lookUpObj: InputLookupObj;
  inputFieldObj: InputFieldObj;
  existingCustomerLookUpObj: InputLookupObj;

  custObj: CustObj;
  criteriaObj: CriteriaObj;
  custAddrObj: CustAddrObj;
  UcAddressObj: UcAddressObj;
  custPersonalObj: CustPersonalObj;
  criteriaList: Array<CriteriaObj>;
  custPersonalContactPersonObj: CustPersonalContactPersonObj;
  listCustAddr: Array<ResListCustAddrObj> = new Array<ResListCustAddrObj>();
  ddlMrCustRelationshipCode: UcDropdownListObj = new UcDropdownListObj();
  ddlIdType: UcDropdownListObj = new UcDropdownListObj();
  ddlMrGenderCode : UcDropdownListObj = new UcDropdownListObj();

  IdCust: number;
  tempCustId: number;
  BusinessDt: Date;
  flag: boolean;
  tempKTPCheck: boolean;
  tempMobilePhone1: boolean;
  businessDtMin: Date;
  businessDtMax: Date;

  KTP: string;

  CustomerContactForm = this.fb.group({
    MrIdTypeCode: [''],
    IdExpiredDt: [''],
    IdNo: [''],
    BirthPlace: [''],
    BirthDt: [''],
    MrGenderCode: ['', Validators.required],
    MrCustRelationshipCode: ['', Validators.required],
    MobilePhnNo1: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
    MobilePhnNo2: ['', [Validators.pattern("^[0-9]+$")]],
    Email: ['', [Validators.pattern(CommonConstant.regexEmail)]],
    ContactPersonCustNo: [''],
    CopyFromContactPerson: [''],
  });
  criteriaExistingList: any[];
  criteriaExistingObj: CriteriaObj;
  criteriaCurrentCust: CriteriaObj;
  inputAddressObj: InputAddressObj;

  constructor(private regexService: RegexService, private route: ActivatedRoute, private http: HttpClient, private toastr: NGXToastrService, private fb: FormBuilder, private cookieService: CookieService) {
    this.KTP = RefMasterConstant.EKtp;
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
    this.BusinessDt = new Date(context[CommonConstant.BUSINESS_DT]);

    this.lookUpObj = new InputLookupObj();
    this.lookUpObj.urlJson = "./assets/lookup/lookupCustomerCountry.json";
    this.lookUpObj.pagingJson = "./assets/lookup/lookupCustomerCountry.json";
    this.lookUpObj.genericJson = "./assets/lookup/lookupCustomerCountry.json";

    this.UcAddressObj = new UcAddressObj();


    this.existingCustomerLookUpObj = new InputLookupObj();
    this.existingCustomerLookUpObj.isRequired = false;
    this.existingCustomerLookUpObj.urlJson = "./assets/lookup/lookupExistingCustomer.json";
    this.existingCustomerLookUpObj.pagingJson = "./assets/lookup/lookupExistingCustomer.json";
    this.existingCustomerLookUpObj.genericJson = "./assets/lookup/lookupExistingCustomer.json";
    this.existingCustomerLookUpObj.isRequired = true;
    this.existingCustomerLookUpObj.isReadonly = false;

    this.criteriaExistingList = new Array();
    this.criteriaCurrentCust = new CriteriaObj();
    this.criteriaCurrentCust.restriction = AdInsConstant.RestrictionNeq;
    this.criteriaCurrentCust.propName = 'C.CUST_ID';
    this.criteriaCurrentCust.value = this.custId.toString();
    this.criteriaExistingList.push(this.criteriaCurrentCust);

    this.criteriaExistingObj = new CriteriaObj();
    this.criteriaExistingObj.restriction = AdInsConstant.RestrictionEq;
    this.criteriaExistingObj.propName = 'C.MR_CUST_TYPE_CODE';
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
    this.inputFieldObj.inputLookupObj.isRequired = false;

    this.initDropdownListObj();


    console.log("Emergency Comp Cust Id: " + this.custId);
    if (this.custId > 0) {
      this.custPersonalContactPersonObj = new CustPersonalContactPersonObj();
      this.custPersonalContactPersonObj.CustId = this.custId;
      this.getInitPattern();
      this.http.post<CustPersonalContactPersonObj>(URLConstant.GetCustPersonalEmergencyContactByCustId, { Id: this.custId }).toPromise().then(
        (response) => {
          var datePipe = new DatePipe("en-US");
          this.tempCustPersonalContactPerson = response;
          console.log("tempCustPersonalContactPerson: " + JSON.stringify(this.tempCustPersonalContactPerson));
          if (this.tempCustPersonalContactPerson.CustPersonalContactPersonId != 0) {
            this.CustomerContactForm.patchValue({
              MrIdTypeCode: this.tempCustPersonalContactPerson.MrIdTypeCode,
              IdNo: this.tempCustPersonalContactPerson.IdNo,
              IdExpiredDt: this.tempCustPersonalContactPerson.IdExpiredDt != null? datePipe.transform(this.tempCustPersonalContactPerson.IdExpiredDt, 'yyyy-MM-dd') : "",
              BirthPlace: this.tempCustPersonalContactPerson.BirthPlace,
              BirthDt: this.tempCustPersonalContactPerson.BirthDt != null? datePipe.transform(this.tempCustPersonalContactPerson.BirthDt, 'yyyy-MM-dd') : "",
              MobilePhnNo1: this.tempCustPersonalContactPerson.MobilePhnNo1,
              MobilePhnNo2: this.tempCustPersonalContactPerson.MobilePhnNo2,
              Email: this.tempCustPersonalContactPerson.Email,
              // IsFamily: this.tempCustPersonalContactPerson.IsFamily,
              // IsEmergencyContact: this.tempCustPersonalContactPerson.IsEmergencyContact,
              MrCustRelationshipCode: this.tempCustPersonalContactPerson.MrCustRelationshipCode,
              MrGenderCode: this.tempCustPersonalContactPerson.MrGenderCode,
              ContactPersonCustNo: this.tempCustPersonalContactPerson.ContactPersonCustNo 
            });
          }
          this.existingCustomerLookUpObj.jsonSelect = { CustName: this.tempCustPersonalContactPerson.ContactPersonName };
          this.existingCustomerLookUpObj.isReady = true;
          if(this.tempCustPersonalContactPerson.ContactPersonCustNo != null && this.tempCustPersonalContactPerson.ContactPersonCustNo != ""){
            this.setDisableForm(this.tempCustPersonalContactPerson.MobilePhnNo1);
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
          this.setValidatorPattern();
        });

    }
    this.inputAddressObj = new InputAddressObj();
    this.inputAddressObj.showSubsection = false;
    this.inputAddressObj.title = "Customer Address";
    this.inputAddressObj.inputField = this.inputFieldObj;
    this.inputAddressObj.showAllPhn = true;
    this.inputAddressObj.showFax = false;
    this.inputAddressObj.isRequired = false;

    this.tempCustAddrObj.Id = this.IdCust;
    this.http.post(URLConstant.GetListCustAddr, this.tempCustAddrObj).subscribe(
      (response : ResGetListCustAddrObj) => {
        this.listCustAddr = response[CommonConstant.ReturnObj];
        if (this.listCustAddr.length > 0) {
          this.CustomerContactForm.patchValue({ CopyFromContactPerson: response[CommonConstant.ReturnObj][0]['CustAddrId'] });
        }
      });
  }

  copyAddress() {
    if (this.listCustAddr.length < 1) {
      return
    }
    var custAddrFromObj = new CustAddrObj();
    custAddrFromObj.CustAddrId = this.CustomerContactForm.controls["CopyFromContactPerson"].value;
    this.http.post<CustAddrObj>(URLConstant.GetCustAddr, { Id: custAddrFromObj.CustAddrId }).subscribe(
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

  SaveValue() {
    console.log("ameng");
    if(this.checkEmergencyCustContactPerson() == false){
      return;
    }
    this.custPersonalContactPersonObj = new CustPersonalContactPersonObj();
    this.custPersonalContactPersonObj.CustId = this.IdCust;
    this.custPersonalContactPersonObj.ContactPersonName = this.CustomerContactForm.controls["ExistingCustomer"]["controls"].value.value;
    this.custPersonalContactPersonObj.MrIdTypeCode = this.CustomerContactForm.controls["MrIdTypeCode"].value;
    this.custPersonalContactPersonObj.IdNo = this.CustomerContactForm.controls["IdNo"].value;
    this.custPersonalContactPersonObj.IdExpiredDt = this.CustomerContactForm.controls["IdExpiredDt"].value;
    this.custPersonalContactPersonObj.MrGenderCode = this.CustomerContactForm.controls["MrGenderCode"].value;
    this.custPersonalContactPersonObj.BirthPlace = this.CustomerContactForm.controls["BirthPlace"].value;
    this.custPersonalContactPersonObj.BirthDt = this.CustomerContactForm.controls["BirthDt"].value;
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
    this.custPersonalContactPersonObj["PhnExt3"] = this.CustomerContactForm.value.UcAddress.PhnExt3;
    this.custPersonalContactPersonObj.ContactPersonCustNo = this.CustomerContactForm.controls["ContactPersonCustNo"].value;
    if (this.tempCust != null) {
      this.custPersonalContactPersonObj.ContactPersonCustNo = this.tempCust.CustNo;
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
          this.outputTab.emit({ stepMode: "next" });
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
    this.http.post(URLConstant.GetCustPersonalbyCustId, { Id: this.tempCustId }).subscribe(
      (response) => {
        this.tempCustPersonal = response;
        this.CustomerContactForm.patchValue({
          BirthPlace: this.tempCustPersonal.BirthPlace,
          BirthDt: datePipe.transform(this.tempCustPersonal.BirthDt, 'yyyy-MM-dd'),
          MobilePhnNo1: this.tempCustPersonal.MobilePhnNo1,
          MobilePhnNo2: this.tempCustPersonal.MobilePhnNo2,
          Email: this.tempCustPersonal.Email1,
          MrGenderCode: this.tempCustPersonal.MrGenderCode
        });
        this.setDisableForm(this.tempCustPersonal.MobilePhnNo1);
      }
      
    );
    this.http.post(URLConstant.GetCustByCustId, { Id: this.custObj.CustId }).subscribe(
      (response) => {
        this.tempCust = response;
        this.CustomerContactForm.patchValue({
          MrIdTypeCode: this.tempCust.MrIdTypeCode,
          IdNo: this.tempCust.IdNo,
          IdExpiredDt: this.tempCust.IdExpiredDt != null? datePipe.transform(this.tempCust.IdExpiredDt, 'yyyy-MM-dd') : "",
        });
        this.setValidatorPattern();
      }
    );
    let reqObj: GenericObj = new GenericObj();
    reqObj.Id = this.tempCustId;
    reqObj.Code = CommonConstant.CustAddrTypeLegal;
    this.http.post(URLConstant.GetCustAddrByMrCustAddrType, reqObj).subscribe(
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
  }

  onOptionIdTypeSelected(event : UcDropdownListCallbackObj) {
    let noExpDate = [CommonConstant.MrIdTypeCodeEKTP, CommonConstant.MrIdTypeCodeNPWP, CommonConstant.MrIdTypeCodeAKTA];
    if (noExpDate.includes(event.selectedObj["Key"])) {
      this.CustomerContactForm.controls.IdExpiredDt.clearValidators();
      this.CustomerContactForm.patchValue({
        IdExpiredDt: ''
      })
      this.tempKTPCheck = true;
    } else {
      this.CustomerContactForm.controls.IdExpiredDt.setValidators(Validators.required);
      this.tempKTPCheck = false;
    }
    this.CustomerContactForm.controls.IdExpiredDt.updateValueAndValidity();

    this.setValidatorPattern();
  }
  
  //START URS-LOS-041
  controlNameIdNo: any = 'IdNo';
  controlNameIdType: any = 'MrIdTypeCode';
  customPattern: Array<CustomPatternObj> = new Array<CustomPatternObj>();
  initIdTypeCode: any;
  resultPattern: any;

  getInitPattern() {
    this.regexService.getListPattern().subscribe(
      response => {
        this.resultPattern = response[CommonConstant.ReturnObj];
        if (this.resultPattern != undefined) {
          for (let i = 0; i < this.resultPattern.length; i++) {
            let patternObj: CustomPatternObj = new CustomPatternObj();
            let pattern: string = this.resultPattern[i].Value;

            patternObj.pattern = pattern;
            patternObj.invalidMsg = this.regexService.getErrMessage(pattern);
            this.customPattern.push(patternObj);
          }
          this.setValidatorPattern();
        }
      }
    );
  }
  // setValidatorPattern(){
  //   let idTypeValue: string;

  //   idTypeValue = this.CustomerContactForm.controls[this.controlNameIdType].value;

  //   if (this.resultPattern != undefined) {
  //     var result = this.resultPattern.find(x => x.Key == idTypeValue)

  //     if (result != undefined) {
  //       var pattern = result.Value;
  //       if (pattern != undefined) {
  //         this.setValidator(pattern);
  //       }
  //     }
  //   }
  // }

  setValidatorPattern() {
    let idTypeValue: string;
    idTypeValue = this.CustomerContactForm.controls[this.controlNameIdType].value;
    var pattern: string = '';
    if (idTypeValue != undefined) {
      if (this.resultPattern != undefined) {
        var result = this.resultPattern.find(x => x.Key == idTypeValue)
        if (result != undefined) {
          pattern = result.Value;
        }
      }
    }
    this.setValidator(pattern);
  }

  setValidator(pattern: string) {
    if (pattern != undefined) {
      this.CustomerContactForm.controls[this.controlNameIdNo].setValidators(Validators.pattern(pattern));
      this.CustomerContactForm.controls[this.controlNameIdNo].updateValueAndValidity();
    }
  }
  //END OF URS-LOS-041
  
  checkEmergencyCustContactPerson(){
    var isValid: boolean = true;

    let max17Yodt = new Date(this.BusinessDt);
    let birthDt = new Date(this.CustomerContactForm.controls["BirthDt"].value);
    let tempBusinessDt = new Date(this.BusinessDt);
    let idExpiredDt = new Date(this.CustomerContactForm.controls["IdExpiredDt"].value);
    max17Yodt.setFullYear(tempBusinessDt.getFullYear() - 17);

    if (birthDt > max17Yodt) {
      this.toastr.warningMessage(ExceptionConstant.CUSTOMER_AGE_MUST_17_YEARS_OLD);
      isValid = false;
    }

    if(birthDt > tempBusinessDt){
      this.toastr.warningMessage(ExceptionConstant.BIRTH_DATE_CANNOT_MORE_THAN_BUSINESS_DATE);
      isValid = false;
    }

    if(tempBusinessDt > idExpiredDt || tempBusinessDt.getDate() === idExpiredDt.getDate()){
      let checkIdType = this.CustomerContactForm.controls["MrIdTypeCode"].value;
      if(checkIdType == CommonConstant.MrIdTypeCodeEKTP || checkIdType == CommonConstant.MrIdTypeCodeNPWP || checkIdType == CommonConstant.MrIdTypeCodeAKTA){
        isValid = true;
      }
      else{
        this.toastr.warningMessage(ExceptionConstant.ID_EXPIRED_DATE_CANNOT_LESS_THAN + 'Equal Business Date');
        isValid = false;
      }
    }

    return isValid;
  }
  
  initDropdownListObj(){

    var refMasterObjMrIdTypeCode: ReqRefMasterByTypeCodeAndMappingCodeObj = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeIdType,
      MappingCode: null
    };
    this.ddlIdType = new UcDropdownListObj;
    this.ddlIdType.apiPath = URLConstant.GetListActiveRefMasterDDL;
    this.ddlIdType.ddlType = UcDropdownListConstant.DDL_TYPE_ONE;
    this.ddlIdType.requestObj = refMasterObjMrIdTypeCode;
    this.ddlIdType.isObject = true;
    this.ddlIdType.customObjName = "ReturnObject";
    this.ddlIdType.isSelectOutput = true;

    var refMasterObjMrCustRelationshipCode: ReqRefMasterByTypeCodeAndMappingCodeObj = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeCustRelationship,
      MappingCode: null
    };
    this.ddlMrCustRelationshipCode = new UcDropdownListObj;
    this.ddlMrCustRelationshipCode.apiPath = URLConstant.GetListActiveRefMasterDDL;
    this.ddlMrCustRelationshipCode.ddlType = UcDropdownListConstant.DDL_TYPE_ONE;
    this.ddlMrCustRelationshipCode.requestObj = refMasterObjMrCustRelationshipCode;
    this.ddlMrCustRelationshipCode.isObject = true;
    this.ddlMrCustRelationshipCode.customObjName = "ReturnObject";

    var refMasterObjMrGenderCode: ReqRefMasterByTypeCodeAndMappingCodeObj = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeGender,
      MappingCode: null
    };
    this.ddlMrGenderCode = new UcDropdownListObj;
    this.ddlMrGenderCode.apiPath = URLConstant.GetListActiveRefMasterDDL;
    this.ddlMrGenderCode.ddlType = UcDropdownListConstant.DDL_TYPE_ONE;
    this.ddlMrGenderCode.requestObj = refMasterObjMrGenderCode;
    this.ddlMrGenderCode.isObject = true;
    this.ddlMrGenderCode.customObjName = "ReturnObject";
  }

  setDisableForm(MobilePhone1 : string){

    if(MobilePhone1 != null && MobilePhone1 != ""){
      this.CustomerContactForm.controls.MobilePhnNo1.disable();
      this.CustomerContactForm.controls.MobilePhnNo2.disable();
      this.CustomerContactForm.controls.Email.disable();
    }
    this.CustomerContactForm.controls.MrIdTypeCode.disable();
    this.CustomerContactForm.controls.IdExpiredDt.disable();
    this.CustomerContactForm.controls.IdNo.disable();
    this.CustomerContactForm.controls.BirthPlace.disable();
    this.CustomerContactForm.controls.BirthDt.disable();
    this.CustomerContactForm.controls.MrGenderCode.disable();
    this.inputAddressObj.isReadonly = true;
    this.inputAddressObj.inputField.inputLookupObj.isReadonly = true;
  }

  onTypeName(ev : string){
    if(ev != ""){
      if(this.tempCustPersonalContactPerson.ContactPersonName != ev){
        this.CustomerContactForm.controls.MobilePhnNo1.enable();
        this.CustomerContactForm.controls.MobilePhnNo2.enable();
        this.CustomerContactForm.controls.Email.enable();
        this.CustomerContactForm.controls.MrIdTypeCode.enable();
        this.CustomerContactForm.controls.IdExpiredDt.enable();
        this.CustomerContactForm.controls.IdNo.enable();
        this.CustomerContactForm.controls.BirthPlace.enable();
        this.CustomerContactForm.controls.BirthDt.enable();
        this.CustomerContactForm.controls.MrGenderCode.enable();

        this.CustomerContactForm.patchValue({
          MrIdTypeCode: "",
          IdNo: "",
          IdExpiredDt: "",
          BirthPlace: "",
          BirthDt: "",
          MobilePhnNo1: "",
          MobilePhnNo2: "",
          Email: "",
          MrCustRelationshipCode: "",
          MrGenderCode: "",
          ContactPersonCustNo: "" 
        });

      
        this.inputFieldObj = new InputFieldObj();
        this.inputFieldObj.inputLookupObj = new InputLookupObj();
        this.inputFieldObj.inputLookupObj.isRequired = false;
        this.inputFieldObj.inputLookupObj.isReadonly = false;

        this.inputAddressObj = new InputAddressObj();
        this.inputAddressObj.showSubsection = false;
        this.inputAddressObj.title = "Customer Address";
        this.inputAddressObj.default = new UcAddressObj;
        this.inputAddressObj.inputField = this.inputFieldObj;
        this.inputAddressObj.showAllPhn = true;
        this.inputAddressObj.showFax = false;
        this.inputAddressObj.isRequired = false;
      }
    }
    
    
  }
}
