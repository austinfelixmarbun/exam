import { Component, OnInit } from '@angular/core';
import { CustPersonalObj } from 'app/shared/model/CustPersonalObj.Model';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RefMasterConstant } from 'app/shared/RefMasterConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { KeyValueObj } from 'app/shared/model/KeyValueObj.Model';
import { UcAddressObj } from 'app/shared/model/UcAddressObj.Model';
import { InputFieldObj } from 'app/shared/model/InputFieldObj.Model';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { InputAddressObj } from 'app/shared/model/InputAddressObj.Model';
import { formatDate } from '@angular/common';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { CustomPatternObj } from 'app/shared/model/LibraryObj/CustomPatternObj.model';
import { RegexService } from 'app/customer/regex.service';
@Component({
  selector: 'app-customer-personal-main-info',
  templateUrl: './customer-personal-main-info.component.html',
  providers: [NGXToastrService,RegexService]
})
export class CustomerPersonalMainInfoComponent implements OnInit {

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
  GetListActiveRefMasterWithReserveFieldAllUrl: string;
  tempMrMaritalStatCode: Array<KeyValueObj> = new Array<KeyValueObj>();
  inputAddressObj: InputAddressObj;
  inputFieldObj: InputFieldObj;

  CustomerPersonalForm = this.fb.group({
    CustName: ['', [Validators.required, Validators.maxLength(100)]],
    Gender: ['', [Validators.required]],
    MrIdTypeCode: ['', [Validators.required, Validators.maxLength(100)]],
    BirthPlace: ['', [Validators.required]],
    BirthDt: ['', [Validators.required]],
    IdNo: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
    TaxIdNo: [''],
    IdExpiredDt: [''],
    MrMaritalStatCode: [''],
    MotherMaidenName: ['', [Validators.required, Validators.maxLength(100)]],
    CustModel: [''],
    IsVip: [true],
    IsAffiliateWithMf: [true],
    VipNotes: ['', [Validators.required]]
  });

  constructor(private regexService: RegexService, private router: Router, private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder, private toastr: NGXToastrService) {
    this.KTP = RefMasterConstant.EKtp;
    this.getListActiveRefMasterUrl = URLConstant.GetListActiveRefMaster;
    this.GetListActiveRefMasterWithReserveFieldAllUrl = URLConstant.GetListActiveRefMasterWithReserveFieldAll;
    this.inputAddressObj = new InputAddressObj();
    this.inputFieldObj = new InputFieldObj();
  }

  ngOnInit() {
    this.customPattern = new Array<CustomPatternObj>();
    this.VipNotesRequired = true;
    var context = JSON.parse(localStorage.getItem(CommonConstant.USER_ACCESS));
    this.businessDtMin = new Date(context[CommonConstant.BUSINESS_DT]);
    this.businessDtMin.setDate(this.businessDtMin.getDate() - 1);
    this.businessDtMax = new Date(context[CommonConstant.BUSINESS_DT]);
    this.businessDtMax.setDate(this.businessDtMax.getDate() + 1);

    this.inputFieldObj = new InputFieldObj();
    this.inputFieldObj.inputLookupObj = new InputLookupObj();
    this.inputAddressObj = new InputAddressObj();
    this.inputAddressObj.showSubsection = false;
    this.inputAddressObj.title = "Customer Address";
    this.inputAddressObj.default = new UcAddressObj();
    this.inputAddressObj.inputField = this.inputFieldObj;
    this.inputAddressObj.showAllPhn = false;

    var refMasterObj = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeGender,
      RowVersion: ""
    }
    this.http.post(this.getListActiveRefMasterUrl, refMasterObj).subscribe(
      (response) => {
        this.tempGender = response[CommonConstant.ReturnObj];
        this.CustomerPersonalForm.patchValue({
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
        this.CustomerPersonalForm.patchValue({
          MrIdTypeCode: this.tempIdType[0].Key
        });
        if (this.tempIdType[0].Key == this.KTP) {
          this.tempKTPCheck = true;

        } else {
          this.tempKTPCheck = false;
          this.CustomerPersonalForm.controls.IdExpiredDt.setValidators(Validators.required);
          this.CustomerPersonalForm.controls.IdExpiredDt.updateValueAndValidity();
        }
        if(this.tempIdType != undefined)
        {
          this.getInitPattern();
        }
      }
    );

    var refMasterObjCustModel = {
      MrCustTypeCode: CommonConstant.CustTypePersonal
    }
    this.http.post(URLConstant.GetListKeyValueByMrCustTypeCode, refMasterObjCustModel).subscribe(
      (response) => {
        this.tempCustModel = response["ReturnObject"];
        this.CustomerPersonalForm.patchValue({
          CustModel: this.tempCustModel[0].Key
        });
      }
    );

    this.http.post(this.getListActiveRefMasterUrl, { RefMasterTypeCode: CommonConstant.RefMasterTypeCodeMaritalStat }).toPromise().then(
      (response) => {
        this.tempMrMaritalStatCode = response[CommonConstant.ReturnObj];
        this.CustomerPersonalForm.patchValue({
          MrMaritalStatCode: response[CommonConstant.ReturnObj][0]['Key']
        });
      }
    );
  }
  checkState() {
    if (this.CustomerPersonalForm.controls.IsVip.value === true) {
      this.CustomerPersonalForm.patchValue({
        VipNotes: null
      });
      this.CustomerPersonalForm.controls.VipNotes.disable();
      this.VipNotesRequired = false;
      this.CustomerPersonalForm.controls.IdExpiredDt.clearValidators();

    } else {
      this.CustomerPersonalForm.controls.VipNotes.enable();
      this.CustomerPersonalForm.controls.VipNotes.setValidators(Validators.required);
      this.VipNotesRequired = true;
    }
    this.CustomerPersonalForm.controls.VipNotes.updateValueAndValidity();
  }
  SaveValue() {
    var UserAccess = JSON.parse(localStorage.getItem(CommonConstant.USER_ACCESS));
    var MaxDate = formatDate(UserAccess.BusinessDt, 'yyyy-MM-dd', 'en-US');
    var Max17YO = formatDate(UserAccess.BusinessDt, 'yyyy-MM-dd', 'en-US');
    let max17Yodt = new Date(Max17YO);
    let d1 = new Date(this.CustomerPersonalForm.controls["BirthDt"].value);
    let d2 = new Date(MaxDate);
    max17Yodt.setFullYear(d2.getFullYear() - 17);

    if (d1 > max17Yodt) {
      this.toastr.warningMessage("Customer age must be at least 17 year old.");
      return;
    }

    if (this.CustomerPersonalForm.controls["BirthDt"].value)
      this.CustName = this.CustomerPersonalForm.controls["CustName"].value;
    // this.CustModel = this.CustomerPersonalForm.controls["CustModel"].value;
    this.CustModel = "";
    this.Gender = this.CustomerPersonalForm.controls["Gender"].value;
    this.MrIdTypeCode = this.CustomerPersonalForm.controls["MrIdTypeCode"].value;
    this.BirthPlace = this.CustomerPersonalForm.controls["BirthPlace"].value;
    this.BirthDt = this.CustomerPersonalForm.controls["BirthDt"].value;
    this.IdNo = this.CustomerPersonalForm.controls["IdNo"].value;
    this.TaxIdNo = this.CustomerPersonalForm.controls["TaxIdNo"].value;
    this.IdExpiredDt = this.CustomerPersonalForm.controls["IdExpiredDt"].value;
    this.MotherMaidenName = this.CustomerPersonalForm.controls["MotherMaidenName"].value;
    this.MrMaritalStatCode = this.CustomerPersonalForm.controls["MrMaritalStatCode"].value;
    this.IsVip = this.CustomerPersonalForm.controls["IsVip"].value;
    this.IsAffiliateWithMf = this.CustomerPersonalForm.controls["IsAffiliateWithMf"].value;
    if (this.IsVip) {
      this.VipNotes = this.CustomerPersonalForm.controls["VipNotes"].value;
    }

    var custAddr = new Object();
    var formValue = this.CustomerPersonalForm.value;
    custAddr["Addr"] = formValue["UcAddress"]["Addr"];
    custAddr["AreaCode1"] = formValue["UcAddress"]["AreaCode1"];
    custAddr["AreaCode2"] = formValue["UcAddress"]["AreaCode2"];
    custAddr["AreaCode3"] = formValue["UcAddress"]["AreaCode3"];
    custAddr["AreaCode4"] = formValue["UcAddress"]["AreaCode4"];
    custAddr["City"] = formValue["UcAddress"]["City"];
    custAddr["Zipcode"] = formValue["UcAddressZipcode"]["value"];
    custAddr["SubZipcode"] = formValue["UcAddressZipcode"]["value"];
    sessionStorage.setItem("CustAddr", JSON.stringify(custAddr));
    AdInsHelper.RedirectUrl(this.router, ["/Customer/CustomerPersonal/DuplicateCheck"], { "CustName": this.CustName, "Gender": this.Gender, "MrIdTypeCode": this.MrIdTypeCode, "CustModel": this.CustModel, "BirthPlace": this.BirthPlace, "BirthDt": this.BirthDt, "IdNo": this.IdNo, "TaxIdNo": this.TaxIdNo, "IdExpiredDt": this.IdExpiredDt, "MotherMaidenName": this.MotherMaidenName, "IsVip": this.IsVip, "IsAffiliateWithMf": this.IsAffiliateWithMf, "VipNotes": this.VipNotes, "MrMaritalStatCode": this.MrMaritalStatCode });
  }
  onOptionsSelected(event) {
    let noExpDate = [CommonConstant.MrIdTypeCodeEKTP, CommonConstant.MrIdTypeCodeNPWP, CommonConstant.MrIdTypeCodeAKTA];
    if (noExpDate.includes(event.target.value)) {
      this.CustomerPersonalForm.controls.IdExpiredDt.clearValidators();
      this.CustomerPersonalForm.patchValue({
        IdExpiredDt: ''
      })
      this.tempKTPCheck = true;
    } else {
      this.CustomerPersonalForm.controls.IdExpiredDt.setValidators(Validators.required);
      this.tempKTPCheck = false;
    }
    this.CustomerPersonalForm.controls.IdExpiredDt.updateValueAndValidity();

    this.setValidatorPattern();
  }

  //START URS-LOS-041
  controlNameIdNo: any = 'IdNo';
  controlNameIdType: any = 'MrIdTypeCode';
  customPattern: Array<CustomPatternObj>;
  initIdTypeCode: any;
  resultPattern: any;

  getInitPattern() {
    this.regexService.getListPattern().subscribe(
      response => {
        this.resultPattern = response[CommonConstant.ReturnObj];
        if(this.resultPattern != undefined)
        {
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

  //   idTypeValue = this.CustomerPersonalForm.controls[this.controlNameIdType].value;

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
    idTypeValue = this.CustomerPersonalForm.controls[this.controlNameIdType].value;
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
      this.CustomerPersonalForm.controls[this.controlNameIdNo].setValidators(Validators.pattern(pattern));
      this.CustomerPersonalForm.controls[this.controlNameIdNo].updateValueAndValidity();
    }
  }
  //END OF URS-LOS-041
}

