import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CustPersonalObj } from 'app/shared/model/CustPersonalObj.Model';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RefMasterConstant } from 'app/shared/RefMasterConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { KeyValueObj } from 'app/shared/model/KeyValueObj.Model';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { CriteriaObj } from 'app/shared/model/CriteriaObj.Model';
import { AdInsConstant } from 'app/shared/AdInstConstant';
import { environment } from 'environments/environment';
import { DatePipe } from '@angular/common';
import { CustObj } from 'app/shared/model/CustObj.Model';
import { forkJoin } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { UcAddressObj } from 'app/shared/model/UcAddressObj.Model';
import { CustAddrObj } from 'app/shared/model/CustAddrObj.Model';
import { InputFieldObj } from 'app/shared/model/InputFieldObj.Model';
import { InputAddressObj } from 'app/shared/model/InputAddressObj.Model';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { NullViewportScroller } from '@angular/common/src/viewport_scroller';
import { CookieService } from 'ngx-cookie';
import { AdInsHelper } from 'app/shared/AdInsHelper';

@Component({
  selector: 'app-customer-family-detail',
  templateUrl: './customer-family-detail.component.html',
  styles: [],
  providers: [NGXToastrService]
})
export class CustomerFamilyDetailComponent implements OnInit {
  @Input() listCustIdToExclude: Array<string>;
  @Input() customerPersonalFamilyId: number;
  @Input() custIdInput: number;
  @Output() ResponseSaveFamily: EventEmitter<any>;
  custPersonalFamilyObj: any;
  isExistingCust: boolean;
  isEditCustFamily: boolean;
  existingCustomerLookUpObj: InputLookupObj;
  criteriaExistingList: Array<CriteriaObj>;
  criteriaExistingObj: CriteriaObj;
  custDataToCheckDuplicate: Object;
  inputAddressObj: InputAddressObj;
  inputFieldObj: InputFieldObj;
  UcAddressObj: UcAddressObj;
  CustRelationshipList: Array<Object>;

  Gender: any;
  tempGender: any;
  tempIdType: any;
  tempCustModel: any;

  custPersonalObj: CustPersonalObj;

  BirthDt: Date;
  IdExpiredDt: Date;
  businessDtMin: Date;
  businessDtMax: Date;

  IsVip: boolean;
  tempKTPCheck: boolean;
  VipNotesRequired: boolean;

  KTP: string;
  IdNo: string;
  state: string;
  TaxIdNo: string;
  VipNotes: string;
  CustName: string;
  CustModel: string;
  BirthPlace: string;
  MrIdTypeCode: string;
  MotherMaidenName: string;
  IsAffiliateWithMf: string;
  MrMaritalStatCode: string;
  getListActiveRefMasterUrl: string;
  GetListActiveRefMasterWithMappingCodeAllUrl: string;
  tempMrMaritalStatCode: Array<KeyValueObj> = new Array<KeyValueObj>();

  CustomerFamilyForm = this.fb.group({
    CustPersonalFamilyId: [0],
    CustId: [0],
    FamilyId: [0],
    MrCustRelationship: ['', [Validators.required]],
    CustNo: [''],
    // CustName: ['', [Validators.required, Validators.maxLength(100)]],
    Gender: ['', [Validators.required]],
    MrIdTypeCode: ['', [Validators.required, Validators.maxLength(100)]],
    BirthPlace: ['', [Validators.required]],
    BirthDt: ['', [Validators.required]],
    IdNo: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
    TaxIdNo: ['', [Validators.pattern("^[0-9]{2}\.[0-9]{3}\.[0-9]{3}\.[0-9]{1}\-[0-9]{3}\.[0-9]{3}$")]],
    IdExpiredDt: [''],
    MrMaritalStatCode: [''],
    MotherMaidenName: ['', [Validators.required, Validators.maxLength(100)]],
    MobilePhnNo1: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
    Email1: ['', [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
    RowVersion: [''],
    RowVersionCust: [''],
    RowVersionCustPersonal: ['']
  });

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder, private toastr: NGXToastrService, private cookieService: CookieService) {
    this.KTP = RefMasterConstant.EKtp;
    this.getListActiveRefMasterUrl = URLConstant.GetListActiveRefMaster;
    this.GetListActiveRefMasterWithMappingCodeAllUrl = URLConstant.GetListActiveRefMasterWithMappingCodeAll;
    this.isExistingCust = false;
    this.isEditCustFamily = false;
    this.ResponseSaveFamily = new EventEmitter<any>();
    this.customerPersonalFamilyId = 0;
    this.custIdInput = 0;
    this.CustRelationshipList = new Array<Object>();
    this.custDataToCheckDuplicate = new Object();
    this.UcAddressObj = new UcAddressObj();
    this.inputFieldObj = new InputFieldObj();
    this.inputAddressObj = new InputAddressObj();
  }

  ngOnInit() {
    console.log("ameng");
    var context = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
    this.businessDtMin = new Date(context[CommonConstant.BUSINESS_DT]);
    this.businessDtMin.setDate(this.businessDtMin.getDate() - 1);
    this.businessDtMax = new Date(context[CommonConstant.BUSINESS_DT]);
    this.businessDtMax.setDate(this.businessDtMax.getDate() + 1);
    var datePipe = new DatePipe("en-US");

    this.inputFieldObj = new InputFieldObj();
    this.inputFieldObj.inputLookupObj = new InputLookupObj();
    this.inputAddressObj = new InputAddressObj();
    this.inputAddressObj.showSubsection = false;
    this.inputAddressObj.title = "Customer Address";
    this.inputAddressObj.default = UcAddressObj;
    this.inputAddressObj.inputField = this.inputFieldObj;
    this.inputAddressObj.showAllPhn = false;

    this.existingCustomerLookUpObj = new InputLookupObj();
    this.existingCustomerLookUpObj.isReadonly = false;
    this.existingCustomerLookUpObj.urlJson = "./assets/lookup/lookupExistingCustomer.json";
    this.existingCustomerLookUpObj.urlQryPaging = "/Generic/GetPagingObjectBySQL";
    this.existingCustomerLookUpObj.urlEnviPaging = environment.FoundationR3Url;
    this.existingCustomerLookUpObj.pagingJson = "./assets/lookup/lookupExistingCustomer.json";
    this.existingCustomerLookUpObj.genericJson = "./assets/lookup/lookupExistingCustomer.json";

    var criteriaListCust = new Array();
    if (this.listCustIdToExclude.length > 0) {
      
      var criteriaCustObj = new CriteriaObj();
      criteriaCustObj.DataType = "text";
      criteriaCustObj.restriction = AdInsConstant.RestrictionNotIn;
      criteriaCustObj.propName = 'CUST_NO';
      criteriaCustObj.listValue = this.listCustIdToExclude;
      criteriaListCust.push(criteriaCustObj);
    }
    if (this.custIdInput != 0 || this.custIdInput == null) {
      var criteriaCustObj = new CriteriaObj();
      criteriaCustObj.DataType = "text";
      criteriaCustObj.restriction = AdInsConstant.RestrictionNeq;
      criteriaCustObj.propName = 'CUST_ID';
      criteriaCustObj.value = this.custIdInput.toString();
      criteriaListCust.push(criteriaCustObj);
    }
    this.existingCustomerLookUpObj.addCritInput = criteriaListCust;

    this.criteriaExistingList = new Array();
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

    if (this.customerPersonalFamilyId && this.customerPersonalFamilyId > 0) {
      this.http.post(URLConstant.GetCustPersonalFamilyByCustPersonalFamilyId, { CustPersonalFamilyId: this.customerPersonalFamilyId }).pipe(
        map((response) => {
          this.custPersonalFamilyObj = response;
          return response;
        }),
        mergeMap((response) => {
          let getCust = this.http.post(URLConstant.GetCustByCustId, { CustId: response["FamilyId"] });
          let getCustPersonal = this.http.post(URLConstant.GetCustPersonalbyCustId, { CustId: response["FamilyId"] });
          let getCustAddr = this.http.post(URLConstant.GetCustAddrByMrCustAddrType, { CustId: response["FamilyId"], MrCustAddrTypeCode: CommonConstant.AddrTypeLegal });
          return forkJoin([getCust, getCustPersonal, getCustAddr]);
        })
      ).toPromise().then(
        (response) => {
          this.isEditCustFamily = true;
          var custData = response[0] as CustObj;
          var custPersonalData = response[1] as CustPersonalObj;
          var custAddrData = response[2] as CustAddrObj;
          console.log("CustAddrData: " + JSON.stringify(custAddrData));
          this.existingCustomerLookUpObj.nameSelect = custData.CustName;
          this.CustomerFamilyForm.patchValue({
            CustPersonalFamilyId: this.custPersonalFamilyObj["CustPersonalFamilyId"],
            CustId: this.custPersonalFamilyObj["CustId"],
            FamilyId: this.custPersonalFamilyObj["FamilyId"],
            MrCustRelationship: this.custPersonalFamilyObj["MrCustRelationship"],

            CustNo: custData.CustNo,
            CustName: custData.CustName,
            Gender: custPersonalData.MrGenderCode,
            MrIdTypeCode: custData.MrIdTypeCode,
            BirthPlace: custPersonalData.BirthPlace,
            BirthDt: datePipe.transform(custPersonalData.BirthDt, 'yyyy-MM-dd'),
            IdNo: custData.IdNo,
            TaxIdNo: custData.TaxIdNo,
            IdExpiredDt: datePipe.transform(custData.IdExpiredDt, 'yyyy-MM-dd'),
            MrMaritalStatCode: custPersonalData.MrMaritalStatCode,
            MotherMaidenName: custPersonalData.MotherMaidenName,
            CustModel: custData.MrCustModelCode,
            IsVip: custData.IsVip,
            IsAffiliateWithMf: custData.IsAffiliateWithMf,
            VipNotes: custData.VipNotes,
            MobilePhnNo1: custPersonalData.MobilePhnNo1,
            Email1: custPersonalData.Email1,
            RowVersion: this.custPersonalFamilyObj["RowVersion"],
            RowVersionCust: custData.RowVersion,
            RowVersionCustPersonal: custPersonalData.RowVersion
          });
          this.CustomerFamilyForm.controls.Gender.disable();
          this.CustomerFamilyForm.controls.MrIdTypeCode.disable();
          this.CustomerFamilyForm.controls.BirthPlace.disable();
          this.CustomerFamilyForm.controls.BirthDt.disable();
          this.CustomerFamilyForm.controls.IdNo.disable();
          this.CustomerFamilyForm.controls.TaxIdNo.disable();
          this.CustomerFamilyForm.controls.IdExpiredDt.disable();
          this.CustomerFamilyForm.controls.MrMaritalStatCode.disable();
          this.CustomerFamilyForm.controls.MotherMaidenName.disable();
          this.CustomerFamilyForm.controls.MobilePhnNo1.disable();
          this.CustomerFamilyForm.controls.Email1.disable();

          this.inputFieldObj.inputLookupObj.nameSelect = custAddrData.Zipcode;
          this.inputFieldObj.inputLookupObj.jsonSelect = { Zipcode: custAddrData.Zipcode };
          this.UcAddressObj.AreaCode1 = custAddrData.AreaCode1;
          this.UcAddressObj.AreaCode2 = custAddrData.AreaCode2;
          this.UcAddressObj.AreaCode3 = custAddrData.AreaCode3;
          this.UcAddressObj.AreaCode4 = custAddrData.AreaCode4;
          this.UcAddressObj.Addr = custAddrData.Addr;
          this.UcAddressObj.City = custAddrData.City;
          this.inputAddressObj.default = this.UcAddressObj;
          this.inputAddressObj.inputField = this.inputFieldObj;
        }
      ).catch(
        (error) => {
          console.log(error);
        }
      );
    }
    else {
      this.CustomerFamilyForm.patchValue({
        CustId: this.custIdInput,
      });
    }

    var refMasterObj = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeGender,
      RowVersion: ""
    }
    this.http.post(this.getListActiveRefMasterUrl, refMasterObj).subscribe(
      (response) => {
        this.tempGender = response[CommonConstant.ReturnObj];
        this.CustomerFamilyForm.patchValue({
          Gender: this.tempGender[0].Key
        });
      }
    );
    var refMasterObjMrIdTypeCode = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeIdType,
      RowVersion: ""
    }
    this.http.post(this.getListActiveRefMasterUrl, refMasterObjMrIdTypeCode).subscribe(
      (response) => {
        this.tempIdType = response[CommonConstant.ReturnObj];
        this.CustomerFamilyForm.patchValue({
          MrIdTypeCode: this.tempIdType[0].Key
        });
        if (this.tempIdType[0].Key == this.KTP) {
          this.tempKTPCheck = true;

        } else {
          this.tempKTPCheck = false;
          this.CustomerFamilyForm.controls.IdExpiredDt.setValidators(Validators.required);
          this.CustomerFamilyForm.controls.IdExpiredDt.updateValueAndValidity();
        }
      }
    );

    this.http.post(this.getListActiveRefMasterUrl, { RefMasterTypeCode: CommonConstant.RefMasterTypeCodeMaritalStat }).toPromise().then(
      (response) => {
        this.tempMrMaritalStatCode = response[CommonConstant.ReturnObj];
        this.CustomerFamilyForm.patchValue({
          MrMaritalStatCode: response[CommonConstant.ReturnObj][0]['Key']
        });
      }
    );

    var refMasterObjMrCustRelationshipCode = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeCustRelationship
    }
    this.http.post(URLConstant.GetListActiveRefMaster, refMasterObjMrCustRelationshipCode).subscribe(
      (response) => {
        this.CustRelationshipList = response[CommonConstant.ReturnObj];
        this.CustomerFamilyForm.patchValue({
          MrCustRelationship: this.CustRelationshipList[0]["Key"]
        });
      });
  }

  getLookUpCustomer(event) {
    var custId = event.CustId;
    var custObj = new CustObj();
    var custPersonalObj = new CustPersonalObj();
    var datePipe = new DatePipe("en-US");
    custObj.CustId = custId;
    custPersonalObj.CustId = custId;
    let getCust = this.http.post(URLConstant.GetCustByCustId, custObj);
    let getCustPersonal = this.http.post(URLConstant.GetCustPersonalbyCustId, custObj);
    let getCustAddr = this.http.post(URLConstant.GetCustAddrByMrCustAddrType, { CustId: custId, MrCustAddrTypeCode: CommonConstant.AddrTypeLegal });
    forkJoin([getCust, getCustPersonal, getCustAddr]).toPromise().then(
      (response) => {
        this.isExistingCust = true;
        var custData = response[0] as CustObj;
        var custPersonalData = response[1] as CustPersonalObj;
        var custAddrData = response[2] as CustAddrObj;
        this.CustomerFamilyForm.patchValue({
          FamilyId: custData.CustId,
          CustNo: custData.CustNo,
          CustName: custData.CustName,
          Gender: custPersonalData.MrGenderCode,
          MrIdTypeCode: custData.MrIdTypeCode,
          BirthPlace: custPersonalData.BirthPlace,
          BirthDt: datePipe.transform(custPersonalData.BirthDt, 'yyyy-MM-dd'),
          IdNo: custData.IdNo,
          TaxIdNo: custData.TaxIdNo,
          IdExpiredDt: datePipe.transform(custData.IdExpiredDt, 'yyyy-MM-dd'),
          MrMaritalStatCode: custPersonalData.MrMaritalStatCode,
          MotherMaidenName: custPersonalData.MotherMaidenName,
          CustModel: custData.MrCustModelCode,
          IsVip: custData.IsVip,
          IsAffiliateWithMf: custData.IsAffiliateWithMf,
          VipNotes: custData.VipNotes,
          MobilePhnNo1: custPersonalData.MobilePhnNo1,
          Email1: custPersonalData.Email1
        });

        var addrForm = this.CustomerFamilyForm.get("UcAddress");
        addrForm.patchValue({
          Addr: custAddrData.Addr,
          AreaCode1: custAddrData.AreaCode1,
          AreaCode2: custAddrData.AreaCode2,
          AreaCode3: custAddrData.AreaCode3,
          AreaCode4: custAddrData.AreaCode4,
          City: custAddrData.City
        });

        var addrZipCodeForm = this.CustomerFamilyForm.get("UcAddressZipcode");
        addrZipCodeForm.patchValue({
          value: custAddrData.Zipcode
        });

        this.existingCustomerLookUpObj.isReadonly = true;
        this.CustomerFamilyForm.controls.Gender.disable();
        this.CustomerFamilyForm.controls.MrIdTypeCode.disable();
        this.CustomerFamilyForm.controls.BirthPlace.disable();
        this.CustomerFamilyForm.controls.BirthDt.disable();
        this.CustomerFamilyForm.controls.IdNo.disable();
        this.CustomerFamilyForm.controls.TaxIdNo.disable();
        this.CustomerFamilyForm.controls.IdExpiredDt.disable();
        this.CustomerFamilyForm.controls.MrMaritalStatCode.disable();
        this.CustomerFamilyForm.controls.MotherMaidenName.disable();
        this.CustomerFamilyForm.controls.MobilePhnNo1.disable();
        this.CustomerFamilyForm.controls.Email1.disable();
      }
    ).catch(
      (error) => {
        console.log(error);
      }
    );
  }

  checkState() {
    if (this.CustomerFamilyForm.controls.IsVip.value === true) {
      this.CustomerFamilyForm.patchValue({
        VipNotes: null
      });
      this.CustomerFamilyForm.controls.VipNotes.disable();
      this.VipNotesRequired = false;
      this.CustomerFamilyForm.controls.IdExpiredDt.clearValidators();

    } else {
      this.CustomerFamilyForm.controls.VipNotes.enable();
      this.CustomerFamilyForm.controls.VipNotes.setValidators(Validators.required);
      this.VipNotesRequired = true;
    }
    this.CustomerFamilyForm.controls.VipNotes.updateValueAndValidity();
  }

  SaveValue() {
    console.log("FormValue: " + JSON.stringify(this.CustomerFamilyForm.value));
    if (this.isEditCustFamily) {
      var requestEdit = {
        CustPersonalFamilyId: this.CustomerFamilyForm.controls["CustPersonalFamilyId"].value,
        MrCustRelationship: this.CustomerFamilyForm.controls["MrCustRelationship"].value,
        RowVersion: this.CustomerFamilyForm.controls["RowVersion"].value
      };
      this.http.post(URLConstant.EditCustPersonalFamily, requestEdit).toPromise().then(
        (response) => {
          this.toastr.successMessage(response["Message"]);
          this.ResponseSaveFamily.emit(response);
        }
      ).catch(
        (error) => {
          console.log(error);
        }
      );
    }
    else {
      if (this.isExistingCust) {
        var requestExisting = {
          CustId: this.CustomerFamilyForm.controls["CustId"].value,
          FamilyId: this.CustomerFamilyForm.controls["FamilyId"].value,
          MrCustRelationship: this.CustomerFamilyForm.controls["MrCustRelationship"].value
        };
        this.http.post(URLConstant.AddCustPersonalFamily, requestExisting).toPromise().then(
          (response) => {
            this.toastr.successMessage(response["Message"]);
            this.ResponseSaveFamily.emit(response);
          }
        ).catch(
          (error) => {
            console.log(error);
          }
        );
      }
      else {
        var formValue = this.CustomerFamilyForm.value;
        this.custDataToCheckDuplicate["Addr"] = formValue["UcAddress"]["Addr"];
        this.custDataToCheckDuplicate["AreaCode1"] = formValue["UcAddress"]["AreaCode1"];
        this.custDataToCheckDuplicate["AreaCode2"] = formValue["UcAddress"]["AreaCode2"];
        this.custDataToCheckDuplicate["AreaCode3"] = formValue["UcAddress"]["AreaCode3"];
        this.custDataToCheckDuplicate["AreaCode4"] = formValue["UcAddress"]["AreaCode4"];
        this.custDataToCheckDuplicate["City"] = formValue["UcAddress"]["City"];
        this.custDataToCheckDuplicate["Zipcode"] = formValue["UcAddressZipcode"]["value"];
        this.custDataToCheckDuplicate["SubZipcode"] = formValue["UcAddressZipcode"]["value"];

        this.custDataToCheckDuplicate["CustId"] = this.CustomerFamilyForm.controls["CustId"].value;
        this.custDataToCheckDuplicate["CustName"] = this.existingCustomerLookUpObj.nameSelect;
        this.custDataToCheckDuplicate["CustModel"] = "";
        this.custDataToCheckDuplicate["Gender"] = this.CustomerFamilyForm.controls["Gender"].value;
        this.custDataToCheckDuplicate["MrIdTypeCode"] = this.CustomerFamilyForm.controls["MrIdTypeCode"].value;
        this.custDataToCheckDuplicate["BirthPlace"] = this.CustomerFamilyForm.controls["BirthPlace"].value;
        this.custDataToCheckDuplicate["BirthDt"] = this.CustomerFamilyForm.controls["BirthDt"].value;
        this.custDataToCheckDuplicate["IdNo"] = this.CustomerFamilyForm.controls["IdNo"].value;
        this.custDataToCheckDuplicate["TaxIdNo"] = this.CustomerFamilyForm.controls["TaxIdNo"].value;
        this.custDataToCheckDuplicate["IdExpiredDt"] = this.CustomerFamilyForm.controls["IdExpiredDt"].value;
        this.custDataToCheckDuplicate["MotherMaidenName"] = this.CustomerFamilyForm.controls["MotherMaidenName"].value;
        this.custDataToCheckDuplicate["MrMaritalStatCode"] = this.CustomerFamilyForm.controls["MrMaritalStatCode"].value;
        this.custDataToCheckDuplicate["MobilePhnNo1"] = this.CustomerFamilyForm.controls["MobilePhnNo1"].value;
        this.custDataToCheckDuplicate["Email1"] = this.CustomerFamilyForm.controls["Email1"].value;
        this.custDataToCheckDuplicate["MrCustRelationship"] = this.CustomerFamilyForm.controls["MrCustRelationship"].value;
        this.ResponseSaveFamily.emit({ StatusCode: 2001, FamilyData: this.custDataToCheckDuplicate });
      }
    }
    // this.CustName = this.CustomerFamilyForm.controls["CustName"].value;
    // this.router.navigate(["/Customer/CustomerPersonal/DuplicateCheck"], { queryParams: { "CustName": this.CustName, "Gender": this.Gender, "MrIdTypeCode": this.MrIdTypeCode, "CustModel": this.CustModel, "BirthPlace": this.BirthPlace, "BirthDt": this.BirthDt, "IdNo": this.IdNo, "TaxIdNo": this.TaxIdNo, "IdExpiredDt": this.IdExpiredDt, "MotherMaidenName": this.MotherMaidenName, "IsVip": this.IsVip, "IsAffiliateWithMf": this.IsAffiliateWithMf, "VipNotes": this.VipNotes, "MrMaritalStatCode": this.MrMaritalStatCode } });
  }
  onOptionsSelected(event) {
    let noExpDate = [CommonConstant.MrIdTypeCodeEKTP, CommonConstant.MrIdTypeCodeNPWP, CommonConstant.MrIdTypeCodeAKTA];
    if (noExpDate.includes(event.target.value)) {
      this.CustomerFamilyForm.controls.IdExpiredDt.clearValidators();
      this.CustomerFamilyForm.patchValue({
        IdExpiredDt: ''
      })
      this.tempKTPCheck = true;
    } else {
      this.CustomerFamilyForm.controls.IdExpiredDt.setValidators(Validators.required);
      this.tempKTPCheck = false;
    }
    this.CustomerFamilyForm.controls.IdExpiredDt.updateValueAndValidity();
  }

  back() {
    this.ResponseSaveFamily.emit({ StatusCode: 200 });
  }
}
