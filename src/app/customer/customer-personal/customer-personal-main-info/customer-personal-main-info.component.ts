import { Component, OnInit } from '@angular/core';
import { CustPersonalObj } from 'app/shared/model/CustPersonalObj.Model';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { RefMasterConstant } from 'app/shared/RefMasterConstant';
import { CommonConstant } from 'app/shared/constant/CommonConstant';
import { URLConstant } from 'app/shared/constant/URLConstant';
import { KeyValueObj } from 'app/shared/model/KeyValue/KeyValueObj.Model';
import { UcAddressObj } from 'app/shared/model/UcAddressObj.Model';
import { InputFieldObj } from 'app/shared/model/InputFieldObj.Model';
import { InputLookupObj } from 'app/shared/model/InputLookupObj.Model';
import { InputAddressObj } from 'app/shared/model/InputAddressObj.Model';
import { DatePipe, formatDate } from '@angular/common';
import { NGXToastrService } from 'app/components/extra/toastr/toastr.service';
import { AdInsHelper } from 'app/shared/AdInsHelper';
import { CustomPatternObj } from 'app/shared/model/LibraryObj/CustomPatternObj.model';
import { RegexService } from 'app/customer/regex.service';
import { CookieService } from 'ngx-cookie';
import { NavigationConstant } from 'app/shared/NavigationConstant';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustObj } from 'app/shared/model/CustObj.Model';
import { environment } from 'environments/environment';
import { CustBankAccObj } from 'app/shared/model/CustBankAccObj.Model';
// import { CustThirdPartyCheckingObj } from 'app/shared/model/CustThirdPartyCheckingObj.Model';
import { ReqRefMasterByTypeCodeAndMappingCodeObj } from 'app/shared/model/RefMaster/ReqRefMasterByTypeCodeAndMappingCodeObj.Model';
import { GenericKeyValueListObj } from 'app/shared/model/Generic/GenericKeyValueListObj.model';


@Component({
  selector: 'app-customer-personal-main-info',
  templateUrl: './customer-personal-main-info.component.html',
  providers: [NGXToastrService, RegexService]
})
export class CustomerPersonalMainInfoComponent implements OnInit {

  Gender: any;
  tempGender: any;
  tempIdType: any;
  tempCustModel: Array<KeyValueObj> = new Array<KeyValueObj>();

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
  tempMrMaritalStatCode: Array<KeyValueObj> = new Array<KeyValueObj>();
  inputAddressObj: InputAddressObj;
  inputFieldObj: InputFieldObj;
  closeResult;
  subsectionAsliRi: boolean = false;
  IsSupplier: boolean = false;
  tempCustObj: any;
  CustId: number;
  custObj: CustObj;
  getCustByCustIdUrl: string;
  UcAddressObj: UcAddressObj = new UcAddressObj();
  getCustPersonalByCustIdUrl: string;
  tempCustPersonalObj: CustPersonalObj;
  inputLookupObj: InputLookupObj;
  SupplCode: string;
  SupplName: string;
  SupplId: number;
  SupplierObj: any;
  custBankAccObj: CustBankAccObj = new CustBankAccObj();
  // CustThirdPartyChecking: CustThirdPartyCheckingObj = new CustThirdPartyCheckingObj();
  // IsCustThirdPartyCheck: boolean = false;
  // MaxDaysCustThirdPartyCheck: number = 0;
  LastHit = {
    DUKCAPIL: 'Not Hit Yet',
    PEFINDO: 'Not Hit Yet',
    SLIK: 'Not Hit Yet',
    ASLIRI: 'Not Hit Yet',
    TRST: 'Not Hit Yet'
  };
  custModelReqObj: ReqRefMasterByTypeCodeAndMappingCodeObj;

  CustomerPersonalForm = this.fb.group({
    CustName: ['', [Validators.required, Validators.maxLength(100)]],
    Gender: ['', [Validators.required]],
    MrIdTypeCode: ['', [Validators.required, Validators.maxLength(100)]],
    BirthPlace: ['', [Validators.required]],
    BirthDt: ['', [Validators.required]],
    IdNo: ['', [Validators.required, Validators.pattern("^[0-9]+$")]],
    TaxIdNo: ['', [Validators.pattern("^[0-9]+$"), Validators.minLength(15), Validators.maxLength(15)]],
    IdExpiredDt: [''],
    MrMaritalStatCode: ['', [Validators.required]],
    MotherMaidenName: ['', [Validators.required, Validators.maxLength(100)]],
    CustModel: [''],
    IsVip: [false],
    IsAffiliateWithMf: [false],
    VipNotes: [''],

    IsSupplier: [false],
    SupplCode: [''],
    SupplName: [''],
    SupplId: ['']
  });

  readonly CancelLink: string = NavigationConstant.BACK_TO_PAGING2;
  constructor(private regexService: RegexService, private router: Router, private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder, private toastr: NGXToastrService, private cookieService: CookieService, private modalService: NgbModal) {
    this.KTP = RefMasterConstant.EKtp;
    this.getListActiveRefMasterUrl = URLConstant.GetListActiveRefMaster;
    this.inputAddressObj = new InputAddressObj();
    this.inputFieldObj = new InputFieldObj();
    this.getCustByCustIdUrl = URLConstant.GetCustByCustId;
    this.getCustPersonalByCustIdUrl = URLConstant.GetCustPersonalbyCustId;
  }

  ngOnInit() {
    this.bindLookupSupplier();
    this.customPattern = new Array<CustomPatternObj>();
    this.VipNotesRequired = false;
    this.CustomerPersonalForm.controls.VipNotes.disable();
    var context = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
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

    var refMasterObj: ReqRefMasterByTypeCodeAndMappingCodeObj = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeGender,
      MappingCode: null
    }
    this.http.post(URLConstant.GetListActiveRefMaster, refMasterObj).subscribe(
      (response) => {
        this.tempGender = response[CommonConstant.ReturnObj];
      }
    );
    var refMasterObjMrIdTypeCode: ReqRefMasterByTypeCodeAndMappingCodeObj = {
      RefMasterTypeCode: CommonConstant.RefMasterTypeCodeIdType,
      MappingCode: null
    }
    this.http.post(URLConstant.GetListActiveRefMaster, refMasterObjMrIdTypeCode).subscribe(
      (response) => {
        this.tempIdType = response[CommonConstant.ReturnObj];
        this.CustomerPersonalForm.patchValue({
          MrIdTypeCode: this.tempIdType[0].Key
        });
        this.onChangeIdType();
        if (this.tempIdType[0].Key == this.KTP) {
          this.tempKTPCheck = true;

        } else {
          this.tempKTPCheck = false;
          this.CustomerPersonalForm.controls.IdExpiredDt.setValidators(Validators.required);
          this.CustomerPersonalForm.controls.IdExpiredDt.updateValueAndValidity();
        }
        if (this.tempIdType != undefined) {
          this.getInitPattern();
        }
      }
    );
    
    this.custModelReqObj = new ReqRefMasterByTypeCodeAndMappingCodeObj();
    this.custModelReqObj.RefMasterTypeCode = CommonConstant.RefMasterTypeCodeCustModel;
    this.custModelReqObj.MappingCode = CommonConstant.CustTypePersonal;
    this.http.post(URLConstant.GetListActiveRefMasterWithMappingCodeAll, this.custModelReqObj).subscribe(
      (response : GenericKeyValueListObj) => {
        this.tempCustModel = response[CommonConstant.ReturnObj];
        this.CustomerPersonalForm.patchValue({
          CustModel: this.tempCustModel[0].Key
        });
      }
    );

    let tempReq: ReqRefMasterByTypeCodeAndMappingCodeObj = { RefMasterTypeCode: CommonConstant.RefMasterTypeCodeMaritalStat, MappingCode: null };
    this.http.post(URLConstant.GetListActiveRefMaster, tempReq).toPromise().then(
      (response) => {
        this.tempMrMaritalStatCode = response[CommonConstant.ReturnObj];
      }
    );

    // this.http.post(URLConstant.GetGeneralSettingByCode, { Code: CommonConstant.GS_IS_CUST_THIRD_PARTY_CHECK }).pipe(
    //   map((response) => {
    //     return response
    //   }),
    //   mergeMap((response) => {
    //     if (response["GsValue"] == "1") {
    //       this.IsCustThirdPartyCheck = true;
    //       let addCustTemp = this.http.post(URLConstant.AddCustFraudTempReg, { MrCustTypeCode: CommonConstant.CustTypePersonal });
    //       let getMaxDays = this.http.post(URLConstant.GetGeneralSettingByCode, { Code: CommonConstant.GS_MAX_DAYS_CUST_THIRD_PARTY_CHECK });
    //       return forkJoin([addCustTemp, getMaxDays]);
    //     }
    //     else {
    //       return new Array();
    //     }
    //   })
    // ).toPromise().then(
    //   (response) => {
    //     if (response.length > 0) {
    //       this.CustThirdPartyChecking.CustTempNo = response[0]["CustTempNo"];
    //       this.CustThirdPartyChecking.MrCustTypeCode = response[0]["CustType"];
    //       this.MaxDaysCustThirdPartyCheck = response[1]["GsValue"];
    //     }
    //   }
    // ).catch(
    //   (error) => {
    //     console.log(error);
    //   }
    // );
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

  checkIsSupplier() {
    if (this.CustomerPersonalForm.controls.IsSupplier.value === false) {
      this.IsSupplier = true;
    }
    else {
      this.IsSupplier = false;
      this.inputLookupObj.nameSelect = "";
      this.inputLookupObj.jsonSelect = { Zipcode: "" };
      var refMasterObjGender = {
        RefMasterTypeCode: CommonConstant.RefMasterTypeCodeGender,
        RowVersion: ""
      }
      this.http.post(this.getListActiveRefMasterUrl, refMasterObjGender).subscribe(
        (response) => {
          this.tempGender = response[CommonConstant.ReturnObj];
          if (this.tempGender.length > 0) {
            // this.CustomerPersonalForm.patchValue({
            //   Gender: this.tempGender[0].Key
            // });
          }
        }
      );
      var refMasterObjMrIdTypeCode = {
        RefMasterTypeCode: CommonConstant.RefMasterTypeCodeIdType,
        RowVersion: ""
      }
      this.http.post(this.getListActiveRefMasterUrl, refMasterObjMrIdTypeCode).subscribe(
        (response) => {
          this.tempIdType = response[CommonConstant.ReturnObj];
          if (this.tempIdType.length > 0) {
            // this.CustomerPersonalForm.patchValue({
            //   MrIdTypeCode: this.tempIdType[0].Key
            // });
          }
          if (this.tempIdType[0].Key == this.KTP) {
            //this.tempKTPCheck = true;
          } else {
            //this.tempKTPCheck = false;
          }
        }
      );
      let refMasterObjCustModel = {
        RefMasterTypeCode: CommonConstant.RefMasterTypeCodeCustModel,
        MappingCode: CommonConstant.CustTypePersonal
      }
      this.http.post(URLConstant.GetRefMasterListKeyValueActiveByCode, refMasterObjCustModel).subscribe(
        (response) => {
          this.tempCustModel = response["ReturnObject"];
          this.CustomerPersonalForm.patchValue({
            CustModel: this.tempCustModel[0].Key
          });
        }
      );
      // this.custObj = new CustObj();
      // this.custPersonalObj = new CustPersonalObj();
      // this.custObj.CustId = this.CustId;
      // this.custPersonalObj.CustId = this.CustId;
      // var datePipe = new DatePipe("en-US");
      // this.http.post(this.getCustByCustIdUrl, this.custObj).subscribe(
      //   (response) => {
      //     this.tempCustObj = response;
      //     this.CustomerPersonalForm.patchValue({
      //       CustName: this.tempCustObj.CustName,
      //       MrCustTypeCode: this.tempCustObj.MrCustTypeCode,
      //       CustModel: this.tempCustObj.MrCustModelCode,
      //       MrIdTypeCode: this.tempCustObj.MrIdTypeCode,
      //       IdNo: this.tempCustObj.IdNo,
      //       IdExpiredDt: datePipe.transform(this.tempCustObj.IdExpiredDt, 'yyyy-MM-dd'),
      //       TaxIdNo: this.tempCustObj.TaxIdNo,
      //       IsVip: this.tempCustObj.IsVip,
      //       IsAffiliateWithMf: this.tempCustObj.IsAffiliateWithMf,
      //       VipNotes: this.tempCustObj.VipNotes,
      //     });
      //     if (this.tempCustObj.VipNotes != null) {
      //       this.VipNotesRequired = true;
      //     } else {
      //       this.VipNotesRequired = false;
      //     }
      //     if (this.tempCustObj.IsVip == false) {
      //       this.CustomerPersonalForm.controls.VipNotes.disable();
      //     }
      //     this.CustomerPersonalForm.controls["MrIdTypeCode"].disable();
      //     this.CustomerPersonalForm.controls["IdNo"].disable();
      //     this.CustomerPersonalForm.controls["TaxIdNo"].disable();

      //     this.http.post(URLConstant.GetCustAddrByMrCustAddrType, { CustId: this.tempCustObj.CustId, MrCustAddrTypeCode: CommonConstant.AddrTypeLegal }).subscribe(
      //       (response: CustAddrObj) => {
      //         this.inputFieldObj.inputLookupObj.nameSelect = response.Zipcode;
      //         this.inputFieldObj.inputLookupObj.jsonSelect = { Zipcode: response.Zipcode };
      //         this.UcAddressObj.AreaCode1 = response.AreaCode1;
      //         this.UcAddressObj.AreaCode2 = response.AreaCode2;
      //         this.UcAddressObj.AreaCode3 = response.AreaCode3;
      //         this.UcAddressObj.AreaCode4 = response.AreaCode4;
      //         this.UcAddressObj.Addr = response.Addr;
      //         this.UcAddressObj.City = response.City;
      //         this.inputAddressObj.default = this.UcAddressObj;
      //         this.inputAddressObj.inputField = this.inputFieldObj;
      //       }
      //     );
      //   }
      // );

      // this.http.post<CustPersonalObj>(this.getCustPersonalByCustIdUrl, this.custPersonalObj).toPromise().then(
      //   (response) => {
      //     this.tempCustPersonalObj = response;
      //     this.CustomerPersonalForm.patchValue({
      //       Gender: this.tempCustPersonalObj.MrGenderCode,
      //       BirthPlace: this.tempCustPersonalObj.BirthPlace,
      //       BirthDt: datePipe.transform(this.tempCustPersonalObj.BirthDt, 'yyyy-MM-dd'),
      //       MotherMaidenName: this.tempCustPersonalObj.MotherMaidenName,
      //       IsRestInPeace: this.tempCustPersonalObj.IsRestInPeace,
      //       MrMaritalStatCode: this.tempCustPersonalObj.MrMaritalStatCode,
      //     });
      //   }
      // );

      // this.http.post(this.getListActiveRefMasterUrl, { RefMasterTypeCode: CommonConstant.RefMasterTypeCodeMaritalStat }).toPromise().then(
      //   (response) => {
      //     this.tempMrMaritalStatCode = response[CommonConstant.ReturnObj];
      //     if (this.tempCustPersonalObj.MrMaritalStatCode != null) {
      //       this.CustomerPersonalForm.patchValue({
      //         MrMaritalStatCode: this.tempCustPersonalObj.MrMaritalStatCode
      //       });
      //     } else {
      //       this.CustomerPersonalForm.patchValue({
      //         MrMaritalStatCode: response[CommonConstant.ReturnObj][0]['Key']
      //       });
      //     }
      //   }
      // );
    }
  }

  bindLookupSupplier() {
    this.inputLookupObj = new InputLookupObj();
    this.inputLookupObj.isReady = false;
    this.inputLookupObj.urlJson = "./assets/lookup/lookupSupplierPersonal.json";
    this.inputLookupObj.urlQryPaging = "/Generic/GetPagingObjectBySQL";
    this.inputLookupObj.urlEnviPaging = environment.FoundationR3Url;
    this.inputLookupObj.pagingJson = "./assets/lookup/lookupSupplierPersonal.json";
    this.inputLookupObj.genericJson = "./assets/lookup/lookupSupplierPersonal.json";
    this.inputLookupObj.isReady = true;
    this.inputLookupObj.isRequired = false;
  }

  SetSupplier(e) {

    this.CustomerPersonalForm.patchValue({
      SupplCode: e.VendorCode,
      SupplName: e.VendorName,
      SupplId: e.VendorId
    });

    this.SupplCode = e.VendorCode;
    this.SupplName = e.VendorName;
    this.SupplId = e.VendorId;

    this.http.post(URLConstant.GetVendorByVendorCode, { Code: this.SupplCode }).subscribe(
      (response) => {
        this.SupplierObj = response;

        if(this.SupplierObj.MrIdTypeCode){
          this.setOptionsSelected(this.SupplierObj.MrIdTypeCode)
        }

        this.CustomerPersonalForm.patchValue({
          CustName: this.SupplName,
          MrIdTypeCode: this.SupplierObj.MrIdTypeCode,
          IdNo: this.SupplierObj.IdNo,
          TaxIdNo: this.SupplierObj.TaxIdNo,
          // IdExpiredDt: '',
          CustModel: '',
          // IsVip: '',
          // IsAffiliateWithMf: '',
          // VipNotes: '',
        });
      });

    this.http.post(URLConstant.GetVendorAddrByVendorCodeAndMrAddrTypeCode, { VendorCode: this.SupplCode, MrAddrTypeCode: CommonConstant.AddrTypeLegal }).subscribe(
      (response: any) => {
        this.inputFieldObj.inputLookupObj.nameSelect = response.Zipcode;
        this.inputFieldObj.inputLookupObj.jsonSelect = { Zipcode: response.Zipcode };
        this.UcAddressObj.AreaCode1 = response.AreaCode1;
        this.UcAddressObj.AreaCode2 = response.AreaCode2;
        this.UcAddressObj.AreaCode3 = response.AreaCode3;
        this.UcAddressObj.AreaCode4 = response.AreaCode4;
        this.UcAddressObj.Addr = response.Addr;
        this.UcAddressObj.City = response.City;
        this.inputAddressObj.default = this.UcAddressObj;
        this.inputAddressObj.inputField = this.inputFieldObj;
      }
    );

    this.http.post(URLConstant.GetVendorBankAccDefaultByVendorId, { VendorId: this.SupplId }).subscribe(
      (response: any) => {
        if (this.IsSupplier == true) {
          this.custBankAccObj.CustId = this.CustId;
          this.custBankAccObj.RefBankId = response.RefBankId;
          this.custBankAccObj.BankAccNo = response.BankAccountNo;
          this.custBankAccObj.BankAccName = response.BankAccountName;
          this.custBankAccObj.BankBranch = '-';
          this.custBankAccObj.IsBankStmnt = false;
          this.custBankAccObj.BankBranchRegRptCode = '';
          this.custBankAccObj.BalanceAmt = 0;
          this.custBankAccObj.IsDefault = false;
          this.custBankAccObj.IsActive = true;

          this.http.post(URLConstant.GetVendorBankAccByVendorBankAccId, { VendorBankAccId: response.VendorBankAccId }).subscribe(
            (response: any) => {
              this.custBankAccObj.BankBranch = response.BankBranch;
              if (this.custBankAccObj.BankBranch == null) {
                this.custBankAccObj.BankBranch = '-';
              }
              console.log("branch" + this.custBankAccObj.BankBranch);
            });
        }
      });

  }

  SaveValue() {
    // if (this.IsCustThirdPartyCheck) {
    //   for (const key in this.LastHit) {
    //     if (!this.LastHit[key]) {
    //       this.toastr.errorMessage("Please Hit All Third Party Checking");
    //       return false;
    //     }
    //   }
    // }
    var UserAccess = JSON.parse(AdInsHelper.GetCookie(this.cookieService, CommonConstant.USER_ACCESS));
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
    AdInsHelper.RedirectUrl(this.router, [NavigationConstant.CUST_PERSONAL_DUP_CHECK],
      {
        "CustName": this.CustName,
        "Gender": this.Gender,
        "MrIdTypeCode": this.MrIdTypeCode,
        "CustModel": this.CustModel,
        "BirthPlace": this.BirthPlace,
        "BirthDt": this.BirthDt,
        "IdNo": this.IdNo,
        "TaxIdNo": this.TaxIdNo,
        "IdExpiredDt": this.IdExpiredDt,
        "MotherMaidenName": this.MotherMaidenName,
        "IsVip": this.IsVip,
        "IsAffiliateWithMf": this.IsAffiliateWithMf,
        "VipNotes": this.VipNotes,
        "MrMaritalStatCode": this.MrMaritalStatCode,
        // "CustTempNo": this.CustThirdPartyChecking.CustTempNo
      });
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
    this.onChangeIdType();
  }

  setOptionsSelected(val : any) {
    let noExpDate = [CommonConstant.MrIdTypeCodeEKTP, CommonConstant.MrIdTypeCodeNPWP, CommonConstant.MrIdTypeCodeAKTA];
    if (noExpDate.includes(val)) {
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
    this.onChangeIdType();
  }

  onChangeIdType() {
    let idType: string = this.CustomerPersonalForm.get("MrIdTypeCode").value;

    this.CustomerPersonalForm.get("IdNo").clearValidators();
    if (idType == CommonConstant.MrIdTypeCodeEKTP) {
      this.CustomerPersonalForm.get("IdNo").setValidators([Validators.required, Validators.pattern("^[0-9]+$"), Validators.minLength(16), Validators.maxLength(16)]);
    } else {
      this.CustomerPersonalForm.get("IdNo").setValidators([Validators.required, Validators.pattern("^[0-9]+$")]);
    }
    this.CustomerPersonalForm.get("IdNo").updateValueAndValidity();

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
      this.CustomerPersonalForm.controls[this.controlNameIdNo].setValidators([Validators.required, Validators.pattern(pattern)]);
      this.CustomerPersonalForm.controls[this.controlNameIdNo].updateValueAndValidity();
    }
  }
  //END OF URS-LOS-041

  //VIEW SUBSECTION ASLI RI
  showAsliRi() {
    this.subsectionAsliRi = true;
  }
  back() {
    this.subsectionAsliRi = false;
  }

  Open(contentCrossApp) {
    this.modalService.open(contentCrossApp).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason): string {
    if (reason === 1) {
      return 'by pressing ESC';
    } else if (reason === 0) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}

